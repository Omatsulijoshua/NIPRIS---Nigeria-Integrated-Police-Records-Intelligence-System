'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InternalAffairsFlaggedPage() {
  const [escalations, setEscalations] = useState([
    {
      id: 'aud-002',
      seq: 10491,
      officer: 'Patrol Officer Chinedu Eke (NPF-8812)',
      role: 'PATROL_OFFICER',
      action: 'EMERGENCY_OVERRIDE',
      resource: 'ARREST (ARR-2026-LAGOS-00891)',
      rationale: 'Hot pursuit cross-border emergency',
      riskScore: 85,
      status: 'PENDING_IA_REVIEW',
    },
  ]);

  const handleResolve = (id: string) => {
    setEscalations((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'CLEARED_BY_IA' } : e))
    );
    alert('Internal Affairs investigation log appended. Query cleared.');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-red-400">🚨 INTERNAL AFFAIRS (LEVEL 12) ESCALATION QUEUE</h2>
          <p className="text-xs text-slate-400">High-risk anomalous access queries flagged for internal investigation.</p>
        </div>
        <Link href="/audit" className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded">
          ← Back to Audit Dashboard
        </Link>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">FLAGGED ANOMALOUS ACCESS EVENTS</h3>
        <div className="space-y-3">
          {escalations.map((e) => (
            <div key={e.id} className="p-5 bg-slate-950 border-2 border-red-900/60 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <span className="font-bold text-amber-500 text-sm">BLOCK #{e.seq} — ACTION: {e.action}</span>
                <span className="px-2.5 py-0.5 bg-red-950 text-red-400 border border-red-800 font-bold rounded text-[10px]">
                  RISK SCORE: {e.riskScore} / 100
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-slate-300">
                <div>
                  <span className="text-[10px] text-slate-500 block">OFFICER & ROLE</span>
                  <span className="font-bold text-slate-100">{e.officer}</span> ({e.role})
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">TARGET RESOURCE</span>
                  <span className="font-bold text-amber-400">{e.resource}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded border border-slate-800 text-slate-300 text-[11px]">
                RATIONALE: {e.rationale}
              </div>

              {e.status === 'PENDING_IA_REVIEW' ? (
                <button
                  onClick={() => handleResolve(e.id)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-slate-950 font-bold rounded text-xs transition"
                >
                  ✔ Review Justification & Clear Flag
                </button>
              ) : (
                <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded font-bold text-[10px]">
                  CLEARED BY IA
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
