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
import { CheckoutBodycamDto } from './dto/checkout-bodycam.dto';
import { DockBodycamUploadDto } from './dto/dock-bodycam-upload.dto';
import { AssignUnmatchedFootageDto } from './dto/assign-unmatched-footage.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('NIPRIS Station Organization, Command, Diary, Complaints, Duty, Attendance, Custody, Cases, Evidence & Bodycam Operations Subsystem')
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

  @Post('bodycam/checkout')
  @ApiOperation({ summary: 'Check Out Bodycam Device for Shift' })
  async checkoutBodycamDevice(@Body() dto: CheckoutBodycamDto) {
    const device = await this.stationService.checkoutBodycamDevice(dto);
    return {
      success: true,
      message: `Bodycam Device ${dto.deviceCode} checked out to Officer ${dto.officerId}.`,
      data: device,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('bodycam/devices/:stationId')
  @ApiOperation({ summary: 'List Station Bodycam Devices & Status' })
  async getStationBodycams(@Param('stationId') stationId: string) {
    const devices = await this.stationService.getStationBodycams(stationId);
    return {
      success: true,
      count: devices.length,
      data: devices,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('bodycam/dock-upload')
  @ApiOperation({ summary: 'Dock Bodycam Device & Trigger Automated Video Upload' })
  async dockBodycamUpload(@Body() dto: DockBodycamUploadDto) {
    const upload = await this.stationService.dockBodycamUpload(dto);
    return {
      success: true,
      message: `Bodycam ${dto.deviceCode} docked at ${dto.dockId}. ${dto.durationMinutes} mins video uploaded.`,
      data: upload,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('bodycam/dock-queue/:stationId')
  @ApiOperation({ summary: 'List Station Docking Auto-Upload Queue' })
  async getDockUploadQueue(@Param('stationId') stationId: string) {
    const queue = await this.stationService.getDockUploadQueue(stationId);
    return {
      success: true,
      count: queue.length,
      data: queue,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('bodycam/unmatched/assign')
  @ApiOperation({ summary: 'Link Unassigned Bodycam Footage to Officer / Incident / Case' })
  async assignUnmatchedFootage(@Body() dto: AssignUnmatchedFootageDto) {
    const upload = await this.stationService.assignUnmatchedFootage(dto);
    return {
      success: true,
      message: `Unmatched Footage ${dto.footageId} linked to Officer ${dto.officerId}.`,
      data: upload,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('bodycam/unmatched/:stationId')
  @ApiOperation({ summary: 'List Unassigned / Unmatched Bodycam Footage Queue' })
  async getUnmatchedFootageQueue(@Param('stationId') stationId: string) {
    const queue = await this.stationService.getUnmatchedFootageQueue(stationId);
    return {
      success: true,
      count: queue.length,
      data: queue,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('bodycam/compliance/:stationId')
  @ApiOperation({ summary: 'Get Station Bodycam Compliance & Undocked Alerts Report' })
  async getStationBodycamCompliance(@Param('stationId') stationId: string) {
    const report = await this.stationService.getStationBodycamCompliance(stationId);
    return {
      success: true,
      data: report,
      timestamp: new Date().toISOString(),
    };
  }
}
