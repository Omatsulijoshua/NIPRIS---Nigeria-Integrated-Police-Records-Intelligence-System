import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateStationProfileDto } from './dto/create-station-profile.dto';
import { CreateStationUnitDto } from './dto/create-station-unit.dto';
import { AssignStationOfficerDto } from './dto/assign-station-officer.dto';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { SearchDiaryEntriesDto } from './dto/search-diary-entries.dto';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { AssignComplaintDto } from './dto/assign-complaint.dto';
import { ConvertComplaintToIncidentDto } from './dto/convert-complaint-to-incident.dto';
import { CreateDutyShiftDto } from './dto/create-duty-shift.dto';
import { ClockInAttendanceDto } from './dto/clock-in-attendance.dto';
import { UpdateOfficerStatusDto } from './dto/update-officer-status.dto';
import { CreateCustodyIntakeDto } from './dto/create-custody-intake.dto';
import { IntakePersonPropertyDto } from './dto/intake-person-property.dto';
import { LogCustodyEventDto } from './dto/log-custody-event.dto';
import { ComplaintStatus, OfficerRole, OperationalStatus, OrgLevel, ShiftType } from '@nipris/types';

export interface StationProfileRecord {
  id: string;
  organizationId: string;
  stationCode: string;
  lga: string;
  address: string;
  phoneNumber: string;
  email?: string;
  commanderOfficerId?: string;
  holdingCellCapacity: number;
  latitude?: number;
  longitude?: number;
  operatingHours: string;
  createdAt: string;
  updatedAt: string;
}

export interface StationUnitRecord {
  id: string;
  stationId: string;
  name: string;
  code: string;
  description?: string;
  createdAt: string;
}

export interface StationOfficerAssignment {
  officerId: string;
  officerName: string;
  badgeNumber: string;
  rank: string;
  stationId: string;
  unitId?: string;
  unitName?: string;
  role: OfficerRole;
  assignedAt: string;
}

export interface StationOverviewMetrics {
  stationId: string;
  stationName: string;
  todayDate: string;
  officers: { onDuty: number; offDuty: number; onLeave: number; absent: number };
  incidents: { reportedToday: number; open: number; underInvestigation: number; closed: number };
  arrests: { today: number; thisWeek: number; thisMonth: number };
  custody: { currentlyDetained: number; capacityLimit: number; overcrowdingAlert: boolean; releasedToday: number; pendingTransfer: number };
  cases: { newCases: number; activeCases: number; pendingProsecution: number; closedCases: number };
  evidence: { receivedToday: number; pendingProcessing: number; inStorage: number; transferred: number };
  bodycams: { active: number; inactive: number; uploadPending: number; deviceError: number };
  vehicles: { available: number; inUse: number; patrol: number; maintenance: number };
  tasks: { todo: number; inProgress: number; blocked: number; completed: number };
}

export interface StationActivityItem {
  id: string;
  timestamp: string;
  category: 'INCIDENT' | 'ARREST' | 'EVIDENCE' | 'BODYCAM' | 'CUSTODY' | 'CASE' | 'WARRANT';
  title: string;
  actorName: string;
  actorBadge: string;
  details: string;
}

export interface StationAlertItem {
  id: string;
  severity: 'HIGH' | 'CRITICAL' | 'WARNING';
  category: string;
  title: string;
  description: string;
  timestamp: string;
}

export interface StationDiaryRecord {
  id: string;
  entryNumber: string;
  stationId: string;
  recordedAt: string;
  officerId: string;
  officerName: string;
  officerBadge: string;
  eventType: string;
  description: string;
  incidentId?: string;
  caseId?: string;
  personId?: string;
  vehicleId?: string;
  evidenceId?: string;
  attachments: string[];
  isImmutable: true;
  versionIndex: number;
  auditHistory: Array<{ timestamp: string; action: string; performedBy: string }>;
  createdAt: string;
}

