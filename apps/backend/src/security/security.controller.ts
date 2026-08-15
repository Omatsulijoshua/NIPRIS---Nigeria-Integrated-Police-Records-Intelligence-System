import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SecurityService } from './security.service';
import { EncryptFieldDto } from './dto/encrypt-field.dto';
import { VerifyZeroTrustDto } from './dto/verify-zero-trust.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Security Audit, Hardening, Penetration Testing & Zero-Trust Subsystem')
@Controller('security')
@UseGuards(JwtAuthGuard)
export class SecurityController {
  constructor(private readonly securityService: SecurityService) {}

  @Post('encrypt')
  @ApiOperation({ summary: 'AES-256-GCM Field-Level Encryption Sandbox' })
  encryptField(@Body() dto: EncryptFieldDto) {
    const result = this.securityService.encryptField(dto);
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('scan-vulnerabilities')
  @ApiOperation({ summary: 'Run Automated Penetration Test & Vulnerability Scan (SQLi, XSS, Path Traversal)' })
  runScan() {
    const report = this.securityService.runPenetrationTestScan();
    return {
      success: true,
      data: report,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('verify-zero-trust')
  @ApiOperation({ summary: 'Evaluate Zero-Trust ABAC Policy Access Authorization' })
  verifyZeroTrust(@Body() dto: VerifyZeroTrustDto) {
    const result = this.securityService.verifyZeroTrustAccess(dto);
    return {
      success: result.accessGranted,
      message: result.accessGranted
        ? '✔ Zero-Trust ABAC authorization GRANTED.'
        : `❌ Zero-Trust ABAC authorization DENIED: ${result.denialReason}`,
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Get('headers')
  @ApiOperation({ summary: 'Inspect OWASP Hardened Security Response Headers' })
  getSecurityHeaders() {
    const headers = this.securityService.getSecurityHeaders();
    return {
      success: true,
      data: headers,
      timestamp: new Date().toISOString(),
    };
  }
}
