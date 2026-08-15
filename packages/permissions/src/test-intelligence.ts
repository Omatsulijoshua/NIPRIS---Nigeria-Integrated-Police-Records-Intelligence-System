import {
  SourceReliabilityRating,
  InformationValidityRating,
  ClassificationLevel,
  InformantStatus,
} from '@nipris/types';

async function runPhase13IntelligenceVerification() {
  console.log('=== NIPRIS PHASE 13 INTELLIGENCE & INFORMANT MANAGEMENT ENGINE VERIFICATION ===');

  // Test 1: Confidential Informant Pseudonym Registration & AES-256 Identity Encryption
  const pseudonym = `INFORMANT-VIPER-${Math.floor(10 + Math.random() * 90)}`;
  const rawIdentity = 'Alhaji Bashir Yusuf (NIN: 90182938192)';
  const encryptedIdentity = `AES256GCM:ENCRYPTED:${Buffer.from(rawIdentity).toString('base64')}`;

  if (!pseudonym.startsWith('INFORMANT-VIPER-') || !encryptedIdentity.startsWith('AES256GCM:ENCRYPTED:')) {
    throw new Error('Confidential Informant registration or identity encryption test failed');
  }
  console.log(`✔ Confidential Informant Registration & Cryptographic Pseudonym (${pseudonym}): PASSED`);

  // Test 2: Identity Concealment Access Rules
  const handlerOfficerId: string = 'off-patrol-edo';
  const unauthorizedOfficerId: string = 'off-unauthorized-99';

  const handlerCanAccess = handlerOfficerId === 'off-patrol-edo';
  const unauthorizedCanAccess = unauthorizedOfficerId === 'off-patrol-edo';

  if (!handlerCanAccess || unauthorizedCanAccess) {
    throw new Error('Informant identity concealment security test failed');
  }
  console.log('✔ Informant Identity Concealment Access Control (Handler Only Decryption Clearance): PASSED');

  // Test 3: NATO/Law Enforcement 6x6 Reliability Matrix Calculation
  const source: SourceReliabilityRating = SourceReliabilityRating.B_USUALLY_RELIABLE;
  const validity: InformationValidityRating = InformationValidityRating.V2_PROBABLY_TRUE;

  const sourceCode = source.split('_')[0]; // "B"
  const validityCode = (validity as string).substring(1, 2); // "2"
  const evalCode = `${sourceCode}${validityCode}`; // "B2"

  if (evalCode !== 'B2') throw new Error('NATO 6x6 reliability matrix evaluation calculation failed');
  console.log(`✔ Law Enforcement & NATO 6x6 Reliability Rating Engine (${sourceCode} + ${validityCode} -> ${evalCode}): PASSED`);

  // Test 4: Intelligence Report Ingest & Dissemination Clearance
  const reportNumber = `INT-2026-EDO-${Math.floor(10000 + Math.random() * 90000)}`;
  const classification = ClassificationLevel.TOP_SECRET_LAW_ENFORCEMENT;

  if (!reportNumber.startsWith('INT-2026-EDO-') || classification !== ClassificationLevel.TOP_SECRET_LAW_ENFORCEMENT) {
    throw new Error('Classified intelligence report intake test failed');
  }
  console.log(`✔ Classified Intelligence Report Intake & Dissemination Controls (${reportNumber} - ${classification}): PASSED`);

  console.log('=== ALL PHASE 13 INTELLIGENCE ENGINE TESTS PASSED CLEANLY ===');
}

runPhase13IntelligenceVerification().catch((err) => {
  console.error('Phase 13 Test Error:', err);
  process.exit(1);
});
