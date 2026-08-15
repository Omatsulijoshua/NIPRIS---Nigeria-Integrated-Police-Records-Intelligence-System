import { Injectable, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { CreateInterStateRequestDto } from './dto/create-inter-state-request.dto';
import { ApproveRequestDto } from './dto/approve-request.dto';
import { EmergencyOverrideDto } from './dto/emergency-override.dto';
import {
  InterStateRecordRequest,
  InterStateRequestStatus,
  InterStateRequestPriority,
  InterStateRecordType,
  EmergencyJurisdictionOverride,
  NationalHqStateOversightSummary,
  NIGERIAN_STATES,
} from '@nipris/types';

@Injectable()
export class InterStateService {
  private readonly logger = new Logger(InterStateService.name);
  private readonly requestsStore = new Map<string, InterStateRecordRequest>();
  private readonly overridesStore = new Map<string, EmergencyJurisdictionOverride>();

  constructor() {
    this.seedDevelopmentRequests();
  }

  private seedDevelopmentRequests() {
    const seedReq: InterStateRecordRequest = {
      id: 'isr-edo-lagos-001',
      requestNumber: 'ISR-2026-EDO-LAGOS-00192',
      originatingOfficerId: 'off-patrol-edo',
      originatingState: 'Edo',
      targetState: 'Lagos',
      recordType: InterStateRecordType.CRIMINAL_ARREST,
      targetRecordId: 'ARR-2026-LAGOS-00891',
      justificationRationale: 'Joint armed robbery investigation link across Benin-Lagos transport corridor',
      priority: InterStateRequestPriority.URGENT,
      status: InterStateRequestStatus.APPROVED,
      approvingOfficerId: 'off-lagos-admin',
      approvedAt: new Date(Date.now() - 7200000).toISOString(),
      expirationDate: new Date(Date.now() + 259200000).toISOString(), // 72 hrs
      createdAt: new Date(Date.now() - 7200000).toISOString(),
      updatedAt: new Date(Date.now() - 7200000).toISOString(),
    };

    this.requestsStore.set(seedReq.id, seedReq);
  }

  // --- REQUEST & APPROVAL WORKFLOW ---

  async createRequest(dto: CreateInterStateRequestDto, officerId: string): Promise<InterStateRecordRequest> {
    if (!NIGERIAN_STATES.includes(dto.originatingState) || !NIGERIAN_STATES.includes(dto.targetState)) {
      throw new ForbiddenException(`Invalid state jurisdiction boundary. Must be one of 36 States + FCT.`);
    }

    const requestNumber = `ISR-2026-${dto.originatingState.toUpperCase()}-${dto.targetState.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const newReq: InterStateRecordRequest = {
      id: `isr_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      requestNumber,
      originatingOfficerId: officerId,
      originatingState: dto.originatingState,
      targetState: dto.targetState,
      recordType: dto.recordType,
      targetRecordId: dto.targetRecordId,
      justificationRationale: dto.justificationRationale,
      priority: dto.priority || InterStateRequestPriority.ROUTINE,
      status: InterStateRequestStatus.PENDING_APPROVAL,
      expirationDate: new Date(Date.now() + 259200000).toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.requestsStore.set(newReq.id, newReq);
    this.logger.log(`Created Inter-State Request ${newReq.requestNumber} (${dto.originatingState} -> ${dto.targetState})`);
    return newReq;
  }

  async getAllRequests(originatingState?: string, targetState?: string, status?: InterStateRequestStatus): Promise<InterStateRecordRequest[]> {
    let list = Array.from(this.requestsStore.values());
    if (originatingState) list = list.filter((r) => r.originatingState.toLowerCase() === originatingState.toLowerCase());
    if (targetState) list = list.filter((r) => r.targetState.toLowerCase() === targetState.toLowerCase());
    if (status) list = list.filter((r) => r.status === status);
    return list;
  }

  async getRequestById(id: string): Promise<InterStateRecordRequest> {
    const req = this.requestsStore.get(id);
    if (!req) throw new NotFoundException(`Inter-State Request '${id}' not found.`);
    return req;
  }

  async approveRequest(id: string, dto: ApproveRequestDto, approvingOfficerId: string): Promise<InterStateRecordRequest> {
    const req = await this.getRequestById(id);
    req.status = dto.approved ? InterStateRequestStatus.APPROVED : InterStateRequestStatus.REJECTED;
    req.approvingOfficerId = approvingOfficerId;
    req.approvedAt = new Date().toISOString();
    if (!dto.approved && dto.reason) req.rejectionReason = dto.reason;
    req.updatedAt = new Date().toISOString();
    this.requestsStore.set(id, req);

    this.logger.log(`Inter-State Request ${req.requestNumber} ${req.status} by Officer ${approvingOfficerId}`);
    return req;
  }

  // --- EMERGENCY JURISDICTION OVERRIDE ---

  async executeEmergencyOverride(dto: EmergencyOverrideDto, officerId: string, officerState: string): Promise<EmergencyJurisdictionOverride> {
    if (!dto.mandatoryRationale || dto.mandatoryRationale.trim().length < 15) {
      throw new ForbiddenException(`Emergency Jurisdiction Override requires detailed operational justification (min 15 characters).`);
    }

    const override: EmergencyJurisdictionOverride = {
      id: `ovr_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      officerId,
      officerState,
      targetRecordId: dto.targetRecordId,
      targetRecordState: dto.targetRecordState,
      mandatoryRationale: dto.mandatoryRationale,
      timestamp: new Date().toISOString(),
      auditSeverity: 'HIGH_ALERT_AUDIT_LOGGED',
      flaggedForNationalHq: true,
    };

    this.overridesStore.set(override.id, override);
    this.logger.warn(`HIGH-ALERT: Emergency Jurisdiction Override executed by Officer ${officerId} (${officerState}) on record ${dto.targetRecordId} (${dto.targetRecordState}). Flagged for IGP & National HQ.`);
    return override;
  }

  // --- NATIONAL HQ OVERSIGHT MATRIX ---

  async getNationalHqOversight(): Promise<NationalHqStateOversightSummary[]> {
    const allRequests = Array.from(this.requestsStore.values());
    const allOverrides = Array.from(this.overridesStore.values());

    return NIGERIAN_STATES.map((state) => {
      const outgoing = allRequests.filter((r) => r.originatingState.toLowerCase() === state.toLowerCase());
      const incoming = allRequests.filter((r) => r.targetState.toLowerCase() === state.toLowerCase());
      const approved = incoming.filter((r) => r.status === InterStateRequestStatus.APPROVED).length;
      const rejected = incoming.filter((r) => r.status === InterStateRequestStatus.REJECTED).length;
      const overrides = allOverrides.filter((o) => o.officerState.toLowerCase() === state.toLowerCase() || o.targetRecordState.toLowerCase() === state.toLowerCase()).length;

      return {
        stateName: state,
        totalOutgoingRequests: outgoing.length,
        totalIncomingRequests: incoming.length,
        approvedCount: approved,
        rejectedCount: rejected,
        emergencyOverridesCount: overrides,
      };
    });
  }
}
