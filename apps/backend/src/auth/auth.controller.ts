import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { MfaVerifyDto } from './dto/mfa-verify.dto';
import { RegisterDeviceDto } from './dto/register-device.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Authentication & Security Gateway')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Officer Service ID & Password Authentication' })
  @SwaggerResponse({ status: 200, description: 'Credentials validated. MFA challenge issued.' })
  @SwaggerResponse({ status: 401, description: 'Invalid credentials.' })
  @SwaggerResponse({ status: 403, description: 'Account locked or suspended.' })
  async login(@Body() loginDto: LoginDto) {
    const result = await this.authService.validateOfficerLogin(loginDto);
    return {
      success: true,
      message: 'Credentials validated. Multi-factor TOTP verification required.',
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('mfa/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify 6-Digit TOTP MFA Code' })
  @SwaggerResponse({ status: 200, description: 'MFA verified. Access and Refresh Tokens issued.' })
  async verifyMfa(@Body() mfaDto: MfaVerifyDto) {
    const result = await this.authService.verifyMfaChallenge(mfaDto);
    return {
      success: true,
      message: 'MFA authentication successful. Session established.',
      data: result,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Rotate Refresh Token & Issue Fresh Access Token' })
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    const tokens = await this.authService.refreshTokens(refreshToken);
    return {
      success: true,
      data: tokens,
      timestamp: new Date().toISOString(),
    };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Terminate Officer Active Session' })
  async logout(@Req() req: any) {
    const sessionId = req.user?.sessionId;
    if (sessionId) {
      await this.authService.logoutSession(sessionId);
    }
    return {
      success: true,
      message: 'Session successfully revoked.',
      timestamp: new Date().toISOString(),
    };
  }

  @Post('device/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register Law Enforcement Terminal / Bodycam Device' })
  async registerDevice(@Body() dto: RegisterDeviceDto) {
    const result = await this.authService.registerDevice(dto);
    return {
      success: true,
      message: 'Device bound to NIPRIS fleet registry.',
      data: result,
      timestamp: new Date().toISOString(),
    };
  }
}
