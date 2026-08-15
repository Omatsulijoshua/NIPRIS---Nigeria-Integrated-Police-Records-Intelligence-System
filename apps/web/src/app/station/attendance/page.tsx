'use client';

import { useState } from 'react';

export default function StationAttendancePage() {
  const [logs, setLogs] = useState([
    {
      id: 'att_001',
      officerName: 'Insp Grace Enagbare',
      badge: 'NPF-94102',
      clockIn: '07:55 AM Today',
      clockOut: 'Active',
      status: 'ON_DUTY',
      notes: 'Station Counter Terminal Clock-in',
    },
    {
      id: 'att_002',
      officerName: 'Sgt Monday Usifo',
      badge: 'NPF-66120',
      clockIn: '03:45 PM Today',
      clockOut: 'Active',
      status: 'ON_PATROL',
      notes: 'Mobile CAD Terminal Clock-in',
    },
  ]);

  const [officerId, setOfficerId] = useState('off_patrol_001');
  const [operationalStatus, setOperationalStatus] = useState('ON_DUTY');

  const handleClockIn = () => {
    const newLog = {
      id: `att_${Date.now()}`,
      officerName: 'Sgt Monday Usifo',
      badge: 'NPF-66120',
      clockIn: 'Just now',
      clockOut: 'Active',
      status: operationalStatus,
      notes: 'Station Kiosk Clock-in',
    };
    setLogs([newLog, ...logs]);
    alert('✔ Officer Clocked IN cleanly!');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">⏱️ OFFICER ATTENDANCE & OPERATIONAL STATUS BOARD</h2>
          <p className="text-xs text-slate-400">Clock-in / Clock-out timestamps and real-time duty status monitoring.</p>
        </div>
      </div>

      {/* Clock-In Terminal Panel */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">STATION ATTENDANCE CLOCK-IN TERMINAL</h3>
        <div className="flex space-x-4 items-end">
          <div className="flex-1">
            <label className="block text-[10px] text-slate-400 mb-1">SELECT OFFICER</label>
            <select
              value={officerId}
              onChange={(e) => setOfficerId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-amber-400 font-bold"
            >
              <option value="off_patrol_001">Sgt Monday Usifo (NPF-66120)</option>
              <option value="off_desk_001">Insp Grace Enagbare (NPF-94102)</option>
              <option value="off_cid_001">DSP Chidi Okonkwo (NPF-77319)</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-[10px] text-slate-400 mb-1">INITIAL OPERATIONAL STATUS</label>
            <select
              value={operationalStatus}
              onChange={(e) => setOperationalStatus(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-amber-400 font-bold"
            >
              <option value="ON_DUTY">ON_DUTY</option>
              <option value="ON_PATROL">ON_PATROL</option>
              <option value="AT_STATION">AT_STATION</option>
              <option value="ON_ASSIGNMENT">ON_ASSIGNMENT</option>
            </select>
          </div>
          <button
            onClick={handleClockIn}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded text-xs transition"
          >
            Clock IN Shift
          </button>
        </div>
      </div>

      {/* Live Attendance Logs Table */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">TODAY'S SHIFT ATTENDANCE LOGS</h3>
        <div className="space-y-3">
          {logs.map((l) => (
            <div key={l.id} className="p-4 bg-slate-950 border border-slate-800 rounded flex justify-between items-center">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-slate-100">{l.officerName}</span>
                  <span className="text-[10px] text-slate-400">({l.badge})</span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold rounded text-[9px]">STATUS: {l.status}</span>
                </div>
                <div className="text-[10px] text-slate-400">Clock-in: <span className="text-amber-400 font-bold">{l.clockIn}</span> | Clock-out: <span className="text-slate-300 font-bold">{l.clockOut}</span></div>
                <div className="text-[10px] text-slate-500">{l.notes}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
