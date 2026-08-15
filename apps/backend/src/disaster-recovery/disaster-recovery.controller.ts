import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { DisasterRecoveryService } from './disaster-recovery.service';
import { CreateSnapshotDto } from './dto/create-snapshot.dto';
import { SimulateFailoverDto } from './dto/simulate-failover.dto';
import { ReplayOfflineQueueDto } from './dto/replay-offline-queue.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Disaster Recovery, Backup & Resilience Subsystem')
@Controller('dr')
@UseGuards(JwtAuthGuard)
export class DisasterRecoveryController {
  constructor(private readonly drService: DisasterRecoveryService) {}

  @Post('snapshots')
  @ApiOperation({ summary: 'Trigger Automated Encrypted Database Snapshot' })
  async createSnapshot(@Body() dto: CreateSnapshotDto) {
    const snapshot = await this.drService.createDatabaseSnapshot(dto);
    return {
      success: true,
      message: `Encrypted DB Snapshot ${snapshot.snapshotId} dispatched to ${snapshot.offsiteRegion}.`,
      data: snapshot,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('failover/simulate')
  @ApiOperation({ summary: 'Execute Chaos Engineering DB Failover Simulation' })
  async simulateFailover(@Body() dto: SimulateFailoverDto) {
    const result = await this.drService.simulateFailover(dto);
    return {
      success: true,
      message: `Chaos Failover Simulation PASSED. ${result.promotedReplicaNode} promoted to Primary in ${result.failoverDurationSeconds}s.`,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('offline-queue/replay')
  @ApiOperation({ summary: 'Replay Offline Store-and-Forward Transaction Queue' })
  async replayOfflineQueue(@Body() dto: ReplayOfflineQueueDto) {
    const result = await this.drService.replayOfflineQueue(dto);
    return {
      success: true,
      message: `Store-and-Forward Queue replay complete for ${dto.stateName}. ${result.replayedCount} transactions synced.`,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('snapshots')
  @ApiOperation({ summary: 'List Encrypted Database Snapshots Catalog' })
  async getAllSnapshots() {
    const catalog = await this.drService.getAllSnapshots();
    return {
      success: true,
      count: catalog.length,
      data: catalog,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('metrics')
  @ApiOperation({ summary: 'Query RPO, RTO & Disaster Recovery Resilience Health Metrics' })
  async getDrMetrics() {
    const metrics = await this.drService.getDrMetrics();
    return {
      success: true,
      data: metrics,
      timestamp: new Date().toISOString(),
    };
  }
}
