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
      // Fallback default
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
}