export interface StationComplaintRecord {
  id: string;
  complaintNumber: string;
  stationId: string;
  receivedAt: string;
  complainantName: string;
  complainantPhone?: string;
  complainantPersonId?: string;
  originSource: string;
  category: string;
  description: string;
  locationName: string;
  receivingOfficerId: string;
  assignedOfficerId?: string;
  assignedOfficerName?: string;
  status: ComplaintStatus;
  resultingIncidentId?: string;
  resultingCaseId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DutyShiftRecord {
  id: string;
  stationId: string;
  shiftType: ShiftType;
  shiftName: string;
  startTime: string;
  endTime: string;
  createdAt: string;
}

export interface DutyRosterAssignmentRecord {
  id: string;
  shiftId: string;
  shiftName: string;
  stationId: string;
  officerId: string;
  officerName: string;
  badgeNumber: string;
  dutyDate: string;
  notes?: string;
}

export interface OfficerAttendanceRecord {
  id: string;
  officerId: string;
  officerName: string;
  stationId: string;
  clockInTimestamp: string;
  clockOutTimestamp?: string;
  operationalStatus: OperationalStatus;
  shiftId?: string;
  notes?: string;
}

export interface LocalCustodyRecord {
  id: string;
  custodyNumber: string;
  stationId: string;
  personId: string;
  personName: string;
  arrestId: string;
  cellId: string;
  intakeOfficerId: string;
  intakeTimestamp: string;
  reasonForDetention: string;
  medicalNote?: string;
  riskRating: string;
  custodyStatus: 'DETAINED' | 'RELEASED_ON_BAIL' | 'TRANSFERRED_TO_NCOS' | 'DISCHARGED';
  detentionDeadlineTimestamp: string;
  remandAlertTriggered: boolean;
  propertyVoucherId?: string;
  createdAt: string;
}

export interface PersonPropertyVoucherRecord {
  id: string;
  voucherNumber: string;
  custodyId: string;
  personId: string;
  intakeOfficerId: string;
  items: Array<{ description: string; category: string; condition: string; storageBin: string }>;
  isReturned: boolean;
  createdAt: string;
}

export interface CustodyEventRecord {
  id: string;
  custodyId: string;
  eventType: string;
  timestamp: string;
  officerId: string;
  details: string;
}

@Injectable()
export class StationService {
  private readonly logger = new Logger(StationService.name);
  private readonly profilesStore = new Map<string, StationProfileRecord>();
  private readonly unitsStore = new Map<string, StationUnitRecord[]>();
  private readonly officerAssignmentsStore = new Map<string, StationOfficerAssignment[]>();
  private readonly diaryStore = new Map<string, StationDiaryRecord[]>();
  private readonly complaintsStore = new Map<string, StationComplaintRecord[]>();
  private readonly shiftsStore = new Map<string, DutyShiftRecord[]>();
  private readonly rosterStore = new Map<string, DutyRosterAssignmentRecord[]>();
  private readonly attendanceStore = new Map<string, OfficerAttendanceRecord[]>();
  private readonly officerOperationalStatusStore = new Map<string, OperationalStatus>();
  private readonly custodyStore = new Map<string, LocalCustodyRecord[]>();
  private readonly propertyVoucherStore = new Map<string, PersonPropertyVoucherRecord>();
  private readonly custodyEventsStore = new Map<string, CustodyEventRecord[]>();

  constructor() {
    this.seedDevelopmentStationData();
  }

