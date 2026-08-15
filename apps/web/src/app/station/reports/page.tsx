'use client';

import { useState } from 'react';

export default function StationReportsPage() {
  const [period, setPeriod] = useState('MONTHLY');

  const summary = {
    complaints: { total: 45, converted: 38, rate: '84.4%' },
    incidents: { total: 38, underInvestigation: 9, closed: 25 },
    custody: { totalIntakes: 36, avgHours: '18.5 hrs', complianceRate: '94.4%' },
    prosecution: { compiled: 18, endorsed: 18, courtArraigned: 15 },
  };

  const crimeTrends = [
    { category: 'ARMED_ROBBERY', count: 15, percentage: '39.5%', sector: 'Ring Road Commercial Axis' },
    { category: 'BURGLARY', count: 12, percentage: '31.5%', sector: 'GRA Residential Zone' },
    { category: 'FELONY_THEFT', count: 7, percentage: '18.4%', sector: 'Sapele Road Transit Corridor' },
    { category: 'ASSAULT', count: 4, percentage: '10.6%', sector: 'Central Market Precinct' },
  ];

  const officerPerf = [
    { officer: 'Sgt Monday Usifo (NPF-66120)', activeCases: 3, tasks: 18, diaryEntries: 42, attendance: '98%' },
    { officer: 'DSP Chidi Okonkwo (NPF-77319)', activeCases: 5, tasks: 24, diaryEntries: 31, attendance: '100%' },
    { officer: 'Insp Grace Enagbare (NPF-94102)', activeCases: 1, tasks: 15, diaryEntries: 58, attendance: '96%' },
  ];

  const handleExportCSV = () => {
    const csvData = `StationId,Period,TotalComplaints,ConvertedIncidents,AvgDetentionHours,ConstitutionalComplianceRate\nstn_edo_001,${period},45,38,18.5,94.4%`;
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Station_Operational_Report_${period}_${Date.now()}.csv`;
    a.click();
    alert(`✔ Exported Station Operational Report (${period}) in CSV format!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-amber-500">📊 STATION REPORTING & OPERATIONAL ANALYTICS</h2>
          <p className="text-[10px] sm:text-xs text-slate-400">Aggregated operational summary, sector crime trends, officer workload, & 24h remand compliance.</p>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded p-2 text-xs font-bold text-amber-400"
          >
            <option value="DAILY">Daily Report</option>
            <option value="WEEKLY">Weekly Report</option>
            <option value="MONTHLY">Monthly Summary</option>
            <option value="ANNUAL">Annual Report</option>
          </select>
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
          >
            📥 Export Report (CSV)
          </button>
        </div>
      </div>

      {/* Operational Summary HUD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">COMPLAINTS INTAKE</div>
          <div className="text-amber-400 font-bold text-xl">{summary.complaints.total} Total</div>
          <div className="text-[10px] text-slate-400">{summary.complaints.converted} Converted to Incident ({summary.complaints.rate})</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">CRIME INCIDENTS</div>
          <div className="text-slate-100 font-bold text-xl">{summary.incidents.total} Incidents</div>
          <div className="text-[10px] text-slate-400">{summary.incidents.closed} Closed | {summary.incidents.underInvestigation} Under Investigation</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">CUSTODY & REMAND</div>
          <div className="text-emerald-400 font-bold text-xl">{summary.custody.complianceRate} 24h Compliant</div>
          <div className="text-[10px] text-slate-400">Avg Duration: {summary.custody.avgHours}</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">PROSECUTION FILES</div>
          <div className="text-indigo-400 font-bold text-xl">{summary.prosecution.compiled} Sheets</div>
          <div className="text-[10px] text-slate-400">{summary.prosecution.courtArraigned} Arraigned in Court</div>
        </div>
      </div>

      {/* Crime Trends by Sector */}
      <div className="p-4 sm:p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">CRIME CATEGORY DISTRIBUTION & SECTOR HOTSPOTS</h3>
        <div className="space-y-3">
          {crimeTrends.map((c) => (
            <div key={c.category} className="p-3 bg-slate-950 border border-slate-800 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="font-bold text-amber-400">{c.category}</div>
                <div className="text-[10px] text-slate-400">Primary Hotspot Sector: <span className="text-slate-200 font-bold">{c.sector}</span></div>
              </div>
              <div className="flex items-center space-x-3 self-end sm:self-auto">
                <span className="text-slate-100 font-bold">{c.count} Incidents</span>
                <span className="px-2 py-0.5 bg-slate-800 text-amber-400 font-bold rounded text-[10px]">{c.percentage}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Officer Workload & Performance */}
      <div className="p-4 sm:p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">OFFICER WORKLOAD & PERFORMANCE METRICS</h3>
        <div className="space-y-3">
          {officerPerf.map((o) => (
            <div key={o.officer} className="p-3 bg-slate-950 border border-slate-800 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="font-bold text-slate-100">{o.officer}</div>
                <div className="text-[10px] text-slate-400">Diary Entries Logged: <span className="text-amber-400 font-bold">{o.diaryEntries}</span></div>
              </div>
              <div className="flex items-center space-x-4 text-[11px] self-end sm:self-auto">
                <div>Active Cases: <span className="text-indigo-400 font-bold">{o.activeCases}</span></div>
                <div>Completed Tasks: <span className="text-emerald-400 font-bold">{o.tasks}</span></div>
                <div>Attendance: <span className="text-amber-400 font-bold">{o.attendance}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
