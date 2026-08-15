import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { VerifyNimcNinDto } from './dto/verify-nimc-nin.dto';
import { VerifyFrscLicenseDto } from './dto/verify-frsc-license.dto';
import { VerifyInecVoterIdDto } from './dto/verify-inec-voter-id.dto';
import { VerifyNisPassportDto } from './dto/verify-nis-passport.dto';
import {
  NimcNinVerificationResult,
  FrscVerificationResult,
  InecVoterIdVerificationResult,
  NisPassportVerificationResult,
  AgencyVerificationStatus,
  AgencyGateway,
} from '@nipris/types';

@Injectable()
export class InterAgencyService {
  private readonly logger = new Logger(InterAgencyService.name);
  private readonly interAgencyAuditLedger: Array<{ id: string; gateway: AgencyGateway; query: string; rationale: string; officerId: string; timestamp: string }> = [];

  private validateRationale(rationale: string) {
    if (!rationale || rationale.trim().length < 10) {
      throw new BadRequestException('MANDATORY INTER-AGENCY POLICY: Operational Purpose Justification rationale must be at least 10 characters.');
    }
  }

  private logInterAgencyAudit(gateway: AgencyGateway, query: string, rationale: string, officerId: string) {
    const entry = {
      id: `gateway_log_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      gateway,
      query,
      rationale,
      officerId,
      timestamp: new Date().toISOString(),
    };
    this.interAgencyAuditLedger.push(entry);
    this.logger.log(`🔒 INTER-AGENCY AUDIT: Officer ${officerId} queried ${gateway} Gateway [${query}] - Rationale: ${rationale}`);
  }

  // --- NIMC NIN VERIFICATION ENGINE ---

  async verifyNimc(dto: VerifyNimcNinDto, officerId: string): Promise<NimcNinVerificationResult> {
    this.validateRationale(dto.justificationRationale);
    this.logInterAgencyAudit(AgencyGateway.NIMC, dto.nin, dto.justificationRationale, officerId);

    return {
      nin: dto.nin,
      verificationStatus: AgencyVerificationStatus.VERIFIED_MATCH,
      firstName: 'Chidi',
      lastName: 'Okonkwo',
      middleName: 'Emmanuel',
      dateOfBirth: '1988-04-12',
      gender: 'MALE',
      address: '42 Airport Road, Benin City, Edo State',
      photoUrl: 'https://nipris.police.gov.ng/photos/nin_10928374829.jpg',
      biometricReference: 'NIMC-BIO-SHA256-99120837',
      verifiedAt: new Date().toISOString(),
    };
  }

  // --- FRSC DRIVER LICENSE & VEHICLE REGISTRATION ENGINE ---

  async verifyFrsc(dto: VerifyFrscLicenseDto, officerId: string): Promise<FrscVerificationResult> {
    this.validateRationale(dto.justificationRationale);
    this.logInterAgencyAudit(AgencyGateway.FRSC, dto.licenseOrVinNumber, dto.justificationRationale, officerId);

    return {
      licenseOrVinNumber: dto.licenseOrVinNumber,
      verificationStatus: AgencyVerificationStatus.VERIFIED_MATCH,
      driverName: 'Chidi Okonkwo',
      vehicleMakeModel: 'Toyota Hilux 4x4 Commercial Logistics Van',
      plateNumber: 'EDO-291-BEN',
      expiryDate: '2028-11-30',
      verifiedAt: new Date().toISOString(),
    };
  }

  // --- INEC VOTER ID VERIFICATION ENGINE ---

  async verifyInec(dto: VerifyInecVoterIdDto, officerId: string): Promise<InecVoterIdVerificationResult> {
    this.validateRationale(dto.justificationRationale);
    this.logInterAgencyAudit(AgencyGateway.INEC, dto.voterVin, dto.justificationRationale, officerId);

    return {
      voterVin: dto.voterVin,
      verificationStatus: AgencyVerificationStatus.VERIFIED_MATCH,
      voterName: 'Chidi Okonkwo',
      pollingUnit: 'PU 004 Oredo Ward 2, Benin City',
      state: 'Edo',
      lga: 'Oredo',
      verifiedAt: new Date().toISOString(),
    };
  }

  // --- NIS PASSPORT & BORDER WATCHLIST ENGINE ---

  async verifyNis(dto: VerifyNisPassportDto, officerId: string): Promise<NisPassportVerificationResult> {
    this.validateRationale(dto.justificationRationale);
    this.logInterAgencyAudit(AgencyGateway.NIS, dto.passportNumber, dto.justificationRationale, officerId);

    return {
      passportNumber: dto.passportNumber,
      verificationStatus: AgencyVerificationStatus.VERIFIED_MATCH,
      holderName: 'Chidi Okonkwo',
      nationality: 'Nigerian',
      expiryDate: '2030-05-15',
      borderWatchlistClearance: 'CLEARED',
      verifiedAt: new Date().toISOString(),
    };
  }

  // --- QUERY INTER-AGENCY AUDIT LEDGER ---

  async getInterAgencyAuditLogs() {
    return [...this.interAgencyAuditLedger].reverse();
  }
}
