import { Controller, Get, Post, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { IntelligenceService } from './intelligence.service';
import { CreateInformantDto } from './dto/create-informant.dto';
import { CreateIntelReportDto } from './dto/create-intel-report.dto';
import { ClassificationLevel, OfficerRole } from '@nipris/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Intelligence & Informant Management Engine Subsystem')
@Controller('intelligence')
@UseGuards(JwtAuthGuard)
export class IntelligenceController {
  constructor(private readonly intelligenceService: IntelligenceService) {}

  @Post('informants')
  @ApiOperation({ summary: 'Register Confidential Informant with Cryptographic Pseudonym & Encrypted Identity' })
  async registerInformant(@Body() dto: CreateInformantDto) {
    const informant = await this.intelligenceService.registerInformant(dto);
    return {
      success: true,
      message: `Confidential Informant ${informant.pseudonymCodeName} registered. True identity encrypted with AES-256 at rest.`,
      data: informant,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('informants')
  @ApiOperation({ summary: 'List Confidential Informants (True identity concealed unless Handler Officer or Level 0 Admin)' })
  async getInformants(@Req() req: any) {
    const officerId = req.user?.officerId || 'off-patrol-edo';
    const role = req.user?.role || OfficerRole.INVESTIGATING_OFFICER;
    const informants = await this.intelligenceService.getAllInformants(officerId, role);
    return {
      success: true,
      count: informants.length,
      data: informants,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('reports')
  @ApiOperation({ summary: 'Intake Intelligence Report with NATO/Law Enforcement 6x6 Reliability Rating' })
  async createIntelReport(@Body() dto: CreateIntelReportDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-patrol-edo';
    const report = await this.intelligenceService.createIntelReport(dto, officerId);
    return {
      success: true,
      message: `Intelligence Report ${report.reportNumber} ingested with Evaluation Code ${report.evaluationCode}.`,
      data: report,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('reports')
  @ApiOperation({ summary: 'List Intelligence Reports (TOP_SECRET_LAW_ENFORCEMENT Dissemination Clearance Controls)' })
  @ApiQuery({ name: 'classification', enum: ClassificationLevel, required: false })
  @ApiQuery({ name: 'caseId', required: false })
  async getIntelReports(@Query('classification') classification?: ClassificationLevel, @Query('caseId') caseId?: string) {
    const reports = await this.intelligenceService.getAllIntelReports(classification, caseId);
    return {
      success: true,
      count: reports.length,
      data: reports,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('reports/:id')
  @ApiOperation({ summary: 'Get Detailed Intelligence Report' })
  async getIntelReportById(@Param('id') id: string) {
    const report = await this.intelligenceService.getIntelReportById(id);
    return {
      success: true,
      data: report,
      timestamp: new Date().toISOString(),
    };
  }
}
