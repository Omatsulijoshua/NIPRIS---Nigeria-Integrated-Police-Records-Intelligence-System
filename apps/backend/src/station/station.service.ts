import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateStationProfileDto } from './dto/create-station-profile.dto';
import { CreateStationUnitDto } from './dto/create-station-unit.dto';
import { AssignStationOfficerDto } from './dto/assign-station-officer.dto';
import { OfficerRole, OrgLevel } from '@nipris/types';

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

@Injectable()
export class StationService {
  private readonly logger = new Logger(StationService.name);
  private readonly profilesStore = new Map<string, StationProfileRecord>();
  private readonly unitsStore = new Map<string, StationUnitRecord[]>();
  private readonly officerAssignmentsStore = new Map<string, StationOfficerAssignment[]>();

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

    // Seed Units
    const units: StationUnitRecord[] = [
      { id: 'unt_patrol_01', stationId, name: 'General Patrol & Response Unit', code: 'UNT-PATROL-01', description: '24/7 Rapid response patrol team', createdAt: new Date().toISOString() },
      { id: 'unt_cid_01', stationId, name: 'Criminal Investigation Department (CID)', code: 'UNT-CID-01', description: 'Investigative detectives & forensics', createdAt: new Date().toISOString() },
      { id: 'unt_desk_01', stationId, name: 'Station Counter & Desk Guard', code: 'UNT-DESK-01', description: 'Public intake, complaint desk, & station diary', createdAt: new Date().toISOString() },
      { id: 'unt_traffic_01', stationId, name: 'Traffic Management Unit', code: 'UNT-TRAFFIC-01', description: 'Traffic control & vehicular incident response', createdAt: new Date().toISOString() },
    ];
    this.unitsStore.set(stationId, units);

    // Seed Officer Assignments
    const officers: StationOfficerAssignment[] = [
      { officerId: 'off_commander_edo', officerName: 'CSP Ibrahim Danjuma', badgeNumber: 'NPF-88201', rank: 'Chief Superintendent of Police (CSP)', stationId, role: OfficerRole.STATION_COMMANDER, assignedAt: new Date().toISOString() },
      { officerId: 'off_desk_001', officerName: 'Insp Grace Enagbare', badgeNumber: 'NPF-94102', rank: 'Inspector of Police', stationId, unitId: 'unt_desk_01', unitName: 'Station Counter & Desk Guard', role: OfficerRole.DESK_OFFICER, assignedAt: new Date().toISOString() },
      { officerId: 'off_cid_001', officerName: 'DSP Chidi Okonkwo', badgeNumber: 'NPF-77319', rank: 'Deputy Superintendent of Police (DSP)', stationId, unitId: 'unt_cid_01', unitName: 'Criminal Investigation Department (CID)', role: OfficerRole.INVESTIGATING_OFFICER, assignedAt: new Date().toISOString() },
      { officerId: 'off_patrol_001', officerName: 'Sgt Monday Usifo', badgeNumber: 'NPF-66120', rank: 'Sergeant', stationId, unitId: 'unt_patrol_01', unitName: 'General Patrol & Response Unit', role: OfficerRole.PATROL_OFFICER, assignedAt: new Date().toISOString() },
    ];
    this.officerAssignmentsStore.set(stationId, officers);
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
        holdingCellCapacity: 15,
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
}
