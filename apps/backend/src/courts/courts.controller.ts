import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CourtsService } from './courts.service';
import { CreateChargeSheetDto } from './dto/create-charge-sheet.dto';
import { IngestJudicialOrderDto } from './dto/ingest-judicial-order.dto';
import { SyncCourtStatusDto } from './dto/sync-court-status.dto';
import { VerifyJudicialSealDto } from './dto/verify-judicial-seal.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Court & Judicial Integration Subsystem')
@Controller('courts')
@UseGuards(JwtAuthGuard)
export class CourtsController {
  constructor(private readonly courtsService: CourtsService) {}

  @Post('charge-sheets')
  @ApiOperation({ summary: 'Generate Form NPF 14 Prosecution Filing & Charge Sheet' })
  async generateChargeSheet(@Body() dto: CreateChargeSheetDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-prosecution-edo';
    const record = await this.courtsService.generateChargeSheet(dto, officerId);
    return {
      success: true,
      message: `Form NPF 14 Charge Sheet ${record.chargeSheetNumber} generated successfully.`,
      data: record,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('verify-seal')
  @ApiOperation({ summary: 'Validate Cryptographic Judicial Seal Hash & Court Metadata' })
  async verifyJudicialSeal(@Body() dto: VerifyJudicialSealDto) {
    const result = await this.courtsService.verifyJudicialSeal(dto);
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('judicial-orders')
  @ApiOperation({ summary: 'Ingest Judicial Order & Enforce Automatic Record Lock (isJudiciallyLocked: true)' })
  async ingestJudicialOrder(@Body() dto: IngestJudicialOrderDto) {
    const order = await this.courtsService.ingestJudicialOrder(dto);
    return {
      success: true,
      message: `Judicial Order ${order.orderNumber} ingested. Judicial Lock Status: ${order.isJudiciallyLocked}.`,
      data: order,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('sync-status')
  @ApiOperation({ summary: 'Synchronize Court Trial Status & Disposition (PENDING_PROSECUTION -> CONVICTION / ACQUITTAL)' })
  async syncCourtStatus(@Body() dto: SyncCourtStatusDto) {
    const record = await this.courtsService.syncCourtStatus(dto);
    return {
      success: true,
      message: `Charge Sheet ${record.chargeSheetNumber} trial status updated to ${record.trialStatus}.`,
      data: record,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('charge-sheets')
  @ApiOperation({ summary: 'List Court Prosecution Charge Sheets' })
  async getChargeSheets() {
    const list = await this.courtsService.getAllChargeSheets();
    return {
      success: true,
      count: list.length,
      data: list,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('orders')
  @ApiOperation({ summary: 'List Ingested Judicial Orders & Record Locks' })
  async getJudicialOrders() {
    const list = await this.courtsService.getAllJudicialOrders();
    return {
      success: true,
      count: list.length,
      data: list,
      timestamp: new Date().toISOString(),
    };
  }
}
