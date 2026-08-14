import { AuthService } from './auth.service';
import { OfficerRole } from '@nipris/types';

describe('AuthService Suite', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  it('should validate valid officer credentials and issue MFA challenge', async () => {
    const result = await authService.validateOfficerLogin({
      badgeNumber: 'NPF-1001',
      password: 'SecurePass123!',
    });

    expect(result.mfaRequired).toBe(true);
    expect(result.challengeToken).toBeDefined();
    expect(result.challengeToken).toContain('challenge_');
  });

  it('should reject invalid password and trigger account lockout after 5 failed attempts', async () => {
    const badLogin = { badgeNumber: 'NPF-1001', password: 'WrongPassword!' };

    // Attempt 1 to 4 should throw UnauthorizedException
    for (let i = 0; i < 4; i++) {
      await expect(authService.validateOfficerLogin(badLogin)).rejects.toThrow('Invalid Officer Service ID or password credentials.');
    }

    // 5th attempt triggers lockout
    await expect(authService.validateOfficerLogin(badLogin)).rejects.toThrow('Invalid Officer Service ID or password credentials.');

    // 6th attempt should fail with ForbiddenException (Account locked)
    await expect(authService.validateOfficerLogin(badLogin)).rejects.toThrow('Account temporarily locked due to excessive failed attempts.');
  });

  it('should verify MFA challenge and create active session', async () => {
    const { challengeToken } = await authService.validateOfficerLogin({
      badgeNumber: 'NPF-1001',
      password: 'SecurePass123!',
    });

    const mfaResult = await authService.verifyMfaChallenge({
      challengeToken: challengeToken!,
      totpCode: '123456',
    });

    expect(mfaResult.accessToken).toBeDefined();
    expect(mfaResult.refreshToken).toBeDefined();
    expect(mfaResult.session.badgeNumber).toBe('NPF-1001');
    expect(mfaResult.session.role).toBe(OfficerRole.NATIONAL_SUPER_ADMIN);
  });

  it('should register law enforcement device successfully', async () => {
    const device = await authService.registerDevice({
      serialNumber: 'BODYCAM-NG-900',
      deviceType: 'BODYCAM',
      officerId: 'off-patrol-edo',
    });

    expect(device.deviceId).toBeDefined();
    expect(device.status).toBe('ACTIVE');
  });
});
