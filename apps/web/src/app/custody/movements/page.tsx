'use client';

import Link from 'next/link';

export default function InmateMovementsPage() {
  const movements = [
    {
      id: 'mvt-001',
      inmate: 'Chidi Okonkwo',
      type: 'COURT_APPEARANCE',
      from: 'NCoS Benin Maximum Facility',
      to: 'Edo State High Court 1',
      officer: 'Insp. Emmanuel Okafor (NPF-2002)',
      vehicle: 'POL-VAN-EDO-091',
      departure: '2026-08-15 08:30',
      status: 'IN_TRANSIT',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-amber-500">🚐 INMATE TRANSPORT & MOVEMENT LEDGER</h2>
          <p className="text-xs text-slate-400">Real-time court appearance transit logs, escort officer assignments, and vehicle tracking.</p>
        </div>
        <Link href="/custody" className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded">
          ← Back to Custody Dashboard
        </Link>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">ACTIVE INMATE TRANSIT LOGS</h3>
        <div className="space-y-3">
          {movements.map((mvt) => (
            <div key={mvt.id} className="p-5 bg-slate-950 border border-slate-800 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <span className="font-bold text-amber-500 text-sm">{mvt.inmate} — {mvt.type}</span>
                <span className="px-2.5 py-0.5 bg-amber-950 text-amber-400 border border-amber-800 font-bold rounded text-[10px]">
                  STATUS: {mvt.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-slate-300">
                <div>
                  <span className="text-[10px] text-slate-500 block">DEPARTURE $\rightarrow$ DESTINATION</span>
                  <span className="font-bold text-slate-100">{mvt.from}</span> $\rightarrow$ <span className="text-emerald-400 font-bold">{mvt.to}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">ESCORT OFFICER & VEHICLE</span>
                  <span className="font-bold text-slate-100">{mvt.officer}</span> (Vehicle: {mvt.vehicle})
                </div>
              </div>

              <div className="text-[10px] text-slate-500">DEPARTURE TIMESTAMP: {mvt.departure}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
