import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateEvidenceDto } from './dto/create-evidence.dto';
import { LogCustodyTransferDto } from './dto/log-custody.dto';
import { VerifyHashDto } from './dto/verify-hash.dto';
import {
  DigitalEvidenceRecord,
  EvidenceCategory,
  EvidenceCustodyAction,
  EvidenceHashVerificationStatus,
  ClassificationLevel,
} from '@nipris/types';

@Injectable()
export class EvidenceService {
  private readonly logger = new Logger(EvidenceService.name);
  private readonly evidenceStore = new Map<string, DigitalEvidenceRecord>();

  constructor() {
    this.seedDevelopmentEvidence();
  }

  private seedDevelopmentEvidence() {
    const seedEvidence: DigitalEvidenceRecord = {
      id: 'evd-edo-001',
      evidenceNumber: 'EVD-2026-EDO-00109',
      title: 'Patrol Body-Camera Footage at Bank Vault Entrance',
      category: EvidenceCategory.BODYCAM_FOOTAGE,
      fileName: 'bodycam-rec-20260815-0012.mp4',
      fileSizeBytes: 450971520,
      mimeType: 'video/mp4',
      storageUrl: 'https://s3.nipris.gov.ng/vault/cam-9912.mp4',
      sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      classification: ClassificationLevel.EVIDENCE_RESTRICTED,
      incidentId: 'inc-edo-001',
      caseId: 'cas-edo-001',
      personId: 'person-chidi-001',
      seizingOfficerId: 'off-patrol-edo',
      seizedLocation: 'Ring Road Financial District, Benin City',
      seizedAt: new Date(Date.now() - 3600000).toISOString(),
      chainOfCustody: [
        {
          id: 'coc-001',
          performedByOfficerId: 'off-patrol-edo',
          action: EvidenceCustodyAction.INTAKE,
          recipientOrLocation: 'State Command Digital Evidence Vault (Server 4)',
          rationale: 'Initial secure ingest of body-camera recording',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          hashVerificationStatus: EvidenceHashVerificationStatus.VERIFIED_INTACT,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.evidenceStore.set(seedEvidence.id, seedEvidence);
  }

  async createEvidence(dto: CreateEvidenceDto, seizingOfficerId: string): Promise<DigitalEvidenceRecord> {
    const evidenceNumber = `EVD-2026-EDO-${Math.floor(10000 + Math.random() * 90000)}`;

    const newEvidence: DigitalEvidenceRecord = {
      id: `evd_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      evidenceNumber,
      title: dto.title,
      category: dto.category,
      fileName: dto.fileName,
      fileSizeBytes: dto.fileSizeBytes,
      mimeType: dto.mimeType,
      storageUrl: dto.storageUrl,
      sha256Hash: dto.sha256Hash,
      classification: dto.classification || ClassificationLevel.EVIDENCE_RESTRICTED,
      incidentId: dto.incidentId,
      caseId: dto.caseId,
      personId: dto.personId,
      seizingOfficerId,
      seizedLocation: dto.seizedLocation,
      seizedAt: dto.seizedAt,
      chainOfCustody: [
        {
          id: `coc_${Date.now()}`,
          performedByOfficerId: seizingOfficerId,
          action: EvidenceCustodyAction.INTAKE,
          recipientOrLocation: 'NIPRIS Cryptographic Vault Storage',
          rationale: 'Initial evidence ingestion and SHA-256 checksum seal',
          timestamp: new Date().toISOString(),
          hashVerificationStatus: EvidenceHashVerificationStatus.VERIFIED_INTACT,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.evidenceStore.set(newEvidence.id, newEvidence);
    this.logger.log(`Ingested Digital Evidence: ${newEvidence.evidenceNumber} (SHA-256: ${newEvidence.sha256Hash.substring(0, 12)}...)`);
    return newEvidence;
  }

  async getAllEvidence(category?: EvidenceCategory, caseId?: string, incidentId?: string): Promise<DigitalEvidenceRecord[]> {
    let list = Array.from(this.evidenceStore.values());
    if (category) list = list.filter((e) => e.category === category);
    if (caseId) list = list.filter((e) => e.caseId === caseId);
    if (incidentId) list = list.filter((e) => e.incidentId === incidentId);
    return list;
  }

  async getEvidenceById(id: string): Promise<DigitalEvidenceRecord> {
    const evidence = this.evidenceStore.get(id);
    if (!evidence) throw new NotFoundException(`Digital Evidence Record with ID '${id}' not found.`);
    return evidence;
  }

  async verifyHash(id: string, dto: VerifyHashDto): Promise<{ status: EvidenceHashVerificationStatus; match: boolean; expectedHash: string; calculatedHash: string }> {
    const evidence = await this.getEvidenceById(id);
    const isMatch = evidence.sha256Hash.toLowerCase() === dto.calculatedHash.toLowerCase();
    const status = isMatch ? EvidenceHashVerificationStatus.VERIFIED_INTACT : EvidenceHashVerificationStatus.TAMPER_ALERT;

    this.logger.warn(`Cryptographic Hash Verification for ${evidence.evidenceNumber}: ${status}`);
    return {
      status,
      match: isMatch,
      expectedHash: evidence.sha256Hash,
      calculatedHash: dto.calculatedHash,
    };
  }

  async logCustodyTransfer(id: string, dto: LogCustodyTransferDto, officerId: string): Promise<DigitalEvidenceRecord> {
    const evidence = await this.getEvidenceById(id);

    const logEntry = {
      id: `coc_${Date.now()}`,
      performedByOfficerId: officerId,
      action: dto.action,
      recipientOrLocation: dto.recipientOrLocation,
      rationale: dto.rationale,
      timestamp: new Date().toISOString(),
      hashVerificationStatus: EvidenceHashVerificationStatus.VERIFIED_INTACT,
    };

    evidence.chainOfCustody.push(logEntry);
    evidence.updatedAt = new Date().toISOString();
    this.evidenceStore.set(id, evidence);

    this.logger.log(`Chain of Custody updated for ${evidence.evidenceNumber}: ${dto.action} -> ${dto.recipientOrLocation}`);
    return evidence;
  }
}
