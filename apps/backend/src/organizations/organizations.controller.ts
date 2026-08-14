import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';
import { CreateOrgDto } from './dto/create-org.dto';
import { OrgLevel } from '@nipris/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Organizational & Command Hierarchy')
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly orgsService: OrganizationsService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch All Organizational Nodes (States, Commands, Stations, Units)' })
  @ApiQuery({ name: 'state', required: false })
  @ApiQuery({ name: 'level', enum: OrgLevel, required: false })
  async getOrganizations(@Query('state') state?: string, @Query('level') level?: OrgLevel) {
    const nodes = await this.orgsService.getAllOrganizations(state, level);
    return {
      success: true,
      count: nodes.length,
      data: nodes,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Organization Node by ID' })
  async getOrganizationById(@Param('id') id: string) {
    const node = await this.orgsService.getOrganizationById(id);
    return {
      success: true,
      data: node,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id/hierarchy')
  @ApiOperation({ summary: 'Get Ancestry Hierarchy Path (National HQ -> State -> Area -> Division -> Station)' })
  async getHierarchy(@Param('id') id: string) {
    const path = await this.orgsService.getHierarchyPath(id);
    return {
      success: true,
      data: path,
      timestamp: new Date().toISOString(),
    };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create New Organizational Node (Admin Only)' })
  async createOrganization(@Body() dto: CreateOrgDto) {
    const node = await this.orgsService.createOrganization(dto);
    return {
      success: true,
      message: 'Organizational node successfully created.',
      data: node,
      timestamp: new Date().toISOString(),
    };
  }
}
