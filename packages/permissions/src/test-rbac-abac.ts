import { evaluateAbacPolicy, ActionPermission } from './index';
import { OfficerRole, ClassificationLevel } from '@nipris/types';

async function runAuthorizationMatrixVerification() {
  console.log('=== NIPRIS PHASE 4 RBAC + ABAC AUTHORIZATION ENGINE VERIFICATION ===');

  // Test 1: Patrol Officer Scenarios
  const patrolSearch = evaluateAbacPolicy({
    role: OfficerRole.PATROL_OFFICER,
    action: ActionPermission.PERSON_SEARCH,
    officerOrgId: 'org-edo-station-a',
    recordClassification: ClassificationLevel.LAW_ENFORCEMENT_RESTRICTED,
    operationalPurpose: 'Routine field identity validation during active patrol',
  });
  if (!patrolSearch.allowed) throw new Error('Patrol officer authorized search failed');
  console.log('✔ Patrol Officer Authorized Person Search: PASSED');

  const patrolAdminDenied = evaluateAbacPolicy({
    role: OfficerRole.PATROL_OFFICER,
    action: ActionPermission.USER_PROVISION_MANAGE,
    officerOrgId: 'org-edo-station-a',
    recordClassification: ClassificationLevel.INTERNAL,
  });
  if (patrolAdminDenied.allowed) throw new Error('Patrol officer should NOT have user admin permission');
  console.log('✔ Patrol Officer User Admin Attempt (DENIED): PASSED');

  // Test 2: Evidence Officer Scenarios
  const evidenceManage = evaluateAbacPolicy({
    role: OfficerRole.EVIDENCE_OFFICER,
    action: ActionPermission.EVIDENCE_MANAGE,
    officerOrgId: 'org-edo-station-a',
    recordClassification: ClassificationLevel.EVIDENCE_RESTRICTED,
    operationalPurpose: 'Intake and chain of custody hashing of firearm evidence',
  });
  if (!evidenceManage.allowed) throw new Error('Evidence officer manage evidence failed');
  console.log('✔ Evidence Officer Evidence Intake & Management: PASSED');

  const evidenceEditCriminalHistory = evaluateAbacPolicy({
    role: OfficerRole.EVIDENCE_OFFICER,
    action: ActionPermission.ARREST_EDIT,
    officerOrgId: 'org-edo-station-a',
    recordClassification: ClassificationLevel.LAW_ENFORCEMENT_RESTRICTED,
    operationalPurpose: 'Attempt to edit arrest charges',
  });
  if (evidenceEditCriminalHistory.allowed) throw new Error('Evidence officer should NOT have arrest edit permission');
  console.log('✔ Evidence Officer Edit Criminal History Attempt (DENIED): PASSED');

  // Test 3: Auditor Scenarios
  const auditorLogView = evaluateAbacPolicy({
    role: OfficerRole.AUDITOR,
    action: ActionPermission.AUDIT_LOG_VIEW,
    officerOrgId: 'org-national-hq',
    recordClassification: ClassificationLevel.INTERNAL,
  });
  if (!auditorLogView.allowed) throw new Error('Auditor audit log view failed');
  console.log('✔ Auditor Inspect Audit Logs (Read-Only): PASSED');

  const auditorModifyRecord = evaluateAbacPolicy({
    role: OfficerRole.AUDITOR,
    action: ActionPermission.INCIDENT_EDIT,
    officerOrgId: 'org-national-hq',
    recordClassification: ClassificationLevel.LAW_ENFORCEMENT_RESTRICTED,
    operationalPurpose: 'Attempt to modify incident report',
  });
  if (auditorModifyRecord.allowed) throw new Error('Auditor should NOT have incident edit permission');
  console.log('✔ Auditor Modify Record Attempt (DENIED): PASSED');

  // Test 4: Forensic Officer Scenarios
  const forensicBiometric = evaluateAbacPolicy({
    role: OfficerRole.FORENSIC_OFFICER,
    action: ActionPermission.BIOMETRIC_MATCH,
    officerOrgId: 'org-national-hq',
    recordClassification: ClassificationLevel.BIOMETRIC_RESTRICTED,
    operationalPurpose: 'Case #2026-BENIN-889 latent fingerprint comparison',
  });
  if (!forensicBiometric.allowed) throw new Error('Forensic officer biometric match failed');
  console.log('✔ Forensic Officer Authorized Biometric Comparison: PASSED');

  const forensicWithoutPurpose = evaluateAbacPolicy({
    role: OfficerRole.FORENSIC_OFFICER,
    action: ActionPermission.BIOMETRIC_MATCH,
    officerOrgId: 'org-national-hq',
    recordClassification: ClassificationLevel.BIOMETRIC_RESTRICTED,
    operationalPurpose: '', // Empty purpose!
  });
  if (forensicWithoutPurpose.allowed) throw new Error('Biometric search without purpose should be DENIED');
  console.log('✔ Forensic Officer Biometric Match Without Purpose (DENIED): PASSED');

  // Test 5: Level 0 Super Admin Isolation
  const superAdminRecordRead = evaluateAbacPolicy({
    role: OfficerRole.NATIONAL_SUPER_ADMIN,
    action: ActionPermission.PERSON_SEARCH,
    officerOrgId: 'org-national-hq',
    recordClassification: ClassificationLevel.LAW_ENFORCEMENT_RESTRICTED,
    operationalPurpose: 'Curiosity query',
  });
  if (superAdminRecordRead.allowed) throw new Error('Level 0 Super Admin should be restricted from reading criminal records');
  console.log('✔ Level 0 Infrastructure Super Admin Record View (DENIED): PASSED');

  // Test 6: Unauthorized Cross-State Search Attempt
  const unauthorizedCrossState = evaluateAbacPolicy({
    role: OfficerRole.PATROL_OFFICER,
    action: ActionPermission.CROSS_STATE_SEARCH,
    officerOrgId: 'org-edo-station-a',
    recordClassification: ClassificationLevel.LAW_ENFORCEMENT_RESTRICTED,
    operationalPurpose: 'Query Lagos records from Edo station',
  });
  if (unauthorizedCrossState.allowed) throw new Error('Patrol officer unauthorized cross-state search MUST fail');
  console.log('✔ Unauthorized Cross-State Intelligence Access Attempt (DENIED): PASSED');

  console.log('=== ALL PHASE 4 AUTHORIZATION MATRIX TESTS PASSED CLEANLY ===');
}

runAuthorizationMatrixVerification().catch((err) => {
  console.error('Authorization Test Error:', err);
  process.exit(1);
});
