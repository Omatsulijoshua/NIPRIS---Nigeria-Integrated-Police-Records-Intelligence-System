import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import * as crypto from 'crypto';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import {
  AuditLogEntry,
  AuditActionType,
  AuditResourceType,
  AuditTamperStatus,
  ComplianceSummaryReport,
  OfficerRole,
} from '@nipris/types';

@Injectable()
export class AuditService {
  private readonly logger = new Logger(AuditService.name);
  private readonly auditLedger: AuditLogEntry[] = [];
  private sequenceCounter = 0;
  private lastBlockHash = 'GENESIS_BLOCK_SHA256_NIPRIS_NATIONAL_POLICE_LEDGER_2026';

  constructor() {
    this.seedInitialGenesisAudit();
  }

  private calculateBlockHash(seq: number, timestamp: string, officerId: string, action: string, targetId: string, prevHash: string): string {
    const rawData = `${seq}:${timestamp}:${officerId}:${action}:${targetId}:${prevHash}`;
    return crypto.createHash('sha256').update(rawData).digest('hex');
  }

  private evaluateComplianceRisk(dto: CreateAuditLogDto): { riskScore: number; flagInternalAffairs: boolean } {
    let riskScore = 10; // baseline low risk

    // Check justification rationale
    if (!dto.justificationRationale || dto.justificationRationale.trim().length < 10) {
      riskScore += 45;
    }

    // High risk actions
    if (dto.action === AuditActionType.EMERGENCY_OVERRIDE) riskScore += 35;
    if (dto.action === AuditActionType.EXPORT) riskScore += 25;

    // Cross-state out-of-jurisdiction checks
    if (dto.jurisdictionCode !== 'NATIONAL' && dto.jurisdictionCode !== 'EDO') {
      riskScore += 20;
    }

    const flagInternalAffairs = riskScore >= 70;
    return { riskScore: Math.min(riskScore, 100), flagInternalAffairs };
  }

  private seedInitialGenesisAudit() {
    const dto: CreateAuditLogDto = {
      officerId: 'off-super-admin',
      badgeNumber: 'NPF-IGP-001',
      officerRole: OfficerRole.NATIONAL_SUPER_ADMIN,
      ipAddress: '127.0.0.1',
      deviceFingerprint: 'GENESIS_SYSTEM_HW_00',
      action: AuditActionType.CREATE,
      resourceType: AuditResourceType.SYSTEM,
      targetResourceId: 'NIPRIS_GENESIS_INSTANCE',
      justificationRationale: 'System initialization and cryptographic audit ledger Genesis seed',
      jurisdictionCode: 'NATIONAL',
    };

    this.recordAuditLog(dto);
  }

  // --- RECORD IMMUTABLE AUDIT LOG ---

  recordAuditLog(dto: CreateAuditLogDto): AuditLogEntry {
    this.sequenceCounter += 1;
    const seq = this.sequenceCounter;
    const timestamp = new Date().toISOString();
    const prevHash = this.lastBlockHash;

    const { riskScore, flagInternalAffairs } = this.evaluateComplianceRisk(dto);
    const blockHash = this.calculateBlockHash(seq, timestamp, dto.officerId, dto.action, dto.targetResourceId, prevHash);

    const newEntry: AuditLogEntry = {
      id: `aud_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      sequenceIndex: seq,
      timestamp,
      officerId: dto.officerId,
      badgeNumber: dto.badgeNumber,
      officerRole: dto.officerRole,
      ipAddress: dto.ipAddress,
      deviceFingerprint: dto.deviceFingerprint,
      action: dto.action,
      resourceType: dto.resourceType,
      targetResourceId: dto.targetResourceId,
      justificationRationale: dto.justificationRationale,
      jurisdictionCode: dto.jurisdictionCode,
      complianceRiskScore: riskScore,
      previousBlockHash: prevHash,
      blockHash,
      tamperStatus: AuditTamperStatus.VERIFIED_INTACT,
      internalAffairsFlagged: flagInternalAffairs,
      createdAt: timestamp,
    };

    this.auditLedger.push(newEntry);
    this.lastBlockHash = blockHash;

    if (flagInternalAffairs) {
      this.logger.warn(`🚨 INTERNAL AFFAIRS FLAG: Audit Entry #${seq} by Officer ${dto.officerId} (Risk Score: ${riskScore})`);
    } else {
      this.logger.log(`Logged Audit Entry #${seq} [${dto.action}] Hash: ${blockHash.substring(0, 12)}...`);
    }

    return newEntry;
  }

