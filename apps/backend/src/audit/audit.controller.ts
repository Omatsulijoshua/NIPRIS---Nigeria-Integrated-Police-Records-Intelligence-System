import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AuditService } from './audit.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { AuditActionType, AuditResourceType } from '@nipris/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Audit & Compliance Ledger Subsystem')
@Controller('audit')
@UseGuards(JwtAuthGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post('logs')
  @ApiOperation({ summary: 'Record Immutable Audit Log Event Entry with SHA-256 Block Hash Chaining' })
  async createAuditLog(@Body() dto: CreateAuditLogDto) {
    const entry = this.auditService.recordAuditLog(dto);
    return {
      success: true,
      message: `Audit Entry #${entry.sequenceIndex} recorded with SHA-256 Block Hash ${entry.blockHash.substring(0, 12)}...`,
      data: entry,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('logs')
  @ApiOperation({ summary: 'Query Audit Ledger (Filter by Officer, Action, Resource, Internal Affairs Flag)' })
  @ApiQuery({ name: 'officerId', required: false })
  @ApiQuery({ name: 'action', enum: AuditActionType, required: false })
  @ApiQuery({ name: 'resourceType', enum: AuditResourceType, required: false })
  @ApiQuery({ name: 'flaggedOnly', type: Boolean, required: false })
  async getAuditLogs(
    @Query('officerId') officerId?: string,
    @Query('action') action?: AuditActionType,
    @Query('resourceType') resourceType?: AuditResourceType,
    @Query('flaggedOnly') flaggedOnly?: string
  ) {
    const isFlagged = flaggedOnly === 'true';
    const logs = this.auditService.getAllAuditLogs(officerId, action, resourceType, isFlagged);
    return {
      success: true,
      count: logs.length,
      data: logs,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('logs/:id')
  @ApiOperation({ summary: 'Get Detailed Audit Entry & Cryptographic Block Hash Proof' })
  async getAuditLogById(@Param('id') id: string) {
    const entry = this.auditService.getAuditLogById(id);
    return {
      success: true,
      data: entry,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('verify-chain')
  @ApiOperation({ summary: 'Execute Cryptographic SHA-256 Block Hash Chain Verification (VERIFIED_INTACT vs TAMPER_SUSPECT)' })
  async verifyChainIntegrity() {
    const result = this.auditService.verifyChainIntegrity();
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('compliance-summary')
  @ApiOperation({ summary: 'Get National/State Auditor & Inspector Compliance Metrics Summary' })
  async getComplianceSummary() {
    const summary = this.auditService.getComplianceSummary();
    return {
      success: true,
      data: summary,
      timestamp: new Date().toISOString(),
    };
  }
}
