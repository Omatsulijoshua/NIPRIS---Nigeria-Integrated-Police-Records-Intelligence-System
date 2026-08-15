import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateCaseDto } from './dto/create-case.dto';
import { AssignInvestigatorsDto } from './dto/assign-investigators.dto';
import { UpdateCaseStatusDto } from './dto/update-case-status.dto';
import { LinkCaseEvidenceDto } from './dto/link-asset.dto';
import { CaseRecord, CaseStatus, ClassificationLevel } from '@nipris/types';

@Injectable()
export class CasesService {
  private readonly logger = new Logger(CasesService.name);
  private readonly casesStore = new Map<string, CaseRecord>();

  constructor() {
    this.seedDevelopmentCases();
  }

  private seedDevelopmentCases() {
    const seedCase: CaseRecord = {
      id: 'cas-edo-001',
      caseNumber: 'CAS-2026-EDO-00109',
      title: 'Operation Commercial Shield - Benin Vault Heist',
      description: 'Comprehensive armed robbery investigation involving multi-state syndicate.',
      priority: 'CRITICAL' as any,
      status: CaseStatus.UNDER_INVESTIGATION,
      leadInvestigatorId: 'off-inv-edo',
      teamOfficerIds: ['off-inv-edo', 'off-patrol-edo', 'off-forensic-01'],
      state: 'Edo',
      classification: ClassificationLevel.LAW_ENFORCEMENT_RESTRICTED,
      incidentIds: ['inc-edo-001'],
      arrestIds: ['arr-edo-001'],
      personIds: ['person-chidi-001'],
      evidenceLinks: [
        {
          id: 'ev-001',
          assetType: 'BODYCAM',
          assetId: 'cam-rec-edo-9912',
          title: 'Patrol Body-Camera Footage at Bank Entrance',
          url: 'https://s3.nipris.gov.ng/evidence/cam-9912.mp4',
          notes: 'Captures suspect entering vehicle at 00:21 AM',
        },
      ],
      timeline: [
        {
          id: 'ctl-001',
          action: 'CASE_INITIATED',
          performedBy: 'off-inv-edo',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          details: 'Master investigation case file registered.',
        },
        {
          id: 'ctl-002',
          action: 'STATUS_TRANSITION',
          performedBy: 'off-inv-edo',
          timestamp: new Date().toISOString(),
          details: 'Case assigned to State CID Special Homicide & Robbery Squad.',
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.casesStore.set(seedCase.id, seedCase);
  }

  async createCase(dto: CreateCaseDto, creatingOfficerId: string): Promise<CaseRecord> {
    const stateCode = dto.state.toUpperCase().substring(0, 5);
    const caseNumber = `CAS-2026-${stateCode}-${Math.floor(10000 + Math.random() * 90000)}`;

    const newCase: CaseRecord = {
      id: `cas_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      caseNumber,
      title: dto.title,
      description: dto.description,
      priority: dto.priority,
      status: CaseStatus.OPEN,
      leadInvestigatorId: dto.leadInvestigatorId,
      teamOfficerIds: dto.teamOfficerIds || [dto.leadInvestigatorId],
      state: dto.state,
      classification: dto.classification || ClassificationLevel.LAW_ENFORCEMENT_RESTRICTED,
      incidentIds: [],
      arrestIds: [],
      personIds: [],
      evidenceLinks: [],
      timeline: [
        {
          id: `ctl_${Date.now()}`,
          action: 'CASE_INITIATED',
          performedBy: creatingOfficerId,
          timestamp: new Date().toISOString(),
          details: `Case opened. Lead Investigator assigned: ${dto.leadInvestigatorId}`,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.casesStore.set(newCase.id, newCase);
    this.logger.log(`Initiated Case File: ${newCase.caseNumber} (${newCase.title})`);
    return newCase;
  }

  async getAllCases(state?: string, status?: CaseStatus): Promise<CaseRecord[]> {
    let list = Array.from(this.casesStore.values());
    if (state) {
      list = list.filter((c) => c.state.toLowerCase() === state.toLowerCase());
    }
    if (status) {
      list = list.filter((c) => c.status === status);
    }
    return list;
  }

  async getCaseById(id: string): Promise<CaseRecord> {
    const caseRec = this.casesStore.get(id);
    if (!caseRec) throw new NotFoundException(`Case File with ID '${id}' not found.`);
    return caseRec;
  }

  async assignInvestigators(id: string, dto: AssignInvestigatorsDto, officerId: string): Promise<CaseRecord> {
    const caseRec = await this.getCaseById(id);
    caseRec.leadInvestigatorId = dto.leadInvestigatorId;
    caseRec.teamOfficerIds = Array.from(new Set([...caseRec.teamOfficerIds, ...dto.teamOfficerIds]));

    caseRec.timeline.push({
      id: `ctl_${Date.now()}`,
      action: 'INVESTIGATORS_ASSIGNED',
      performedBy: officerId,
      timestamp: new Date().toISOString(),
      details: `Lead: ${dto.leadInvestigatorId} | Team: ${dto.teamOfficerIds.join(', ')}`,
    });

    caseRec.updatedAt = new Date().toISOString();
    this.casesStore.set(id, caseRec);
    this.logger.log(`Updated investigators for Case ${caseRec.caseNumber}`);
    return caseRec;
  }

  async updateStatus(id: string, dto: UpdateCaseStatusDto, officerId: string): Promise<CaseRecord> {
    const caseRec = await this.getCaseById(id);
    const previousStatus = caseRec.status;
    caseRec.status = dto.status;

    caseRec.timeline.push({
      id: `ctl_${Date.now()}`,
      action: 'STATUS_TRANSITION',
      performedBy: officerId,
      timestamp: new Date().toISOString(),
      details: `Status transitioned ${previousStatus} -> ${dto.status}. Rationale: ${dto.statusReason}`,
    });

    caseRec.updatedAt = new Date().toISOString();
    this.casesStore.set(id, caseRec);
    this.logger.warn(`Case ${caseRec.caseNumber} Status changed: ${previousStatus} -> ${dto.status}`);
    return caseRec;
  }

  async linkIncident(id: string, incidentId: string, officerId: string): Promise<CaseRecord> {
    const caseRec = await this.getCaseById(id);
    if (!caseRec.incidentIds.includes(incidentId)) {
      caseRec.incidentIds.push(incidentId);
      caseRec.timeline.push({
        id: `ctl_${Date.now()}`,
        action: 'INCIDENT_LINKED',
        performedBy: officerId,
        timestamp: new Date().toISOString(),
        details: `Incident ID '${incidentId}' attached to case file.`,
      });
      caseRec.updatedAt = new Date().toISOString();
      this.casesStore.set(id, caseRec);
    }
    return caseRec;
  }

  async linkArrest(id: string, arrestId: string, officerId: string): Promise<CaseRecord> {
    const caseRec = await this.getCaseById(id);
    if (!caseRec.arrestIds.includes(arrestId)) {
      caseRec.arrestIds.push(arrestId);
      caseRec.timeline.push({
        id: `ctl_${Date.now()}`,
        action: 'ARREST_LINKED',
        performedBy: officerId,
        timestamp: new Date().toISOString(),
        details: `Arrest Booking ID '${arrestId}' attached to case file.`,
      });
      caseRec.updatedAt = new Date().toISOString();
      this.casesStore.set(id, caseRec);
    }
    return caseRec;
  }

  async linkEvidence(id: string, dto: LinkCaseEvidenceDto, officerId: string): Promise<CaseRecord> {
    const caseRec = await this.getCaseById(id);
    const evidenceLink = {
      id: `ev_${Date.now()}`,
      assetType: dto.assetType,
      assetId: dto.assetId,
      title: dto.title,
      url: dto.url,
      notes: dto.notes,
    };

    caseRec.evidenceLinks.push(evidenceLink);
    caseRec.timeline.push({
      id: `ctl_${Date.now()}`,
      action: 'EVIDENCE_LINKED',
      performedBy: officerId,
      timestamp: new Date().toISOString(),
      details: `${dto.assetType} asset '${dto.title}' attached to case file.`,
    });

    caseRec.updatedAt = new Date().toISOString();
    this.casesStore.set(id, caseRec);
    this.logger.log(`Linked ${dto.assetType} evidence '${dto.title}' to Case ${caseRec.caseNumber}`);
    return caseRec;
  }
}
