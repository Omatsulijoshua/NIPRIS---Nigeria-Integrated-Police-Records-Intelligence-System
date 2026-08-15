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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('NIPRIS Station Organization, Command, Diary, Complaints, Duty, Attendance, Custody, Cases, Evidence, Bodycam, Vehicles, Equipment, Visitors, Tasks, Approvals & Shift Handover Subsystem')
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

  @Post('visitors')
  @ApiOperation({ summary: 'Register Station Visitor & Detainee Visitation Log' })
  async createStationVisitor(@Body() dto: CreateStationVisitorDto) {
    const visitor = await this.stationService.createStationVisitor(dto);
    return {
      success: true,
      message: `Visitor ${visitor.visitorNumber} (${visitor.visitorName}) checked in.`,
      data: visitor,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('visitors/checkout')
  @ApiOperation({ summary: 'Log Visitor Departure / Check-Out' })
  async checkoutVisitor(@Body('visitorId') visitorId: string, @Body('stationId') stationId: string) {
    const visitor = await this.stationService.checkoutVisitor(visitorId, stationId);
    return {
      success: true,
      message: `Visitor ${visitor.visitorNumber} checked out cleanly.`,
      data: visitor,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('visitors/:stationId')
  @ApiOperation({ summary: 'List Station Visitor Log Records' })
  async getStationVisitors(@Param('stationId') stationId: string) {
    const visitors = await this.stationService.getStationVisitors(stationId);
    return {
      success: true,
      count: visitors.length,
      data: visitors,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('tasks')
  @ApiOperation({ summary: 'Delegate & Create Internal Station Work Task' })
  async createStationTask(@Body() dto: CreateStationTaskDto) {
    const task = await this.stationService.createStationTask(dto);
    return {
      success: true,
      message: `Station Task ${task.taskNumber} created & assigned.`,
      data: task,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch('tasks/:taskId')
  @ApiOperation({ summary: 'Update Task Status (TODO, IN_PROGRESS, BLOCKED, COMPLETED)' })
  async updateTaskStatus(@Param('taskId') taskId: string, @Body('status') status: any) {
    const task = await this.stationService.updateTaskStatus(taskId, status);
    return {
      success: true,
      message: `Task ${task.taskNumber} status updated to ${status}.`,
      data: task,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('tasks/:stationId')
  @ApiOperation({ summary: 'List Internal Station Assigned Work Tasks' })
  async getStationTasks(@Param('stationId') stationId: string) {
    const tasks = await this.stationService.getStationTasks(stationId);
    return {
      success: true,
      count: tasks.length,
      data: tasks,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('approvals')
  @ApiOperation({ summary: 'Submit Administrative Approval Request' })
  async createApprovalRequest(@Body() dto: CreateApprovalRequestDto) {
    const request = await this.stationService.createApprovalRequest(dto);
    return {
      success: true,
      message: `Approval Request ${request.requestNumber} submitted.`,
      data: request,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('approvals/action')
  @ApiOperation({ summary: 'Approve or Reject Administrative Approval Request' })
  async actionApprovalRequest(
    @Body('requestId') requestId: string,
    @Body('action') action: 'APPROVED' | 'REJECTED',
    @Body('actionedByOfficerId') actionedByOfficerId: string,
    @Body('notes') notes?: string,
  ) {
    const request = await this.stationService.actionApprovalRequest(requestId, action, actionedByOfficerId, notes);
    return {
      success: true,
      message: `Approval Request ${request.requestNumber} actioned: ${action}.`,
      data: request,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('approvals/:stationId')
  @ApiOperation({ summary: 'List Station Administrative Approval Requests' })
  async getApprovalRequests(@Param('stationId') stationId: string) {
    const requests = await this.stationService.getApprovalRequests(stationId);
    return {
      success: true,
      count: requests.length,
      data: requests,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('handover')
  @ApiOperation({ summary: 'Submit Watch Commander End-of-Shift Handover Report' })
  async submitShiftHandover(@Body() dto: SubmitShiftHandoverDto) {
    const handover = await this.stationService.submitShiftHandover(dto);
    return {
      success: true,
      message: `Watch Commander Shift Handover ${handover.handoverNumber} submitted & signed cleanly.`,
      data: handover,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('handover/:stationId')
  @ApiOperation({ summary: 'List Watch Commander Shift Handover Log Reports' })
  async getShiftHandovers(@Param('stationId') stationId: string) {
    const handovers = await this.stationService.getShiftHandovers(stationId);
    return {
      success: true,
      count: handovers.length,
      data: handovers,
      timestamp: new Date().toISOString(),
    };
  }
}
