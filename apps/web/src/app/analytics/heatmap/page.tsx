'use client';

import Link from 'next/link';

export default function CrimeHeatmapPage() {
  const hotspots = [
    {
      lga: 'Oredo LGA (Benin City Central)',
      state: 'Edo',
      count: 142,
      severity: 'CRITICAL',
      timeOfDay: 'Night (62 incidents)',
    },
    {
      lga: 'Ikeja LGA (Commercial Hub)',
      state: 'Lagos',
      count: 289,
      severity: 'CRITICAL',
      timeOfDay: 'Night (110 incidents)',
    },
    {
      lga: 'Kano Municipal LGA',
      state: 'Kano',
      count: 88,
      severity: 'MODERATE',
      timeOfDay: 'Night (38 incidents)',
    },
  ];

  const trends = [
    {
      region: 'Edo State - Ore Corridor Highway',
      type: 'Armed Hijacking & Transit Robbery',
      confidence: '88.5%',
      rec: 'Increase Highway Patrol by +35% between 01:00 and 04:30 Hours',
      mo: 'Nighttime Log-Truck Impairment & Spikestrip Obstruction',
    },
    {
      region: 'Lagos State - Ikeja Commercial Financial Belt',
      type: 'Commercial Vault & ATM Perimeter Infiltration',
      confidence: '92.1%',
      rec: 'Deploy Armored Personnel Unit to Financial District Central',
      mo: 'Early Morning Heavy Machinery & Wire-Cutting Attacks',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-amber-500">🔥 National Crime Density Heatmap & Predictive Trends</h2>
          <p className="text-xs text-slate-400">LGA hotspot clustering, time-of-day density distribution, and predictive patrol deployment recommendations.</p>
        </div>
        <Link href="/analytics" className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded">
          ← Back to Executive Dashboard
        </Link>
      </div>

      {/* Visual Density Map Simulation Container */}
      <div className="p-8 bg-slate-950 border border-slate-800 rounded-lg flex flex-col items-center justify-center min-h-[220px] space-y-3 relative overflow-hidden">
        <div className="text-amber-500 font-bold text-base">🗺 NATIONAL CRIME DENSITY HEATMAP GRID (36 STATES + FCT)</div>
        <div className="text-slate-400 text-xs">Interactive GPS Heatmap Layers & Hotspot Radius Overlays</div>
        <div className="flex space-x-4 pt-2">
          <span className="px-3 py-1 bg-red-950 text-red-400 border border-red-800 rounded font-bold text-[10px]">CRITICAL HOTSPOTS: 2</span>
          <span className="px-3 py-1 bg-amber-950 text-amber-400 border border-amber-800 rounded font-bold text-[10px]">MODERATE HOTSPOTS: 1</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* LGA Hotspot List */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
          <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">CRITICAL LGA DENSITY HOTSPOTS</h3>
          <div className="space-y-3">
            {hotspots.map((hs, idx) => (
              <div key={idx} className="p-3.5 bg-slate-950 rounded border border-slate-800 space-y-1">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-slate-100">{hs.lga} ({hs.state} State)</span>
                  <span className="px-2 py-0.5 bg-red-950 text-red-400 border border-red-800 rounded text-[10px]">{hs.severity}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-amber-400">Incidents Logged: {hs.count}</span>
                  <span className="text-slate-400">Peak Density: {hs.timeOfDay}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Predictive Crime Trend Cards */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
          <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">PREDICTIVE SURGE FORECASTS & MODUS OPERANDI CLUSTERS</h3>
          <div className="space-y-3">
            {trends.map((tr, idx) => (
              <div key={idx} className="p-3.5 bg-slate-950 rounded border border-slate-800 space-y-2">
                <div className="flex justify-between items-start font-bold">
                  <span className="text-amber-400 text-xs">{tr.region}</span>
                  <span className="text-emerald-400 text-[10px]">Confidence: {tr.confidence}</span>
                </div>
                <div className="text-slate-200 font-semibold">{tr.type}</div>
                <div className="text-slate-400 text-[10px]">MO Cluster: {tr.mo}</div>
                <div className="p-2 bg-slate-900 rounded text-emerald-300 text-[10px] border border-slate-800 font-semibold">
                  💡 Recommended Action: {tr.rec}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