  private seedDevelopmentStationData() {
    const stationId = 'stn_edo_001';

    // Seed Profile
    const profile: StationProfileRecord = {
      id: 'prof_stn_edo_001',
      organizationId: stationId,
      stationCode: 'STN-EDO-BENIN-CENTRAL',
      lga: 'Oredo LGA',
      address: '1 Sapele Road, Benin City, Edo State',
      phoneNumber: '+234-803-000-1122',
      email: 'benin.central@police.gov.ng',
      commanderOfficerId: 'off_commander_edo',
      holdingCellCapacity: 20,
      latitude: 6.335,
      longitude: 5.603,
      operatingHours: '24/7',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.profilesStore.set(stationId, profile);

    // Seed Custody Record
    const custodyRecords: LocalCustodyRecord[] = [
      {
        id: 'lcd_001',
        custodyNumber: 'LCD-2026-STN001-00912',
        stationId,
        personId: 'per_edo_suspect_01',
        personName: 'Osagie Efe',
        arrestId: 'ARR-2026-EDO-00912',
        cellId: 'CELL-02',
        intakeOfficerId: 'off_desk_001',
        intakeTimestamp: new Date(Date.now() - 10 * 3600000).toISOString(),
        reasonForDetention: 'Suspected armed robbery suspect booked under section 312 PC.',
        medicalNote: 'No physical injuries.',
        riskRating: 'HIGH',
        custodyStatus: 'DETAINED',
        detentionDeadlineTimestamp: new Date(Date.now() + 14 * 3600000).toISOString(),
        remandAlertTriggered: false,
        propertyVoucherId: 'PROP-2026-STN001-00912',
        createdAt: new Date(Date.now() - 10 * 3600000).toISOString(),
      },
    ];
    this.custodyStore.set(stationId, custodyRecords);
  }

  // --- STATION PROFILE MANAGEMENT ---

  async createStationProfile(dto: CreateStationProfileDto): Promise<StationProfileRecord> {
    const record: StationProfileRecord = {
      id: `prof_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      organizationId: dto.organizationId,
      stationCode: dto.stationCode,
      lga: dto.lga,
      address: dto.address,
      phoneNumber: dto.phoneNumber,
      email: dto.email,
      commanderOfficerId: dto.commanderOfficerId,
      holdingCellCapacity: dto.holdingCellCapacity || 10,
      latitude: dto.latitude,
      longitude: dto.longitude,
      operatingHours: '24/7',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.profilesStore.set(dto.organizationId, record);
    this.logger.log(`Created Station Profile for Station Org ${dto.organizationId} (${dto.stationCode})`);
    return record;
  }

  async getStationProfile(stationId: string): Promise<StationProfileRecord> {
    const profile = this.profilesStore.get(stationId);
    if (!profile) {
      return {
        id: `prof_${stationId}`,
        organizationId: stationId,
        stationCode: 'STN-EDO-BENIN-CENTRAL',
        lga: 'Oredo LGA',
        address: '1 Sapele Road, Benin City, Edo State',
        phoneNumber: '+234-803-000-1122',
        holdingCellCapacity: 20,
        operatingHours: '24/7',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
    return profile;
  }

  // --- STATION UNITS MANAGEMENT ---

  async createStationUnit(dto: CreateStationUnitDto): Promise<StationUnitRecord> {
    const record: StationUnitRecord = {
      id: `unt_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      stationId: dto.stationId,
      name: dto.name,
      code: dto.code,
      description: dto.description,
      createdAt: new Date().toISOString(),
    };

    const existing = this.unitsStore.get(dto.stationId) || [];
    existing.push(record);
    this.unitsStore.set(dto.stationId, existing);

    this.logger.log(`Created Station Unit ${dto.code} for Station ${dto.stationId}`);
    return record;
  }

  async getStationUnits(stationId: string): Promise<StationUnitRecord[]> {
    return this.unitsStore.get(stationId) || [];
  }

  // --- OFFICER STATION & UNIT ASSIGNMENT ---

  async assignOfficerToStation(dto: AssignStationOfficerDto): Promise<StationOfficerAssignment> {
    const assignment: StationOfficerAssignment = {
      officerId: dto.officerId,
      officerName: 'Officer assigned',
      badgeNumber: `NPF-${Math.floor(10000 + Math.random() * 90000)}`,
      rank: 'Inspector of Police',
      stationId: dto.stationId,
      unitId: dto.unitId,
      role: dto.stationRole,
      assignedAt: new Date().toISOString(),
    };

    const existing = this.officerAssignmentsStore.get(dto.stationId) || [];
    existing.push(assignment);
    this.officerAssignmentsStore.set(dto.stationId, existing);

    this.logger.log(`Assigned Officer ${dto.officerId} to Station ${dto.stationId} (Role: ${dto.stationRole})`);
    return assignment;
  }

  async getStationOfficers(stationId: string): Promise<StationOfficerAssignment[]> {
    return this.officerAssignmentsStore.get(stationId) || [];
  }

  // --- STATION DASHBOARD & COMMAND CENTER METRICS ---

  async getStationOverviewMetrics(stationId: string): Promise<StationOverviewMetrics> {
    const profile = await this.getStationProfile(stationId);
    return {
      stationId,
      stationName: 'Benin Central Police Station',
      todayDate: new Date().toISOString().split('T')[0],
      officers: { onDuty: 14, offDuty: 8, onLeave: 2, absent: 0 },
      incidents: { reportedToday: 5, open: 3, underInvestigation: 4, closed: 12 },
      arrests: { today: 2, thisWeek: 11, thisMonth: 42 },
      custody: { currentlyDetained: 12, capacityLimit: profile.holdingCellCapacity, overcrowdingAlert: false, releasedToday: 3, pendingTransfer: 2 },
      cases: { newCases: 2, activeCases: 9, pendingProsecution: 3, closedCases: 28 },
      evidence: { receivedToday: 4, pendingProcessing: 2, inStorage: 87, transferred: 5 },
      bodycams: { active: 10, inactive: 4, uploadPending: 2, deviceError: 0 },
      vehicles: { available: 4, inUse: 3, patrol: 2, maintenance: 1 },
      tasks: { todo: 6, inProgress: 4, blocked: 1, completed: 18 },
    };
  }

  async getStationActivityFeed(stationId: string): Promise<StationActivityItem[]> {
    return [
      { id: 'act_001', timestamp: new Date(Date.now() - 5 * 60000).toISOString(), category: 'INCIDENT', title: 'New Incident Reported (INC-2026-EDO-00912)', actorName: 'Insp Grace Enagbare', actorBadge: 'NPF-94102', details: 'Armed robbery complaint at Ring Road, Benin City.' },
      { id: 'act_002', timestamp: new Date(Date.now() - 25 * 60000).toISOString(), category: 'ARREST', title: 'Arrest Record Created (ARR-2026-EDO-00912)', actorName: 'Sgt Monday Usifo', actorBadge: 'NPF-66120', details: 'Suspect booked for felony theft at Station Cell #2.' },
      { id: 'act_003', timestamp: new Date(Date.now() - 45 * 60000).toISOString(), category: 'EVIDENCE', title: 'Evidence Intake Sealed (EVD-2026-EDO-00912)', actorName: 'DSP Chidi Okonkwo', actorBadge: 'NPF-77319', details: 'Physical asset photograph & knife intake logged.' },
      { id: 'act_004', timestamp: new Date(Date.now() - 90 * 60000).toISOString(), category: 'BODYCAM', title: 'Bodycam Footage Uploaded (BWC-NPF-EDO-001)', actorName: 'Sgt Monday Usifo', actorBadge: 'NPF-66120', details: '45 mins shift footage uploaded to S3 evidence vault.' },
      { id: 'act_005', timestamp: new Date(Date.now() - 120 * 60000).toISOString(), category: 'CUSTODY', title: 'Custody Transfer Initiated (TRF-2026-NCOS-00812)', actorName: 'CSP Ibrahim Danjuma', actorBadge: 'NPF-88201', details: 'Inmate transferred to NCoS Remand Facility.' },
    ];
  }

  async getStationAlerts(stationId: string): Promise<StationAlertItem[]> {
    return [
      { id: 'alt_001', severity: 'HIGH', category: 'CUSTODY_DETENTION', title: 'Pending Remand Warrant Review', description: 'Inmate Osagie Efe custody detention review due within 2 hours.', timestamp: new Date().toISOString() },
      { id: 'alt_002', severity: 'CRITICAL', category: 'WARRANT_ALERT', title: 'High-Risk Wanted Person Match', description: 'Facial recognition candidate match flagged for Wanted Circular WAR-2026-EDO-00912.', timestamp: new Date().toISOString() },
      { id: 'alt_003', severity: 'WARNING', category: 'BODYCAM_COMPLIANCE', title: 'Bodycam Upload Pending', description: 'Device BWC-NPF-EDO-004 has 2 un-uploaded shift recordings.', timestamp: new Date().toISOString() },
    ];
  }

  // --- DIGITAL STATION DIARY SUBSYSTEM ---

  async createDiaryEntry(dto: CreateDiaryEntryDto): Promise<StationDiaryRecord> {
    const entryNumber = `SDE-2026-STN001-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toISOString();

    const record: StationDiaryRecord = {
      id: `sde_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      entryNumber,
      stationId: dto.stationId,
      recordedAt: now,
      officerId: dto.officerId,
      officerName: 'Insp Grace Enagbare',
      officerBadge: 'NPF-94102',
      eventType: dto.eventType,
      description: dto.description,
      incidentId: dto.incidentId,
      caseId: dto.caseId,
      personId: dto.personId,
      vehicleId: dto.vehicleId,
      evidenceId: dto.evidenceId,
      attachments: dto.attachments || [],
      isImmutable: true,
      versionIndex: 1,
      auditHistory: [{ timestamp: now, action: 'ENTRY_CREATED_IMMUTABLE', performedBy: `Officer ${dto.officerId}` }],
      createdAt: now,
    };

    const existing = this.diaryStore.get(dto.stationId) || [];
    existing.unshift(record);
    this.diaryStore.set(dto.stationId, existing);

    this.logger.log(`Created Immutable Digital Station Diary Entry ${entryNumber} (Event: ${dto.eventType})`);
    return record;
  }

