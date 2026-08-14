import { OfficerRole, ClassificationLevel } from "@nipris/types";

export interface ContextualAccessRequest {
  role: OfficerRole;
  officerOrgId: string;
  officerState?: string;
  targetRecordOrgId?: string;
  targetRecordState?: string;
  recordClassification: ClassificationLevel;
  operationalPurposeSubmitted: boolean;
  isSealed: boolean;
}

export function evaluateAccessPolicy(request: ContextualAccessRequest): { allowed: boolean; reason?: string } {
  // Sealed record guard
  if (request.isSealed && request.role !== OfficerRole.NATIONAL_SUPER_ADMIN) {
    return { allowed: false, reason: "Access restricted: Record is sealed by judicial order." };
  }

  // Super Admin infrastructure restriction guard
  if (request.role === OfficerRole.NATIONAL_SUPER_ADMIN && request.recordClassification !== ClassificationLevel.PUBLIC) {
    return { allowed: false, reason: "Infrastructure Super Admin is restricted from reading criminal record payloads." };
  }

  // Operational purpose requirement
  if (!request.operationalPurposeSubmitted && request.recordClassification !== ClassificationLevel.PUBLIC) {
    return { allowed: false, reason: "Access restricted: Operational purpose justification required." };
  }

  return { allowed: true };
}
