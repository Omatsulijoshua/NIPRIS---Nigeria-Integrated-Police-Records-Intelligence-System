'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function IntelligenceDashboardPage() {
  const [classificationFilter, setClassificationFilter] = useState('All');

  const reports = [
    {
      id: 'int-edo-001',
      number: 'INT-2026-EDO-00412',
      title: 'Cross-Border Firearm Smuggling Syndicate Operations in Ore Corridor',
      evaluationCode: 'B2',
      reliability: 'B (USUALLY RELIABLE)',
      validity: '2 (PROBABLY TRUE)',
      classification: 'TOP_SECRET_LAW_ENFORCEMENT',
      informantPseudonym: 'INFORMANT-VIPER-09',
      dissemination: 'RESTRICTED_TO_STATE_COMMAND_SPECIAL_ANTI_ROBBERY',
      date: '2026-08-15 01:10',
    },
    {
      id: 'int-lagos-002',
      number: 'INT-2026-LAGOS-00891',
      title: 'Underground Maritime Oil Bunkering Syndicate Network',
      evaluationCode: 'A1',
      reliability: 'A (COMPLETELY RELIABLE)',
      validity: '1 (CONFIRMED BY SOURCES)',
      classification: 'CONFIDENTIAL_INTEL',
      informantPseudonym: 'INFORMANT-EAGLE-02',
      dissemination: 'NATIONAL_HQ_SPECIAL_INTELLIGENCE_BRANCH',
      date: '2026-08-14 22:45',
    },
  ];

  const filtered = classificationFilter === 'All' ? reports : reports.filter((r) => r.classification === classificationFilter);

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">Intelligence & Informant Management Engine</h2>
          <p className="text-xs text-slate-400">Cryptographic informant pseudonym protection, NATO 6x6 reliability matrix, and Top Secret intel dissemination.</p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/intelligence/informants"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-bold rounded text-xs transition"
          >
            🕵 Confidential Informants Registry
          </Link>
          <Link
            href="/intelligence/new"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
          >
            + Intake Raw Intelligence Report
          </Link>
        </div>
      </div>

      {/* NATO 6x6 Matrix Summary HUD */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <span className="font-bold text-amber-500 text-xs">📊 LAW ENFORCEMENT & NATO 6x6 RELIABILITY RATING SYSTEM</span>
          <span className="text-[10px] text-slate-400">EVALUATION CODE: [SOURCE (A-F)] + [INFORMATION (1-6)]</span>
        </div>
        <div className="grid grid-cols-6 gap-2 text-center text-[10px]">
          <div className="p-2 bg-slate-950 rounded border border-emerald-900 text-emerald-400 font-bold">A1: CONFIRMED EXCELLENT</div>
          <div className="p-2 bg-slate-950 rounded border border-emerald-900 text-emerald-400 font-bold">B2: HIGH CONFIDENCE</div>
          <div className="p-2 bg-slate-950 rounded border border-amber-900 text-amber-400 font-bold">C3: FAIR / POSSIBLE</div>
          <div className="p-2 bg-slate-950 rounded border border-amber-900 text-amber-400 font-bold">D4: DOUBTFUL INTEL</div>
          <div className="p-2 bg-slate-950 rounded border border-red-900 text-red-400 font-bold">E5: UNRELIABLE</div>
          <div className="p-2 bg-slate-950 rounded border border-slate-800 text-slate-500">F6: UNJUDGED</div>
        </div>
      </div>

      <div className="flex items-center space-x-3 bg-slate-900 p-4 rounded border border-slate-800">
        <span className="text-slate-400">CLASSIFICATION FILTER:</span>
        {['All', 'CONFIDENTIAL_INTEL', 'TOP_SECRET_LAW_ENFORCEMENT'].map((cl) => (
          <button
            key={cl}
            onClick={() => setClassificationFilter(cl)}
            className={`px-3 py-1 rounded text-xs transition ${
              classificationFilter === cl
                ? 'bg-amber-600 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {cl}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Report # & Title</th>
              <th className="px-4 py-3">6x6 Eval Code</th>
              <th className="px-4 py-3">Informant Pseudonym</th>
              <th className="px-4 py-3">Classification & Clearance</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-slate-800/40 transition">
                <td className="px-4 py-3">
                  <div className="text-amber-500 font-bold">{r.number}</div>
                  <div className="text-slate-100 font-semibold text-[11px]">{r.title}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 bg-amber-950 text-amber-400 border border-amber-800 rounded font-bold text-xs">
                    {r.evaluationCode}
                  </span>
                </td>
                <td className="px-4 py-3 font-bold text-slate-200">{r.informantPseudonym}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-red-950 text-red-400 border border-red-800 text-[10px] rounded font-bold block w-fit">
                    {r.classification}
                  </span>
                  <div className="text-[10px] text-slate-500 mt-0.5">{r.dissemination}</div>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-amber-500 hover:underline cursor-pointer font-semibold">
                    Inspect Classified Intel File
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
