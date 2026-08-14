import { OfficerRole, ClassificationLevel } from "@nipris/types";

export enum ActionPermission {
  SYSTEM_CONFIG_MANAGE = "SYSTEM_CONFIG_MANAGE",
  USER_PROVISION_MANAGE = "USER_PROVISION_MANAGE",
  PERSON_SEARCH = "PERSON_SEARCH",
  CROSS_STATE_SEARCH = "CROSS_STATE_SEARCH",
  INCIDENT_CREATE = "INCIDENT_CREATE",
  INCIDENT_EDIT = "INCIDENT_EDIT",
  ARREST_CREATE = "ARREST_CREATE",
  ARREST_EDIT = "ARREST_EDIT",
  CASE_CREATE = "CASE_CREATE",
  CASE_EDIT = "CASE_EDIT",
  EVIDENCE_MANAGE = "EVIDENCE_MANAGE",
  BODYCAM_PLAYBACK = "BODYCAM_PLAYBACK",
  BIOMETRIC_MATCH = "BIOMETRIC_MATCH",
  AUDIT_LOG_VIEW = "AUDIT_LOG_VIEW",
  IA_MISCONDUCT_FLAG = "IA_MISCONDUCT_FLAG"
}

// Complete RBAC Matrix mapping Roles (L0 - L14) to Action Permissions
export const ROLE_PERMISSION_MATRIX: Record<OfficerRole, ActionPermission[]> = {
  [OfficerRole.NATIONAL_SUPER_ADMIN]: [
    ActionPermission.SYSTEM_CONFIG_MANAGE,
    ActionPermission.USER_PROVISION_MANAGE,
    ActionPermission.AUDIT_LOG_VIEW
  ],
  [OfficerRole.NATIONAL_COMMAND_ADMIN]: [
    ActionPermission.USER_PROVISION_MANAGE,
    ActionPermission.PERSON_SEARCH,
    ActionPermission.CROSS_STATE_SEARCH,
    ActionPermission.INCIDENT_CREATE,
    ActionPermission.INCIDENT_EDIT,
    ActionPermission.BODYCAM_PLAYBACK
  ],
  [OfficerRole.STATE_COMMAND_ADMIN]: [
    ActionPermission.USER_PROVISION_MANAGE,
    ActionPermission.PERSON_SEARCH,
    ActionPermission.CROSS_STATE_SEARCH,
    ActionPermission.INCIDENT_CREATE,
    ActionPermission.INCIDENT_EDIT,
    ActionPermission.ARREST_CREATE,
    ActionPermission.BODYCAM_PLAYBACK
  ],
  [OfficerRole.AREA_COMMAND_ADMIN]: [
    ActionPermission.PERSON_SEARCH,
    ActionPermission.INCIDENT_CREATE,
    ActionPermission.INCIDENT_EDIT,
    ActionPermission.ARREST_CREATE,
    ActionPermission.CASE_CREATE,
    ActionPermission.BODYCAM_PLAYBACK
  ],
  [OfficerRole.DIVISION_ADMIN]: [
    ActionPermission.PERSON_SEARCH,
    ActionPermission.INCIDENT_CREATE,
    ActionPermission.INCIDENT_EDIT,
    ActionPermission.ARREST_CREATE,
    ActionPermission.CASE_CREATE,
    ActionPermission.BODYCAM_PLAYBACK
  ],
  [OfficerRole.STATION_COMMANDER]: [
    ActionPermission.PERSON_SEARCH,
    ActionPermission.INCIDENT_CREATE,
    ActionPermission.INCIDENT_EDIT,
    ActionPermission.ARREST_CREATE,
    ActionPermission.ARREST_EDIT,
    ActionPermission.CASE_CREATE,
    ActionPermission.CASE_EDIT,
    ActionPermission.BODYCAM_PLAYBACK
  ],
  [OfficerRole.INVESTIGATING_OFFICER]: [
    ActionPermission.PERSON_SEARCH,
    ActionPermission.CROSS_STATE_SEARCH,
    ActionPermission.INCIDENT_CREATE,
    ActionPermission.INCIDENT_EDIT,
    ActionPermission.ARREST_CREATE,
    ActionPermission.CASE_CREATE,
    ActionPermission.CASE_EDIT,
    ActionPermission.EVIDENCE_MANAGE,
    ActionPermission.BODYCAM_PLAYBACK
  ],
  [OfficerRole.PATROL_OFFICER]: [
    ActionPermission.PERSON_SEARCH,
    ActionPermission.INCIDENT_CREATE,
    ActionPermission.ARREST_CREATE
  ],
  [OfficerRole.EVIDENCE_OFFICER]: [
    ActionPermission.EVIDENCE_MANAGE,
    ActionPermission.BODYCAM_PLAYBACK
  ],
  [OfficerRole.BODYCAM_ADMIN]: [
    ActionPermission.BODYCAM_PLAYBACK
  ],
  [OfficerRole.FORENSIC_OFFICER]: [
    ActionPermission.BIOMETRIC_MATCH,
    ActionPermission.PERSON_SEARCH
  ],
  [OfficerRole.AUDITOR]: [
    ActionPermission.AUDIT_LOG_VIEW
  ],
  [OfficerRole.INTERNAL_AFFAIRS]: [
    ActionPermission.AUDIT_LOG_VIEW,
    ActionPermission.IA_MISCONDUCT_FLAG,
    ActionPermission.PERSON_SEARCH,
    ActionPermission.BODYCAM_PLAYBACK
  ],
  [OfficerRole.COURT_INTEGRATION]: [
    ActionPermission.EVIDENCE_MANAGE
  ],
  [OfficerRole.READ_ONLY_VIEWER]: []
};

