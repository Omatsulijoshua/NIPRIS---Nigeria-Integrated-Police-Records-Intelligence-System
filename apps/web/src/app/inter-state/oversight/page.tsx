'use client';

import Link from 'next/link';
import { NIGERIAN_STATES } from '@nipris/types';

export default function NationalHqOversightPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-amber-500">🏛 NATIONAL HQ INTER-STATE CLEARANCE & OVERSIGHT GRID</h2>
          <p className="text-xs text-slate-400">Real-time inter-state record sharing metrics, approval rates, and emergency overrides across 36 States + FCT.</p>
        </div>
        <Link href="/inter-state" className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded">
          ← Back to Inter-State Portal
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {NIGERIAN_STATES.map((st) => (
          <div key={st} className="p-4 bg-slate-900 border border-slate-800 rounded space-y-2">
            <div className="flex justify-between items-center border-b border-slate-800 pb-1">
              <span className="font-bold text-slate-100 text-sm">{st}</span>
              <span className="text-[10px] text-slate-500 font-mono">STATE COMMAND</span>
            </div>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>Outgoing Requests:</span>
                <span className="text-slate-200 font-bold">{st === 'Edo' || st === 'Lagos' ? 12 : 3}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Incoming Requests:</span>
                <span className="text-slate-200 font-bold">{st === 'Lagos' ? 24 : 5}</span>
              </div>
              <div className="flex justify-between text-emerald-400">
                <span>Approved:</span>
                <span className="font-bold">{st === 'Lagos' ? 22 : 4}</span>
              </div>
              <div className="flex justify-between text-red-400">
                <span>Emergency Overrides:</span>
                <span className="font-bold">{st === 'Edo' ? 1 : 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
