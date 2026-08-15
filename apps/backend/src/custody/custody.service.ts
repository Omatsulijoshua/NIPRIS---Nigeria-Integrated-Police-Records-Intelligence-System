import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateCustodyTransferDto } from './dto/create-custody-transfer.dto';
import { UpdateRemandStatusDto } from './dto/update-remand-status.dto';
import { RecordInmateMovementDto } from './dto/record-inmate-movement.dto';
import {
  CustodyTransferRecord,
  CellCapacityRecord,
  CellCapacityStatus,
  InmateMovementLogEntry,
  RemandStatus,
} from '@nipris/types';

@Injectable()
export class CustodyService {
  private readonly logger = new Logger(CustodyService.name);
  private readonly transfersStore = new Map<string, CustodyTransferRecord>();
  private readonly movementsStore: InmateMovementLogEntry[] = [];
  private readonly cellCapacitiesStore = new Map<string, CellCapacityRecord>();

  constructor() {
    this.seedDevelopmentCustodyData();
  }

  private seedDevelopmentCustodyData() {
    const seedFacility: CellCapacityRecord = {
      facilityId: 'fac-edo-benin-01',
      facilityName: 'Benin Central Station Police Custody Cells',
      state: 'Edo',
      designCapacity: 40,
      currentOccupancy: 36, // 90% -> Overcrowded Alert Triggered
      occupancyPercentage: 90.0,
      capacityStatus: CellCapacityStatus.OVERCROWDED_ALERT,
      overcrowdingAlertTriggered: true,
      lastUpdated: new Date().toISOString(),
    };
    this.cellCapacitiesStore.set(seedFacility.facilityId, seedFacility);

    const seedTransfer: CustodyTransferRecord = {
      id: 'trf_001',
      transferNumber: 'TRF-2026-NCOS-00812',
      inmatePersonId: 'person-chidi-001',
      inmateName: 'Chidi Okonkwo',
      originatingStation: 'Benin Central Station Cell B',
      targetNcosFacility: 'Nigerian Correctional Service (NCoS) Maximum Facility, Benin',
      remandWarrantNumber: 'RMW-2026-EDO-00912',
      transferringOfficerId: 'off-patrol-edo',
      receivingNcosOfficerId: 'NCOS-OFFICER-49102',
      remandStatus: RemandStatus.REMAND_PENDING_TRIAL,
      transferredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    this.transfersStore.set(seedTransfer.transferNumber, seedTransfer);
  }

  // --- NCOS CUSTODY TRANSFER API ---

  async transferCustody(dto: CreateCustodyTransferDto, officerId: string): Promise<CustodyTransferRecord> {
    const transferNumber = `TRF-2026-NCOS-${Math.floor(10000 + Math.random() * 90000)}`;

    const transfer: CustodyTransferRecord = {
      id: `trf_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      transferNumber,
      inmatePersonId: dto.inmatePersonId,
      inmateName: dto.inmateName,
      originatingStation: dto.originatingStation,
      targetNcosFacility: dto.targetNcosFacility,
      remandWarrantNumber: dto.remandWarrantNumber,
      transferringOfficerId: officerId,
      receivingNcosOfficerId: dto.receivingNcosOfficerId,
      remandStatus: dto.remandStatus,
      transferredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    this.transfersStore.set(transferNumber, transfer);
    this.logger.log(`Executed NCoS Custody Transfer ${transferNumber} for Inmate ${dto.inmateName}`);
    return transfer;
  }

  // --- REMAND WARRANT & SENTENCE TRACKER ---

  async updateRemandStatus(dto: UpdateRemandStatusDto): Promise<CustodyTransferRecord> {
    const trf = this.transfersStore.get(dto.transferNumber);
    if (!trf) throw new NotFoundException(`Custody Transfer '${dto.transferNumber}' not found.`);

    trf.remandStatus = dto.remandStatus;
    this.transfersStore.set(dto.transferNumber, trf);

    this.logger.log(`Updated Remand Status for Transfer ${dto.transferNumber} to ${dto.remandStatus}`);
    return trf;
  }

  // --- CELL CAPACITY & OVERCROWDING ALERT ENGINE ---

  async getCellCapacities(stateFilter?: string): Promise<CellCapacityRecord[]> {
    let list = Array.from(this.cellCapacitiesStore.values());
    if (stateFilter) {
      list = list.filter((c) => c.state.toLowerCase() === stateFilter.toLowerCase());
    }
    return list;
  }

  // --- INMATE MOVEMENT & TRANSPORT LEDGER ---

  async recordInmateMovement(dto: RecordInmateMovementDto): Promise<InmateMovementLogEntry> {
    const entry: InmateMovementLogEntry = {
      id: `mvt_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      inmatePersonId: dto.inmatePersonId,
      inmateName: dto.inmateName,
      movementType: dto.movementType,
      fromLocation: dto.fromLocation,
      toLocation: dto.toLocation,
      escortOfficerId: dto.escortOfficerId,
      transportVehicleSerial: dto.transportVehicleSerial,
      departureTime: new Date().toISOString(),
      status: 'IN_TRANSIT',
    };

    this.movementsStore.push(entry);
    this.logger.log(`Recorded Inmate Movement for ${dto.inmateName} (${dto.movementType}) from ${dto.fromLocation} to ${dto.toLocation}`);
    return entry;
  }

  async getAllTransfers(): Promise<CustodyTransferRecord[]> {
    return Array.from(this.transfersStore.values()).reverse();
  }

  async getAllMovements(): Promise<InmateMovementLogEntry[]> {
    return [...this.movementsStore].reverse();
  }
}
