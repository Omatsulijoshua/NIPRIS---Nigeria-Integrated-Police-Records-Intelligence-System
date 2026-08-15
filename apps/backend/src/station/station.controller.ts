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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('NIPRIS Station Organization, Command, Diary, Complaints, Duty, Attendance & Custody Subsystem')
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

  @Post('custody/intake')
  @ApiOperation({ summary: 'Process Local Station Detainee Custody Intake' })
  async createCustodyIntake(@Body() dto: CreateCustodyIntakeDto) {
    const custody = await this.stationService.createCustodyIntake(dto);
    return {
      success: true,
      message: `Local Custody Record ${custody.custodyNumber} created cleanly.`,
      data: custody,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('custody/:stationId')
  @ApiOperation({ summary: 'List Local Station Detainees' })
  async getStationCustodyList(@Param('stationId') stationId: string) {
    const list = await this.stationService.getStationCustodyList(stationId);
    return {
      success: true,
      count: list.length,
      data: list,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('custody/property')
  @ApiOperation({ summary: 'Process Detainee Personal Property Voucher Intake' })
  async intakePersonProperty(@Body() dto: IntakePersonPropertyDto) {
    const voucher = await this.stationService.intakePersonProperty(dto);
    return {
      success: true,
      message: `Property Voucher ${voucher.voucherNumber} logged cleanly.`,
      data: voucher,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('custody/property/:custodyId')
  @ApiOperation({ summary: 'Get Property Voucher Items for Custody Record' })
  async getCustodyProperty(@Param('custodyId') custodyId: string) {
    const property = await this.stationService.getCustodyProperty(custodyId);
    return {
      success: true,
      data: property,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('custody/event')
  @ApiOperation({ summary: 'Log Timestamped Custody Event (Meal, Medical, Lawyer Visit, Interrogation)' })
  async logCustodyEvent(@Body() dto: LogCustodyEventDto) {
    const event = await this.stationService.logCustodyEvent(dto);
    return {
      success: true,
      message: `Custody Event ${dto.eventType} logged cleanly.`,
      data: event,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('custody/events/:custodyId')
  @ApiOperation({ summary: 'List Custody Event History for Detainee' })
  async getCustodyEvents(@Param('custodyId') custodyId: string) {
    const events = await this.stationService.getCustodyEvents(custodyId);
    return {
      success: true,
      count: events.length,
      data: events,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('custody/cell-status/:stationId')
  @ApiOperation({ summary: 'Get Holding Cell Occupancy Status & Overcrowding Metrics' })
  async getCellOccupancyStatus(@Param('stationId') stationId: string) {
    const status = await this.stationService.getCellOccupancyStatus(stationId);
    return {
      success: true,
      data: status,
      timestamp: new Date().toISOString(),
    };
  }
}
