'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function IncidentsQueuePage() {
  const [statusFilter, setStatusFilter] = useState('All');

  const incidents = [
    {
      id: 'inc-edo-001',
      number: 'INC-2026-EDO-00101',
      title: 'Armed Robbery at Commercial Bank Branch',
      type: 'Armed Robbery',
      location: 'Ring Road, Benin City, Edo State',
      occurredAt: '2026-08-15 00:10',
      priority: 'CRITICAL',
      status: 'UNDER_INVESTIGATION',
    },
    {
      id: 'inc-lagos-002',
      number: 'INC-2026-LAGOS-00204',
      title: 'Cybercrime Wire Fraud Infiltration',
      type: 'Cybercrime',
      location: 'Ikeja Financial Hub, Lagos State',
      occurredAt: '2026-08-14 14:30',
      priority: 'HIGH',
      status: 'REPORTED',
    },
  ];

  const filteredIncidents = statusFilter === 'All' ? incidents : incidents.filter((i) => i.status === statusFilter);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Active Incidents Operational Queue</h2>
          <p className="text-xs text-slate-400">Real-time dispatching, status lifecycle tracking, and field incident intake.</p>
        </div>
        <Link
          href="/incidents/new"
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
        >
          + Intake New Incident Report
        </Link>
      </div>

      <div className="flex items-center space-x-3 bg-slate-900 p-4 rounded border border-slate-800">
        <span className="text-xs font-mono text-slate-400">FILTER STATUS:</span>
        {['All', 'REPORTED', 'DISPATCHED', 'RESPONDING', 'ON_SCENE', 'UNDER_INVESTIGATION', 'CLOSED', 'REOPENED'].map((st) => (
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
              <th className="px-4 py-3">Incident #</th>
              <th className="px-4 py-3">Title & Category</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Priority</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-mono">
            {filteredIncidents.map((inc) => (
              <tr key={inc.id} className="hover:bg-slate-800/40 transition">
                <td className="px-4 py-3 text-amber-500 font-bold">{inc.number}</td>
                <td className="px-4 py-3">
                  <div className="font-bold text-slate-100">{inc.title}</div>
                  <div className="text-[10px] text-slate-400">{inc.type}</div>
                </td>
                <td className="px-4 py-3">{inc.location}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      inc.priority === 'CRITICAL'
                        ? 'bg-red-950 text-red-400 border border-red-800'
                        : 'bg-amber-950 text-amber-400 border border-amber-800'
                    }`}
                  >
                    {inc.priority}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-200 border border-slate-700">
                    {inc.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/incidents/${inc.id}`}
                    className="text-amber-500 hover:text-amber-400 text-xs font-semibold underline"
                  >
                    Open Incident File
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
