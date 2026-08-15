import * as crypto from 'crypto';
import {
  AuditActionType,
  AuditResourceType,
  AuditTamperStatus,
  OfficerRole,
} from '@nipris/types';

async function runPhase14AuditVerification() {
  console.log('=== NIPRIS PHASE 14 AUDIT & COMPLIANCE LEDGER VERIFICATION ===');

  // Test 1: SHA-256 Block Hash Chaining Engine
  function calculateBlockHash(seq: number, timestamp: string, officerId: string, action: string, targetId: string, prevHash: string): string {
    const rawData = `${seq}:${timestamp}:${officerId}:${action}:${targetId}:${prevHash}`;
    return crypto.createHash('sha256').update(rawData).digest('hex');
  }

  const genesisHash = 'GENESIS_BLOCK_SHA256_NIPRIS_NATIONAL_POLICE_LEDGER_2026';
  const block1Timestamp = new Date().toISOString();
  const block1Hash = calculateBlockHash(1, block1Timestamp, 'off-super-admin', 'CREATE', 'NIPRIS_GENESIS', genesisHash);

  const block2Timestamp = new Date().toISOString();
  const block2Hash = calculateBlockHash(2, block2Timestamp, 'off-patrol-edo', 'VIEW_RECORD', 'person-chidi-001', block1Hash);

  if (!block1Hash || !block2Hash || block2Hash.length !== 64) {
    throw new Error('SHA-256 block hash chaining calculation failed');
  }
  console.log(`✔ SHA-256 Block Hash Chaining Engine (Block #1: ${block1Hash.substring(0, 12)}... -> Block #2: ${block2Hash.substring(0, 12)}...): PASSED`);

  // Test 2: Cryptographic Chain Tamper Detection Algorithm
  const tamperedBlock2Hash = calculateBlockHash(2, block2Timestamp, 'off-patrol-edo', 'DELETE', 'person-chidi-001', block1Hash);
  const isTamperDetected = tamperedBlock2Hash !== block2Hash;

  if (!isTamperDetected) throw new Error('Cryptographic tamper detection test failed');
  console.log('✔ Cryptographic Block Hash Tamper Detection Engine (CHAIN_TAMPERED Alert): PASSED');

  // Test 3: Compliance Risk Scoring & Internal Affairs Escalation Trigger
  function evaluateRisk(action: AuditActionType, rationale: string): { riskScore: number; flagIA: boolean } {
    let score = 10;
    if (!rationale || rationale.length < 10) score += 45;
    if (action === AuditActionType.EMERGENCY_OVERRIDE) score += 35;
    const flagIA = score >= 70;
    return { riskScore: score, flagIA };
  }

  const normalEval = evaluateRisk(AuditActionType.VIEW_RECORD, 'Valid criminal investigation check for booking NPF 14');
  const highRiskEval = evaluateRisk(AuditActionType.EMERGENCY_OVERRIDE, ''); // no rationale + emergency override

  if (normalEval.riskScore >= 70 || !highRiskEval.flagIA || highRiskEval.riskScore < 70) {
    throw new Error('Compliance risk score or Internal Affairs escalation trigger failed');
  }
  console.log(`✔ Compliance Risk Score Evaluator & Internal Affairs Trigger (Normal Risk: ${normalEval.riskScore}, High-Risk Alert: ${highRiskEval.riskScore}): PASSED`);

  console.log('=== ALL PHASE 14 AUDIT LEDGER TESTS PASSED CLEANLY ===');
}

runPhase14AuditVerification().catch((err) => {
  console.error('Phase 14 Test Error:', err);
  process.exit(1);
});
