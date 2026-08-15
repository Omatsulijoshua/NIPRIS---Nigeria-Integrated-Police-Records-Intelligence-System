import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { ArrestsService } from './arrests.service';
import { CreateArrestDto } from './dto/create-arrest.dto';
import { UpdateLegalStatusDto } from './dto/update-legal-status.dto';
import { UpdateBailDto } from './dto/update-bail.dto';
import { LegalStatus, CustodyStatus } from '@nipris/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Arrest & Booking Subsystem')
@Controller('arrests')
@UseGuards(JwtAuthGuard)
export class ArrestsController {
  constructor(private readonly arrestsService: ArrestsService) {}

  @Get()
  @ApiOperation({ summary: 'List Arrest Records with Filters (State, Legal Status, Custody Status)' })
  @ApiQuery({ name: 'state', required: false })
  @ApiQuery({ name: 'legalStatus', enum: LegalStatus, required: false })
  @ApiQuery({ name: 'custodyStatus', enum: CustodyStatus, required: false })
  async getArrests(
    @Query('state') state?: string,
    @Query('legalStatus') legalStatus?: LegalStatus,
    @Query('custodyStatus') custodyStatus?: CustodyStatus
  ) {
    const arrests = await this.arrestsService.getAllArrests(state, legalStatus, custodyStatus);
    return {
      success: true,
      count: arrests.length,
      data: arrests,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Detailed Arrest & Booking Record File' })
  async getArrestById(@Param('id') id: string) {
    const arrest = await this.arrestsService.getArrestById(id);
    return {
      success: true,
      data: arrest,
      timestamp: new Date().toISOString(),
    };
  }

  @Post()
  @ApiOperation({ summary: 'Ingest New Arrest & Booking Record' })
  async createArrest(@Body() dto: CreateArrestDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-patrol-edo';
    const arrest = await this.arrestsService.createArrest(dto, officerId);
    return {
      success: true,
      message: `Arrest Record ${arrest.arrestNumber} successfully created.`,
      data: arrest,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id/legal-status')
  @ApiOperation({ summary: 'Update Legal Status (ARREST, CHARGE, PROSECUTION, CONVICTION, RELEASED)' })
  async updateLegalStatus(@Param('id') id: string, @Body() dto: UpdateLegalStatusDto) {
    const arrest = await this.arrestsService.updateLegalStatus(id, dto);
    return {
      success: true,
      message: `Arrest ${arrest.arrestNumber} legal status updated to ${arrest.legalStatus}.`,
      data: arrest,
      timestamp: new Date().toISOString(),
    };
  }

  @Patch(':id/bail')
  @ApiOperation({ summary: 'Update Custody & Bail Release Status' })
  async updateBailStatus(@Param('id') id: string, @Body() dto: UpdateBailDto) {
    const arrest = await this.arrestsService.updateBailStatus(id, dto);
    return {
      success: true,
      message: `Arrest ${arrest.arrestNumber} bail status updated to ${arrest.bailStatus}.`,
      data: arrest,
      timestamp: new Date().toISOString(),
    };
  }
}
