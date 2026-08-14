import { Injectable, UnauthorizedException, ForbiddenException, BadRequestException, Logger } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { MfaVerifyDto } from './dto/mfa-verify.dto';
import { RegisterDeviceDto } from './dto/register-device.dto';
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  generateTotpSecret,
  verifyTotpToken,
} from '@nipris/auth';
import { OfficerRole, UserSessionPayload } from '@nipris/types';

interface LockoutRecord {
  attempts: number;
  lockedUntil?: Date;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  // In-memory fallback stores for development (Will bind to Redis / Prisma in DB phase)
  private readonly failedLogins = new Map<string, LockoutRecord>();
  private readonly activeSessions = new Map<string, UserSessionPayload>();
  private readonly challenges = new Map<string, { officer: any; expiresAt: Date }>();
  private readonly devices = new Map<string, any>();

  // Development mock officers database
  private readonly mockOfficers = new Map<string, any>([
    [
      'NPF-1001',
      {
        id: 'off-super-admin',
        badgeNumber: 'NPF-1001',
        firstName: 'System',
        lastName: 'Admin',
        email: 'national.admin@test.local',
        passwordHash: '$2a$12$e0MYzXyjpJS7Pd0RVvHwHeY8zKkP/.H2L5cWp.7yX3O6d6dK.e/xK', // 'SecurePass123!'
        role: OfficerRole.NATIONAL_SUPER_ADMIN,
        orgId: 'org-national-hq',
        mfaEnabled: true,
        mfaSecret: 'JBSWY3DPEHPK3PXP', // Fixed test TOTP secret
        isSuspended: false,
      },
    ],
    [
      'NPF-2002',
      {
        id: 'off-patrol-edo',
        badgeNumber: 'NPF-2002',
        firstName: 'Emmanuel',
        lastName: 'Okafor',
        email: 'patrol.officer@test.local',
        passwordHash: '$2a$12$e0MYzXyjpJS7Pd0RVvHwHeY8zKkP/.H2L5cWp.7yX3O6d6dK.e/xK', // 'SecurePass123!'
        role: OfficerRole.PATROL_OFFICER,
        orgId: 'org-edo-station-a',
        state: 'Edo',
        mfaEnabled: true,
        mfaSecret: 'JBSWY3DPEHPK3PXP',
        isSuspended: false,
      },
    ],
  ]);

  async validateOfficerLogin(loginDto: LoginDto): Promise<{ mfaRequired: boolean; challengeToken?: string }> {
    const { badgeNumber, password } = loginDto;

    // 1. Account Lockout Check
    const lockout = this.failedLogins.get(badgeNumber);
    if (lockout && lockout.lockedUntil && lockout.lockedUntil > new Date()) {
      const waitMinutes = Math.ceil((lockout.lockedUntil.getTime() - Date.now()) / 60000);
      throw new ForbiddenException(`Account temporarily locked due to excessive failed attempts. Try again in ${waitMinutes} minute(s).`);
    }

    // 2. Fetch Officer Account
    const officer = this.mockOfficers.get(badgeNumber);
    if (!officer) {
      this.recordFailedAttempt(badgeNumber);
      throw new UnauthorizedException('Invalid Officer Service ID or password credentials.');
    }

    // 3. Status Validation
    if (officer.isSuspended) {
      throw new ForbiddenException('Account suspended. Contact Law Enforcement System Administrator.');
    }

    // 4. Password Verification
    const isPasswordValid = await comparePassword(password, officer.passwordHash);
    if (!isPasswordValid) {
      this.recordFailedAttempt(badgeNumber);
      throw new UnauthorizedException('Invalid Officer Service ID or password credentials.');
    }

    // Clear failed attempts on success
    this.failedLogins.delete(badgeNumber);

    // 5. Issue MFA Challenge Token
    const challengeToken = `challenge_${Math.random().toString(36).substring(2)}_${Date.now()}`;
    this.challenges.set(challengeToken, {
      officer,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5-minute expiry
    });

    this.logger.log(`Successful credentials check for Badge ${badgeNumber}. Challenge issued.`);
    return { mfaRequired: true, challengeToken };
  }

  async verifyMfaChallenge(mfaDto: MfaVerifyDto): Promise<{ accessToken: string; refreshToken: string; session: UserSessionPayload }> {
    const { challengeToken, totpCode } = mfaDto;
    const challenge = this.challenges.get(challengeToken);

    if (!challenge || challenge.expiresAt < new Date()) {
      this.challenges.delete(challengeToken);
      throw new UnauthorizedException('MFA Challenge expired or invalid. Please re-authenticate.');
    }

    const { officer } = challenge;

    // Verify TOTP Code (Accept '123456' in dev or valid TOTP)
    const isTotpValid = totpCode === '123456' || verifyTotpToken(totpCode, officer.mfaSecret);
    if (!isTotpValid) {
      throw new UnauthorizedException('Invalid 6-digit TOTP authentication code.');
    }

    // Challenge consumed
    this.challenges.delete(challengeToken);

    // Create Active Session
    const sessionId = `sess_${Math.random().toString(36).substring(2)}_${Date.now()}`;
    const session: UserSessionPayload = {
      officerId: officer.id,
      badgeNumber: officer.badgeNumber,
      email: officer.email,
      role: officer.role,
      orgId: officer.orgId,
      state: officer.state,
      mfaVerified: true,
      sessionId,
    };

    this.activeSessions.set(sessionId, session);

    const accessToken = generateAccessToken(session);
    const refreshToken = generateRefreshToken(sessionId, officer.id);

    this.logger.log(`MFA verified. Session ${sessionId} created for Officer ${officer.badgeNumber}.`);
    return { accessToken, refreshToken, session };
  }

  async refreshTokens(refreshTokenStr: string): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const decoded = verifyRefreshToken(refreshTokenStr);
      const session = this.activeSessions.get(decoded.sessionId);

      if (!session) {
        throw new UnauthorizedException('Active session expired or revoked.');
      }

      // Rotate Refresh Token
      const newAccessToken = generateAccessToken(session);
      const newRefreshToken = generateRefreshToken(session.sessionId, session.officerId);

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token.');
    }
  }

  async logoutSession(sessionId: string): Promise<void> {
    this.activeSessions.delete(sessionId);
    this.logger.log(`Session ${sessionId} successfully revoked.`);
  }

  async registerDevice(dto: RegisterDeviceDto): Promise<{ deviceId: string; status: string }> {
    const deviceId = `dev_${Math.random().toString(36).substring(2)}`;
    const deviceRecord = {
      id: deviceId,
      serialNumber: dto.serialNumber,
      deviceType: dto.deviceType,
      officerId: dto.officerId || null,
      status: 'ACTIVE',
      registeredAt: new Date(),
    };
    this.devices.set(dto.serialNumber, deviceRecord);
    this.logger.log(`Device registered: ${dto.serialNumber} (${dto.deviceType})`);
    return { deviceId, status: 'ACTIVE' };
  }

  private recordFailedAttempt(badgeNumber: string) {
    const record = this.failedLogins.get(badgeNumber) || { attempts: 0 };
    record.attempts += 1;

    if (record.attempts >= 5) {
      record.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // 15-minute lock
      this.logger.warn(`Account ${badgeNumber} locked due to 5 consecutive failed login attempts.`);
    }

    this.failedLogins.set(badgeNumber, record);
  }
}
