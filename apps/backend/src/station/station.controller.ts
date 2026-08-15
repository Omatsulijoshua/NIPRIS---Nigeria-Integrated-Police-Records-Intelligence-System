import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StationService } from './station.service';
import { CreateStationProfileDto } from './dto/create-station-profile.dto';
import { CreateStationUnitDto } from './dto/create-station-unit.dto';
import { AssignStationOfficerDto } from './dto/assign-station-officer.dto';
import { CreateDiaryEntryDto } from './dto/create-diary-entry.dto';
import { SearchDiaryEntriesDto } from './dto/search-diary-entries.dto';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { AssignComplaintDto } from './dto/assign-complaint.dto';
import { ConvertComplaintToIncidentDto } from './dto/convert-complaint-to-incident.dto';
import { CreateDutyShiftDto } from './dto/create-duty-shift.dto';
import { ClockInAttendanceDto } from './dto/clock-in-attendance.dto';
import { UpdateOfficerStatusDto } from './dto/update-officer-status.dto';
import { CreateCustodyIntakeDto } from './dto/create-custody-intake.dto';
import { IntakePersonPropertyDto } from './dto/intake-person-property.dto';
import { LogCustodyEventDto } from './dto/log-custody-event.dto';
import { AssignStationCaseDto } from './dto/assign-station-case.dto';
import { UpdateCaseChecklistDto } from './dto/update-case-checklist.dto';
import { CompileProsecutionSheetDto } from './dto/compile-prosecution-sheet.dto';
import { TransferStationCaseDto } from './dto/transfer-station-case.dto';
import { CreateStorageLocationDto } from './dto/create-storage-location.dto';
import { StationEvidenceIntakeDto } from './dto/station-evidence-intake.dto';
import { CheckoutEvidenceDto } from './dto/checkout-evidence.dto';
import { DisposeEvidenceDto } from './dto/dispose-evidence.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('NIPRIS Station Organization, Command, Diary, Complaints, Duty, Attendance, Custody, Cases & Evidence Subsystem')
@Controller('station')
@UseGuards(JwtAuthGuard)
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Post('profile')
  @ApiOperation({ summary: 'Configure or Create Police Station Profile' })
  async createStationProfile(@Body() dto: CreateStationProfileDto) {
    const profile = await this.stationService.createStationProfile(dto);
    return {
      success: true,
      message: `Station Profile created for ${profile.stationCode}.`,
      data: profile,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('profile/:stationId')
  @ApiOperation({ summary: 'Get Police Station Operational Profile & Metadata' })
  async getStationProfile(@Param('stationId') stationId: string) {
    const profile = await this.stationService.getStationProfile(stationId);
    return {
      success: true,
      data: profile,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('units')
  @ApiOperation({ summary: 'Create Internal Station Operational Unit (e.g. Patrol, CID, Desk)' })
  async createStationUnit(@Body() dto: CreateStationUnitDto) {
    const unit = await this.stationService.createStationUnit(dto);
    return {
      success: true,
      message: `Station Unit ${unit.code} (${unit.name}) created.`,
      data: unit,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('units/:stationId')
  @ApiOperation({ summary: 'List Internal Operational Units for Station' })
  async getStationUnits(@Param('stationId') stationId: string) {
    const units = await this.stationService.getStationUnits(stationId);
    return {
      success: true,
      count: units.length,
      data: units,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('officers/assign')
  @ApiOperation({ summary: 'Assign Officer to Station & Internal Unit with Station Role' })
  async assignOfficerToStation(@Body() dto: AssignStationOfficerDto) {
    const assignment = await this.stationService.assignOfficerToStation(dto);
    return {
      success: true,
      message: `Officer ${dto.officerId} assigned to Station ${dto.stationId} as ${dto.stationRole}.`,
      data: assignment,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('officers/:stationId')
  @ApiOperation({ summary: 'List Officers Assigned to Station' })
  async getStationOfficers(@Param('stationId') stationId: string) {
    const officers = await this.stationService.getStationOfficers(stationId);
    return {
      success: true,
      count: officers.length,
      data: officers,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('overview/metrics/:stationId')
  @ApiOperation({ summary: 'Get Real-Time Station Operational Metrics for TODAY' })
  async getStationOverviewMetrics(@Param('stationId') stationId: string) {
    const metrics = await this.stationService.getStationOverviewMetrics(stationId);
    return {
      success: true,
      data: metrics,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('overview/activity-feed/:stationId')
  @ApiOperation({ summary: 'Get Real-Time Station Operational Activity Feed' })
  async getStationActivityFeed(@Param('stationId') stationId: string) {
    const feed = await this.stationService.getStationActivityFeed(stationId);
    return {
      success: true,
      count: feed.length,
      data: feed,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('overview/alerts/:stationId')
  @ApiOperation({ summary: 'Get Station High-Priority Operational Alerts' })
  async getStationAlerts(@Param('stationId') stationId: string) {
    const alerts = await this.stationService.getStationAlerts(stationId);
    return {
      success: true,
      count: alerts.length,
      data: alerts,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('evidence/storage-locations')
  @ApiOperation({ summary: 'Define New Station Storage Location Layout' })
  async createStorageLocation(@Body() dto: CreateStorageLocationDto) {
    const location = await this.stationService.createStorageLocation(dto);
    return {
      success: true,
      message: `Storage Location Code ${location.code} created.`,
      data: location,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('evidence/storage-locations/:stationId')
  @ApiOperation({ summary: 'List Station Storage Location Layout Bins' })
  async getStorageLocations(@Param('stationId') stationId: string) {
    const locations = await this.stationService.getStorageLocations(stationId);
    return {
      success: true,
      count: locations.length,
      data: locations,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('evidence/intake')
  @ApiOperation({ summary: 'Process Physical Evidence Intake & Barcode Tag Generation' })
  async processStationEvidenceIntake(@Body() dto: StationEvidenceIntakeDto) {
    const evidence = await this.stationService.processStationEvidenceIntake(dto);
    return {
      success: true,
      message: `Physical Evidence ${evidence.evidenceNumber} (${evidence.barcodeTag}) sealed into ${dto.storageLocationCode}.`,
      data: evidence,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('evidence/checkout')
  @ApiOperation({ summary: 'Check Out Evidence for Court Presentation or Forensic Lab' })
  async checkoutEvidence(@Body() dto: CheckoutEvidenceDto) {
    const evidence = await this.stationService.checkoutEvidence(dto);
    return {
      success: true,
      message: `Evidence ${evidence.evidenceNumber} checked out for ${dto.purpose}.`,
      data: evidence,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('evidence/dispose')
  @ApiOperation({ summary: 'Dispose / Destruct / Court Release Evidence' })
  async disposeEvidence(@Body() dto: DisposeEvidenceDto) {
    const evidence = await this.stationService.disposeEvidence(dto);
    return {
      success: true,
      message: `Evidence ${evidence.evidenceNumber} disposed under ${dto.authorityReference}.`,
      data: evidence,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('evidence/chain-of-custody/:evidenceId')
  @ApiOperation({ summary: 'Get Full Chain of Custody & Audit Log for Evidence' })
  async getChainOfCustody(@Param('evidenceId') evidenceId: string) {
    const chain = await this.stationService.getChainOfCustody(evidenceId);
    return {
      success: true,
      data: chain,
      timestamp: new Date().toISOString(),
    };
  }
}
