import { Controller, Get, Post, Body, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { BiometricSearchDto } from './dto/biometric-search.dto';
import { BiometricVerifyDto } from './dto/biometric-verify.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Advanced Analytics, Search & Biometrics Subsystem')
@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('biometric-search')
  @ApiOperation({ summary: 'Execute Facial Recognition Vector Search (Mandatory requiresHumanVerification: true)' })
  async executeBiometricSearch(@Body() dto: BiometricSearchDto) {
    const result = await this.analyticsService.executeBiometricSearch(dto);
    return {
      success: true,
      message: `Biometric facial recognition search completed. Enforced mandatory human verification rule.`,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('biometric-verify')
  @ApiOperation({ summary: 'Confirm or Reject Biometric Candidate Match (Human Verifier Clearance)' })
  async verifyBiometricMatch(@Body() dto: BiometricVerifyDto, @Req() req: any) {
    const officerId = req.user?.officerId || 'off-forensic-edo';
    const result = await this.analyticsService.verifyBiometricMatch(dto, officerId);
    return {
      success: true,
      message: `Biometric match search ${result.searchId} status updated to ${result.humanVerificationStatus}.`,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('heatmap')
  @ApiOperation({ summary: 'Retrieve National & State Crime Heatmap Density Metrics' })
  @ApiQuery({ name: 'state', required: false })
  async getCrimeHeatmap(@Query('state') state?: string) {
    const points = await this.analyticsService.getCrimeHeatmap(state);
    return {
      success: true,
      count: points.length,
      data: points,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('predictive-trends')
  @ApiOperation({ summary: 'Retrieve Predictive Crime Trend Forecasts & Modus Operandi Clustering' })
  async getPredictiveTrends() {
    const trends = await this.analyticsService.getPredictiveTrends();
    return {
      success: true,
      count: trends.length,
      data: trends,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('executive-summary')
  @ApiOperation({ summary: 'Retrieve IGP & State Commissioner Executive Command Analytics Dashboard Metrics' })
  async getExecutiveSummary() {
    const summary = await this.analyticsService.getExecutiveSummary();
    return {
      success: true,
      data: summary,
      timestamp: new Date().toISOString(),
    };
  }
}
