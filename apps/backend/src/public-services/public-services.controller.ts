import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PublicServicesService } from './public-services.service';
import { CreatePublicCrimeTipDto } from './dto/create-public-crime-tip.dto';
import { ApplyPccDto } from './dto/apply-pcc.dto';
import { LookupStolenVehicleDto } from './dto/lookup-stolen-vehicle.dto';

@ApiTags('Public Citizen & Police Services Subsystem')
@Controller('public')
export class PublicServicesController {
  constructor(private readonly publicServicesService: PublicServicesService) {}

  @Post('tips')
  @ApiOperation({ summary: 'Submit Anonymous or Identified Public Crime Tip' })
  async submitCrimeTip(@Body() dto: CreatePublicCrimeTipDto) {
    const tip = await this.publicServicesService.submitCrimeTip(dto);
    return {
      success: true,
      message: `Crime Tip ${tip.tipReferenceNumber} received. Thank you for assisting national law enforcement.`,
      data: tip,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('pcc/apply')
  @ApiOperation({ summary: 'Apply for Police Clearance Certificate (PCC Form NPF 11)' })
  async applyForPcc(@Body() dto: ApplyPccDto) {
    const record = await this.publicServicesService.applyForPcc(dto);
    return {
      success: true,
      message: `Police Clearance Certificate application submitted. Tracking Number: ${record.trackingNumber}.`,
      data: record,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('pcc/status/:trackingNumber')
  @ApiOperation({ summary: 'Track Police Clearance Certificate (PCC) Background Check Status' })
  async getPccStatus(@Param('trackingNumber') trackingNumber: string) {
    const record = await this.publicServicesService.getPccStatus(trackingNumber);
    return {
      success: true,
      data: record,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('circulars/wanted')
  @ApiOperation({ summary: 'Fetch Public Wanted Persons Circular Board' })
  async getPublicWantedCirculars() {
    const circulars = await this.publicServicesService.getPublicWantedCirculars();
    return {
      success: true,
      count: circulars.length,
      data: circulars,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('stolen-vehicles/lookup')
  @ApiOperation({ summary: 'Search Stolen Vehicle & Property Registry (Plate Number / VIN)' })
  async lookupStolenVehicle(@Body() dto: LookupStolenVehicleDto) {
    const result = await this.publicServicesService.lookupStolenVehicle(dto);
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }
}
