import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateWarrantDto } from './dto/create-warrant.dto';
import { ExecuteWarrantDto } from './dto/execute-warrant.dto';
import { CreateWantedDto } from './dto/create-wanted.dto';
import {
  WarrantRecord,
  WarrantStatus,
  WarrantType,
  WantedPersonRecord,
  WantedStatus,
} from '@nipris/types';
import { PersonsService } from '../persons/persons.service';

@Injectable()
export class WarrantsService {
  private readonly logger = new Logger(WarrantsService.name);
  private readonly warrantsStore = new Map<string, WarrantRecord>();
  private readonly wantedStore = new Map<string, WantedPersonRecord>();

  constructor(private readonly personsService: PersonsService) {
    this.seedDevelopmentWarrants();
  }

  private seedDevelopmentWarrants() {
    const seedWarrant: WarrantRecord = {
      id: 'war-edo-001',
      warrantNumber: 'WAR-2026-EDO-00412',
      warrantType: WarrantType.ARREST_WARRANT,
      targetPersonId: 'person-chidi-001',
      targetPersonName: 'Chidi Okonkwo',
      caseId: 'cas-edo-001',
      incidentId: 'inc-edo-001',
      judicialAuthority: {
        issuingJudgeName: 'Hon. Justice O. E. Nwachukwu',
        courtName: 'High Court 3, Benin Judicial Division',
        jurisdiction: 'Edo State Judicial Division',
        courtSealNumber: 'HCB/SEAL/2026/09912',
      },
      offenseAllegations: 'Armed Robbery at Commercial Bank (Section 402 Criminal Code)',
      issueDate: new Date().toISOString(),
      expirationDate: new Date(Date.now() + 7776000000).toISOString(), // +90 days
      status: WarrantStatus.ACTIVE,
      state: 'Edo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.warrantsStore.set(seedWarrant.id, seedWarrant);

    const seedWanted: WantedPersonRecord = {
      id: 'wnt-edo-001',
      personId: 'person-chidi-001',
      personName: 'Chidi Okonkwo',
      photoUrl: 'https://s3.nipris.gov.ng/photos/person-chidi.jpg',
      caseId: 'cas-edo-001',
      warrantIds: ['war-edo-001'],
      riskLevel: 'ARMED_AND_DANGEROUS' as any,
      bountyAmount: 5000000,
      publicCircular: false,
      status: WantedStatus.ACTIVE,
      remarks: 'Suspect believed to be armed with automatic rifles. Approach with extreme caution.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.wantedStore.set(seedWanted.id, seedWanted);
  }

  async createWarrant(dto: CreateWarrantDto): Promise<WarrantRecord> {
    const person = await this.personsService.getPersonById(dto.targetPersonId);
    const stateCode = dto.state.toUpperCase().substring(0, 5);
    const warrantNumber = `WAR-2026-${stateCode}-${Math.floor(10000 + Math.random() * 90000)}`;

    const newWarrant: WarrantRecord = {
      id: `war_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      warrantNumber,
      warrantType: dto.warrantType,
      targetPersonId: person.id,
      targetPersonName: `${person.firstName} ${person.lastName}`,
      caseId: dto.caseId,
      incidentId: dto.incidentId,
      judicialAuthority: dto.judicialAuthority,
      offenseAllegations: dto.offenseAllegations,
      issueDate: dto.issueDate,
      expirationDate: dto.expirationDate,
      status: WarrantStatus.ACTIVE,
      state: dto.state,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.warrantsStore.set(newWarrant.id, newWarrant);
    this.logger.log(`Issued Court Warrant ${newWarrant.warrantNumber} by Judge ${dto.judicialAuthority.issuingJudgeName}`);
    return newWarrant;
  }

  async getAllWarrants(type?: WarrantType, status?: WarrantStatus, state?: string): Promise<WarrantRecord[]> {
    let list = Array.from(this.warrantsStore.values());

    // Evaluate Expiry at runtime
    const now = new Date();
    list.forEach((w) => {
      if (w.status === WarrantStatus.ACTIVE && new Date(w.expirationDate) < now) {
        w.status = WarrantStatus.EXPIRED;
      }
    });

    if (type) list = list.filter((w) => w.warrantType === type);
    if (status) list = list.filter((w) => w.status === status);
    if (state) list = list.filter((w) => w.state.toLowerCase() === state.toLowerCase());

    return list;
  }

  async getWarrantById(id: string): Promise<WarrantRecord> {
    const warrant = this.warrantsStore.get(id);
    if (!warrant) throw new NotFoundException(`Warrant Record with ID '${id}' not found.`);
    
    // Check Expiry
    if (warrant.status === WarrantStatus.ACTIVE && new Date(warrant.expirationDate) < new Date()) {
      warrant.status = WarrantStatus.EXPIRED;
    }
    return warrant;
  }

  async executeWarrant(id: string, dto: ExecuteWarrantDto, officerId: string): Promise<WarrantRecord> {
    const warrant = await this.getWarrantById(id);
    warrant.status = WarrantStatus.EXECUTED;
    warrant.executingOfficerId = officerId;
    warrant.executedAt = dto.executedAt;
    warrant.executionLocation = dto.executionLocation;
    warrant.updatedAt = new Date().toISOString();

    this.warrantsStore.set(id, warrant);
    this.logger.log(`Warrant ${warrant.warrantNumber} EXECUTED by Officer ${officerId} at ${dto.executionLocation}`);
    return warrant;
  }

  async updateWarrantStatus(id: string, status: WarrantStatus): Promise<WarrantRecord> {
    const warrant = await this.getWarrantById(id);
    warrant.status = status;
    warrant.updatedAt = new Date().toISOString();
    this.warrantsStore.set(id, warrant);
    this.logger.warn(`Warrant ${warrant.warrantNumber} status updated to ${status}`);
    return warrant;
  }

  // --- WANTED PERSONS BULLETIN ---

  async createWantedPerson(dto: CreateWantedDto): Promise<WantedPersonRecord> {
    const person = await this.personsService.getPersonById(dto.personId);

    const newWanted: WantedPersonRecord = {
      id: `wnt_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      personId: person.id,
      personName: `${person.firstName} ${person.lastName}`,
      photoUrl: person.photoUrl,
      caseId: dto.caseId,
      warrantIds: dto.warrantIds,
      riskLevel: dto.riskLevel,
      bountyAmount: dto.bountyAmount,
      publicCircular: dto.publicCircular,
      status: WantedStatus.ACTIVE,
      remarks: dto.remarks,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.wantedStore.set(newWanted.id, newWanted);
    this.logger.log(`Registered Wanted Person: ${newWanted.personName} (Risk: ${newWanted.riskLevel})`);
    return newWanted;
  }

  async getAllWantedPersons(status?: WantedStatus): Promise<WantedPersonRecord[]> {
    let list = Array.from(this.wantedStore.values());
    if (status) list = list.filter((w) => w.status === status);
    return list;
  }

  async updateWantedStatus(id: string, status: WantedStatus): Promise<WantedPersonRecord> {
    const wanted = this.wantedStore.get(id);
    if (!wanted) throw new NotFoundException(`Wanted Person Record '${id}' not found.`);
    wanted.status = status;
    wanted.updatedAt = new Date().toISOString();
    this.wantedStore.set(id, wanted);
    this.logger.log(`Wanted Person ${wanted.personName} status updated to ${status}`);
    return wanted;
  }
}
