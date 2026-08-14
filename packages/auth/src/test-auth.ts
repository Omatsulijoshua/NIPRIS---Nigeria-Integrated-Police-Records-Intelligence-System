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

async function runTests() {
  console.log('=== NIPRIS AUTHENTICATION VERIFICATION SUITE ===');

  // Test 1: Password Hashing
  const raw = 'SecurePolicePassword123!';
  const hash = await hashPassword(raw);
  const match = await comparePassword(raw, hash);
  const wrongMatch = await comparePassword('WrongPass123!', hash);
  if (!match || wrongMatch) throw new Error('Password hash test failed');
  console.log('✔ Password Hashing & Comparison Test: PASSED');

  // Test 2: Password Policy
  const policyPass = validatePasswordPolicy('SecurePolicePassword123!').valid;
  const policyFail = validatePasswordPolicy('weak').valid;
  if (!policyPass || policyFail) throw new Error('Password policy test failed');
  console.log('✔ Password Policy Enforcement Test: PASSED');

  // Test 3: JWT Tokens
  const token = generateAccessToken({
    officerId: 'off-123',
    badgeNumber: 'NPF-9988',
    email: 'officer@test.local',
    role: OfficerRole.PATROL_OFFICER,
    orgId: 'org-edo',
    mfaVerified: true,
    sessionId: 'sess-001',
  });
  const decoded = verifyAccessToken(token);
  if (decoded.officerId !== 'off-123' || decoded.role !== OfficerRole.PATROL_OFFICER) {
    throw new Error('JWT token test failed');
  }
  console.log('✔ JWT Access Token Issuance & Verification Test: PASSED');

  // Test 4: TOTP MFA
  const { secret } = generateTotpSecret('NPF-9988');
  const invalidTotp = verifyTotpToken('000000', secret);
  if (invalidTotp) throw new Error('TOTP test failed');
  console.log('✔ Multi-Factor TOTP MFA Test: PASSED');

  console.log('=== ALL PHASE 2 SECURITY TESTS PASSED CLEANLY ===');
}

runTests().catch((err) => {
  console.error('Test error:', err);
  process.exit(1);
});
