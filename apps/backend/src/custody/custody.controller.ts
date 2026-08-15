import { Controller, Get, Post, Body, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CustodyService } from './custody.service';
import { CreateCustodyTransferDto } from './dto/create-custody-transfer.dto';
import { UpdateRemandStatusDto } from './dto/update-remand-status.dto';
import { RecordInmateMovementDto } from './dto/record-inmate-movement.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Correctional & Detention Center Integration Subsystem')
@Controller('custody')
@UseGuards(JwtAuthGuard)
export class CustodyController {
  constructor(private readonly custodyService: CustodyService) {}

  @Post('transfers')
  @ApiOperation({ summary: 'Execute Police-to-NCoS Correctional Custody Transfer' })
  async transferCustody(@Body() dto: CreateCustodyTransferDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-custody-edo';
    const record = await this.custodyService.transferCustody(dto, officerId);
    return {
      success: true,
      message: `NCoS Custody Transfer ${record.transferNumber} executed for Inmate ${record.inmateName}.`,
      data: record,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('remand-status')
  @ApiOperation({ summary: 'Update Remand Warrant & Sentence Status' })
  async updateRemandStatus(@Body() dto: UpdateRemandStatusDto) {
    const record = await this.custodyService.updateRemandStatus(dto);
    return {
      success: true,
      message: `Remand status for Transfer ${record.transferNumber} updated to ${record.remandStatus}.`,
      data: record,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('movements')
  @ApiOperation({ summary: 'Record Inmate Transport & Court Movement Log' })
  async recordInmateMovement(@Body() dto: RecordInmateMovementDto) {
    const entry = await this.custodyService.recordInmateMovement(dto);
    return {
      success: true,
      message: `Inmate movement recorded for ${entry.inmateName} (${entry.movementType}).`,
      data: entry,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('capacity')
  @ApiOperation({ summary: 'Retrieve Cell Capacity & Overcrowding Alert Metrics (36 States + FCT)' })
  @ApiQuery({ name: 'state', required: false })
  async getCellCapacities(@Query('state') state?: string) {
    const capacities = await this.custodyService.getCellCapacities(state);
    return {
      success: true,
      count: capacities.length,
      data: capacities,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('inmates')
  @ApiOperation({ summary: 'List NCoS Custody Transfers Roster' })
  async getTransfers() {
    const list = await this.custodyService.getAllTransfers();
    return {
      success: true,
      count: list.length,
      data: list,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('movements')
  @ApiOperation({ summary: 'List Active Inmate Movement Logs' })
  async getMovements() {
    const list = await this.custodyService.getAllMovements();
    return {
      success: true,
      count: list.length,
      data: list,
      timestamp: new Date().toISOString(),
    };
  }
}
