'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BiometricsWorkbenchPage() {
  const [verificationStatus, setVerificationStatus] = useState('PENDING_HUMAN_VERIFICATION');
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [verifierNotes, setVerifierNotes] = useState('');

  const mockSearchResult = {
    searchId: 'bio_search_001',
    algorithmVersion: 'NIPRIS-BIOMETRICS-DEEP-V3.2',
    candidateName: 'Chidi Okonkwo (alias "Chidi the Cobra")',
    candidatePersonId: 'person-chidi-001',
    matchConfidence: '94.8%',
    requiresHumanVerification: true,
  };

  const handleConfirmMatch = () => {
    if (!verifierNotes) return;
    setVerificationStatus('VERIFIED_MATCH');
    setShowVerifyModal(false);
    alert('✔ Biometric match confirmed by Human Verification Officer. Identity link saved to case ledger.');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Facial Recognition & Biometric Match Workbench</h2>
          <p className="text-xs text-slate-400">Deep facial feature vector search with mandatory human verification guardband.</p>
        </div>
        <Link href="/analytics" className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded">
          ← Back to Executive Dashboard
        </Link>
      </div>

      {/* Mandatory Human Verification Warning Banner */}
      <div className="p-4 bg-amber-950 border border-amber-800 rounded-lg space-y-1 text-amber-300">
        <div className="font-bold text-sm">⚖ MANDATORY CONSTITUTIONAL SAFETY GUARDBAND</div>
        <p className="text-[11px]">
          NIPRIS Rule #09: Automated AI biometric and facial recognition match candidates MUST NEVER be treated as confirmed identities without explicit human officer verification.
        </p>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div className="flex justify-between items-start border-b border-slate-800 pb-3">
          <div>
            <div className="text-amber-500 font-bold text-base">SEARCH ID: {mockSearchResult.searchId}</div>
            <div className="text-slate-400 text-[10px]">ALGORITHM VERSION: {mockSearchResult.algorithmVersion}</div>
          </div>
          <span
            className={`px-3 py-1 rounded font-bold border ${
              verificationStatus === 'VERIFIED_MATCH'
                ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                : 'bg-amber-950 text-amber-400 border-amber-800'
            }`}
          >
            STATUS: {verificationStatus}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-6 items-center">
          {/* Query Probe Image */}
          <div className="p-6 bg-slate-950 rounded border border-slate-800 flex flex-col items-center justify-center space-y-2 min-h-[180px]">
            <div className="h-20 w-20 rounded bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-slate-500">
              [PROBE]
            </div>
            <span className="text-slate-300 font-bold">Query Probe Image</span>
            <span className="text-[10px] text-slate-500">Captured CCTV / Bodycam Frame</span>
          </div>

          {/* Candidate Match Profile */}
          <div className="p-6 bg-slate-950 rounded border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-400 text-[10px]">MATCH CONFIDENCE</span>
              <span className="text-emerald-400 font-bold text-base">{mockSearchResult.matchConfidence}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">CANDIDATE PERSON</span>
              <Link href={`/persons/${mockSearchResult.candidatePersonId}`} className="text-amber-500 font-bold text-sm hover:underline">
                {mockSearchResult.candidateName} ↗
              </Link>
            </div>
            <div className="p-2.5 bg-slate-900 rounded border border-slate-800 text-slate-400 text-[10px]">
              Mandatory Human Verification Required: <span className="text-amber-400 font-bold">TRUE</span>
            </div>
          </div>
        </div>

        {verificationStatus === 'PENDING_HUMAN_VERIFICATION' && (
          <div className="p-4 bg-slate-950 rounded border border-slate-800 flex justify-between items-center">
            <div>
              <div className="font-bold text-slate-200">HUMAN VERIFIER REVIEW REQUIRED</div>
              <div className="text-[10px] text-slate-400">Inspect facial geometry, ear shape, scar alignment, and NIN photo reference before confirming match.</div>
            </div>
            <button
              onClick={() => setShowVerifyModal(true)}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded transition"
            >
              ✔ Confirm Match & Clear Identity
            </button>
          </div>
        )}
      </div>

      {showVerifyModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-100">HUMAN VERIFICATION OFFICER CLEARANCE</h3>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">MANDATORY VERIFICATION NOTES</label>
              <textarea
                value={verifierNotes}
                onChange={(e) => setVerifierNotes(e.target.value)}
                placeholder="State physical feature alignments verified (e.g. Ear contour, facial scar, NIN photo match)..."
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100 h-24"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowVerifyModal(false)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmMatch}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded text-xs"
              >
                Sign & Approve Biometric Match
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
