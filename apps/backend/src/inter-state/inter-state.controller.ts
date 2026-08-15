import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { InterStateService } from './inter-state.service';
import { CreateInterStateRequestDto } from './dto/create-inter-state-request.dto';
import { ApproveRequestDto } from './dto/approve-request.dto';
import { EmergencyOverrideDto } from './dto/emergency-override.dto';
import { InterStateRequestStatus } from '@nipris/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Inter-State Jurisdiction & Record Sharing Pipeline Subsystem')
@Controller('inter-state')
@UseGuards(JwtAuthGuard)
export class InterStateController {
  constructor(private readonly interStateService: InterStateService) {}

  @Post('requests')
  @ApiOperation({ summary: 'Submit Formal Inter-State Record Sharing Request (Origin State -> Target State)' })
  async createRequest(@Body() dto: CreateInterStateRequestDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-patrol-edo';
    const request = await this.interStateService.createRequest(dto, officerId);
    return {
      success: true,
      message: `Inter-State Record Request ${request.requestNumber} submitted to ${request.targetState} State Command.`,
      data: request,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('requests')
  @ApiOperation({ summary: 'List Inter-State Sharing Requests' })
  @ApiQuery({ name: 'originatingState', required: false })
  @ApiQuery({ name: 'targetState', required: false })
  @ApiQuery({ name: 'status', enum: InterStateRequestStatus, required: false })
  async getRequests(
    @Query('originatingState') originatingState?: string,
    @Query('targetState') targetState?: string,
    @Query('status') status?: InterStateRequestStatus
  ) {
    const requests = await this.interStateService.getAllRequests(originatingState, targetState, status);
    return {
      success: true,
      count: requests.length,
      data: requests,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('requests/:id')
  @ApiOperation({ summary: 'Get Inter-State Request Details' })
  async getRequestById(@Param('id') id: string) {
    const request = await this.interStateService.getRequestById(id);
    return {
      success: true,
      data: request,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch('requests/:id/approve')
  @ApiOperation({ summary: 'Approve or Reject Inter-State Access Request (Target State Command Admin)' })
  async approveRequest(@Param('id') id: string, @Body() dto: ApproveRequestDto, @Req() req: any) {
    const approvingOfficerId = req.user?.officerId || 'off-lagos-admin';
    const request = await this.interStateService.approveRequest(id, dto, approvingOfficerId);
    return {
      success: true,
      message: `Inter-State Request ${request.requestNumber} ${request.status}.`,
      data: request,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('emergency-override')
  @ApiOperation({ summary: 'Execute Emergency Cross-Jurisdiction Record Override (Instant Access with Mandatory Audit Log Flagged for IGP)' })
  async executeEmergencyOverride(@Body() dto: EmergencyOverrideDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-patrol-edo';
    const officerState = req.user?.state || 'Edo';
    const override = await this.interStateService.executeEmergencyOverride(dto, officerId, officerState);
    return {
      success: true,
      message: `Emergency Cross-Jurisdiction Override executed. High-priority audit alert emitted to IGP & National HQ.`,
      data: override,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('national-oversight')
  @ApiOperation({ summary: 'National HQ 36 States + FCT Inter-State Clearance Matrix' })
  async getNationalHqOversight() {
    const oversight = await this.interStateService.getNationalHqOversight();
    return {
      success: true,
      count: oversight.length,
      data: oversight,
      timestamp: new Date().toISOString(),
    };
  }
}
