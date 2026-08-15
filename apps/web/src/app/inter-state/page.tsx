'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InterStatePortalPage() {
  const [activeTab, setActiveTab] = useState<'requests' | 'approvals'>('requests');

  const [requests, setRequests] = useState([
    {
      id: 'isr-edo-lagos-001',
      number: 'ISR-2026-EDO-LAGOS-00192',
      originState: 'Edo',
      targetState: 'Lagos',
      recordType: 'CRIMINAL_ARREST',
      targetRecordId: 'ARR-2026-LAGOS-00891',
      priority: 'URGENT',
      status: 'APPROVED',
      justification: 'Joint armed robbery investigation link across Benin-Lagos transport corridor',
      expiration: '2026-08-18 (72 hrs remaining)',
    },
    {
      id: 'isr-kano-fct-002',
      number: 'ISR-2026-KANO-FCT-00412',
      originState: 'Kano',
      targetState: 'FCT',
      recordType: 'PERSON_PROFILE',
      targetRecordId: 'person-chidi-001',
      priority: 'ROUTINE',
      status: 'PENDING_APPROVAL',
      justification: 'Inter-state suspect background verification for financial fraud case',
      expiration: '2026-08-17',
    },
  ]);

  const handleApprove = (id: string, approved: boolean) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: approved ? 'APPROVED' : 'REJECTED' } : r))
    );
    alert(`Inter-State Request ${id} ${approved ? 'APPROVED' : 'REJECTED'}. Notification dispatched to originating State Command.`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Inter-State Jurisdiction & Record Sharing</h2>
          <p className="text-xs text-slate-400">36 Nigerian States + FCT boundary enforcement, request clearance workflow, and emergency override ledger.</p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/inter-state/emergency"
            className="px-4 py-2 bg-red-950 hover:bg-red-900 text-red-400 border border-red-800 font-bold rounded text-xs transition"
          >
            ⚡ Emergency Cross-Jurisdiction Override
          </Link>
          <Link
            href="/inter-state/new"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
          >
            + Request Cross-State Record
          </Link>
        </div>
      </div>

      <div className="flex justify-between items-center bg-slate-900 p-4 rounded border border-slate-800">
        <div className="flex space-x-3">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-1.5 rounded transition ${activeTab === 'requests' ? 'bg-amber-600 text-slate-950 font-bold' : 'bg-slate-950 text-slate-300'}`}
          >
            Cross-State Request Queue ({requests.length})
          </button>
        </div>
        <Link href="/inter-state/oversight" className="text-amber-500 hover:underline font-bold">
          🏛 Launch National HQ 36 States + FCT Oversight Grid ↗
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Request # & Priority</th>
              <th className="px-4 py-3">Origin $\rightarrow$ Target State</th>
              <th className="px-4 py-3">Record Type & ID</th>
              <th className="px-4 py-3">Justification Rationale</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {requests.map((r) => (
              <tr key={r.id} className="hover:bg-slate-800/40 transition">
                <td className="px-4 py-3">
                  <div className="text-amber-500 font-bold">{r.number}</div>
                  <div className="text-[10px] text-slate-500">{r.priority}</div>
                </td>
                <td className="px-4 py-3 font-bold text-slate-100">
                  {r.originState} State $\rightarrow$ {r.targetState} State
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-slate-800 text-amber-400 text-[10px] rounded font-bold">{r.recordType}</span>
                  <div className="text-[10px] text-slate-500">{r.targetRecordId}</div>
                </td>
                <td className="px-4 py-3 text-[11px] text-slate-300 max-w-xs">{r.justification}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.status === 'APPROVED'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : r.status === 'REJECTED'
                        ? 'bg-red-950 text-red-400 border border-red-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  {r.status === 'PENDING_APPROVAL' ? (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleApprove(r.id, true)}
                        className="px-2 py-1 bg-emerald-700 hover:bg-emerald-600 text-slate-950 font-bold rounded text-[10px]"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleApprove(r.id, false)}
                        className="px-2 py-1 bg-red-900 hover:bg-red-800 text-red-200 font-bold rounded text-[10px]"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-slate-500 text-[10px]">Access Granted</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
