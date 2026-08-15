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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('NIPRIS Station Organization, Command, Diary, Complaints, Duty & Attendance Subsystem')
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

  @Post('duty/shifts')
  @ApiOperation({ summary: 'Define New Station Duty Shift Schedule' })
  async createDutyShift(@Body() dto: CreateDutyShiftDto) {
    const shift = await this.stationService.createDutyShift(dto);
    return {
      success: true,
      message: `Shift ${shift.shiftName} created.`,
      data: shift,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('duty/shifts/:stationId')
  @ApiOperation({ summary: 'List Station Duty Shift Schedules' })
  async getDutyShifts(@Param('stationId') stationId: string) {
    const shifts = await this.stationService.getDutyShifts(stationId);
    return {
      success: true,
      count: shifts.length,
      data: shifts,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('duty/roster/:stationId')
  @ApiOperation({ summary: 'Get Station Officer Duty Roster' })
  async getDutyRoster(@Param('stationId') stationId: string) {
    const roster = await this.stationService.getDutyRoster(stationId);
    return {
      success: true,
      count: roster.length,
      data: roster,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('attendance/clock-in')
  @ApiOperation({ summary: 'Clock-In Officer Shift Attendance' })
  async clockInOfficer(@Body() dto: ClockInAttendanceDto) {
    const log = await this.stationService.clockInOfficer(dto);
    return {
      success: true,
      message: `Officer ${dto.officerId} Clocked IN cleanly.`,
      data: log,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('attendance/clock-out')
  @ApiOperation({ summary: 'Clock-Out Officer Shift Attendance' })
  async clockOutOfficer(@Body('officerId') officerId: string, @Body('stationId') stationId: string) {
    const log = await this.stationService.clockOutOfficer(officerId, stationId);
    return {
      success: true,
      message: `Officer ${officerId} Clocked OUT cleanly.`,
      data: log,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('attendance/logs/:stationId')
  @ApiOperation({ summary: 'List Officer Attendance Logs for Station' })
  async getAttendanceLogs(@Param('stationId') stationId: string) {
    const logs = await this.stationService.getAttendanceLogs(stationId);
    return {
      success: true,
      count: logs.length,
      data: logs,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('officers/status')
  @ApiOperation({ summary: 'Update Officer Operational Duty Status' })
  async updateOfficerStatus(@Body() dto: UpdateOfficerStatusDto) {
    const result = await this.stationService.updateOfficerOperationalStatus(dto);
    return {
      success: true,
      message: `Officer ${dto.officerId} status updated to ${dto.operationalStatus}.`,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }
}
