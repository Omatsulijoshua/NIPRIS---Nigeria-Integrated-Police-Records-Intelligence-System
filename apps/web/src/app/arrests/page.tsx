'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ArrestsQueuePage() {
  const [legalFilter, setLegalFilter] = useState('All');

  const arrests = [
    {
      id: 'arr-edo-001',
      number: 'ARR-2026-EDO-00812',
      personName: 'Chidi Okonkwo',
      station: 'Benin Central Station',
      state: 'Edo State Command',
      date: '2026-08-15 00:40',
      charges: 'Armed Robbery, Firearms Possession',
      custodyStatus: 'IN_CUSTODY',
      bailStatus: 'BAIL_PENDING',
      legalStatus: 'CHARGE',
    },
    {
      id: 'arr-lagos-002',
      number: 'ARR-2026-LAGOS-00941',
      personName: 'Babajide Williams',
      station: 'Ikeja Division',
      state: 'Lagos State Command',
      date: '2026-08-14 18:20',
      charges: 'Financial Fraud, Cyber Embezzlement',
      custodyStatus: 'BAIL_GRANTED',
      bailStatus: 'BAIL_GRANTED',
      legalStatus: 'PROSECUTION',
    },
  ];

  const filteredArrests = legalFilter === 'All' ? arrests : arrests.filter((a) => a.legalStatus === legalFilter);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Arrest & Booking Registry</h2>
          <p className="text-xs text-slate-400">National custody log, booking records, bail tracking, and legal prosecution status.</p>
        </div>
        <Link
          href="/arrests/new"
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
        >
          + Process New Arrest Booking
        </Link>
      </div>

      {/* Prominent Legal Disclaimer Banner */}
      <div className="p-3 bg-slate-950 border border-slate-800 rounded flex items-center space-x-3 text-xs font-mono text-slate-400">
        <span className="text-amber-500 font-bold">⚖ LEGAL GUARDBAND NOTICE:</span>
        <span>An arrest record represents a law-enforcement custody booking and strictly does NOT constitute proof of guilt or criminal conviction.</span>
      </div>

      <div className="flex items-center space-x-3 bg-slate-900 p-4 rounded border border-slate-800">
        <span className="text-xs font-mono text-slate-400">LEGAL STATUS FILTER:</span>
        {['All', 'ARREST', 'CHARGE', 'PROSECUTION', 'CONVICTION', 'ACQUITTAL', 'DISMISSED', 'RELEASED'].map((st) => (
          <button
            key={st}
            onClick={() => setLegalFilter(st)}
            className={`px-3 py-1 rounded text-xs font-mono transition ${
              legalFilter === st
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
              <th className="px-4 py-3">Arrest #</th>
              <th className="px-4 py-3">Person Name</th>
              <th className="px-4 py-3">Station & Command</th>
              <th className="px-4 py-3">Booking Charges</th>
              <th className="px-4 py-3">Bail / Custody</th>
              <th className="px-4 py-3">Legal Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-mono">
            {filteredArrests.map((arr) => (
              <tr key={arr.id} className="hover:bg-slate-800/40 transition">
                <td className="px-4 py-3 text-amber-500 font-bold">{arr.number}</td>
                <td className="px-4 py-3 font-bold text-slate-100">{arr.personName}</td>
                <td className="px-4 py-3">
                  <div>{arr.station}</div>
                  <div className="text-[10px] text-slate-400">{arr.state}</div>
                </td>
                <td className="px-4 py-3 text-slate-400">{arr.charges}</td>
                <td className="px-4 py-3">
                  <div className="text-slate-200 font-bold">{arr.custodyStatus}</div>
                  <div className="text-[10px] text-amber-500">{arr.bailStatus}</div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      arr.legalStatus === 'CONVICTION'
                        ? 'bg-red-950 text-red-400 border border-red-800'
                        : arr.legalStatus === 'PROSECUTION'
                        ? 'bg-indigo-950 text-indigo-400 border border-indigo-800'
                        : arr.legalStatus === 'CHARGE'
                        ? 'bg-amber-950 text-amber-400 border border-amber-800'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {arr.legalStatus}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/arrests/${arr.id}`}
                    className="text-amber-500 hover:text-amber-400 text-xs font-semibold underline"
                  >
                    View Booking Record
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
