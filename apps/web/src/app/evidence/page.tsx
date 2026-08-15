'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EvidenceVaultPage() {
  const [categoryFilter, setCategoryFilter] = useState('All');

  const evidenceList = [
    {
      id: 'evd-edo-001',
      number: 'EVD-2026-EDO-00109',
      title: 'Patrol Body-Camera Footage at Bank Vault Entrance',
      category: 'BODYCAM_FOOTAGE',
      mimeType: 'video/mp4',
      size: '450.9 MB',
      sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      seizedAt: '2026-08-15 00:25',
      status: 'VERIFIED_INTACT',
    },
    {
      id: 'evd-lagos-002',
      number: 'EVD-2026-LAGOS-00214',
      title: 'State Ballistics & Firearms Forensic Examination Report',
      category: 'FORENSIC_DOCUMENT',
      mimeType: 'application/pdf',
      size: '3.2 MB',
      sha256: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      seizedAt: '2026-08-14 16:10',
      status: 'VERIFIED_INTACT',
    },
  ];

  const filtered = categoryFilter === 'All' ? evidenceList : evidenceList.filter((e) => e.category === categoryFilter);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 font-mono">Digital Evidence & Media Vault</h2>
          <p className="text-xs text-slate-400 font-mono">Cryptographic SHA-256 asset seal, immutable chain of custody tracking, and evidence vault storage.</p>
        </div>
        <Link
          href="/evidence/new"
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs font-mono transition"
        >
          + Ingest New Digital Evidence
        </Link>
      </div>

      <div className="flex items-center space-x-3 bg-slate-900 p-4 rounded border border-slate-800 font-mono text-xs">
        <span className="text-slate-400">CATEGORY FILTER:</span>
        {['All', 'BODYCAM_FOOTAGE', 'DASHCAM_FOOTAGE', 'PHOTOGRAPH', 'AUDIO_RECORDING', 'FORENSIC_DOCUMENT'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1 rounded text-xs transition ${
              categoryFilter === cat
                ? 'bg-amber-600 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden font-mono text-xs">
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Evidence # & Title</th>
              <th className="px-4 py-3">Category & Size</th>
              <th className="px-4 py-3">SHA-256 Checksum Hash</th>
              <th className="px-4 py-3">Integrity Seal</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map((ev) => (
              <tr key={ev.id} className="hover:bg-slate-800/40 transition">
                <td className="px-4 py-3">
                  <div className="text-amber-500 font-bold">{ev.number}</div>
                  <div className="text-slate-100 font-semibold text-[11px]">{ev.title}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-slate-800 text-amber-400 text-[10px] rounded font-bold">{ev.category}</span>
                  <div className="text-[10px] text-slate-500">{ev.size} ({ev.mimeType})</div>
                </td>
                <td className="px-4 py-3 text-[10px] text-slate-400 font-mono">
                  {ev.sha256.substring(0, 20)}...
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-800">
                    {ev.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/evidence/${ev.id}`}
                    className="text-amber-500 hover:text-amber-400 font-semibold underline"
                  >
                    Open Chain of Custody
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
