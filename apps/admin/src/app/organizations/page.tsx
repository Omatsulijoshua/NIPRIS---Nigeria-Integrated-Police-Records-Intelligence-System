'use client';

import { useState } from 'react';
import { NIGERIAN_STATES, OrgLevel } from '@nipris/types';

export default function AdminOrganizationsPage() {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const mockOrgs = [
    { id: 'org-national-hq', code: 'NG-NAT-HQ', name: 'Nigeria Police National Headquarters', level: 'NATIONAL_HQ', state: 'National' },
    { id: 'org-state-edo', code: 'NG-STATE-EDO', name: 'Edo State Police Command', level: 'STATE_COMMAND', state: 'Edo' },
    { id: 'org-state-lagos', code: 'NG-STATE-LAGOS', name: 'Lagos State Police Command', level: 'STATE_COMMAND', state: 'Lagos' },
    { id: 'org-state-fct', code: 'NG-STATE-FCT', name: 'FCT Police Command', level: 'STATE_COMMAND', state: 'FCT' },
    { id: 'org-edo-central-area', code: 'EDO-AREA-CENTRAL', name: 'Benin Central Area Command', level: 'AREA_COMMAND', state: 'Edo' },
    { id: 'org-edo-station-a', code: 'EDO-STATION-A', name: 'Benin Central Police Station A', level: 'POLICE_STATION', state: 'Edo' },
  ];

  const filteredOrgs = mockOrgs.filter((org) => {
    if (selectedState !== 'All' && org.state !== selectedState) return false;
    if (selectedLevel !== 'All' && org.level !== selectedLevel) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Nigerian Police Command Hierarchy</h2>
          <p className="text-xs text-slate-400">Configure National HQ, 36 State Commands, FCT, Area Commands, Divisions, and Stations.</p>
        </div>
        <button className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition">
          + Add Command / Station Node
        </button>
      </div>

      <div className="flex space-x-4 bg-slate-900 p-4 rounded border border-slate-800">
        <div>
          <label className="block text-[10px] font-mono text-slate-400 mb-1">FILTER STATE / JURISDICTION</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-600 font-mono"
          >
            <option value="All">All States & FCT</option>
            {NIGERIAN_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-mono text-slate-400 mb-1">FILTER LEVEL</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-amber-600 font-mono"
          >
            <option value="All">All Levels</option>
            {Object.keys(OrgLevel).map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Organization Name</th>
              <th className="px-4 py-3">Level</th>
              <th className="px-4 py-3">State</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-mono">
            {filteredOrgs.map((org) => (
              <tr key={org.id} className="hover:bg-slate-800/50 transition">
                <td className="px-4 py-3 text-amber-500 font-bold">{org.code}</td>
                <td className="px-4 py-3 text-slate-100 font-semibold">{org.name}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                    {org.level}
                  </span>
                </td>
                <td className="px-4 py-3">{org.state}</td>
                <td className="px-4 py-3 text-right">
                  <button className="text-amber-500 hover:text-amber-400 text-xs">Configure Node</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
