import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CadService } from './cad.service';
import { CreateCadIncidentDto } from './dto/create-cad-incident.dto';
import { UpdateUnitTelemetryDto } from './dto/update-unit-telemetry.dto';
import { DispatchUnitDto } from './dto/dispatch-unit.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('System Integration, CAD, Dispatch & Telemetry Subsystem')
@Controller('cad')
@UseGuards(JwtAuthGuard)
export class CadController {
  constructor(private readonly cadService: CadService) {}

  @Post('incidents')
  @ApiOperation({ summary: 'Create CAD Incident Callout' })
  async createCadIncident(@Body() dto: CreateCadIncidentDto) {
    const incident = await this.cadService.createCadIncident(dto);
    return {
      success: true,
      message: `CAD Incident ${incident.cadIncidentNumber} queued for dispatch.`,
      data: incident,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('telemetry')
  @ApiOperation({ summary: 'Ingest Real-Time Patrol Unit Telemetry & Location Coordinates' })
  async updateUnitTelemetry(@Body() dto: UpdateUnitTelemetryDto) {
    const telemetry = await this.cadService.updateUnitTelemetry(dto);
    return {
      success: true,
      message: `Telemetry updated for Unit ${telemetry.unitCallsign}.`,
      data: telemetry,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('recommend-units')
  @ApiOperation({ summary: 'Query Haversine Proximity-Based Nearest Patrol Unit Recommendations' })
  @ApiQuery({ name: 'cadIncidentNumber', required: true })
  async recommendNearestUnits(@Query('cadIncidentNumber') cadIncidentNumber: string) {
    const recommendations = await this.cadService.recommendNearestUnits(cadIncidentNumber);
    return {
      success: true,
      count: recommendations.length,
      data: recommendations,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('dispatch')
  @ApiOperation({ summary: 'Dispatch Patrol Unit to CAD Incident Callout' })
  async dispatchUnit(@Body() dto: DispatchUnitDto) {
    const incident = await this.cadService.dispatchUnit(dto);
    return {
      success: true,
      message: `Unit ${incident.dispatchedUnitCallsign} dispatched to CAD Incident ${incident.cadIncidentNumber}.`,
      data: incident,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('active-units')
  @ApiOperation({ summary: 'List Active Patrol Unit Telemetry Grid' })
  async getAllActiveUnits() {
    const units = await this.cadService.getAllActiveUnits();
    return {
      success: true,
      count: units.length,
      data: units,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('incidents')
  @ApiOperation({ summary: 'List Active CAD Dispatch Queue' })
  async getAllCadIncidents() {
    const incidents = await this.cadService.getAllCadIncidents();
    return {
      success: true,
      count: incidents.length,
      data: incidents,
      timestamp: new Date().toISOString(),
    };
  }
}
