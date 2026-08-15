'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CustodyDashboardPage() {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [targetFacility, setTargetFacility] = useState('Nigerian Correctional Service (NCoS) Maximum Facility, Benin');
  const [transferSuccess, setTransferSuccess] = useState<string | null>(null);

  const cellCapacities = [
    {
      facility: 'Benin Central Station Police Custody Cells',
      state: 'Edo',
      capacity: 40,
      current: 36,
      pct: 90.0,
      alert: true,
    },
    {
      facility: 'Ikeja Division Police Cells',
      state: 'Lagos',
      capacity: 60,
      current: 42,
      pct: 70.0,
      alert: false,
    },
  ];

  const inmates = [
    {
      trfNumber: 'TRF-2026-NCOS-00812',
      inmate: 'Chidi Okonkwo',
      origin: 'Benin Central Station Cell B',
      facility: 'NCoS Maximum Facility, Benin',
      warrant: 'RMW-2026-EDO-00912',
      remandStatus: 'REMAND_PENDING_TRIAL',
      transferredAt: '2026-08-15 01:10',
    },
  ];

  const handleTransfer = () => {
    setTransferSuccess(`✔ Custody Transfer executed! Inmate transferred to ${targetFacility}.`);
    setTimeout(() => {
      setShowTransferModal(false);
      setTransferSuccess(null);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">🏢 CORRECTIONAL & DETENTION CENTER INTEGRATION</h2>
          <p className="text-xs text-slate-400">NCoS Custody Transfer API, Remand Warrant Tracker, Cell Capacity Overcrowding Alerts & Transport Ledger.</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowTransferModal(true)}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
          >
            📋 Execute NCoS Custody Transfer
          </button>
          <Link
            href="/custody/movements"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold rounded text-xs transition"
          >
            🚐 Transport & Movement Ledger (1)
          </Link>
        </div>
      </div>

      {/* Cell Capacity & Overcrowding Alert HUD Cards */}
      <div className="grid grid-cols-2 gap-4">
        {cellCapacities.map((cc) => (
          <div key={cc.facility} className={`p-5 rounded-lg border space-y-2 ${cc.alert ? 'bg-red-950/40 border-red-800' : 'bg-slate-900 border-slate-800'}`}>
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-100 text-sm">{cc.facility} ({cc.state} State)</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${cc.alert ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'}`}>
                {cc.alert ? '🚨 OVERCROWDED (90%)' : 'NORMAL (70%)'}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Occupancy: <strong className="text-amber-400">{cc.current}</strong> / {cc.capacity} Detainees</span>
              <span>Design Capacity Limit: 85%</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div className={`h-full ${cc.alert ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${cc.pct}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Inmate Custody Roster Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden space-y-4 p-6">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-3">NCOS INMATE CUSTODY ROSTER & REMAND TRACKER</h3>
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Transfer # & Date</th>
              <th className="px-4 py-3">Inmate Name</th>
              <th className="px-4 py-3">Originating Station $\rightarrow$ NCoS Facility</th>
              <th className="px-4 py-3">Remand Warrant #</th>
              <th className="px-4 py-3 text-right">Remand Sentence Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {inmates.map((inm) => (
              <tr key={inm.trfNumber} className="hover:bg-slate-800/40 transition">
                <td className="px-4 py-3">
                  <div className="text-amber-500 font-bold">{inm.trfNumber}</div>
                  <div className="text-[10px] text-slate-500">{inm.transferredAt}</div>
                </td>
                <td className="px-4 py-3 font-bold text-slate-100">{inm.inmate}</td>
                <td className="px-4 py-3">
                  <div className="text-slate-200">{inm.origin}</div>
                  <div className="text-[10px] text-amber-400">$\rightarrow$ {inm.facility}</div>
                </td>
                <td className="px-4 py-3 text-slate-300 font-mono text-[11px]">{inm.warrant}</td>
                <td className="px-4 py-3 text-right">
                  <span className="px-2.5 py-0.5 bg-purple-950 text-purple-300 border border-purple-800 rounded text-[10px] font-bold">
                    {inm.remandStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showTransferModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-100">EXECUTE NCOS CUSTODY HANDOFF</h3>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">TARGET NCOS CUSTODIAL FACILITY</label>
              <input
                type="text"
                value={targetFacility}
                onChange={(e) => setTargetFacility(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100"
              />
            </div>
            {transferSuccess && (
              <div className="p-3 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-[11px] font-bold">
                {transferSuccess}
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowTransferModal(false)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleTransfer}
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs"
              >
                Sign & Execute Handoff
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
