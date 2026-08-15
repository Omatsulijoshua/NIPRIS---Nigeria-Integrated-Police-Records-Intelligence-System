import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { AssignOfficersDto } from './dto/assign-officers.dto';
import { UpdateIncidentStatusDto } from './dto/update-status.dto';
import { LinkIncidentPersonDto } from './dto/link-person.dto';
import { IncidentStatus } from '@nipris/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Incident Management Subsystem')
@Controller('incidents')
@UseGuards(JwtAuthGuard)
export class IncidentsController {
  constructor(private readonly incidentsService: IncidentsService) {}

  @Get()
  @ApiOperation({ summary: 'List Incidents with Filters (Status, Incident Type)' })
  @ApiQuery({ name: 'status', enum: IncidentStatus, required: false })
  @ApiQuery({ name: 'incidentType', required: false })
  async getIncidents(@Query('status') status?: IncidentStatus, @Query('incidentType') incidentType?: string) {
    const incidents = await this.incidentsService.getAllIncidents(status, incidentType);
    return {
      success: true,
      count: incidents.length,
      data: incidents,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Detailed Incident File (Details, Officers, Linked Persons, Timeline, Reports)' })
  async getIncidentById(@Param('id') id: string) {
    const incident = await this.incidentsService.getIncidentById(id);
    return {
      success: true,
      data: incident,
      timestamp: new Date().toISOString(),
    };
  }

  @Post()
  @ApiOperation({ summary: 'Intake New Incident Report' })
  async createIncident(@Body() dto: CreateIncidentDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-patrol-edo';
    const incident = await this.incidentsService.createIncident(dto, officerId);
    return {
      success: true,
      message: `Incident ${incident.incidentNumber} successfully logged.`,
      data: incident,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id/assign')
  @ApiOperation({ summary: 'Assign Responding Officers / Lead Investigator' })
  async assignOfficers(@Param('id') id: string, @Body() dto: AssignOfficersDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-patrol-edo';
    const incident = await this.incidentsService.assignOfficers(id, dto, officerId);
    return {
      success: true,
      message: `Officers assigned to ${incident.incidentNumber}.`,
      data: incident,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Transition Incident Status (Under Investigation, Closed, Reopened)' })
  async updateStatus(@Param('id') id: string, @Body() dto: UpdateIncidentStatusDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-patrol-edo';
    const incident = await this.incidentsService.updateStatus(id, dto, officerId);
    return {
      success: true,
      message: `Incident ${incident.incidentNumber} status updated to ${incident.status}.`,
      data: incident,
      timestamp: new Date().toISOString(),
    };
  }

  @Post(':id/persons')
  @ApiOperation({ summary: 'Link Person Master ID as Suspect, Victim, Witness, or Reporter' })
  async linkPerson(@Param('id') id: string, @Body() dto: LinkIncidentPersonDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-patrol-edo';
    const incident = await this.incidentsService.linkPerson(id, dto, officerId);
    return {
      success: true,
      message: `Person linked to ${incident.incidentNumber}.`,
      data: incident,
      timestamp: new Date().toISOString(),
    };
  }

  @Post(':id/reports')
  @ApiOperation({ summary: 'Ingest Officer Field Report into Incident File' })
  async addReport(@Param('id') id: string, @Body('reportText') reportText: string, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-patrol-edo';
    const incident = await this.incidentsService.addReport(id, reportText, officerId);
    return {
      success: true,
      message: `Field report appended to ${incident.incidentNumber}.`,
      data: incident,
      timestamp: new Date().toISOString(),
    };
  }
}