  async getDiaryEntries(stationId: string): Promise<StationDiaryRecord[]> {
    return this.diaryStore.get(stationId) || [];
  }

  async searchDiaryEntries(stationId: string, dto: SearchDiaryEntriesDto): Promise<StationDiaryRecord[]> {
    const all = this.diaryStore.get(stationId) || [];
    return all.filter((entry) => {
      if (dto.eventType && entry.eventType !== dto.eventType) return false;
      if (dto.officerId && entry.officerId !== dto.officerId) return false;
      if (dto.searchQuery) {
        const query = dto.searchQuery.toLowerCase();
        const matchNumber = entry.entryNumber.toLowerCase().includes(query);
        const matchDesc = entry.description.toLowerCase().includes(query);
        return matchNumber || matchDesc;
      }
      return true;
    });
  }

  async getDiaryEntryTimeline(entryId: string) {
    for (const [, entries] of this.diaryStore.entries()) {
      const match = entries.find((e) => e.id === entryId || e.entryNumber === entryId);
      if (match) {
        return {
          entryId: match.id,
          entryNumber: match.entryNumber,
          isImmutable: match.isImmutable,
          versionIndex: match.versionIndex,
          auditHistory: match.auditHistory,
        };
      }
    }
    throw new NotFoundException(`Station Diary Entry ${entryId} not found`);
  }

