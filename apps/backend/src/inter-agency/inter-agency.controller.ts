import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InterAgencyService } from './inter-agency.service';
import { VerifyNimcNinDto } from './dto/verify-nimc-nin.dto';
import { VerifyFrscLicenseDto } from './dto/verify-frsc-license.dto';
import { VerifyInecVoterIdDto } from './dto/verify-inec-voter-id.dto';
import { VerifyNisPassportDto } from './dto/verify-nis-passport.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Inter-Agency & External Data Gateway Subsystem')
@Controller('inter-agency')
@UseGuards(JwtAuthGuard)
export class InterAgencyController {
  constructor(private readonly interAgencyService: InterAgencyService) {}

  @Post('nimc/nin')
  @ApiOperation({ summary: 'NIMC Gateway: Verify 11-Digit National Identification Number (NIN)' })
  async verifyNimc(@Body() dto: VerifyNimcNinDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-patrol-edo';
    const result = await this.interAgencyService.verifyNimc(dto, officerId);
    return {
      success: true,
      message: `NIMC National Identity Database query verified for NIN ${result.nin}.`,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('frsc/license')
  @ApiOperation({ summary: 'FRSC Gateway: Verify Driver License & Vehicle Registration VIN' })
  async verifyFrsc(@Body() dto: VerifyFrscLicenseDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-patrol-edo';
    const result = await this.interAgencyService.verifyFrsc(dto, officerId);
    return {
      success: true,
      message: `FRSC Driver License & Vehicle Database query verified for ${result.licenseOrVinNumber}.`,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('inec/voter-id')
  @ApiOperation({ summary: 'INEC Gateway: Verify Voter Identification Number (VIN)' })
  async verifyInec(@Body() dto: VerifyInecVoterIdDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-patrol-edo';
    const result = await this.interAgencyService.verifyInec(dto, officerId);
    return {
      success: true,
      message: `INEC National Voter Register query verified for VIN ${result.voterVin}.`,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('nis/passport')
  @ApiOperation({ summary: 'NIS Gateway: Verify International Passport & Border Watchlist Status' })
  async verifyNis(@Body() dto: VerifyNisPassportDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-patrol-edo';
    const result = await this.interAgencyService.verifyNis(dto, officerId);
    return {
      success: true,
      message: `NIS International Passport query verified for Passport ${result.passportNumber}.`,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('audit-logs')
  @ApiOperation({ summary: 'Retrieve Inter-Agency Query Operational Purpose Audit Ledger' })
  async getInterAgencyAuditLogs() {
    const logs = await this.interAgencyService.getInterAgencyAuditLogs();
    return {
      success: true,
      count: logs.length,
      data: logs,
      timestamp: new Date().toISOString(),
    };
  }
}
