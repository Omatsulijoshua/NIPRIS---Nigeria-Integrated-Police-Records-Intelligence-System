import { OfficerRole, UserSessionPayload } from "@nipris/types";

export interface TokenConfig {
  accessTokenSecret: string;
  refreshTokenSecret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

export function sanitizeOfficerPayload(payload: any): Partial<UserSessionPayload> {
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