  // --- STATION COMPLAINT MANAGEMENT SUBSYSTEM ---

  async createComplaint(dto: CreateComplaintDto): Promise<StationComplaintRecord> {
    const complaintNumber = `CMP-2026-STN001-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toISOString();

    const record: StationComplaintRecord = {
      id: `cmp_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      complaintNumber,
      stationId: dto.stationId,
      receivedAt: now,
      complainantName: dto.complainantName,
      complainantPhone: dto.complainantPhone,
      complainantPersonId: dto.complainantPersonId,
      originSource: dto.originSource,
      category: dto.category,
      description: dto.description,
      locationName: dto.locationName,
      receivingOfficerId: dto.receivingOfficerId,
      status: ComplaintStatus.NEW,
      createdAt: now,
      updatedAt: now,
    };

    const existing = this.complaintsStore.get(dto.stationId) || [];
    existing.unshift(record);
    this.complaintsStore.set(dto.stationId, existing);

    await this.createDiaryEntry({
      stationId: dto.stationId,
      officerId: dto.receivingOfficerId,
      eventType: 'COMPLAINT_RECEIVED',
      description: `Complaint ${complaintNumber} received from ${dto.complainantName}: ${dto.category}`,
    });

    this.logger.log(`Created Station Complaint ${complaintNumber} from ${dto.complainantName}`);
    return record;
  }

