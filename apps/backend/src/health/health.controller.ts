import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('System Health')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'NIPRIS System Health Endpoint' })
  checkHealth() {
    return {
      status: 'OK',
      system: 'Nigeria Integrated Police Records Intelligence System (NIPRIS)',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    };
  }
}
