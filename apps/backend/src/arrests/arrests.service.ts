import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateArrestDto } from './dto/create-arrest.dto';
import { UpdateLegalStatusDto } from './dto/update-legal-status.dto';
import { UpdateBailDto } from './dto/update-bail.dto';
import {
  ArrestRecord,
  LegalStatus,
  CustodyStatus,
  BailStatus,
} from '@nipris/types';
import { PersonsService } from '../persons/persons.service';

@Injectable()
export class ArrestsService {
  private readonly logger = new Logger(ArrestsService.name);
  private readonly arrestsStore = new Map<string, ArrestRecord>();

  constructor(private readonly personsService: PersonsService) {
    this.seedDevelopmentArrests();
  }

  private seedDevelopmentArrests() {
    const seedArrest: ArrestRecord = {
      id: 'arr-edo-001',
      arrestNumber: 'ARR-2026-EDO-00812',
      personId: 'person-chidi-001',
      personName: 'Chidi Okonkwo',
      incidentId: 'inc-edo-001',
      arrestingOfficerId: 'off-patrol-edo',
      arrestingStationId: 'org-edo-station-a',
      state: 'Edo',
      arrestedAt: new Date().toISOString(),
      location: 'Ring Road Financial District, Benin City',
      legalBasis: 'Reasonable suspicion and armed robbery warrant execution',
      charges: ['Armed Robbery (Section 402 Criminal Code)', 'Illegal Possession of Firearms'],
      custodyStatus: CustodyStatus.IN_CUSTODY,
      bailStatus: BailStatus.BAIL_PENDING,
      legalStatus: LegalStatus.CHARGE,
      custodyLocation: 'Benin Central Station Lockup Cell 3',
      caseReference: 'CR/2026/BENIN/881',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.arrestsStore.set(seedArrest.id, seedArrest);
  }

  async createArrest(dto: CreateArrestDto, arrestingOfficerId: string): Promise<ArrestRecord> {
    const person = await this.personsService.getPersonById(dto.personId);
    const stateCode = dto.state.toUpperCase().substring(0, 5);
    const arrestNumber = `ARR-2026-${stateCode}-${Math.floor(10000 + Math.random() * 90000)}`;

    const newArrest: ArrestRecord = {
      id: `arr_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      arrestNumber,
      personId: person.id,
      personName: `${person.firstName} ${person.lastName}`,
      incidentId: dto.incidentId,
      arrestingOfficerId,
      arrestingStationId: dto.arrestingStationId,
      state: dto.state,
      arrestedAt: dto.arrestedAt,
      location: dto.location,
      legalBasis: dto.legalBasis,
      charges: dto.charges,
      custodyStatus: CustodyStatus.IN_CUSTODY,
      bailStatus: BailStatus.BAIL_PENDING,
      legalStatus: LegalStatus.ARREST, // Default Legal Status is ARREST (Never CONVICTION!)
      custodyLocation: dto.custodyLocation,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.arrestsStore.set(newArrest.id, newArrest);
    this.logger.log(`Created Arrest Record: ${newArrest.arrestNumber} for Person ${person.firstName} ${person.lastName}`);
    return newArrest;
  }

  async getAllArrests(state?: string, legalStatus?: LegalStatus, custodyStatus?: CustodyStatus): Promise<ArrestRecord[]> {
    let list = Array.from(this.arrestsStore.values());
    if (state) {
      list = list.filter((a) => a.state.toLowerCase() === state.toLowerCase());
    }
    if (legalStatus) {
      list = list.filter((a) => a.legalStatus === legalStatus);
    }
    if (custodyStatus) {
      list = list.filter((a) => a.custodyStatus === custodyStatus);
    }
    return list;
  }

  async getArrestById(id: string): Promise<ArrestRecord> {
    const arrest = this.arrestsStore.get(id);
    if (!arrest) throw new NotFoundException(`Arrest Record with ID '${id}' not found.`);
    return arrest;
  }

  async updateLegalStatus(id: string, dto: UpdateLegalStatusDto): Promise<ArrestRecord> {
    const arrest = await this.getArrestById(id);
    const previousStatus = arrest.legalStatus;
    arrest.legalStatus = dto.legalStatus;
    if (dto.caseReference) {
      arrest.caseReference = dto.caseReference;
    }
    arrest.updatedAt = new Date().toISOString();
    this.arrestsStore.set(id, arrest);
    this.logger.warn(`Arrest ${arrest.arrestNumber} Legal Status updated: ${previousStatus} -> ${dto.legalStatus} (${dto.statusReason})`);
    return arrest;
  }

  async updateBailStatus(id: string, dto: UpdateBailDto): Promise<ArrestRecord> {
    const arrest = await this.getArrestById(id);
    arrest.bailStatus = dto.bailStatus;
    arrest.custodyStatus = dto.custodyStatus;
    if (dto.releaseDate) {
      arrest.releaseDate = dto.releaseDate;
    }
    arrest.updatedAt = new Date().toISOString();
    this.arrestsStore.set(id, arrest);
    this.logger.log(`Arrest ${arrest.arrestNumber} Bail updated: ${dto.bailStatus} / Custody: ${dto.custodyStatus}`);
    return arrest;
  }
}
