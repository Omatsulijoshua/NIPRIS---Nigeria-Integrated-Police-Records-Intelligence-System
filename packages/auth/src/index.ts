import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { authenticator } from 'otplib';
import { OfficerRole, UserSessionPayload } from '@nipris/types';

export interface TokenConfig {
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

export const DEFAULT_TOKEN_CONFIG: TokenConfig = {
  accessTokenSecret: process.env.JWT_ACCESS_SECRET || 'DEVELOPMENT_ONLY_JWT_ACCESS_SECRET_KEY_NIPRIS_2026',
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET || 'DEVELOPMENT_ONLY_JWT_REFRESH_SECRET_KEY_NIPRIS_2026',
  accessTokenExpiresIn: '15m',
  refreshTokenExpiresIn: '7d',
};

// 1. Password Security
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function validatePasswordPolicy(password: string): { valid: boolean; reason?: string } {
  if (!password || password.length < 12) {
    return { valid: false, reason: 'Password must be at least 12 characters in length.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, reason: 'Password must contain at least one uppercase letter.' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, reason: 'Password must contain at least one lowercase letter.' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, reason: 'Password must contain at least one numeric digit.' };
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return { valid: false, reason: 'Password must contain at least one special character.' };
  }
  return { valid: true };
}

// 2. JWT Access & Refresh Token Management
export function generateAccessToken(payload: UserSessionPayload, config: TokenConfig = DEFAULT_TOKEN_CONFIG): string {
  return jwt.sign(payload, config.accessTokenSecret, { expiresIn: config.accessTokenExpiresIn as any });
}

export function generateRefreshToken(sessionId: string, officerId: string, config: TokenConfig = DEFAULT_TOKEN_CONFIG): string {
  return jwt.sign({ sessionId, officerId }, config.refreshTokenSecret, { expiresIn: config.refreshTokenExpiresIn as any });
}

export function verifyAccessToken(token: string, config: TokenConfig = DEFAULT_TOKEN_CONFIG): UserSessionPayload {
  return jwt.verify(token, config.accessTokenSecret) as UserSessionPayload;
}

export function verifyRefreshToken(token: string, config: TokenConfig = DEFAULT_TOKEN_CONFIG): { sessionId: string; officerId: string } {
  return jwt.verify(token, config.refreshTokenSecret) as { sessionId: string; officerId: string };
}

// 3. Multi-Factor Authentication (TOTP MFA)
export function generateTotpSecret(badgeNumber: string): { secret: string; otpauthUrl: string } {
  const secret = authenticator.generateSecret();
  const otpauthUrl = authenticator.keyuri(badgeNumber, 'NIPRIS Law Enforcement System', secret);
  return { secret, otpauthUrl };
}

export function verifyTotpToken(token: string, secret: string): boolean {
  try {
    return authenticator.verify({ token, secret });
  } catch (err) {
    return false;
  }
}

// 4. Session Sanitization
export function sanitizeOfficerPayload(payload: any): UserSessionPayload {
  return {
    officerId: payload.officerId,
    badgeNumber: payload.badgeNumber,
    email: payload.email,
    role: payload.role as OfficerRole,
    orgId: payload.orgId,
    state: payload.state,
    mfaVerified: !!payload.mfaVerified,
    sessionId: payload.sessionId,
  };
}
