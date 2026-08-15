'use client';

import Link from 'next/link';

export default function ExecutiveAnalyticsDashboardPage() {
  const summary = {
    totalIncidents24h: 314,
    totalArrests30d: 1420,
    activeWarrantsCount: 89,
    capturedWantedCount: 34,
    evidenceVaultTotalBytes: '451.0 GB',
    caseClosurePercentage: '78.4%',
    topIncidentState: 'Lagos',
    stateBreakdown: [
      { state: 'Lagos', incidents: 124, arrests: 512 },
      { state: 'Edo', incidents: 68, arrests: 290 },
      { state: 'Kano', incidents: 42, arrests: 180 },
      { state: 'Rivers', incidents: 38, arrests: 160 },
      { state: 'FCT', incidents: 42, arrests: 278 },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">🏛 EXECUTIVE COMMAND ANALYTICS DASHBOARD</h2>
          <p className="text-xs text-slate-400">High-level national law-enforcement metrics for IGP and State Commissioners of Police.</p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/analytics/biometrics"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-bold rounded text-xs transition"
          >
            👤 Facial Recognition Match Workbench
          </Link>
          <Link
            href="/analytics/heatmap"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
          >
            🔥 Crime Density Heatmap & Trends
          </Link>
        </div>
      </div>

      {/* Executive Command Overview HUD Counters */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <span className="text-slate-400 text-[10px]">INCIDENTS LOGGED (LAST 24H)</span>
          <div className="text-2xl font-bold text-amber-500">{summary.totalIncidents24h}</div>
          <span className="text-[10px] text-slate-500">Highest Volume: {summary.topIncidentState} State</span>
        </div>
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <span className="text-slate-400 text-[10px]">CUSTODY ARRESTS (30 DAYS)</span>
          <div className="text-2xl font-bold text-emerald-400">{summary.totalArrests30d}</div>
          <span className="text-[10px] text-slate-500">78.4% Case Prosecution Rate</span>
        </div>
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <span className="text-slate-400 text-[10px]">ACTIVE WARRANTS / FUGITIVES</span>
          <div className="text-2xl font-bold text-red-400">{summary.activeWarrantsCount} / {summary.capturedWantedCount}</div>
          <span className="text-[10px] text-slate-500">34 Fugitives Subdued & Captured</span>
        </div>
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <span className="text-slate-400 text-[10px]">DIGITAL EVIDENCE VAULT</span>
          <div className="text-2xl font-bold text-slate-100">{summary.evidenceVaultTotalBytes}</div>
          <span className="text-[10px] text-slate-500">100% SHA-256 Intact</span>
        </div>
      </div>

      {/* State Command Breakdown Table */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">STATE COMMAND ACTIVITY BREAKDOWN</h3>
        <div className="grid grid-cols-5 gap-4">
          {summary.stateBreakdown.map((sb) => (
            <div key={sb.state} className="p-4 bg-slate-950 border border-slate-800 rounded space-y-2">
              <div className="flex justify-between items-center border-b border-slate-800 pb-1">
                <span className="font-bold text-slate-100 text-sm">{sb.state} State</span>
              </div>
              <div className="space-y-1 text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Incidents:</span>
                  <span className="text-amber-400 font-bold">{sb.incidents}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Custody Arrests:</span>
                  <span className="text-emerald-400 font-bold">{sb.arrests}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
