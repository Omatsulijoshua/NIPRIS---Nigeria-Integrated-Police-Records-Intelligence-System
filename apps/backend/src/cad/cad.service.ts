import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateCadIncidentDto } from './dto/create-cad-incident.dto';
import { UpdateUnitTelemetryDto } from './dto/update-unit-telemetry.dto';
import { DispatchUnitDto } from './dto/dispatch-unit.dto';
import {
  CadIncidentRecord,
  PatrolUnitTelemetry,
  RecommendedPatrolUnit,
  CadDispatchStatus,
  IncidentPriority,
} from '@nipris/types';

@Injectable()
export class CadService {
  private readonly logger = new Logger(CadService.name);
  private readonly cadIncidentsStore = new Map<string, CadIncidentRecord>();
  private readonly unitsTelemetryStore = new Map<string, PatrolUnitTelemetry>();

  constructor() {
    this.seedDevelopmentCadData();
  }

  private seedDevelopmentCadData() {
    // Seed active patrol unit telemetry
    const u1: PatrolUnitTelemetry = {
      unitId: 'unit-edo-patrol-01',
      unitCallsign: 'PATROL-EDO-101',
      assignedOfficerId: 'off-patrol-edo',
      assignedOfficerName: 'Insp. Emmanuel Okafor',
      state: 'Edo',
      dutyStatus: 'ON_PATROL',
      latitude: 6.338,
      longitude: 5.608,
      speedKmH: 45,
      lastTelemetryTimestamp: new Date().toISOString(),
    };
    const u2: PatrolUnitTelemetry = {
      unitId: 'unit-edo-patrol-02',
      unitCallsign: 'PATROL-EDO-102',
      assignedOfficerId: 'off-patrol-edo-2',
      assignedOfficerName: 'Sgt. Ibrahim Musa',
      state: 'Edo',
      dutyStatus: 'ON_PATROL',
      latitude: 6.450,
      longitude: 5.750,
      speedKmH: 60,
      lastTelemetryTimestamp: new Date().toISOString(),
    };
    this.unitsTelemetryStore.set(u1.unitId, u1);
    this.unitsTelemetryStore.set(u2.unitId, u2);

    // Seed CAD Incident
    const seedCad: CadIncidentRecord = {
      id: 'cad_001',
      cadIncidentNumber: 'CAD-2026-EDO-00912',
      title: 'Armed Hijacking & Vehicle Theft',
      category: 'ARMED_ROBBERY',
      priority: IncidentPriority.CRITICAL,
      locationName: 'Kilometer 42, Ore-Benin Expressway',
      state: 'Edo',
      latitude: 6.335,
      longitude: 5.603,
      status: CadDispatchStatus.QUEUED_FOR_DISPATCH,
      reportedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    this.cadIncidentsStore.set(seedCad.cadIncidentNumber, seedCad);
  }

  // --- HAVERSINE PROXIMITY CALCULATOR ---

  private calculateHaversineDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth radius in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 100) / 100;
  }

  // --- CAD INCIDENT QUEUE API ---

  async createCadIncident(dto: CreateCadIncidentDto): Promise<CadIncidentRecord> {
    const cadIncidentNumber = `CAD-2026-${dto.state.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const incident: CadIncidentRecord = {
      id: `cad_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      cadIncidentNumber,
      title: dto.title,
      category: dto.category,
      priority: dto.priority,
      locationName: dto.locationName,
      state: dto.state,
      latitude: dto.latitude,
      longitude: dto.longitude,
      status: CadDispatchStatus.QUEUED_FOR_DISPATCH,
      reportedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    this.cadIncidentsStore.set(cadIncidentNumber, incident);
    this.logger.log(`Created CAD Incident ${cadIncidentNumber} (${dto.title})`);
    return incident;
  }

  // --- TELEMETRY INGEST API ---

  async updateUnitTelemetry(dto: UpdateUnitTelemetryDto): Promise<PatrolUnitTelemetry> {
    const telemetry: PatrolUnitTelemetry = {
      unitId: dto.unitId,
      unitCallsign: dto.unitCallsign,
      assignedOfficerId: dto.assignedOfficerId,
      assignedOfficerName: dto.assignedOfficerName,
      state: dto.state,
      dutyStatus: dto.dutyStatus,
      latitude: dto.latitude,
      longitude: dto.longitude,
      speedKmH: dto.speedKmH,
      lastTelemetryTimestamp: new Date().toISOString(),
    };

    this.unitsTelemetryStore.set(dto.unitId, telemetry);
    return telemetry;
  }

  // --- PROXIMITY-BASED NEAREST PATROL UNIT RECOMMENDER ---

  async recommendNearestUnits(cadIncidentNumber: string): Promise<RecommendedPatrolUnit[]> {
    const incident = this.cadIncidentsStore.get(cadIncidentNumber);
    if (!incident) throw new NotFoundException(`CAD Incident '${cadIncidentNumber}' not found.`);

    const recommendations: RecommendedPatrolUnit[] = [];

    this.unitsTelemetryStore.forEach((unit) => {
      if (unit.state.toLowerCase() === incident.state.toLowerCase()) {
        const distance = this.calculateHaversineDistanceKm(
          incident.latitude,
          incident.longitude,
          unit.latitude,
          unit.longitude,
        );
        // Estimate arrival time assuming average 60km/h response speed
        const etaMinutes = Math.max(1, Math.round((distance / 60) * 60));

        recommendations.push({
          unitId: unit.unitId,
          unitCallsign: unit.unitCallsign,
          assignedOfficerName: unit.assignedOfficerName,
          distanceKm: distance,
          dutyStatus: unit.dutyStatus,
          estimatedArrivalMinutes: etaMinutes,
        });
      }
    });

    return recommendations.sort((a, b) => a.distanceKm - b.distanceKm);
  }

  // --- AUTOMATED UNIT DISPATCHER ---

  async dispatchUnit(dto: DispatchUnitDto): Promise<CadIncidentRecord> {
    const incident = this.cadIncidentsStore.get(dto.cadIncidentNumber);
    if (!incident) throw new NotFoundException(`CAD Incident '${dto.cadIncidentNumber}' not found.`);

    const unit = this.unitsTelemetryStore.get(dto.unitId);
    if (!unit) throw new NotFoundException(`Patrol Unit '${dto.unitId}' not found.`);

    // Update unit status to RESPONDING
    unit.dutyStatus = 'RESPONDING';
    this.unitsTelemetryStore.set(unit.unitId, unit);

    // Update CAD incident record
    incident.dispatchedUnitId = unit.unitId;
    incident.dispatchedUnitCallsign = unit.unitCallsign;
    incident.dispatchedAt = new Date().toISOString();
    incident.status = CadDispatchStatus.PATROL_EN_ROUTE;

    this.cadIncidentsStore.set(incident.cadIncidentNumber, incident);
    this.logger.log(`Dispatched Unit ${unit.unitCallsign} to CAD Incident ${incident.cadIncidentNumber}`);
    return incident;
  }

  // --- GET ALL ACTIVE TELEMETRY & INCIDENTS ---

  async getAllActiveUnits(): Promise<PatrolUnitTelemetry[]> {
    return Array.from(this.unitsTelemetryStore.values());
  }

  async getAllCadIncidents(): Promise<CadIncidentRecord[]> {
    return Array.from(this.cadIncidentsStore.values()).reverse();
  }
}
