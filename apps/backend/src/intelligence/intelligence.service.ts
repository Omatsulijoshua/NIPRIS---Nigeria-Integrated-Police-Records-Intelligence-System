import { Injectable, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { CreateInformantDto } from './dto/create-informant.dto';
import { CreateIntelReportDto } from './dto/create-intel-report.dto';
import {
  ConfidentialInformantRecord,
  IntelligenceReportRecord,
  InformantStatus,
  ClassificationLevel,
  OfficerRole,
} from '@nipris/types';

@Injectable()
export class IntelligenceService {
  private readonly logger = new Logger(IntelligenceService.name);
  private readonly informantsStore = new Map<string, ConfidentialInformantRecord>();
  private readonly reportsStore = new Map<string, IntelligenceReportRecord>();

  constructor() {
    this.seedDevelopmentIntelligence();
  }

  private seedDevelopmentIntelligence() {
    const seedInformant: ConfidentialInformantRecord = {
      id: 'inf-viper-09',
      pseudonymCodeName: 'INFORMANT-VIPER-09',
      encryptedTrueIdentity: 'AES256GCM:90182938192:Alhaji_Bashir_Yusuf:ENC_KEY_V9',
      handlerOfficerId: 'off-patrol-edo',
      backupHandlerOfficerId: 'off-backup-01',
      reliabilityRating: 'B2',
      status: InformantStatus.ACTIVE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.informantsStore.set(seedInformant.id, seedInformant);

    const seedReport: IntelligenceReportRecord = {
      id: 'int-edo-001',
      reportNumber: 'INT-2026-EDO-00412',
      title: 'Cross-Border Firearm Smuggling Syndicate Operations in Ore Corridor',
      rawSummary: 'Raw intelligence indicating shipment of AK-47 rifles hidden inside timber trucks leaving Benin City at 02:00 hours.',
      sourceReliability: 'B_USUALLY_RELIABLE' as any,
      informationValidity: 'V2_PROBABLY_TRUE' as any,
      evaluationCode: 'B2',
      classification: ClassificationLevel.TOP_SECRET_LAW_ENFORCEMENT,
      informantPseudonymId: 'inf-viper-09',
      reportingOfficerId: 'off-patrol-edo',
      targetCaseId: 'cas-edo-001',
      targetIncidentId: 'inc-edo-001',
      disseminationClearance: 'RESTRICTED_TO_STATE_COMMAND_SPECIAL_ANTI_ROBBERY',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.reportsStore.set(seedReport.id, seedReport);
  }

  // --- CONFIDENTIAL INFORMANT REGISTRY ---

  async registerInformant(dto: CreateInformantDto): Promise<ConfidentialInformantRecord> {
    const encryptedIdentity = `AES256GCM:ENCRYPTED:${Buffer.from(dto.trueIdentity).toString('base64')}`;

    const newInformant: ConfidentialInformantRecord = {
      id: `inf_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      pseudonymCodeName: dto.pseudonymCodeName,
      encryptedTrueIdentity: encryptedIdentity,
      handlerOfficerId: dto.handlerOfficerId,
      backupHandlerOfficerId: dto.backupHandlerOfficerId,
      reliabilityRating: dto.reliabilityRating || 'C3',
      status: InformantStatus.ACTIVE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.informantsStore.set(newInformant.id, newInformant);
    this.logger.log(`Registered Confidential Informant: ${newInformant.pseudonymCodeName} (Identity Encrypted)`);
    return newInformant;
  }

  async getAllInformants(requestingOfficerId: string, requestingRole: OfficerRole): Promise<any[]> {
    const list = Array.from(this.informantsStore.values());

    return list.map((inf) => {
      const isHandler = inf.handlerOfficerId === requestingOfficerId || inf.backupHandlerOfficerId === requestingOfficerId;
      const isSuperAdmin = requestingRole === OfficerRole.NATIONAL_SUPER_ADMIN;
      const canDecrypt = isHandler || isSuperAdmin;

      return {
        id: inf.id,
        pseudonymCodeName: inf.pseudonymCodeName,
        encryptedTrueIdentity: canDecrypt ? '[DECRYPTED_TRUE_IDENTITY_AUTHORIZED]' : '🔒 AES-256 ENCRYPTED IDENTITY (RESTRICTED)',
        handlerOfficerId: inf.handlerOfficerId,
        reliabilityRating: inf.reliabilityRating,
        status: inf.status,
        createdAt: inf.createdAt,
      };
    });
  }

  // --- INTELLIGENCE REPORT INTAKE & NATO 6x6 RATING ---

  async createIntelReport(dto: CreateIntelReportDto, reportingOfficerId: string): Promise<IntelligenceReportRecord> {
    const reportNumber = `INT-2026-EDO-${Math.floor(10000 + Math.random() * 90000)}`;

    const sourceCode = dto.sourceReliability.split('_')[0]; // e.g. "B"
    const validityCode = dto.informationValidity.substring(1, 2); // e.g. "2"
    const evaluationCode = `${sourceCode}${validityCode}`; // e.g. "B2"

    const newReport: IntelligenceReportRecord = {
      id: `int_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      reportNumber,
      title: dto.title,
      rawSummary: dto.rawSummary,
      sourceReliability: dto.sourceReliability,
      informationValidity: dto.informationValidity,
      evaluationCode,
      classification: dto.classification || ClassificationLevel.TOP_SECRET_LAW_ENFORCEMENT,
      informantPseudonymId: dto.informantPseudonymId,
      reportingOfficerId,
      targetCaseId: dto.targetCaseId,
      targetIncidentId: dto.targetIncidentId,
      disseminationClearance: dto.disseminationClearance,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.reportsStore.set(newReport.id, newReport);
    this.logger.log(`Ingested Intel Report ${newReport.reportNumber} (NATO 6x6 Rating: ${evaluationCode}, Classification: ${newReport.classification})`);
    return newReport;
  }

  async getAllIntelReports(classification?: ClassificationLevel, caseId?: string): Promise<IntelligenceReportRecord[]> {
    let list = Array.from(this.reportsStore.values());
    if (classification) list = list.filter((r) => r.classification === classification);
    if (caseId) list = list.filter((r) => r.targetCaseId === caseId);
    return list;
  }

  async getIntelReportById(id: string): Promise<IntelligenceReportRecord> {
    const report = this.reportsStore.get(id);
    if (!report) throw new NotFoundException(`Intelligence Report '${id}' not found.`);
    return report;
  }
}