  async getStationComplaints(stationId: string): Promise<StationComplaintRecord[]> {
    return this.complaintsStore.get(stationId) || [];
  }

  async assignComplaint(dto: AssignComplaintDto): Promise<StationComplaintRecord> {
    for (const [, complaints] of this.complaintsStore.entries()) {
      const match = complaints.find((c) => c.id === dto.complaintId || c.complaintNumber === dto.complaintId);
      if (match) {
        match.assignedOfficerId = dto.assignedOfficerId;
        match.assignedOfficerName = 'DSP Chidi Okonkwo';
        match.status = ComplaintStatus.ASSIGNED;
        match.updatedAt = new Date().toISOString();
        this.logger.log(`Assigned Complaint ${match.complaintNumber} to Officer ${dto.assignedOfficerId}`);
        return match;
      }
    }
    throw new NotFoundException(`Complaint ${dto.complaintId} not found`);
  }

  async convertComplaintToIncident(dto: ConvertComplaintToIncidentDto): Promise<{ complaint: StationComplaintRecord; incidentNumber: string }> {
    for (const [, complaints] of this.complaintsStore.entries()) {
      const match = complaints.find((c) => c.id === dto.complaintId || c.complaintNumber === dto.complaintId);
      if (match) {
        const incidentNumber = `INC-2026-EDO-${Math.floor(10000 + Math.random() * 90000)}`;
        match.resultingIncidentId = incidentNumber;
        match.status = ComplaintStatus.CONVERTED_TO_INCIDENT;
        match.updatedAt = new Date().toISOString();

        this.logger.log(`Converted Complaint ${match.complaintNumber} to Incident ${incidentNumber}`);
        return { complaint: match, incidentNumber };
      }
    }
    throw new NotFoundException(`Complaint ${dto.complaintId} not found`);
  }

  async closeComplaint(complaintId: string, resolutionNotes: string): Promise<StationComplaintRecord> {
    for (const [, complaints] of this.complaintsStore.entries()) {
      const match = complaints.find((c) => c.id === complaintId || c.complaintNumber === complaintId);
      if (match) {
        match.status = ComplaintStatus.CLOSED;
        match.updatedAt = new Date().toISOString();
        this.logger.log(`Closed Complaint ${match.complaintNumber} without arrest: ${resolutionNotes}`);
        return match;
      }
    }
    throw new NotFoundException(`Complaint ${complaintId} not found`);
  }

  // --- DUTY SHIFTS & ROSTER SUBSYSTEM ---

  async createDutyShift(dto: CreateDutyShiftDto): Promise<DutyShiftRecord> {
    const record: DutyShiftRecord = {
      id: `sft_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      stationId: dto.stationId,
      shiftType: dto.shiftType,
      shiftName: dto.shiftName,
      startTime: dto.startTime,
      endTime: dto.endTime,
      createdAt: new Date().toISOString(),
    };

    const existing = this.shiftsStore.get(dto.stationId) || [];
    existing.push(record);
    this.shiftsStore.set(dto.stationId, existing);

    this.logger.log(`Created Station Duty Shift ${dto.shiftName} (${dto.startTime}-${dto.endTime})`);
    return record;
  }

  async getDutyShifts(stationId: string): Promise<DutyShiftRecord[]> {
    return this.shiftsStore.get(stationId) || [];
  }

  async getDutyRoster(stationId: string): Promise<DutyRosterAssignmentRecord[]> {
    return this.rosterStore.get(stationId) || [];
  }

  // --- OFFICER ATTENDANCE & OPERATIONAL STATUS ---

  async clockInOfficer(dto: ClockInAttendanceDto): Promise<OfficerAttendanceRecord> {
    const now = new Date().toISOString();
    const record: OfficerAttendanceRecord = {
      id: `att_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      officerId: dto.officerId,
      officerName: 'Insp Grace Enagbare',
      stationId: dto.stationId,
      clockInTimestamp: now,
      operationalStatus: dto.operationalStatus,
      shiftId: dto.shiftId,
      notes: dto.notes,
    };

    const existing = this.attendanceStore.get(dto.stationId) || [];
    existing.unshift(record);
    this.attendanceStore.set(dto.stationId, existing);

    this.officerOperationalStatusStore.set(dto.officerId, dto.operationalStatus);
    this.logger.log(`Officer ${dto.officerId} Clocked IN at Station ${dto.stationId} (Status: ${dto.operationalStatus})`);
    return record;
  }

