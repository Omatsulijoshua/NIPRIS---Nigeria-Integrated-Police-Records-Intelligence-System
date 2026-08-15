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
import { CreateStationVehicleDto } from './dto/create-station-vehicle.dto';
import { DispatchVehicleLogDto } from './dto/dispatch-vehicle-log.dto';
import { CheckoutEquipmentDto } from './dto/checkout-equipment.dto';
import { ReportMaintenanceDefectDto } from './dto/report-maintenance-defect.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('NIPRIS Station Organization, Command, Diary, Complaints, Duty, Attendance, Custody, Cases, Evidence, Bodycam, Vehicles & Equipment Subsystem')
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

  @Post('vehicles')
  @ApiOperation({ summary: 'Register New Station Fleet Vehicle' })
  async createStationVehicle(@Body() dto: CreateStationVehicleDto) {
    const vehicle = await this.stationService.createStationVehicle(dto);
    return {
      success: true,
      message: `Vehicle ${vehicle.plateNumber} (${vehicle.callSign}) registered to station fleet.`,
      data: vehicle,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('vehicles/:stationId')
  @ApiOperation({ summary: 'List Station Fleet Vehicles & Operational Status' })
  async getStationVehicles(@Param('stationId') stationId: string) {
    const vehicles = await this.stationService.getStationVehicles(stationId);
    return {
      success: true,
      count: vehicles.length,
      data: vehicles,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('vehicles/dispatch-log')
  @ApiOperation({ summary: 'Log Patrol Vehicle Dispatch / Return Mileage & Fuel' })
  async dispatchVehicleLog(@Body() dto: DispatchVehicleLogDto) {
    const log = await this.stationService.dispatchVehicleLog(dto);
    return {
      success: true,
      message: `Vehicle Dispatch / Mileage Log updated cleanly.`,
      data: log,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('vehicles/logs/:vehicleId')
  @ApiOperation({ summary: 'Get Mileage & Patrol History Logs for Vehicle' })
  async getVehicleLogs(@Param('vehicleId') vehicleId: string) {
    const logs = await this.stationService.getVehicleLogs(vehicleId);
    return {
      success: true,
      count: logs.length,
      data: logs,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('equipment/checkout')
  @ApiOperation({ summary: 'Sign Out Armory Equipment / Weapon to Officer' })
  async checkoutEquipment(@Body() dto: CheckoutEquipmentDto) {
    const item = await this.stationService.checkoutEquipment(dto);
    return {
      success: true,
      message: `Equipment ${item.equipmentCode} issued to Officer ${dto.officerId}.`,
      data: item,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('equipment/return')
  @ApiOperation({ summary: 'Return Issued Equipment / Weapon to Station Armory' })
  async returnEquipment(@Body('equipmentId') equipmentId: string, @Body('stationId') stationId: string) {
    const item = await this.stationService.returnEquipment(equipmentId, stationId);
    return {
      success: true,
      message: `Equipment ${item.equipmentCode} returned to Armory.`,
      data: item,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('equipment/:stationId')
  @ApiOperation({ summary: 'List Station Tactical Equipment & Armory Inventory' })
  async getStationEquipment(@Param('stationId') stationId: string) {
    const equipment = await this.stationService.getStationEquipment(stationId);
    return {
      success: true,
      count: equipment.length,
      data: equipment,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('equipment/maintenance')
  @ApiOperation({ summary: 'Report Vehicle / Equipment Defect for Maintenance' })
  async reportMaintenanceDefect(@Body() dto: ReportMaintenanceDefectDto) {
    const defect = await this.stationService.reportMaintenanceDefect(dto);
    return {
      success: true,
      message: `Maintenance Defect Report created for ${dto.targetCategory} (${dto.targetId}).`,
      data: defect,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('equipment/maintenance/:stationId')
  @ApiOperation({ summary: 'List Station Maintenance Defect Alerts & Work Orders' })
  async getMaintenanceAlerts(@Param('stationId') stationId: string) {
    const defects = await this.stationService.getMaintenanceAlerts(stationId);
    return {
      success: true,
      count: defects.length,
      data: defects,
      timestamp: new Date().toISOString(),
    };
  }
}
