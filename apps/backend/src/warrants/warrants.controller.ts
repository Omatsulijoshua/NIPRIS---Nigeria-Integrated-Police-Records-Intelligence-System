import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { WarrantsService } from './warrants.service';
import { CreateWarrantDto } from './dto/create-warrant.dto';
import { ExecuteWarrantDto } from './dto/execute-warrant.dto';
import { CreateWantedDto } from './dto/create-wanted.dto';
import { WarrantType, WarrantStatus, WantedStatus } from '@nipris/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Warrants & Wanted Persons Subsystem')
@Controller('warrants')
@UseGuards(JwtAuthGuard)
export class WarrantsController {
  constructor(private readonly warrantsService: WarrantsService) {}

  @Get()
  @ApiOperation({ summary: 'List Judicial Warrants (Arrest, Search, Bench) with Filters' })
  @ApiQuery({ name: 'type', enum: WarrantType, required: false })
  @ApiQuery({ name: 'status', enum: WarrantStatus, required: false })
  @ApiQuery({ name: 'state', required: false })
  async getWarrants(
    @Query('type') type?: WarrantType,
    @Query('status') status?: WarrantStatus,
    @Query('state') state?: string
  ) {
    const warrants = await this.warrantsService.getAllWarrants(type, status, state);
    return {
      success: true,
      count: warrants.length,
      data: warrants,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('wanted')
  @ApiOperation({ summary: 'List Wanted Persons Bulletin Board' })
  @ApiQuery({ name: 'status', enum: WantedStatus, required: false })
  async getWantedPersons(@Query('status') status?: WantedStatus) {
    const list = await this.warrantsService.getAllWantedPersons(status);
    return {
      success: true,
      count: list.length,
      data: list,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Detailed Judicial Warrant File' })
  async getWarrantById(@Param('id') id: string) {
    const warrant = await this.warrantsService.getWarrantById(id);
    return {
      success: true,
      data: warrant,
      timestamp: new Date().toISOString(),
    };
  }

  @Post()
  @ApiOperation({ summary: 'Ingest Court-Issued Judicial Warrant (Arrest, Search, Bench)' })
  async createWarrant(@Body() dto: CreateWarrantDto) {
    const warrant = await this.warrantsService.createWarrant(dto);
    return {
      success: true,
      message: `Warrant ${warrant.warrantNumber} successfully recorded.`,
      data: warrant,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id/execute')
  @ApiOperation({ summary: 'Record Warrant Execution Flow' })
  async executeWarrant(@Param('id') id: string, @Body() dto: ExecuteWarrantDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-patrol-edo';
    const warrant = await this.warrantsService.executeWarrant(id, dto, officerId);
    return {
      success: true,
      message: `Warrant ${warrant.warrantNumber} marked EXECUTED.`,
      data: warrant,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update Warrant Status (ACTIVE, EXECUTED, CANCELLED, EXPIRED, SUSPENDED)' })
  async updateStatus(@Param('id') id: string, @Body('status') status: WarrantStatus) {
    const warrant = await this.warrantsService.updateWarrantStatus(id, status);
    return {
      success: true,
      message: `Warrant ${warrant.warrantNumber} status updated to ${warrant.status}.`,
      data: warrant,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('wanted')
  @ApiOperation({ summary: 'Register Wanted Person Bulletin File' })
  async createWantedPerson(@Body() dto: CreateWantedDto) {
    const wanted = await this.warrantsService.createWantedPerson(dto);
    return {
      success: true,
      message: `Wanted Person file for ${wanted.personName} registered.`,
      data: wanted,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch('wanted/:id/status')
  @ApiOperation({ summary: 'Update Wanted Person Status (ACTIVE, CAPTURED, DECEASED, CLEARED)' })
  async updateWantedStatus(@Param('id') id: string, @Body('status') status: WantedStatus) {
    const wanted = await this.warrantsService.updateWantedStatus(id, status);
    return {
      success: true,
      message: `Wanted Person ${wanted.personName} status updated to ${wanted.status}.`,
      data: wanted,
      timestamp: new Date().toISOString(),
    };
  }
}