  // --- QUERY LEDGER ---

  getAllAuditLogs(officerId?: string, action?: AuditActionType, resourceType?: AuditResourceType, flaggedOnly?: boolean): AuditLogEntry[] {
    let list = [...this.auditLedger];
    if (officerId) list = list.filter((a) => a.officerId === officerId);
    if (action) list = list.filter((a) => a.action === action);
    if (resourceType) list = list.filter((a) => a.resourceType === resourceType);
    if (flaggedOnly) list = list.filter((a) => a.internalAffairsFlagged === true);
    return list.reverse(); // most recent first
  }

  getAuditLogById(id: string): AuditLogEntry {
    const entry = this.auditLedger.find((a) => a.id === id);
    if (!entry) throw new NotFoundException(`Audit Log Entry '${id}' not found.`);
    return entry;
  }

  // --- CRYPTOGRAPHIC CHAIN INTEGRITY VALIDATOR ---

  verifyChainIntegrity(): { status: AuditTamperStatus; totalBlocks: number; tamperedBlockIndex?: number } {
    let currentPrevHash = 'GENESIS_BLOCK_SHA256_NIPRIS_NATIONAL_POLICE_LEDGER_2026';

    for (let i = 0; i < this.auditLedger.length; i++) {
      const block = this.auditLedger[i];

      if (block.previousBlockHash !== currentPrevHash) {
        this.logger.error(`CRITICAL: Audit Chain Break at Block #${block.sequenceIndex}! Previous hash mismatch.`);
        return { status: AuditTamperStatus.TAMPER_SUSPECT, totalBlocks: this.auditLedger.length, tamperedBlockIndex: block.sequenceIndex };
      }

      const recalculated = this.calculateBlockHash(block.sequenceIndex, block.timestamp, block.officerId, block.action, block.targetResourceId, currentPrevHash);
      if (recalculated !== block.blockHash) {
        this.logger.error(`CRITICAL: Audit Hash Discrepancy at Block #${block.sequenceIndex}! Data tampered.`);
        return { status: AuditTamperStatus.TAMPER_SUSPECT, totalBlocks: this.auditLedger.length, tamperedBlockIndex: block.sequenceIndex };
      }

      currentPrevHash = block.blockHash;
    }

    return { status: AuditTamperStatus.VERIFIED_INTACT, totalBlocks: this.auditLedger.length };
  }

  // --- COMPLIANCE SUMMARY REPORT ---

  getComplianceSummary(): ComplianceSummaryReport {
    const total = this.auditLedger.length;
    const flagged = this.auditLedger.filter((a) => a.internalAffairsFlagged).length;
    const highRisk = this.auditLedger.filter((a) => a.complianceRiskScore >= 60).length;
    const unjustified = this.auditLedger.filter((a) => !a.justificationRationale || a.justificationRationale.length < 10).length;
    const avgRisk = total > 0 ? Math.round(this.auditLedger.reduce((sum, a) => sum + a.complianceRiskScore, 0) / total) : 0;
    const chainVerification = this.verifyChainIntegrity();

    return {
      totalAuditLogs: total,
      chainIntegrityStatus: chainVerification.status,
      highRiskQueriesCount: highRisk,
      internalAffairsEscalationsCount: flagged,
      unjustifiedQueriesCount: unjustified,
      averageRiskScore: avgRisk,
    };
  }
}
