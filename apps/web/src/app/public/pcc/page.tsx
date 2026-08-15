'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PccStatusPage() {
  const [trackingNumber, setTrackingNumber] = useState('PCC-2026-NPF-00912');
  const [pccRecord, setPccRecord] = useState<any | null>({
    trackingNumber: 'PCC-2026-NPF-00912',
    formNPF11Code: 'FORM_NPF_11_CHARACTER_CLEARANCE_2026',
    applicantName: 'Chidi Okonkwo',
    applicantNin: '10928374829',
    purpose: 'International Employment Visa & Background Clearance',
    status: 'BACKGROUND_CHECK_IN_PROGRESS',
    hasCriminalRecord: false,
    appliedAt: '2026-08-15',
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-amber-500">📜 POLICE CLEARANCE CERTIFICATE (PCC FORM NPF 11) TRACKER</h2>
          <p className="text-xs text-slate-400">Track character clearance background check status and digital certificate verification.</p>
        </div>
        <Link href="/public" className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded">
          ← Back to Public Portal
        </Link>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div className="flex space-x-3">
          <input
            type="text"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            placeholder="Enter PCC Tracking Number (e.g. PCC-2026-NPF-00912)..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded p-2.5 text-xs text-slate-100 font-bold"
          />
          <button
            onClick={() => {}}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded transition"
          >
            Track Status
          </button>
        </div>

        {pccRecord && (
          <div className="p-6 bg-slate-950 border border-slate-800 rounded-lg space-y-4">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3">
              <div>
                <div className="text-amber-500 font-bold text-base">TRACKING #: {pccRecord.trackingNumber}</div>
                <div className="text-slate-400 text-[10px]">{pccRecord.formNPF11Code}</div>
              </div>
              <span className="px-3 py-1 bg-amber-950 text-amber-400 border border-amber-800 rounded font-bold text-xs">
                STATUS: {pccRecord.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-slate-300">
              <div>
                <span className="text-[10px] text-slate-500 block">APPLICANT NAME & NIN</span>
                <span className="font-bold text-slate-100">{pccRecord.applicantName}</span> (NIN: {pccRecord.applicantNin})
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">PURPOSE OF CLEARANCE</span>
                <span className="font-bold text-slate-200">{pccRecord.purpose}</span>
              </div>
            </div>

            {/* Background Check Timeline Progress */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-slate-400 font-bold text-[11px]">BACKGROUND CHECK MILESTONES:</div>
              <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                <div className="p-2 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded font-bold">1. Application Submitted</div>
                <div className="p-2 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded font-bold">2. Biometrics Verified</div>
                <div className="p-2 bg-amber-950 text-amber-400 border border-amber-800 rounded font-bold animate-pulse">3. Background Check</div>
                <div className="p-2 bg-slate-900 text-slate-600 border border-slate-800 rounded">4. Certificate Issued</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
