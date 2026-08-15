'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WarrantDetailWorkbenchPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState('ACTIVE');
  const [showExecuteModal, setShowExecuteModal] = useState(false);
  const [execLocation, setExecLocation] = useState('');

  const mockWarrant = {
    id: params.id || 'war-edo-001',
    number: 'WAR-2026-EDO-00412',
    type: 'ARREST_WARRANT',
    targetPersonId: 'person-chidi-001',
    targetPersonName: 'Chidi Okonkwo',
    caseId: 'cas-edo-001',
    incidentId: 'inc-edo-001',
    judge: 'Hon. Justice O. E. Nwachukwu',
    court: 'High Court 3, Benin Judicial Division',
    seal: 'HCB/SEAL/2026/09912',
    offense: 'Armed Robbery at Commercial Bank (Section 402 Criminal Code)',
    issueDate: '2026-08-15',
    expirationDate: '2026-11-15',
  };

  const handleConfirmExecution = () => {
    if (!execLocation) return;
    setStatus('EXECUTED');
    setShowExecuteModal(false);
    alert(`Warrant ${mockWarrant.number} executed successfully at ${execLocation}. Custody intake record initialized.`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-mono text-xs">
      {/* Header Banner */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-3">
              <span className="text-amber-500 font-bold text-lg">{mockWarrant.number}</span>
              <span className="px-2.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-bold">
                TYPE: {mockWarrant.type}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-1">Target Subject: {mockWarrant.targetPersonName}</h2>
          </div>
          <span
            className={`px-3 py-1 rounded font-bold border ${
              status === 'EXECUTED'
                ? 'bg-slate-800 text-slate-400 border-slate-700'
                : 'bg-emerald-950 text-emerald-400 border-emerald-800'
            }`}
          >
            STATUS: {status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800 text-slate-300">
          <div>
            <span className="text-slate-500 block text-[10px]">TARGET PERSON MASTER ID</span>
            <Link href={`/persons/${mockWarrant.targetPersonId}`} className="font-bold text-amber-500 hover:underline">
              {mockWarrant.targetPersonId} ↗
            </Link>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">ASSOCIATED CASE & INCIDENT</span>
            <span>Case #{mockWarrant.caseId} | Incident #{mockWarrant.incidentId}</span>
          </div>
        </div>
      </div>

      {/* Judicial Authority Metadata Card */}
      <div className="p-5 bg-slate-950 border border-slate-800 rounded-lg space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-amber-500 text-xs">⚖ VERIFIED JUDICIAL AUTHORITY & COURT SEAL METADATA</span>
          <span className="text-[10px] text-slate-400">SEAL VALIDATED</span>
        </div>
        <div className="grid grid-cols-3 gap-4 text-slate-300">
          <div>
            <span className="text-slate-500 block text-[10px]">ISSUING JUDGE / MAGISTRATE</span>
            <span className="font-bold text-slate-100">{mockWarrant.judge}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">COURT DIVISION</span>
            <span>{mockWarrant.court}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">COURT SEAL NUMBER</span>
            <span className="font-mono text-amber-400 font-bold">{mockWarrant.seal}</span>
          </div>
        </div>
      </div>

      {/* Offense Allegations & Dates */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">OFFENSE ALLEGATIONS & EXPIRATION</h3>
        <p className="p-3 bg-slate-950 rounded border border-slate-800 text-slate-300">{mockWarrant.offense}</p>
        <div className="flex space-x-6 text-[11px] text-slate-400">
          <span>ISSUE DATE: {mockWarrant.issueDate}</span>
          <span>EXPIRATION DATE: {mockWarrant.expirationDate}</span>
        </div>
      </div>

      {/* Execution Control Action */}
      {status === 'ACTIVE' && (
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-200">WARRANT EXECUTION DISPATCH</h4>
            <p className="text-[11px] text-slate-400">Execute warrant upon apprehending subject and log official execution timestamp.</p>
          </div>
          <button
            onClick={() => setShowExecuteModal(true)}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded transition"
          >
            ✔ Execute Warrant & Log Custody Intake
          </button>
        </div>
      )}

      {showExecuteModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-100">CONFIRM WARRANT EXECUTION</h3>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">EXECUTION LOCATION ADDRESS</label>
              <input
                type="text"
                value={execLocation}
                onChange={(e) => setExecLocation(e.target.value)}
                placeholder="e.g. Ring Road Commercial District, Benin City"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowExecuteModal(false)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExecution}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded text-xs"
              >
                Confirm Execution
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