  async clockOutOfficer(officerId: string, stationId: string): Promise<OfficerAttendanceRecord> {
    const records = this.attendanceStore.get(stationId) || [];
    const activeRecord = records.find((r) => r.officerId === officerId && !r.clockOutTimestamp);
    if (activeRecord) {
      activeRecord.clockOutTimestamp = new Date().toISOString();
      activeRecord.operationalStatus = OperationalStatus.OFF_DUTY;
      this.officerOperationalStatusStore.set(officerId, OperationalStatus.OFF_DUTY);
      this.logger.log(`Officer ${officerId} Clocked OUT from Station ${stationId}`);
      return activeRecord;
    }
    throw new NotFoundException(`Active Clock-in attendance record for Officer ${officerId} not found`);
  }

  async getAttendanceLogs(stationId: string): Promise<OfficerAttendanceRecord[]> {
    return this.attendanceStore.get(stationId) || [];
  }

  async updateOfficerOperationalStatus(dto: UpdateOfficerStatusDto) {
    this.officerOperationalStatusStore.set(dto.officerId, dto.operationalStatus);
    this.logger.log(`Updated Operational Status for Officer ${dto.officerId} -> ${dto.operationalStatus}`);
    return {
      officerId: dto.officerId,
      operationalStatus: dto.operationalStatus,
      updatedAt: new Date().toISOString(),
    };
  }

  // --- LOCAL STATION CUSTODY & PROPERTY INTAKE SUBSYSTEM ---

  async createCustodyIntake(dto: CreateCustodyIntakeDto): Promise<LocalCustodyRecord> {
    const profile = await this.getStationProfile(dto.stationId);
    const existingCustody = this.custodyStore.get(dto.stationId) || [];
    const activeDetained = existingCustody.filter((c) => c.custodyStatus === 'DETAINED').length;

    if (activeDetained >= profile.holdingCellCapacity) {
      this.logger.warn(`HOLDING CELL OVERCROWDING ALERT triggered for Station ${dto.stationId} (${activeDetained}/${profile.holdingCellCapacity})`);
    }

    const custodyNumber = `LCD-2026-STN001-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const limitHours = dto.detentionLimitHours || 24;
    const deadline = new Date(now.getTime() + limitHours * 3600000).toISOString();

    const record: LocalCustodyRecord = {
      id: `lcd_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      custodyNumber,
      stationId: dto.stationId,
      personId: dto.personId,
      personName: dto.personName,
      arrestId: dto.arrestId,
      cellId: dto.cellId,
      intakeOfficerId: dto.intakeOfficerId,
      intakeTimestamp: now.toISOString(),
      reasonForDetention: dto.reasonForDetention,
      medicalNote: dto.medicalNote,
      riskRating: dto.riskRating || 'MEDIUM',
      custodyStatus: 'DETAINED',
      detentionDeadlineTimestamp: deadline,
      remandAlertTriggered: false,
      createdAt: now.toISOString(),
    };

    existingCustody.unshift(record);
    this.custodyStore.set(dto.stationId, existingCustody);

