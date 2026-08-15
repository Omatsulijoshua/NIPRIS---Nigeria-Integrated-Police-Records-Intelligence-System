import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { OfficersService } from './officers.service';
import { CreateOfficerDto } from './dto/create-officer.dto';
import { TransferOfficerDto } from './dto/transfer-officer.dto';
import { OfficerRank, OfficerRole, EmploymentStatus } from '@nipris/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Officer Management Subsystem')
@Controller('officers')
@UseGuards(JwtAuthGuard)
export class OfficersController {
  constructor(private readonly officersService: OfficersService) {}

  @Get()
  @ApiOperation({ summary: 'List Officers with Multi-Criteria Filters (State, Rank, Role, Status)' })
  @ApiQuery({ name: 'state', required: false })
  @ApiQuery({ name: 'rank', enum: OfficerRank, required: false })
  @ApiQuery({ name: 'role', enum: OfficerRole, required: false })
  @ApiQuery({ name: 'status', enum: EmploymentStatus, required: false })
  async getOfficers(
    @Query('state') state?: string,
    @Query('rank') rank?: OfficerRank,
    @Query('role') role?: OfficerRole,
    @Query('status') status?: EmploymentStatus
  ) {
    const officers = await this.officersService.getAllOfficers({ state, rank, role, status });
    return {
      success: true,
      count: officers.length,
      data: officers,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Officer Profile by ID' })
  async getOfficerById(@Param('id') id: string) {
    const officer = await this.officersService.getOfficerById(id);
    return {
      success: true,
      data: officer,
      timestamp: new Date().toISOString(),
    };
  }

  @Post()
  @ApiOperation({ summary: 'Provision New Officer (Administrative Workflow Only)' })
  async createOfficer(@Body() dto: CreateOfficerDto) {
    const officer = await this.officersService.createOfficer(dto);
    return {
      success: true,
      message: `Officer ${officer.badgeNumber} provisioned successfully.`,
      data: officer,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id/transfer')
  @ApiOperation({ summary: 'Transfer Officer to New Command / Station / Unit' })
  async transferOfficer(@Param('id') id: string, @Body() dto: TransferOfficerDto) {
    const officer = await this.officersService.transferOfficer(id, dto);
    return {
      success: true,
      message: `Officer ${officer.badgeNumber} transferred successfully.`,
      data: officer,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update Officer Account Employment Status (ACTIVE, SUSPENDED, TERMINATED)' })
  async updateStatus(@Param('id') id: string, @Body('status') status: EmploymentStatus) {
    const officer = await this.officersService.updateOfficerStatus(id, status);
    return {
      success: true,
      message: `Officer ${officer.badgeNumber} status updated to ${status}.`,
      data: officer,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('duty-status')
  @ApiOperation({ summary: 'Mobile Field App: Update Patrol Duty Status & Location Telemetry' })
  async updateDutyStatus(@Body() body: { dutyStatus: string; latitude?: number; longitude?: number }, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-patrol-edo';
    const result = await this.officersService.updateDutyStatus(officerId, body.dutyStatus, body.latitude, body.longitude);
    return {
      success: true,
      message: `Duty status updated to ${body.dutyStatus}.`,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('sos-alert')
  @ApiOperation({ summary: 'Mobile Field App: Broadcast High-Priority SOS Emergency Alert to Command CAD' })
  async broadcastSosAlert(@Body() body: { emergencyRationale: string; latitude: number; longitude: number }, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-patrol-edo';
    const alert = await this.officersService.broadcastSosAlert(officerId, body.emergencyRationale, body.latitude, body.longitude);
    return {
      success: true,
      message: `⚡ SOS Emergency panic alert broadcasted to State Command CAD & surrounding units!`,
      data: alert,
      timestamp: new Date().toISOString(),
    };
  }
}
