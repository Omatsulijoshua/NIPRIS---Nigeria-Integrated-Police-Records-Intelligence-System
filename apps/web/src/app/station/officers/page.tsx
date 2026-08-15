'use client';

import { useState } from 'react';

export default function StationOfficersPage() {
  const [officers, setOfficers] = useState([
    { id: 'off_001', name: 'CSP Ibrahim Danjuma', badge: 'NPF-88201', rank: 'Chief Superintendent', role: 'STATION_COMMANDER', unit: 'Command Overhead', status: 'ON_DUTY' },
    { id: 'off_002', name: 'Insp Grace Enagbare', badge: 'NPF-94102', rank: 'Inspector', role: 'DESK_OFFICER', unit: 'Station Counter & Desk Guard', status: 'ON_DUTY' },
    { id: 'off_003', name: 'DSP Chidi Okonkwo', badge: 'NPF-77319', rank: 'Deputy Superintendent', role: 'INVESTIGATING_OFFICER', unit: 'Criminal Investigation Department (CID)', status: 'ON_DUTY' },
    { id: 'off_004', name: 'Sgt Monday Usifo', badge: 'NPF-66120', rank: 'Sergeant', role: 'PATROL_OFFICER', unit: 'General Patrol & Response Unit', status: 'ON_PATROL' },
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">👮 STATION OFFICERS & UNIT ASSIGNMENTS</h2>
          <p className="text-xs text-slate-400">View station roster, assigned operational roles, and internal unit allocations.</p>
        </div>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">ASSIGNED STATION PERSONNEL</h3>
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Badge Number</th>
              <th className="px-4 py-3">Officer Name & Rank</th>
              <th className="px-4 py-3">Station Role</th>
              <th className="px-4 py-3">Assigned Unit</th>
              <th className="px-4 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {officers.map((o) => (
              <tr key={o.badge} className="hover:bg-slate-800/40 transition">
                <td className="px-4 py-3 font-bold text-amber-400">{o.badge}</td>
                <td className="px-4 py-3">
                  <div className="font-bold text-slate-100">{o.name}</div>
                  <div className="text-[10px] text-slate-400">{o.rank}</div>
                </td>
                <td className="px-4 py-3 font-bold text-slate-200">{o.role}</td>
                <td className="px-4 py-3 text-slate-300">{o.unit}</td>
                <td className="px-4 py-3 text-right">
                  <span className={`px-2 py-0.5 font-bold rounded text-[10px] ${o.status === 'ON_PATROL' ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'}`}>
                    {o.status}
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
