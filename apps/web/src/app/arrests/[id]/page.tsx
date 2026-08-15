'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ArrestDetailWorkbenchPage({ params }: { params: { id: string } }) {
  const [legalStatus, setLegalStatus] = useState('CHARGE');
  const [custodyStatus, setCustodyStatus] = useState('IN_CUSTODY');
  const [bailStatus, setBailStatus] = useState('BAIL_PENDING');

  const mockArrest = {
    id: params.id || 'arr-edo-001',
    number: 'ARR-2026-EDO-00812',
    personId: 'person-chidi-001',
    personName: 'Chidi Okonkwo',
    incidentId: 'inc-edo-001',
    incidentNumber: 'INC-2026-EDO-00101',
    station: 'Benin Central Station Lockup',
    state: 'Edo State Command',
    arrestedAt: '2026-08-15 00:40',
    location: 'Ring Road Financial District, Benin City',
    legalBasis: 'Reasonable suspicion and armed robbery warrant execution',
    charges: ['Armed Robbery (Section 402 Criminal Code)', 'Illegal Possession of Firearms'],
    custodyLocation: 'Benin Central Station Lockup Cell 3',
    caseReference: 'CR/2026/BENIN/881',
  };

  const handleGrantBail = () => {
    setBailStatus('BAIL_GRANTED');
    setCustodyStatus('BAIL_GRANTED');
    alert('Administrative Bail Granted. Release order processed.');
  };

  const handleUpdateStatus = (status: string) => {
    setLegalStatus(status);
    alert(`Legal status updated to ${status}.`);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-mono text-xs">
      {/* Legal Guardband Banner */}
      <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
        <div className="flex items-center space-x-2 text-amber-500 font-bold">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>STRICT LEGAL DISCLOSURE — CONSTITUTIONAL PROTECTION NOTICE</span>
        </div>
        <p className="text-slate-400 text-[11px]">
          Pursuant to Section 36 of the Constitution of the Federal Republic of Nigeria, an arrest record represents an administrative custody booking and strictly does NOT constitute proof of guilt, conviction, or criminal precedent.
        </p>
      </div>

      {/* Header Card */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-slate-400 text-[10px]">ARREST BOOKING NUMBER</div>
            <h2 className="text-2xl font-bold text-amber-500">{mockArrest.number}</h2>
          </div>
          <div className="flex space-x-2">
            <span className="px-3 py-1 rounded bg-slate-950 text-slate-300 border border-slate-800 font-bold">
              CUSTODY: {custodyStatus}
            </span>
            <span
              className={`px-3 py-1 rounded font-bold border ${
                legalStatus === 'CONVICTION'
                  ? 'bg-red-950 text-red-400 border-red-800'
                  : legalStatus === 'PROSECUTION'
                  ? 'bg-indigo-950 text-indigo-400 border-indigo-800'
                  : legalStatus === 'CHARGE'
                  ? 'bg-amber-950 text-amber-400 border-amber-800'
                  : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}
            >
              LEGAL STATUS: {legalStatus}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-slate-300 pt-2 border-t border-slate-800">
          <div>
            <span className="text-slate-500 block text-[10px]">SUSPECT NAME</span>
            <Link href={`/persons/${mockArrest.personId}`} className="font-bold text-slate-100 hover:text-amber-400 text-sm">
              {mockArrest.personName} ↗
            </Link>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">ASSOCIATED INCIDENT</span>
            <Link href={`/incidents/${mockArrest.incidentId}`} className="font-bold text-amber-500 hover:underline text-sm">
              {mockArrest.incidentNumber} ↗
            </Link>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">ARRESTED AT / LOCATION</span>
            <span>{mockArrest.arrestedAt} ({mockArrest.location})</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">CUSTODY CELL DESIGNATION</span>
            <span>{mockArrest.custodyLocation}</span>
          </div>
        </div>
      </div>

      {/* Booking Charges & Legal Basis */}
      <div className="grid grid-cols-2 gap-6">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
          <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">STATUTORY BOOKING CHARGES</h3>
          <ul className="space-y-1 text-slate-300">
            {mockArrest.charges.map((ch, idx) => (
              <li key={idx} className="p-2 bg-slate-950 rounded border border-slate-800">
                • {ch}
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
          <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">STATUTORY LEGAL BASIS</h3>
          <p className="text-slate-300 bg-slate-950 p-3 rounded border border-slate-800">{mockArrest.legalBasis}</p>
          <div className="text-slate-400 text-[10px]">COURT REF: {mockArrest.caseReference}</div>
        </div>
      </div>

      {/* Custody & Legal Workflow Actions */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">CUSTODY & LEGAL TRANSITION CONTROLS</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleGrantBail}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded transition"
          >
            Grant Administrative Bail
          </button>
          <button
            onClick={() => handleUpdateStatus('PROSECUTION')}
            className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-indigo-200 border border-indigo-700 font-bold rounded transition"
          >
            Forward to Director of Public Prosecutions (DPP)
          </button>
          <button
            onClick={() => handleUpdateStatus('RELEASED')}
            className="px-4 py-2 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 border border-emerald-700 font-bold rounded transition"
          >
            Order Full Release
          </button>
        </div>
      </div>
    </div>
  );
}
