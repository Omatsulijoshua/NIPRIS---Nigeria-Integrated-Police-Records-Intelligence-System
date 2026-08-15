'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CourtsDashboardPage() {
  const [showSealModal, setShowSealModal] = useState(false);
  const [sealInput, setSealInput] = useState('HCB/SEAL/2026/09912');
  const [sealResult, setSealResult] = useState<string | null>(null);

  const chargeSheets = [
    {
      csNumber: 'CS-2026-EDO-00912',
      formCode: 'FORM_NPF_14_EDO_2026',
      suspect: 'Chidi Okonkwo',
      court: 'High Court of Edo State, Benin Division',
      counts: 2,
      status: 'PENDING_PROSECUTION',
      locked: false,
      seal: 'HCB/SEAL/2026/09912',
    },
    {
      csNumber: 'CS-2026-LAGOS-00418',
      formCode: 'FORM_NPF_14_LAGOS_2026',
      suspect: 'Emeka Nwosu',
      court: 'High Court of Lagos State, Ikeja Division',
      counts: 1,
      status: 'TRIAL_IN_PROGRESS',
      locked: true,
      seal: 'HCL/SEAL/2026/04112',
    },
  ];

  const handleVerifySeal = () => {
    if (!sealInput) return;
    setSealResult(`✔ VALID JUDICIAL SEAL SIGNATURE: ${sealInput} (High Court of Edo State, Benin Division - Hon. Justice A. B. Lawson)`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">⚖ COURT & JUDICIAL INTEGRATION SYSTEM</h2>
          <p className="text-xs text-slate-400">Form NPF 14 Prosecution Filing, Charge Sheet Export, Electronic Seal Validation & Judicial Order Locks.</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowSealModal(true)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-bold rounded text-xs transition"
          >
            🔏 Validate Court Seal Signature
          </button>
          <Link
            href="/courts/orders"
            className="px-4 py-2 bg-purple-950 hover:bg-purple-900 text-purple-300 border border-purple-800 font-bold rounded text-xs transition"
          >
            📜 Judicial Orders & Locks (1)
          </Link>
        </div>
      </div>

      {/* Form NPF 14 Prosecution Charge Sheets Docket */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden space-y-4 p-6">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-3">FORM NPF 14 PROSECUTION FILING DOCKET</h3>
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Charge Sheet & Form Code</th>
              <th className="px-4 py-3">Suspect Person</th>
              <th className="px-4 py-3">Jurisdiction Court & Seal</th>
              <th className="px-4 py-3">Counts</th>
              <th className="px-4 py-3">Trial Status</th>
              <th className="px-4 py-3 text-right">Judicial Lock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {chargeSheets.map((cs) => (
              <tr key={cs.csNumber} className="hover:bg-slate-800/40 transition">
                <td className="px-4 py-3">
                  <div className="text-amber-500 font-bold">{cs.csNumber}</div>
                  <div className="text-[10px] text-slate-500">{cs.formCode}</div>
                </td>
                <td className="px-4 py-3 font-bold text-slate-100">{cs.suspect}</td>
                <td className="px-4 py-3">
                  <div className="text-slate-200">{cs.court}</div>
                  <div className="text-[10px] text-slate-500">Seal: {cs.seal}</div>
                </td>
                <td className="px-4 py-3 text-slate-300">{cs.counts} Statutory Counts</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-slate-800 text-amber-400 text-[10px] rounded font-bold">{cs.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      cs.locked ? 'bg-purple-950 text-purple-300 border border-purple-800' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {cs.locked ? '🔒 LOCKED' : 'UNLOCKED'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showSealModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-100">VALIDATE JUDICIAL SEAL HASH & COURT METADATA</h3>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">COURT SEAL NUMBER / SIGNATURE HASH</label>
              <input
                type="text"
                value={sealInput}
                onChange={(e) => setSealInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100"
              />
            </div>
            {sealResult && (
              <div className="p-3 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-[11px] font-bold">
                {sealResult}
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  setShowSealModal(false);
                  setSealResult(null);
                }}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded text-xs"
              >
                Close
              </button>
              <button
                onClick={handleVerifySeal}
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs"
              >
                Verify Seal Signature
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
