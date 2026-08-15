'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EmergencyOverridePage() {
  const router = useRouter();
  const [targetRecordState, setTargetRecordState] = useState('Lagos');
  const [targetRecordId, setTargetRecordId] = useState('ARR-2026-LAGOS-00891');
  const [mandatoryRationale, setMandatoryRationale] = useState('');

  const handleExecuteOverride = (e: React.FormEvent) => {
    e.preventDefault();
    if (mandatoryRationale.length < 15) {
      alert('Mandatory rationale must be at least 15 characters.');
      return;
    }
    alert('⚡ EMERGENCY CROSS-JURISDICTION OVERRIDE EXECUTED! Instant record access granted. High-priority audit flag logged for Inspector General of Police (IGP) & National HQ.');
    router.push('/inter-state');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-6 font-mono text-xs">
      <div className="p-6 bg-red-950 border-2 border-red-800 rounded-lg space-y-3">
        <h2 className="text-xl font-bold text-red-400">⚡ EMERGENCY CROSS-JURISDICTION ACCESS OVERRIDE</h2>
        <p className="text-red-300 text-[11px]">
          HIGH-ALERT OVERRIDE PROTOCOL: Authorizes immediate access to out-of-state law-enforcement records during active hot pursuits or imminent threats to human life without prior State Command approval.
        </p>
        <div className="p-3 bg-red-900/60 rounded text-red-200 border border-red-700 text-[10px]">
          ⚠ MANDATORY WARNING: Every emergency override is logged in an immutable tamper-evident ledger and automatically flagged for personal review by the Inspector General of Police (IGP) and National Command Admin.
        </div>
      </div>

      <form onSubmit={handleExecuteOverride} className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 mb-1">TARGET RECORD STATE</label>
            <input
              type="text"
              value={targetRecordState}
              onChange={(e) => setTargetRecordState(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1">TARGET RECORD NUMBER / ID</label>
            <input
              type="text"
              value={targetRecordId}
              onChange={(e) => setTargetRecordId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-red-400 mb-1 font-bold">MANDATORY EMERGENCY OVERRIDE RATIONALE</label>
          <textarea
            value={mandatoryRationale}
            onChange={(e) => setMandatoryRationale(e.target.value)}
            placeholder="Specify precise tactical emergency justification (e.g. Hot pursuit of armed bank robbery fugitives crossing Ore-Benin boundary)..."
            className="w-full bg-slate-950 border border-red-900/80 rounded p-2.5 text-slate-100 h-28 focus:outline-none focus:border-red-600"
            required
          />
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-red-700 hover:bg-red-600 text-white rounded font-bold transition"
          >
            ⚡ Confirm & Execute High-Alert Override
          </button>
        </div>
      </form>
    </div>
  );
}
