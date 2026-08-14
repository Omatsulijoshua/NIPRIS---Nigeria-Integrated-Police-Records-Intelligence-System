export enum OrgLevel {
  NATIONAL_HQ = "NATIONAL_HQ",
  STATE_COMMAND = "STATE_COMMAND",
  AREA_COMMAND = "AREA_COMMAND",
  DIVISION = "DIVISION",
  POLICE_STATION = "POLICE_STATION",
  SPECIAL_UNIT = "SPECIAL_UNIT"
}

export enum OfficerRole {
  NATIONAL_SUPER_ADMIN = "NATIONAL_SUPER_ADMIN",     // Level 0
  NATIONAL_COMMAND_ADMIN = "NATIONAL_COMMAND_ADMIN", // Level 1
  STATE_COMMAND_ADMIN = "STATE_COMMAND_ADMIN",       // Level 2
  AREA_COMMAND_ADMIN = "AREA_COMMAND_ADMIN",         // Level 3
  DIVISION_ADMIN = "DIVISION_ADMIN",                 // Level 4
  STATION_COMMANDER = "STATION_COMMANDER",           // Level 5
  INVESTIGATING_OFFICER = "INVESTIGATING_OFFICER",   // Level 6
  PATROL_OFFICER = "PATROL_OFFICER",                 // Level 7
  EVIDENCE_OFFICER = "EVIDENCE_OFFICER",             // Level 8
  BODYCAM_ADMIN = "BODYCAM_ADMIN",                   // Level 9
  FORENSIC_OFFICER = "FORENSIC_OFFICER",             // Level 10
  AUDITOR = "AUDITOR",                               // Level 11
  INTERNAL_AFFAIRS = "INTERNAL_AFFAIRS",             // Level 12
  COURT_INTEGRATION = "COURT_INTEGRATION",           // Level 13
  READ_ONLY_VIEWER = "READ_ONLY_VIEWER"              // Level 14
}

export enum LegalStatus {
  ARREST = "ARREST",
  CHARGE = "CHARGE",
  PROSECUTION = "PROSECUTION",
  CONVICTION = "CONVICTION",
  ACQUITTAL = "ACQUITTAL",
  DISMISSED = "DISMISSED",
  PENDING = "PENDING",
  RELEASED = "RELEASED"
}

export enum ClassificationLevel {
  PUBLIC = "PUBLIC",
  INTERNAL = "INTERNAL",
  LAW_ENFORCEMENT_RESTRICTED = "LAW_ENFORCEMENT_RESTRICTED",
  HIGHLY_RESTRICTED = "HIGHLY_RESTRICTED",
  SEALED = "SEALED",
  BIOMETRIC_RESTRICTED = "BIOMETRIC_RESTRICTED",
  EVIDENCE_RESTRICTED = "EVIDENCE_RESTRICTED"
}

export enum IdentityMatchStatus {
  MATCH = "MATCH",
  POSSIBLE_MATCH = "POSSIBLE_MATCH",
  NO_MATCH = "NO_MATCH"
}

export enum WarrantStatus {
  ACTIVE = "ACTIVE",
  EXECUTED = "EXECUTED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
  SUSPENDED = "SUSPENDED"
}

export interface UserSessionPayload {
  officerId: string;
  badgeNumber: string;
  email: string;
  role: OfficerRole;
  orgId: string;
  state?: string;
  mfaVerified: boolean;
  sessionId: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}