    await this.createDiaryEntry({
      stationId: dto.stationId,
      officerId: dto.intakeOfficerId,
      eventType: 'ARREST_BOOKING',
      description: `Detainee ${dto.personName} booked into Cell ${dto.cellId} under Custody Record ${custodyNumber}.`,
    });

    this.logger.log(`Created Local Custody Record ${custodyNumber} for Detainee ${dto.personName} in Cell ${dto.cellId}`);
    return record;
  }

  async getStationCustodyList(stationId: string): Promise<LocalCustodyRecord[]> {
    return this.custodyStore.get(stationId) || [];
  }

  async intakePersonProperty(dto: IntakePersonPropertyDto): Promise<PersonPropertyVoucherRecord> {
    const voucherNumber = `PROP-2026-STN001-${Math.floor(10000 + Math.random() * 90000)}`;
    const record: PersonPropertyVoucherRecord = {
      id: `prop_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      voucherNumber,
      custodyId: dto.custodyId,
      personId: dto.personId,
      intakeOfficerId: dto.intakeOfficerId,
      items: dto.items,
      isReturned: false,
      createdAt: new Date().toISOString(),
    };

    this.propertyVoucherStore.set(dto.custodyId, record);

    for (const [, records] of this.custodyStore.entries()) {
      const match = records.find((c) => c.id === dto.custodyId);
      if (match) {
        match.propertyVoucherId = voucherNumber;
        break;
      }
    }

    this.logger.log(`Created Person Property Voucher ${voucherNumber} with ${dto.items.length} items.`);
    return record;
  }

  async getCustodyProperty(custodyId: string): Promise<PersonPropertyVoucherRecord> {
    const voucher = this.propertyVoucherStore.get(custodyId);
    if (!voucher) {
      return {
        id: `prop_${custodyId}`,
        voucherNumber: 'PROP-2026-STN001-00912',
        custodyId,
        personId: 'per_edo_suspect_01',
        intakeOfficerId: 'off_desk_001',
        items: [
          { description: 'iPhone 14 Pro Max Black', category: 'ELECTRONICS', condition: 'GOOD', storageBin: 'BIN-14-A' },
          { description: 'Leather Wallet with N12,500 Cash', category: 'CASH', condition: 'GOOD', storageBin: 'BIN-14-B' },
        ],
        isReturned: false,
        createdAt: new Date().toISOString(),
      };
    }
    return voucher;
  }

  async logCustodyEvent(dto: LogCustodyEventDto): Promise<CustodyEventRecord> {
    const record: CustodyEventRecord = {
      id: `evt_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      custodyId: dto.custodyId,
      eventType: dto.eventType,
      timestamp: new Date().toISOString(),
      officerId: dto.officerId,
      details: dto.details,
    };

    const existing = this.custodyEventsStore.get(dto.custodyId) || [];
    existing.unshift(record);
    this.custodyEventsStore.set(dto.custodyId, existing);

    this.logger.log(`Logged Custody Event ${dto.eventType} for Custody Record ${dto.custodyId}`);
    return record;
  }

  async getCustodyEvents(custodyId: string): Promise<CustodyEventRecord[]> {
    return this.custodyEventsStore.get(custodyId) || [];
  }

  async getCellOccupancyStatus(stationId: string) {
    const profile = await this.getStationProfile(stationId);
    const records = this.custodyStore.get(stationId) || [];
    const detained = records.filter((c) => c.custodyStatus === 'DETAINED').length;
    const isOvercrowded = detained > profile.holdingCellCapacity;

    return {
      stationId,
      capacityLimit: profile.holdingCellCapacity,
      currentlyDetained: detained,
      occupancyPercentage: Math.round((detained / profile.holdingCellCapacity) * 100),
      isOvercrowded,
      cells: [
        { cellId: 'CELL-01', capacity: 5, occupied: 4 },
        { cellId: 'CELL-02', capacity: 5, occupied: 3 },
        { cellId: 'CELL-03', capacity: 5, occupied: 3 },
        { cellId: 'CELL-04', capacity: 5, occupied: 2 },
      ],
    };
  }
}
