'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function WarrantsQueuePage() {
  const [typeFilter, setTypeFilter] = useState('All');

  const warrants = [
    {
      id: 'war-edo-001',
      number: 'WAR-2026-EDO-00412',
      type: 'ARREST_WARRANT',
      targetPerson: 'Chidi Okonkwo',
      judge: 'Hon. Justice O. E. Nwachukwu',
      court: 'High Court 3, Benin Judicial Division',
      seal: 'HCB/SEAL/2026/09912',
      expiration: '2026-11-15',
      status: 'ACTIVE',
    },
    {
      id: 'war-lagos-002',
      number: 'WAR-2026-LAGOS-00891',
      type: 'SEARCH_WARRANT',
      targetPerson: 'Commercial Premises (Ikeja Hub)',
      judge: 'Magistrate A. O. Balogun',
      court: 'Magistrate Court 2, Ikeja',
      seal: 'MCI/SEAL/2026/01142',
      expiration: '2026-08-30',
      status: 'EXECUTED',
    },
  ];

  const filteredWarrants = typeFilter === 'All' ? warrants : warrants.filter((w) => w.type === typeFilter);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Judicial Warrants Registry</h2>
          <p className="text-xs text-slate-400">Court-issued Arrest Warrants, Search Warrants, and Bench Warrants with judicial metadata validation.</p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/warrants/wanted"
            className="px-4 py-2 bg-red-950 hover:bg-red-900 text-red-400 border border-red-800 font-bold rounded text-xs transition"
          >
            ⚠ Wanted Persons Bulletin Board
          </Link>
          <Link
            href="/warrants/new"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
          >
            + Ingest Court Warrant
          </Link>
        </div>
      </div>

      <div className="flex items-center space-x-3 bg-slate-900 p-4 rounded border border-slate-800">
        <span className="text-xs font-mono text-slate-400">WARRANT TYPE FILTER:</span>
        {['All', 'ARREST_WARRANT', 'SEARCH_WARRANT', 'BENCH_WARRANT'].map((tp) => (
          <button
            key={tp}
            onClick={() => setTypeFilter(tp)}
            className={`px-3 py-1 rounded text-xs font-mono transition ${
              typeFilter === tp
                ? 'bg-amber-600 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {tp}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Warrant # & Type</th>
              <th className="px-4 py-3">Target Subject</th>
              <th className="px-4 py-3">Judicial Authority & Seal #</th>
              <th className="px-4 py-3">Expiration Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-mono">
            {filteredWarrants.map((war) => (
              <tr key={war.id} className="hover:bg-slate-800/40 transition">
                <td className="px-4 py-3">
                  <div className="text-amber-500 font-bold">{war.number}</div>
                  <div className="text-[10px] text-slate-400">{war.type}</div>
                </td>
                <td className="px-4 py-3 font-bold text-slate-100">{war.targetPerson}</td>
                <td className="px-4 py-3">
                  <div>{war.judge}</div>
                  <div className="text-[10px] text-amber-500">{war.court} (Seal: {war.seal})</div>
                </td>
                <td className="px-4 py-3">{war.expiration}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      war.status === 'ACTIVE'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {war.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/warrants/${war.id}`}
                    className="text-amber-500 hover:text-amber-400 text-xs font-semibold underline"
                  >
                    Inspect Warrant File
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
