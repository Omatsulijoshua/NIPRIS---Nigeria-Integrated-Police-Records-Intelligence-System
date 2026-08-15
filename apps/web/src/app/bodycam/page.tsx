'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BodycamDashboardPage() {
  const [retentionFilter, setRetentionFilter] = useState('All');

  const recordings = [
    {
      id: 'rec-edo-001',
      number: 'BWC-2026-EDO-00991',
      serial: 'BWC-NPF-EDO-0012',
      officer: 'Inspector Emmanuel Okafor (NPF-2002)',
      duration: '30 mins (1,800s)',
      size: '985.0 MB',
      date: '2026-08-15 00:10',
      retention: 'EVIDENTIARY_HOLD_PERMANENT',
      redaction: 'UNREDACTED',
    },
    {
      id: 'rec-lagos-002',
      number: 'BWC-2026-LAGOS-00412',
      serial: 'DASH-NPF-LAGOS-0081',
      officer: 'Sergeant Musa YarAdua (Patrol Unit 4)',
      duration: '15 mins (900s)',
      size: '410.0 MB',
      date: '2026-08-14 19:40',
      retention: 'AUTOMATIC_PURGE_90_DAYS',
      redaction: 'REDACTION_APPLIED',
    },
  ];

  const filtered = retentionFilter === 'All' ? recordings : recordings.filter((r) => r.retention === retentionFilter);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 font-mono">Body-Worn Camera & Dashcam Fleet</h2>
          <p className="text-xs text-slate-400 font-mono">Patrol stream ingestion, GPS telemetry overlays, time-sync markers, and video redaction workbench.</p>
        </div>
        <Link
          href="/bodycam/devices"
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs font-mono transition"
        >
          ⚙ Camera Device Fleet Config
        </Link>
      </div>

      <div className="flex items-center space-x-3 bg-slate-900 p-4 rounded border border-slate-800 font-mono text-xs">
        <span className="text-slate-400">RETENTION POLICY FILTER:</span>
        {['All', 'AUTOMATIC_PURGE_90_DAYS', 'INVESTIGATIVE_HOLD_1_YEAR', 'EVIDENTIARY_HOLD_PERMANENT'].map((pol) => (
          <button
            key={pol}
            onClick={() => setRetentionFilter(pol)}
            className={`px-3 py-1 rounded text-xs transition ${
              retentionFilter === pol
                ? 'bg-amber-600 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {pol}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden font-mono text-xs">
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Recording # & Device Serial</th>
              <th className="px-4 py-3">Assigned Officer</th>
              <th className="px-4 py-3">Duration & Size</th>
              <th className="px-4 py-3">Retention Policy</th>
              <th className="px-4 py-3">Redaction Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map((rec) => (
              <tr key={rec.id} className="hover:bg-slate-800/40 transition">
                <td className="px-4 py-3">
                  <div className="text-amber-500 font-bold">{rec.number}</div>
                  <div className="text-[10px] text-slate-400">SERIAL: {rec.serial}</div>
                </td>
                <td className="px-4 py-3 font-bold text-slate-100">{rec.officer}</td>
                <td className="px-4 py-3">
                  <div>{rec.duration}</div>
                  <div className="text-[10px] text-slate-500">{rec.size}</div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      rec.retention === 'EVIDENTIARY_HOLD_PERMANENT'
                        ? 'bg-red-950 text-red-400 border border-red-800'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {rec.retention}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                    {rec.redaction}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/bodycam/recordings/${rec.id}`}
                    className="text-amber-500 hover:text-amber-400 font-semibold underline"
                  >
                    Launch Playback Workbench ↗
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
