import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CasesService } from './cases.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { AssignInvestigatorsDto } from './dto/assign-investigators.dto';
import { UpdateCaseStatusDto } from './dto/update-case-status.dto';
import { LinkCaseEvidenceDto } from './dto/link-asset.dto';
import { CaseStatus } from '@nipris/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Cases & Investigations Subsystem')
@Controller('cases')
@UseGuards(JwtAuthGuard)
export class CasesController {
  constructor(private readonly casesService: CasesService) {}

  @Get()
  @ApiOperation({ summary: 'List Master Case Files with Filters (State, Status)' })
  @ApiQuery({ name: 'state', required: false })
  @ApiQuery({ name: 'status', enum: CaseStatus, required: false })
  async getCases(@Query('state') state?: string, @Query('status') status?: CaseStatus) {
    const cases = await this.casesService.getAllCases(state, status);
    return {
      success: true,
      count: cases.length,
      data: cases,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Detailed Master Case File (Incidents, Arrests, Persons, Digital Evidence, Timeline)' })
  async getCaseById(@Param('id') id: string) {
    const caseRec = await this.casesService.getCaseById(id);
    return {
      success: true,
      data: caseRec,
      timestamp: new Date().toISOString(),
    };
  }

  @Post()
  @ApiOperation({ summary: 'Initiate New Master Case File' })
  async createCase(@Body() dto: CreateCaseDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-inv-edo';
    const caseRec = await this.casesService.createCase(dto, officerId);
    return {
      success: true,
      message: `Case File ${caseRec.caseNumber} successfully initiated.`,
      data: caseRec,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id/assign')
  @ApiOperation({ summary: 'Assign Lead Investigator & Investigative Team Officers' })
  async assignInvestigators(@Param('id') id: string, @Body() dto: AssignInvestigatorsDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-inv-edo';
    const caseRec = await this.casesService.assignInvestigators(id, dto, officerId);
    return {
      success: true,
      message: `Investigative team assigned to Case ${caseRec.caseNumber}.`,
      data: caseRec,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Transition Case Status (OPEN, UNDER_INVESTIGATION, PENDING_PROSECUTION, CLOSED, REOPENED)' })
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateCaseStatusDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-inv-edo';
    const caseRec = await this.casesService.updateStatus(id, dto, officerId);
    return {
      success: true,
      message: `Case ${caseRec.caseNumber} status updated to ${caseRec.status}.`,
      data: caseRec,
      timestamp: new Date().toISOString(),
    };
  }

  @Post(':id/link-incident')
  @ApiOperation({ summary: 'Link Incident Record to Master Case File' })
  async linkIncident(@Param('id') id: string, @Body('incidentId') incidentId: string, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-inv-edo';
    const caseRec = await this.casesService.linkIncident(id, incidentId, officerId);
    return {
      success: true,
      message: `Incident attached to Case ${caseRec.caseNumber}.`,
      data: caseRec,
      timestamp: new Date().toISOString(),
    };
  }

  @Post(':id/link-arrest')
  @ApiOperation({ summary: 'Link Arrest Booking Record to Master Case File' })
  async linkArrest(@Param('id') id: string, @Body('arrestId') arrestId: string, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-inv-edo';
    const caseRec = await this.casesService.linkArrest(id, arrestId, officerId);
    return {
      success: true,
      message: `Arrest booking attached to Case ${caseRec.caseNumber}.`,
      data: caseRec,
      timestamp: new Date().toISOString(),
    };
  }

  @Post(':id/link-evidence')
  @ApiOperation({ summary: 'Link Digital/Physical Evidence, Bodycam, Dashcam, Photo, or Document' })
  async linkEvidence(@Param('id') id: string, @Body() dto: LinkCaseEvidenceDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-inv-edo';
    const caseRec = await this.casesService.linkEvidence(id, dto, officerId);
    return {
      success: true,
      message: `${dto.assetType} asset attached to Case ${caseRec.caseNumber}.`,
      data: caseRec,
      timestamp: new Date().toISOString(),
    };
  }
}
