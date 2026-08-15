'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WantedPersonsPage() {
  const [wantedList, setWantedList] = useState([
    {
      id: 'wnt-edo-001',
      personId: 'person-chidi-001',
      personName: 'Chidi Okonkwo (alias "Chidi the Cobra")',
      riskLevel: 'ARMED_AND_DANGEROUS',
      bountyAmount: '₦5,000,000',
      caseNumber: 'CAS-2026-EDO-00109',
      warrantNumber: 'WAR-2026-EDO-00412',
      status: 'ACTIVE',
      remarks: 'Primary suspect in armed bank robbery. Believed to be armed with automatic rifles. Approach with extreme caution.',
    },
  ]);

  const handleMarkCaptured = (id: string) => {
    setWantedList((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: 'CAPTURED' } : w))
    );
    alert('Wanted status updated to CAPTURED. Custody intake log created.');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-red-500 font-mono">⚠ NPF WANTED PERSONS BULLETIN</h2>
          <p className="text-xs text-slate-400">High-priority fugitive target circulars, risk designations, and apprehend bounties.</p>
        </div>
        <Link href="/warrants" className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-mono">
          ← Back to Warrants Registry
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6 font-mono text-xs">
        {wantedList.map((w) => (
          <div key={w.id} className="p-6 bg-slate-900 border-2 border-red-900/60 rounded-lg space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-start">
              <span className="px-2.5 py-1 bg-red-950 text-red-400 border border-red-800 font-bold text-[11px] rounded">
                RISK: {w.riskLevel}
              </span>
              <span className={`px-2.5 py-1 rounded text-[11px] font-bold ${w.status === 'CAPTURED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                STATUS: {w.status}
              </span>
            </div>

            <div className="flex space-x-4 items-center">
              <div className="h-24 w-24 rounded bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-slate-600 text-xs">
                [PHOTO]
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-100">{w.personName}</h3>
                <div className="text-slate-400 text-[11px]">CASE REF: {w.caseNumber}</div>
                <div className="text-slate-400 text-[11px]">ACTIVE WARRANT: {w.warrantNumber}</div>
                <div className="text-amber-500 font-bold text-xs">BOUNTY REWARD: {w.bountyAmount}</div>
              </div>
            </div>

            <p className="text-slate-300 bg-slate-950 p-3 rounded border border-slate-800 text-[11px]">
              {w.remarks}
            </p>

            {w.status === 'ACTIVE' && (
              <button
                onClick={() => handleMarkCaptured(w.id)}
                className="w-full py-2 bg-emerald-700 hover:bg-emerald-600 text-slate-950 font-bold rounded text-xs transition"
              >
                ✔ Mark Suspect CAPTURED & Log Custody Intake
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
