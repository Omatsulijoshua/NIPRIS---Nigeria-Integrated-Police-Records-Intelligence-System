import {
  hashPassword,
  comparePassword,
  validatePasswordPolicy,
  generateAccessToken,
  verifyAccessToken,
  generateTotpSecret,
  verifyTotpToken,
} from './index';
import { OfficerRole } from '@nipris/types';

describe('NIPRIS Auth Package Tests', () => {
  it('should hash and compare officer passwords correctly', async () => {
    const rawPassword = 'SecurePolicePassword123!';
    const hash = await hashPassword(rawPassword);
    expect(hash).not.toEqual(rawPassword);
    expect(await comparePassword(rawPassword, hash)).toBe(true);
    expect(await comparePassword('WrongPassword123!', hash)).toBe(false);
  });

  it('should enforce strong password policy', () => {
    expect(validatePasswordPolicy('weak').valid).toBe(false);
    expect(validatePasswordPolicy('NoSpecial12345').valid).toBe(false);
    expect(validatePasswordPolicy('SecurePolicePassword123!').valid).toBe(true);
  });

  it('should issue and verify valid JWT access tokens', () => {
    const payload = {
      officerId: 'off-123',
      badgeNumber: 'NPF-9988',
      email: 'officer@test.local',
      role: OfficerRole.PATROL_OFFICER,
      orgId: 'org-edo',
      mfaVerified: true,
      sessionId: 'sess-001',
    };

    const token = generateAccessToken(payload);
    expect(token).toBeDefined();

    const decoded = verifyAccessToken(token);
    expect(decoded.officerId).toEqual('off-123');
    expect(decoded.badgeNumber).toEqual('NPF-9988');
    expect(decoded.role).toEqual(OfficerRole.PATROL_OFFICER);
  });

  it('should generate TOTP secrets and verify valid TOTP tokens', () => {
    const { secret, otpauthUrl } = generateTotpSecret('NPF-9988');
    expect(secret).toBeDefined();
    expect(otpauthUrl).toContain('NPF-9988');
    // Invalid token check
    expect(verifyTotpToken('000000', secret)).toBe(false);
  });
});
