'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AuditDashboardPage() {
  const [filter, setFilter] = useState<'ALL' | 'HIGH_RISK' | 'FLAGGED'>('ALL');

  const auditLogs = [
    {
      id: 'aud-001',
      seq: 10492,
      time: '2026-08-15 01:18:22',
      officer: 'Inspector Emmanuel Okafor (NPF-2002)',
      role: 'INVESTIGATING_OFFICER',
      action: 'VIEW_RECORD',
      resource: 'PERSON (person-chidi-001)',
      rationale: 'Verification of NIN for criminal suspect booking NPF 14',
      ip: '102.89.41.109',
      riskScore: 15,
      hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      flagged: false,
    },
    {
      id: 'aud-002',
      seq: 10491,
      time: '2026-08-15 01:15:10',
      officer: 'Patrol Officer Chinedu Eke (NPF-8812)',
      role: 'PATROL_OFFICER',
      action: 'EMERGENCY_OVERRIDE',
      resource: 'ARREST (ARR-2026-LAGOS-00891)',
      rationale: 'Hot pursuit cross-border emergency',
      ip: '102.89.99.12',
      riskScore: 85,
      hash: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
      flagged: true,
    },
  ];

  const filtered = filter === 'HIGH_RISK'
    ? auditLogs.filter((a) => a.riskScore >= 60)
    : filter === 'FLAGGED'
    ? auditLogs.filter((a) => a.flagged)
    : auditLogs;

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">National Police Audit & Compliance Ledger</h2>
          <p className="text-xs text-slate-400">Append-only SHA-256 block hash chaining, compliance risk score evaluator, and Internal Affairs triggers.</p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/audit/flagged"
            className="px-4 py-2 bg-red-950 hover:bg-red-900 text-red-400 border border-red-800 font-bold rounded text-xs transition"
          >
            🚨 Internal Affairs Escalations (1)
          </Link>
          <Link
            href="/audit/verify"
            className="px-4 py-2 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 font-bold rounded text-xs transition"
          >
            🔒 Validate Block Hash Chain Integrity
          </Link>
        </div>
      </div>

      {/* Cryptographic Ledger Health Summary HUD */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded">
          <span className="text-[10px] text-slate-400 block">SHA-256 LEDGER STATUS</span>
          <span className="text-emerald-400 font-bold text-base block mt-1">✔ VERIFIED INTACT</span>
          <span className="text-[10px] text-slate-500">10,492 Blocks Validated</span>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded">
          <span className="text-[10px] text-slate-400 block">AVERAGE COMPLIANCE RISK</span>
          <span className="text-amber-400 font-bold text-base block mt-1">18 / 100</span>
          <span className="text-[10px] text-slate-500">Low Operational Risk</span>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded">
          <span className="text-[10px] text-slate-400 block">HIGH-RISK QUERIES</span>
          <span className="text-red-400 font-bold text-base block mt-1">1 High Risk</span>
          <span className="text-[10px] text-slate-500">Risk Score $\ge$ 70</span>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded">
          <span className="text-[10px] text-slate-400 block">UNJUSTIFIED QUERIES</span>
          <span className="text-emerald-400 font-bold text-base block mt-1">0 Unjustified</span>
          <span className="text-[10px] text-slate-500">100% Purpose Justified</span>
        </div>
      </div>

      <div className="flex items-center space-x-3 bg-slate-900 p-4 rounded border border-slate-800">
        <span className="text-slate-400">LEDGER FILTER:</span>
        {(['ALL', 'HIGH_RISK', 'FLAGGED'] as const).map((fl) => (
          <button
            key={fl}
            onClick={() => setFilter(fl)}
            className={`px-3 py-1 rounded transition ${filter === fl ? 'bg-amber-600 text-slate-950 font-bold' : 'bg-slate-950 text-slate-300 hover:bg-slate-800'}`}
          >
            {fl}
          </button>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Block # & Time</th>
              <th className="px-4 py-3">Officer & Role</th>
              <th className="px-4 py-3">Action & Target Resource</th>
              <th className="px-4 py-3">Justification Rationale</th>
              <th className="px-4 py-3">Risk Score</th>
              <th className="px-4 py-3 text-right">Block Hash (SHA-256)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {filtered.map((log) => (
              <tr key={log.id} className="hover:bg-slate-800/40 transition">
                <td className="px-4 py-3">
                  <div className="text-amber-500 font-bold">#{log.seq}</div>
                  <div className="text-[10px] text-slate-500">{log.time}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-bold text-slate-100">{log.officer}</div>
                  <div className="text-[10px] text-slate-500">{log.role} (IP: {log.ip})</div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 bg-slate-800 text-amber-400 text-[10px] rounded font-bold">{log.action}</span>
                  <div className="text-[10px] text-slate-400 mt-0.5">{log.resource}</div>
                </td>
                <td className="px-4 py-3 text-[11px] text-slate-300 max-w-xs">{log.rationale}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.riskScore >= 70
                        ? 'bg-red-950 text-red-400 border border-red-800'
                        : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    }`}
                  >
                    {log.riskScore} / 100
                  </span>
                </td>
                <td className="px-4 py-3 text-right font-mono text-[10px] text-slate-400">
                  {log.hash.substring(0, 16)}...
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
