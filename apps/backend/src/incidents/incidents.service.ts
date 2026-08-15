import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { AssignOfficersDto } from './dto/assign-officers.dto';
import { UpdateIncidentStatusDto } from './dto/update-status.dto';
import { LinkIncidentPersonDto } from './dto/link-person.dto';
import {
  IncidentRecord,
  IncidentStatus,
  ClassificationLevel,
  IncidentTimelineEvent,
} from '@nipris/types';
import { PersonsService } from '../persons/persons.service';

@Injectable()
export class IncidentsService {
  private readonly logger = new Logger(IncidentsService.name);
  private readonly incidentsStore = new Map<string, IncidentRecord>();

  constructor(private readonly personsService: PersonsService) {
    this.seedDevelopmentIncidents();
  }

  private seedDevelopmentIncidents() {
    const seedIncident: IncidentRecord = {
      id: 'inc-edo-001',
      incidentNumber: 'INC-2026-EDO-00101',
      title: 'Armed Robbery at Commercial Bank Branch',
      description: 'Four armed suspects breached the main vault area taking cash reserves.',
      incidentType: 'Armed Robbery',
      locationName: 'Ring Road, Benin City, Edo State',
      latitude: 6.335,
      longitude: 5.603,
      occurredAt: new Date().toISOString(),
      reportingOfficerId: 'off-patrol-edo',
      assignedOfficerIds: ['off-patrol-edo'],
      status: IncidentStatus.UNDER_INVESTIGATION,
      priority: 'CRITICAL' as any,
      classification: ClassificationLevel.LAW_ENFORCEMENT_RESTRICTED,
      persons: [
        {
          id: 'link-001',
          personId: 'person-chidi-001',
          personName: 'Chidi Okonkwo',
          roleInIncident: 'SUSPECT' as any,
          notes: 'Identified via bank CCTV footage',
        },
      ],
      timeline: [
        {
          id: 'tl-001',
          action: 'INCIDENT_REPORTED',
          performedBy: 'off-patrol-edo',
          newState: IncidentStatus.REPORTED,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          details: 'Initial emergency response dispatch logged',
        },
        {
          id: 'tl-002',
          action: 'STATUS_CHANGE',
          performedBy: 'off-patrol-edo',
          previousState: IncidentStatus.REPORTED,
          newState: IncidentStatus.UNDER_INVESTIGATION,
          timestamp: new Date().toISOString(),
          details: 'CID Detectives dispatched to scene. Forensic evidence secured.',
        },
      ],
      reports: [
        {
          id: 'rep-001',
          officerId: 'off-patrol-edo',
          reportText: 'Arrived on scene at 10:15 AM. Perimeter established. No active hostage situation.',
          timestamp: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.incidentsStore.set(seedIncident.id, seedIncident);
  }

  async createIncident(dto: CreateIncidentDto, reportingOfficerId: string): Promise<IncidentRecord> {
    const incidentNumber = `INC-2026-${Math.floor(100 + Math.random() * 900)}-${Math.floor(10000 + Math.random() * 90000)}`;
    const newIncident: IncidentRecord = {
      id: `inc_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      incidentNumber,
      title: dto.title,
      description: dto.description,
      incidentType: dto.incidentType,
      locationName: dto.locationName,
      latitude: dto.latitude,
      longitude: dto.longitude,
      occurredAt: dto.occurredAt,
      reportingOfficerId,
      assignedOfficerIds: [reportingOfficerId],
      status: IncidentStatus.REPORTED,
      priority: dto.priority,
      classification: dto.classification || ClassificationLevel.LAW_ENFORCEMENT_RESTRICTED,
      persons: [],
      timeline: [
        {
          id: `tl_${Date.now()}`,
          action: 'INCIDENT_REPORTED',
          performedBy: reportingOfficerId,
          newState: IncidentStatus.REPORTED,
          timestamp: new Date().toISOString(),
          details: 'Incident reported into NIPRIS gateway.',
        },
      ],
      reports: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.incidentsStore.set(newIncident.id, newIncident);
    this.logger.log(`Incident logged: ${newIncident.incidentNumber} (${newIncident.title})`);
    return newIncident;
  }

  async getAllIncidents(status?: IncidentStatus, incidentType?: string): Promise<IncidentRecord[]> {
    let list = Array.from(this.incidentsStore.values());
    if (status) {
      list = list.filter((i) => i.status === status);
    }
    if (incidentType) {
      list = list.filter((i) => i.incidentType.toLowerCase() === incidentType.toLowerCase());
    }
    return list;
  }

  async getIncidentById(id: string): Promise<IncidentRecord> {
    const incident = this.incidentsStore.get(id);
    if (!incident) throw new NotFoundException(`Incident with ID '${id}' not found.`);
    return incident;
  }

  async assignOfficers(id: string, dto: AssignOfficersDto, officerId: string): Promise<IncidentRecord> {
    const incident = await this.getIncidentById(id);
    incident.assignedOfficerIds = Array.from(new Set([...incident.assignedOfficerIds, ...dto.officerIds]));
    
    incident.timeline.push({
      id: `tl_${Date.now()}`,
      action: 'OFFICERS_ASSIGNED',
      performedBy: officerId,
      timestamp: new Date().toISOString(),
      details: `Officers assigned: ${dto.officerIds.join(', ')}`,
    });

    incident.updatedAt = new Date().toISOString();
    this.incidentsStore.set(id, incident);
    this.logger.log(`Assigned officers to ${incident.incidentNumber}`);
    return incident;
  }

  async updateStatus(id: string, dto: UpdateIncidentStatusDto, officerId: string): Promise<IncidentRecord> {
    const incident = await this.getIncidentById(id);
    const previousState = incident.status;
    incident.status = dto.status;

    incident.timeline.push({
      id: `tl_${Date.now()}`,
      action: 'STATUS_TRANSITION',
      performedBy: officerId,
      previousState,
      newState: dto.status,
      timestamp: new Date().toISOString(),
      details: dto.statusReason,
    });

    incident.updatedAt = new Date().toISOString();
    this.incidentsStore.set(id, incident);
    this.logger.warn(`Incident ${incident.incidentNumber} status changed: ${previousState} -> ${dto.status}`);
    return incident;
  }

  async linkPerson(id: string, dto: LinkIncidentPersonDto, officerId: string): Promise<IncidentRecord> {
    const incident = await this.getIncidentById(id);
    const person = await this.personsService.getPersonById(dto.personId);

    const linkRecord = {
      id: `link_${Date.now()}`,
      personId: person.id,
      personName: `${person.firstName} ${person.lastName}`,
      roleInIncident: dto.roleInIncident,
      notes: dto.notes,
    };

    incident.persons.push(linkRecord);
    incident.timeline.push({
      id: `tl_${Date.now()}`,
      action: 'PERSON_LINKED',
      performedBy: officerId,
      timestamp: new Date().toISOString(),
      details: `Person '${person.firstName} ${person.lastName}' linked as ${dto.roleInIncident}`,
    });

    incident.updatedAt = new Date().toISOString();
    this.incidentsStore.set(id, incident);
    this.logger.log(`Linked person ${person.id} to incident ${incident.incidentNumber}`);
    return incident;
  }

  async addReport(id: string, reportText: string, officerId: string): Promise<IncidentRecord> {
    const incident = await this.getIncidentById(id);
    incident.reports.push({
      id: `rep_${Date.now()}`,
      officerId,
      reportText,
      timestamp: new Date().toISOString(),
    });

    incident.updatedAt = new Date().toISOString();
    this.incidentsStore.set(id, incident);
    this.logger.log(`Field report added to ${incident.incidentNumber}`);
    return incident;
  }
}
