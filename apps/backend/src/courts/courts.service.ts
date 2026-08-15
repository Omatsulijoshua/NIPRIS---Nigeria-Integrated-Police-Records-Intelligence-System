import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateChargeSheetDto } from './dto/create-charge-sheet.dto';
import { IngestJudicialOrderDto } from './dto/ingest-judicial-order.dto';
import { SyncCourtStatusDto } from './dto/sync-court-status.dto';
import { VerifyJudicialSealDto } from './dto/verify-judicial-seal.dto';
import {
  ChargeSheetRecord,
  JudicialOrderRecord,
  JudicialSealVerificationResult,
  JudicialSealStatus,
  TrialStatus,
  JudicialOrderType,
} from '@nipris/types';

@Injectable()
export class CourtsService {
  private readonly logger = new Logger(CourtsService.name);
  private readonly chargeSheetsStore = new Map<string, ChargeSheetRecord>();
  private readonly judicialOrdersStore = new Map<string, JudicialOrderRecord>();

  constructor() {
    this.seedDevelopmentCourtRecords();
  }

  private seedDevelopmentCourtRecords() {
    const seedCS: ChargeSheetRecord = {
      id: 'cs_001',
      chargeSheetNumber: 'CS-2026-EDO-00912',
      formNPF14Code: 'FORM_NPF_14_PROSECUTION_FILING_2026',
      caseId: 'case-edo-2026-001',
      arrestId: 'arr-edo-2026-001',
      suspectPersonId: 'person-chidi-001',
      suspectName: 'Chidi Okonkwo',
      courtName: 'High Court of Edo State, Benin Division',
      jurisdictionState: 'Edo',
      prosecutingOfficerId: 'off-patrol-edo',
      statutoryCounts: [
        {
          countNumber: 1,
          penalCodeSection: 'Section 412 Penal Code Cap 30 Laws of Edo State 2006',
          offenseTitle: 'Armed Robbery & Unlawful Firearms Possession',
          particularsOfOffense: 'That you Chidi Okonkwo on or about August 14 2026 at Benin City did commit armed robbery...',
        },
      ],
      evidenceHashesLinked: ['e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'],
      courtSealNumber: 'HCB/SEAL/2026/09912',
      trialStatus: TrialStatus.PENDING_PROSECUTION,
      isJudiciallyLocked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.chargeSheetsStore.set(seedCS.chargeSheetNumber, seedCS);
  }

  // --- FORM NPF 14 CHARGE SHEET GENERATION ---

  async generateChargeSheet(dto: CreateChargeSheetDto, officerId: string): Promise<ChargeSheetRecord> {
    const chargeSheetNumber = `CS-2026-${dto.jurisdictionState.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const record: ChargeSheetRecord = {
      id: `cs_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      chargeSheetNumber,
      formNPF14Code: `FORM_NPF_14_${dto.jurisdictionState.toUpperCase()}_2026`,
      caseId: dto.caseId,
      arrestId: dto.arrestId,
      suspectPersonId: dto.suspectPersonId,
      suspectName: dto.suspectName,
      courtName: dto.courtName,
      jurisdictionState: dto.jurisdictionState,
      prosecutingOfficerId: officerId,
      statutoryCounts: dto.statutoryCounts,
      evidenceHashesLinked: ['e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'],
      courtSealNumber: dto.courtSealNumber,
      trialStatus: TrialStatus.PENDING_PROSECUTION,
      isJudiciallyLocked: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.chargeSheetsStore.set(chargeSheetNumber, record);
    this.logger.log(`Generated Form NPF 14 Charge Sheet ${chargeSheetNumber} for Suspect ${dto.suspectName}`);
    return record;
  }

  // --- JUDICIAL SEAL HASH VERIFICATION ---

  async verifyJudicialSeal(dto: VerifyJudicialSealDto): Promise<JudicialSealVerificationResult> {
    const isValidFormat = dto.courtSealNumber.startsWith('HC') || dto.courtSealNumber.startsWith('MC');

    return {
      courtSealNumber: dto.courtSealNumber,
      sealStatus: isValidFormat ? JudicialSealStatus.VALID_SEAL : JudicialSealStatus.INVALID_SEAL_SIGNATURE,
      issuingJudgeName: dto.issuingJudgeName,
      courtName: 'High Court of Edo State, Benin Division',
      jurisdictionState: 'Edo',
      verifiedAt: new Date().toISOString(),
    };
  }

  // --- JUDICIAL ORDER INGESTION & AUTOMATIC RECORD LOCKING ---

  async ingestJudicialOrder(dto: IngestJudicialOrderDto): Promise<JudicialOrderRecord> {
    const orderNumber = `ORD-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const lockRequired =
      dto.orderType === JudicialOrderType.STAY_OF_PROCEEDINGS ||
      dto.orderType === JudicialOrderType.JUDICIAL_INJUNCTION;

    const orderRecord: JudicialOrderRecord = {
      id: `ord_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      orderNumber,
      orderType: dto.orderType,
      issuingJudgeName: dto.issuingJudgeName,
      courtName: dto.courtName,
      courtSealNumber: dto.courtSealNumber,
      targetCaseId: dto.targetCaseId,
      summaryText: dto.summaryText,
      isJudiciallyLocked: lockRequired,
      effectiveDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    this.judicialOrdersStore.set(orderNumber, orderRecord);

    // Apply Judicial Lock to matching charge sheets
    for (const cs of this.chargeSheetsStore.values()) {
      if (cs.caseId === dto.targetCaseId) {
        cs.isJudiciallyLocked = lockRequired;
        if (dto.orderType === JudicialOrderType.CONVICTION_ORDER) cs.trialStatus = TrialStatus.CONVICTION;
        if (dto.orderType === JudicialOrderType.ACQUITTAL_ORDER) cs.trialStatus = TrialStatus.ACQUITTAL;
        this.chargeSheetsStore.set(cs.chargeSheetNumber, cs);
      }
    }

    this.logger.warn(`Ingested Judicial Order ${orderNumber} (${dto.orderType}) on Case ${dto.targetCaseId} - Judicially Locked: ${lockRequired}`);
    return orderRecord;
  }

  // --- COURT STATUS SYNC GATEWAY ---

  async syncCourtStatus(dto: SyncCourtStatusDto): Promise<ChargeSheetRecord> {
    const cs = this.chargeSheetsStore.get(dto.chargeSheetNumber);
    if (!cs) throw new NotFoundException(`Charge Sheet '${dto.chargeSheetNumber}' not found.`);

    cs.trialStatus = dto.trialStatus;
    cs.updatedAt = new Date().toISOString();
    this.chargeSheetsStore.set(dto.chargeSheetNumber, cs);

    this.logger.log(`Synced Charge Sheet ${dto.chargeSheetNumber} trial status to ${dto.trialStatus}`);
    return cs;
  }

  // --- QUERY COURTS DOCKET ---

  async getAllChargeSheets(): Promise<ChargeSheetRecord[]> {
    return Array.from(this.chargeSheetsStore.values()).reverse();
  }

  async getAllJudicialOrders(): Promise<JudicialOrderRecord[]> {
    return Array.from(this.judicialOrdersStore.values()).reverse();
  }
}
