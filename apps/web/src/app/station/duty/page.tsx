'use client';

import { useState } from 'react';

export default function StationDutyRosterPage() {
  const [shifts] = useState([
    { id: 'sft_day_01', type: 'DAY', name: 'Morning Duty Shift A', time: '08:00 - 16:00', activeOfficers: 6 },
    { id: 'sft_eve_01', type: 'EVENING', name: 'Evening Patrol Shift B', time: '16:00 - 00:00', activeOfficers: 5 },
    { id: 'sft_night_01', type: 'NIGHT', name: 'Night Surveillance Shift C', time: '00:00 - 08:00', activeOfficers: 3 },
  ]);

  const [roster, setRoster] = useState([
    { id: 'rst_001', officerName: 'Insp Grace Enagbare', badge: 'NPF-94102', rank: 'Inspector', shiftName: 'Morning Duty Shift A', role: 'Station Counter Guard', status: 'ON_DUTY' },
    { id: 'rst_002', officerName: 'Sgt Monday Usifo', badge: 'NPF-66120', rank: 'Sergeant', shiftName: 'Evening Patrol Shift B', role: 'Patrol Vehicle Lead', status: 'ON_PATROL' },
    { id: 'rst_003', officerName: 'DSP Chidi Okonkwo', badge: 'NPF-77319', rank: 'DSP', shiftName: 'Morning Duty Shift A', role: 'CID Lead Investigator', status: 'AT_STATION' },
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">📅 STATION DUTY ROSTER & SHIFT MANAGEMENT</h2>
          <p className="text-xs text-slate-400">Shift schedules, roster assignment, and officer replacement.</p>
        </div>
      </div>

      {/* Shifts Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {shifts.map((s) => (
          <div key={s.id} className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-bold text-amber-400">{s.name}</span>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 font-bold rounded text-[10px]">{s.type}</span>
            </div>
            <div className="text-slate-300 text-xs font-bold">Hours: {s.time}</div>
            <div className="text-[10px] text-emerald-400 font-bold">{s.activeOfficers} Officers Ristered</div>
          </div>
        ))}
      </div>

      {/* Roster Table */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">ACTIVE OFFICER DUTY ROSTER</h3>
        <div className="space-y-3">
          {roster.map((r) => (
            <div key={r.id} className="p-3 bg-slate-950 border border-slate-800 rounded flex justify-between items-center">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-100">{r.officerName}</span>
                  <span className="text-[10px] text-slate-400">({r.badge})</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-amber-400 font-bold rounded text-[9px]">{r.rank}</span>
                </div>
                <div className="text-[10px] text-slate-400">Shift: <span className="text-slate-200 font-bold">{r.shiftName}</span> | Role: <span className="text-slate-200 font-bold">{r.role}</span></div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2.5 py-1 font-bold rounded text-[10px] ${r.status === 'ON_PATROL' ? 'bg-indigo-950 text-indigo-400 border border-indigo-800' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'}`}>
                  {r.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
