import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreatePublicCrimeTipDto } from './dto/create-public-crime-tip.dto';
import { ApplyPccDto } from './dto/apply-pcc.dto';
import { LookupStolenVehicleDto } from './dto/lookup-stolen-vehicle.dto';
import {
  PublicCrimeTipRecord,
  PccApplicationRecord,
  StolenVehicleLookupResult,
  PccStatus,
  StolenVehicleStatus,
  WantedPersonRecord,
  WantedRiskLevel,
  WantedStatus,
} from '@nipris/types';

@Injectable()
export class PublicServicesService {
  private readonly logger = new Logger(PublicServicesService.name);
  private readonly tipsStore = new Map<string, PublicCrimeTipRecord>();
  private readonly pccApplicationsStore = new Map<string, PccApplicationRecord>();

  constructor() {
    this.seedDevelopmentPublicData();
  }

  private seedDevelopmentPublicData() {
    const seedPcc: PccApplicationRecord = {
      id: 'pcc_001',
      trackingNumber: 'PCC-2026-NPF-00912',
      formNPF11Code: 'FORM_NPF_11_CHARACTER_CLEARANCE_2026',
      applicantNin: '10928374829',
      applicantName: 'Chidi Okonkwo',
      email: 'chidi.okonkwo@test.local',
      phoneNumber: '+2348012345678',
      purpose: 'International Employment Visa & Background Clearance',
      status: PccStatus.BACKGROUND_CHECK_IN_PROGRESS,
      hasCriminalRecord: false,
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.pccApplicationsStore.set(seedPcc.trackingNumber, seedPcc);
  }

  // --- CRIME TIP INTAKE ---

  async submitCrimeTip(dto: CreatePublicCrimeTipDto): Promise<PublicCrimeTipRecord> {
    const tipReferenceNumber = `TIP-2026-${dto.state.toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const tipRecord: PublicCrimeTipRecord = {
      id: `tip_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      tipReferenceNumber,
      isAnonymous: dto.isAnonymous,
      reporterNin: dto.isAnonymous ? undefined : dto.reporterNin,
      reporterName: dto.isAnonymous ? undefined : dto.reporterName,
      reporterPhone: dto.isAnonymous ? undefined : dto.reporterPhone,
      category: dto.category,
      narrative: dto.narrative,
      locationName: dto.locationName,
      state: dto.state,
      latitude: dto.latitude,
      longitude: dto.longitude,
      mediaAttachmentUrls: dto.mediaAttachmentUrls || [],
      submittedAt: new Date().toISOString(),
    };

    this.tipsStore.set(tipReferenceNumber, tipRecord);
    this.logger.log(`Received Public Crime Tip ${tipReferenceNumber} (Anonymous: ${dto.isAnonymous})`);
    return tipRecord;
  }

  // --- POLICE CLEARANCE CERTIFICATE (PCC FORM NPF 11) ENGINE ---

  async applyForPcc(dto: ApplyPccDto): Promise<PccApplicationRecord> {
    const trackingNumber = `PCC-2026-NPF-${Math.floor(10000 + Math.random() * 90000)}`;

    const pccRecord: PccApplicationRecord = {
      id: `pcc_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      trackingNumber,
      formNPF11Code: 'FORM_NPF_11_CHARACTER_CLEARANCE_2026',
      applicantNin: dto.applicantNin,
      applicantName: dto.applicantName,
      email: dto.email,
      phoneNumber: dto.phoneNumber,
      purpose: dto.purpose,
      status: PccStatus.APPLICATION_SUBMITTED,
      hasCriminalRecord: false,
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.pccApplicationsStore.set(trackingNumber, pccRecord);
    this.logger.log(`Received PCC Application ${trackingNumber} for ${dto.applicantName}`);
    return pccRecord;
  }

  async getPccStatus(trackingNumber: string): Promise<PccApplicationRecord> {
    const pcc = this.pccApplicationsStore.get(trackingNumber);
    if (!pcc) throw new NotFoundException(`PCC Application with tracking number '${trackingNumber}' not found.`);
    return pcc;
  }

  // --- PUBLIC WANTED PERSONS CIRCULAR BOARD ---

  async getPublicWantedCirculars(): Promise<WantedPersonRecord[]> {
    return [
      {
        id: 'wnt-001',
        personId: 'person-chidi-001',
        personName: 'Chidi Okonkwo (alias "Chidi the Cobra")',
        photoUrl: 'https://nipris.police.gov.ng/photos/wanted_chidi.jpg',
        warrantIds: ['WAR-2026-EDO-98380'],
        riskLevel: WantedRiskLevel.ARMED_AND_DANGEROUS,
        bountyAmount: 5000000,
        publicCircular: true,
        status: WantedStatus.ACTIVE,
        remarks: 'Wanted by NPF Edo State Command for Armed Hijacking and Unlawful Firearms Possession.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  // --- STOLEN VEHICLE REGISTRY LOOKUP ---

  async lookupStolenVehicle(dto: LookupStolenVehicleDto): Promise<StolenVehicleLookupResult> {
    const query = dto.queryIdentifier.toUpperCase();

    if (query === 'EDO-291-BEN' || query.includes('STOLEN')) {
      return {
        queryIdentifier: dto.queryIdentifier,
        status: StolenVehicleStatus.STOLEN_VEHICLE_ALERT,
        makeModel: 'Toyota Hilux 4x4 Commercial Logistics Van',
        color: 'Metallic Silver',
        reportedStolenDate: '2026-08-14',
        stolenLocation: 'Ore-Benin Expressway, Edo State',
        reportingStation: 'Benin Central Police Station',
        instructions: '🚨 CRITICAL STOLEN VEHICLE ALERT: Do not approach occupants. Contact NPF Emergency Dispatch immediately at 112 / 0800-NIPRIS.',
      };
    }

    return {
      queryIdentifier: dto.queryIdentifier,
      status: StolenVehicleStatus.NOT_REPORTED_STOLEN,
      instructions: '✔ Vehicle is not reported stolen in the National Police Stolen Property Register.',
    };
  }
}
