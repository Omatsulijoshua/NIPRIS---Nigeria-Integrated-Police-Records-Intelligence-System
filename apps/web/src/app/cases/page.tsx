'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CasesQueuePage() {
  const [statusFilter, setStatusFilter] = useState('All');

  const cases = [
    {
      id: 'cas-edo-001',
      number: 'CAS-2026-EDO-00109',
      title: 'Operation Commercial Shield - Benin Vault Heist',
      leadInvestigator: 'Detective SP Babatunde Adeyemi (CID)',
      priority: 'CRITICAL',
      state: 'Edo State Command',
      status: 'UNDER_INVESTIGATION',
    },
    {
      id: 'cas-lagos-002',
      number: 'CAS-2026-LAGOS-00311',
      title: 'Multinational Financial Wire Fraud & Cyber Breach',
      leadInvestigator: 'DSP Inspector Chinedu Eze (Cyber Crime Unit)',
      priority: 'HIGH',
      state: 'Lagos State Command',
      status: 'PENDING_PROSECUTION',
    },
  ];

  const filteredCases = statusFilter === 'All' ? cases : cases.filter((c) => c.status === statusFilter);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Master Case & Investigation Files</h2>
          <p className="text-xs text-slate-400">Manage detective assignments, investigative timelines, and cross-evidence linkages.</p>
        </div>
        <Link
          href="/cases/new"
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
        >
          + Initiate Master Case File
        </Link>
      </div>

      <div className="flex items-center space-x-3 bg-slate-900 p-4 rounded border border-slate-800">
        <span className="text-xs font-mono text-slate-400">CASE STATUS FILTER:</span>
        {['All', 'OPEN', 'UNDER_INVESTIGATION', 'PENDING_PROSECUTION', 'CLOSED', 'REOPENED'].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1 rounded text-xs font-mono transition ${
              statusFilter === st
                ? 'bg-amber-600 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Case #</th>
              <th className="px-4 py-3">Title & Lead Investigator</th>
              <th className="px-4 py-3">Jurisdiction</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-mono">
            {filteredCases.map((cas) => (
              <tr key={cas.id} className="hover:bg-slate-800/40 transition">
                <td className="px-4 py-3 text-amber-500 font-bold">{cas.number}</td>
                <td className="px-4 py-3">
                  <div className="font-bold text-slate-100">{cas.title}</div>
                  <div className="text-[10px] text-slate-400">Lead: {cas.leadInvestigator}</div>
                </td>
                <td className="px-4 py-3">{cas.state}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      cas.priority === 'CRITICAL'
                        ? 'bg-red-950 text-red-400 border border-red-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {cas.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-200 border border-slate-700">
                    {cas.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/cases/${cas.id}`}
                    className="text-amber-500 hover:text-amber-400 text-xs font-semibold underline"
                  >
                    Open Case File
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
