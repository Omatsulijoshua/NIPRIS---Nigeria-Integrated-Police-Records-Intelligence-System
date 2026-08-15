import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
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
import { CreateStationVehicleDto } from './dto/create-station-vehicle.dto';
import { DispatchVehicleLogDto } from './dto/dispatch-vehicle-log.dto';
import { CheckoutEquipmentDto } from './dto/checkout-equipment.dto';
import { ReportMaintenanceDefectDto } from './dto/report-maintenance-defect.dto';
import { CreateStationVisitorDto } from './dto/create-station-visitor.dto';
import { CreateStationTaskDto } from './dto/create-station-task.dto';
import { CreateApprovalRequestDto } from './dto/create-approval-request.dto';
import { SubmitShiftHandoverDto } from './dto/submit-shift-handover.dto';
import { GenerateStationReportDto } from './dto/generate-station-report.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('NIPRIS Station Subsystem')
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

  @Get('reports/summary/:stationId')
  @ApiOperation({ summary: 'Get Station Operational Summary Aggregation Report' })
  async getStationSummaryReport(@Param('stationId') stationId: string, @Query('period') period?: string) {
    const report = await this.stationService.getStationSummaryReport(stationId, period);
    return {
      success: true,
      data: report,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('reports/crime-trends/:stationId')
  @ApiOperation({ summary: 'Get Crime Trends & Sector Hotspot Distribution' })
  async getStationCrimeTrends(@Param('stationId') stationId: string) {
    const trends = await this.stationService.getStationCrimeTrends(stationId);
    return {
      success: true,
      data: trends,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('reports/officer-performance/:stationId')
  @ApiOperation({ summary: 'Get Officer Workload & Performance Metrics' })
  async getStationOfficerPerformance(@Param('stationId') stationId: string) {
    const perf = await this.stationService.getStationOfficerPerformance(stationId);
    return {
      success: true,
      data: perf,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('reports/detention-analytics/:stationId')
  @ApiOperation({ summary: 'Get Detention Duration & 24h Constitutional Remand Analytics' })
  async getStationDetentionAnalytics(@Param('stationId') stationId: string) {
    const analytics = await this.stationService.getStationDetentionAnalytics(stationId);
    return {
      success: true,
      data: analytics,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('reports/export')
  @ApiOperation({ summary: 'Export Station Operational Summary Report in CSV/PDF format' })
  async exportStationReport(@Body() dto: GenerateStationReportDto) {
    const file = await this.stationService.exportStationReport(dto);
    return {
      success: true,
      message: `Report exported as ${file.filename}.`,
      data: file,
      timestamp: new Date().toISOString(),
    };
  }
}