export interface AbacContextualRequest {
  role: OfficerRole;
  action: ActionPermission;
  officerOrgId: string;
  officerState?: string;
  targetRecordOrgId?: string;
  targetRecordState?: string;
  recordClassification: ClassificationLevel;
  operationalPurpose?: string;
  isSealed?: boolean;
}

export function evaluateAbacPolicy(request: AbacContextualRequest): { allowed: boolean; reason?: string } {
  // 1. RBAC Action Clearance Check
  const allowedActions = ROLE_PERMISSION_MATRIX[request.role] || [];
  if (!allowedActions.includes(request.action)) {
    return {
      allowed: false,
      reason: `Access restricted by your authorization level. Role '${request.role}' lacks permission for '${request.action}'.`
    };
  }

  // 2. Super Admin Isolation Guard
  if (request.role === OfficerRole.NATIONAL_SUPER_ADMIN && request.recordClassification !== ClassificationLevel.PUBLIC) {
    return {
      allowed: false,
      reason: "Infrastructure Super Admin is restricted from viewing operational criminal records."
    };
  }

  // 3. Sealed Record Guard
  if (request.isSealed) {
    return {
      allowed: false,
      reason: "Access restricted: Record is sealed by court order."
    };
  }

  // 4. Operational Purpose Requirement for Sensitive Lookups
  const requiresPurpose = [
    ClassificationLevel.LAW_ENFORCEMENT_RESTRICTED,
    ClassificationLevel.HIGHLY_RESTRICTED,
    ClassificationLevel.EVIDENCE_RESTRICTED,
    ClassificationLevel.BIOMETRIC_RESTRICTED
  ].includes(request.recordClassification);

  if (requiresPurpose && (!request.operationalPurpose || request.operationalPurpose.trim().length === 0)) {
    return {
      allowed: false,
      reason: "Access restricted: Valid operational purpose justification text/code is required."
    };
  }

  // 5. Cross-State Jurisdiction Guard
  if (request.action === ActionPermission.CROSS_STATE_SEARCH) {
    if (![OfficerRole.NATIONAL_COMMAND_ADMIN, OfficerRole.STATE_COMMAND_ADMIN, OfficerRole.INVESTIGATING_OFFICER, OfficerRole.INTERNAL_AFFAIRS].includes(request.role)) {
      return {
        allowed: false,
        reason: "Access restricted: Your role is not authorized for cross-state intelligence queries."
      };
    }
  }

  return { allowed: true };
}
