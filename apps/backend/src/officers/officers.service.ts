import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { CreateOfficerDto } from './dto/create-officer.dto';
import { TransferOfficerDto } from './dto/transfer-officer.dto';
import { OfficerProfile, EmploymentStatus, OfficerRole, OfficerRank } from '@nipris/types';
import { hashPassword } from '@nipris/auth';
import { OrganizationsService } from '../organizations/organizations.service';

@Injectable()
export class OfficersService {
  private readonly logger = new Logger(OfficersService.name);
  private readonly officersStore = new Map<string, OfficerProfile & { passwordHash: string }>();

  constructor(private readonly orgsService: OrganizationsService) {
    this.seedDevelopmentOfficers();
  }

  private seedDevelopmentOfficers() {
    const devOfficers: Array<OfficerProfile & { passwordHash: string }> = [
      {
        id: 'off-super-admin',
        badgeNumber: 'NPF-1001',
        firstName: 'System',
        lastName: 'Admin',
        rank: OfficerRank.INSPECTOR_GENERAL,
        email: 'national.admin@test.local',
        role: OfficerRole.NATIONAL_SUPER_ADMIN,
        orgId: 'org-national-hq',
        department: 'Infrastructure Administration',
        status: EmploymentStatus.ACTIVE,
        createdAt: new Date().toISOString(),
        passwordHash: '$2a$12$e0MYzXyjpJS7Pd0RVvHwHeY8zKkP/.H2L5cWp.7yX3O6d6dK.e/xK',
      },
      {
        id: 'off-patrol-edo',
        badgeNumber: 'NPF-2002',
        firstName: 'Emmanuel',
        lastName: 'Okafor',
        rank: OfficerRank.INSPECTOR,
        email: 'patrol.officer@test.local',
        role: OfficerRole.PATROL_OFFICER,
        orgId: 'org-edo-station-a',
        state: 'Edo',
        department: 'Benin Patrol Unit',
        status: EmploymentStatus.ACTIVE,
        createdAt: new Date().toISOString(),
        passwordHash: '$2a$12$e0MYzXyjpJS7Pd0RVvHwHeY8zKkP/.H2L5cWp.7yX3O6d6dK.e/xK',
      },
    ];

    devOfficers.forEach((o) => this.officersStore.set(o.id, o));
  }

  async getAllOfficers(query?: { state?: string; rank?: OfficerRank; role?: OfficerRole; status?: EmploymentStatus }): Promise<OfficerProfile[]> {
    let officers = Array.from(this.officersStore.values());

    if (query?.state) {
      officers = officers.filter((o) => o.state?.toLowerCase() === query.state?.toLowerCase());
    }
    if (query?.rank) {
      officers = officers.filter((o) => o.rank === query.rank);
    }
    if (query?.role) {
      officers = officers.filter((o) => o.role === query.role);
    }
    if (query?.status) {
      officers = officers.filter((o) => o.status === query.status);
    }

    return officers.map(({ passwordHash, ...profile }) => profile);
  }

  async getOfficerById(id: string): Promise<OfficerProfile> {
    const officer = this.officersStore.get(id);
    if (!officer) throw new NotFoundException(`Officer with ID '${id}' not found.`);
    const { passwordHash, ...profile } = officer;
    return profile;
  }

  async createOfficer(dto: CreateOfficerDto): Promise<OfficerProfile> {
    const duplicate = Array.from(this.officersStore.values()).find(
      (o) => o.badgeNumber === dto.badgeNumber || o.email.toLowerCase() === dto.email.toLowerCase()
    );
    if (duplicate) {
      throw new ConflictException(`Officer with Badge Number '${dto.badgeNumber}' or Email '${dto.email}' already exists.`);
    }

    const orgNode = await this.orgsService.getOrganizationById(dto.orgId);
    const passwordHash = await hashPassword(dto.password);

    const newOfficer: OfficerProfile & { passwordHash: string } = {
      id: `off_${Math.random().toString(36).substring(2)}_${Date.now()}`,
      badgeNumber: dto.badgeNumber,
      firstName: dto.firstName,
      lastName: dto.lastName,
      rank: dto.rank,
      email: dto.email.toLowerCase(),
      role: dto.role,
      orgId: dto.orgId,
      state: orgNode.state,
      department: dto.department,
      status: EmploymentStatus.ACTIVE,
      createdAt: new Date().toISOString(),
      passwordHash,
    };

    this.officersStore.set(newOfficer.id, newOfficer);
    this.logger.log(`Provisioned officer: ${newOfficer.rank} ${newOfficer.firstName} ${newOfficer.lastName} (Badge: ${newOfficer.badgeNumber})`);

    const { passwordHash: _, ...profile } = newOfficer;
    return profile;
  }

  async transferOfficer(id: string, dto: TransferOfficerDto): Promise<OfficerProfile> {
    const officer = this.officersStore.get(id);
    if (!officer) throw new NotFoundException(`Officer with ID '${id}' not found.`);

    const newOrg = await this.orgsService.getOrganizationById(dto.newOrgId);

    officer.orgId = newOrg.id;
    officer.state = newOrg.state;
    if (dto.newDepartment) {
      officer.department = dto.newDepartment;
    }

    this.officersStore.set(id, officer);
    this.logger.log(`Officer ${officer.badgeNumber} transferred to ${newOrg.name} (${dto.transferReason})`);

    const { passwordHash, ...profile } = officer;
    return profile;
  }

  async updateOfficerStatus(id: string, newStatus: EmploymentStatus): Promise<OfficerProfile> {
    const officer = this.officersStore.get(id);
    if (!officer) throw new NotFoundException(`Officer with ID '${id}' not found.`);

    officer.status = newStatus;
    this.officersStore.set(id, officer);
    this.logger.warn(`Officer ${officer.badgeNumber} status updated to ${newStatus}`);

    const { passwordHash, ...profile } = officer;
    return profile;
  }

  async updateDutyStatus(officerId: string, dutyStatus: string, lat?: number, lng?: number) {
    this.logger.log(`Officer ${officerId} updated patrol duty status to ${dutyStatus} (GPS: ${lat}, ${lng})`);
    return { officerId, dutyStatus, latitude: lat, longitude: lng, timestamp: new Date().toISOString() };
  }

  async broadcastSosAlert(officerId: string, rationale: string, lat: number, lng: number) {
    const alertId = `sos_${Math.random().toString(36).substring(2)}_${Date.now()}`;
    this.logger.error(`🚨 SOS EMERGENCY BROADCAST from Officer ${officerId} (GPS: ${lat}, ${lng}) - Rationale: ${rationale}`);
    return {
      alertId,
      officerId,
      latitude: lat,
      longitude: lng,
      emergencyRationale: rationale,
      broadcastSeverity: 'CRITICAL_CAD_EMERGENCY_DISPATCH',
      timestamp: new Date().toISOString(),
    };
  }
}
