'use client';

import Link from 'next/link';

export default function JudicialOrdersPage() {
  const orders = [
    {
      ordNumber: 'ORD-2026-99120',
      type: 'STAY_OF_PROCEEDINGS',
      judge: 'Hon. Justice A. B. Lawson',
      court: 'High Court of Edo State, Benin Division',
      seal: 'HCB/SEAL/2026/09912',
      caseId: 'case-edo-2026-001',
      summary: 'Judicial stay of proceedings ordered pending interlocutory appeal on jurisdiction.',
      locked: true,
      date: '2026-08-15',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-purple-400">📜 INGESTED JUDICIAL ORDERS & RECORD LOCKS</h2>
          <p className="text-xs text-slate-400">Judicial injunctions, stay of proceedings, and automatic administrative record lock flags.</p>
        </div>
        <Link href="/courts" className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded">
          ← Back to Courts Dashboard
        </Link>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">ACTIVE JUDICIAL ORDERS & INJUNCTIONS</h3>
        <div className="space-y-3">
          {orders.map((ord) => (
            <div key={ord.ordNumber} className="p-5 bg-slate-950 border-2 border-purple-900/60 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <span className="font-bold text-amber-500 text-sm">{ord.ordNumber} — {ord.type}</span>
                <span className="px-2.5 py-0.5 bg-purple-950 text-purple-300 border border-purple-800 font-bold rounded text-[10px]">
                  🔒 JUDICIALLY LOCKED: {ord.locked ? 'TRUE' : 'FALSE'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-slate-300">
                <div>
                  <span className="text-[10px] text-slate-500 block">ISSUING JUDGE & COURT</span>
                  <span className="font-bold text-slate-100">{ord.judge}</span> ({ord.court})
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">TARGET CASE & COURT SEAL</span>
                  <span className="font-bold text-amber-400">{ord.caseId}</span> (Seal: {ord.seal})
                </div>
              </div>

              <div className="p-3 bg-slate-900 rounded border border-slate-800 text-slate-300 text-[11px]">
                SUMMARY: {ord.summary}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
