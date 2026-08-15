import { Controller, Get, Post, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { EvidenceService } from './evidence.service';
import { CreateEvidenceDto } from './dto/create-evidence.dto';
import { LogCustodyTransferDto } from './dto/log-custody.dto';
import { VerifyHashDto } from './dto/verify-hash.dto';
import { EvidenceCategory } from '@nipris/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Digital Evidence & Media Pipeline Subsystem')
@Controller('evidence')
@UseGuards(JwtAuthGuard)
export class EvidenceController {
  constructor(private readonly evidenceService: EvidenceService) {}

  @Get()
  @ApiOperation({ summary: 'List Digital Evidence Vault Files with Filters' })
  @ApiQuery({ name: 'category', enum: EvidenceCategory, required: false })
  @ApiQuery({ name: 'caseId', required: false })
  @ApiQuery({ name: 'incidentId', required: false })
  async getEvidence(
    @Query('category') category?: EvidenceCategory,
    @Query('caseId') caseId?: string,
    @Query('incidentId') incidentId?: string
  ) {
    const list = await this.evidenceService.getAllEvidence(category, caseId, incidentId);
    return {
      success: true,
      count: list.length,
      data: list,
      timestamp: new Date().toISOString(),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get Detailed Digital Evidence File & Append-Only Chain of Custody Log' })
  async getEvidenceById(@Param('id') id: string) {
    const evidence = await this.evidenceService.getEvidenceById(id);
    return {
      success: true,
      data: evidence,
      timestamp: new Date().toISOString(),
    };
  }

  @Post()
  @ApiOperation({ summary: 'Ingest Digital Evidence Asset & Compute SHA-256 Checksum' })
  async createEvidence(@Body() dto: CreateEvidenceDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-evidence-01';
    const evidence = await this.evidenceService.createEvidence(dto, officerId);
    return {
      success: true,
      message: `Digital Evidence ${evidence.evidenceNumber} successfully ingested.`,
      data: evidence,
      timestamp: new Date().toISOString(),
    };
  }

  @Post(':id/verify-hash')
  @ApiOperation({ summary: 'Execute Cryptographic SHA-256 Integrity Verification (VERIFIED_INTACT vs TAMPER_ALERT)' })
  async verifyHash(@Param('id') id: string, @Body() dto: VerifyHashDto) {
    const result = await this.evidenceService.verifyHash(id, dto);
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post(':id/custody')
  @ApiOperation({ summary: 'Log Append-Only Chain of Custody Transfer (Lab, Court, Vault)' })
  async logCustodyTransfer(@Param('id') id: string, @Body() dto: LogCustodyTransferDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-evidence-01';
    const evidence = await this.evidenceService.logCustodyTransfer(id, dto, officerId);
    return {
      success: true,
      message: `Chain of Custody transfer recorded for ${evidence.evidenceNumber}.`,
      data: evidence,
      timestamp: new Date().toISOString(),
    };
  }
}
