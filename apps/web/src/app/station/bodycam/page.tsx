'use client';

import { useState } from 'react';

export default function StationBodycamPage() {
  const [compliance] = useState({
    totalDevices: 10,
    checkedOut: 4,
    docked: 6,
    complianceRatePercentage: 92,
    powerOffAlertsCount: 0,
    unmatchedFootageCount: 1,
  });

  const [devices, setDevices] = useState([
    { deviceCode: 'BWC-NPF-EDO-001', battery: 94, storage: '128 GB', status: 'CHECKED_OUT', assignedOfficer: 'Sgt Monday Usifo (NPF-66120)', shift: 'Evening Patrol Shift B' },
    { deviceCode: 'BWC-NPF-EDO-002', battery: 100, storage: '128 GB', status: 'DOCKED', assignedOfficer: 'Unassigned', shift: 'None' },
    { deviceCode: 'BWC-NPF-EDO-003', battery: 45, storage: '128 GB', status: 'UPLOADING', assignedOfficer: 'Insp Grace Enagbare (NPF-94102)', shift: 'Morning Duty Shift A' },
  ]);

  const [unmatchedQueue, setUnmatchedQueue] = useState([
    {
      id: 'ftg_unmatched_001',
      dockId: 'DOCK-STN001-02',
      deviceCode: 'BWC-NPF-EDO-004',
      duration: '20 mins',
      sha256Hash: 'f4c8996fb92427ae41e4649b934ca495991b7852b855...',
      uploadedAt: '15 mins ago',
    },
  ]);

  const handleLinkFootage = (ftgId: string) => {
    setUnmatchedQueue(unmatchedQueue.filter((f) => f.id !== ftgId));
    alert(`✔ Unmatched Footage ${ftgId} linked to Officer Sgt Monday Usifo & Incident INC-2026-EDO-00912!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">📹 BODYCAM STATION OPERATIONS & LOCAL DOCKING</h2>
          <p className="text-xs text-slate-400">Device checkout, docking auto-upload queue, unmatched video resolver, & shift compliance rate.</p>
        </div>
      </div>

      {/* Station Bodycam Compliance HUD */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <h3 className="font-bold text-slate-200">STATION BODYCAM COMPLIANCE HUD</h3>
          <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold rounded text-[10px]">
            COMPLIANCE: {compliance.complianceRatePercentage}%
          </span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-1">
            <div className="text-[10px] text-slate-500">TOTAL DEVICES</div>
            <div className="text-slate-100 font-bold text-xl">{compliance.totalDevices} Units</div>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-1">
            <div className="text-[10px] text-slate-500">CHECKED OUT ON PATROL</div>
            <div className="text-amber-400 font-bold text-xl">{compliance.checkedOut} Active</div>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-1">
            <div className="text-[10px] text-slate-500">DOCKED & CHARGING</div>
            <div className="text-emerald-400 font-bold text-xl">{compliance.docked} Docked</div>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-1">
            <div className="text-[10px] text-slate-500">UNMATCHED FOOTAGE QUEUE</div>
            <div className="text-indigo-400 font-bold text-xl">{unmatchedQueue.length} Pending</div>
          </div>
        </div>
      </div>

      {/* Device Inventory */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">STATION BODYCAM HARDWARE INVENTORY</h3>
        <div className="space-y-3">
          {devices.map((d) => (
            <div key={d.deviceCode} className="p-4 bg-slate-950 border border-slate-800 rounded flex justify-between items-center">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-amber-500 text-sm">{d.deviceCode}</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-300 font-bold rounded text-[10px]">Battery: {d.battery}%</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-300 font-bold rounded text-[10px]">Storage: {d.storage}</span>
                </div>
                <div className="text-[10px] text-slate-400">Assigned Officer: <span className="text-slate-100 font-bold">{d.assignedOfficer}</span> | Shift: <span className="text-amber-400 font-bold">{d.shift}</span></div>
              </div>
              <span className={`px-2.5 py-1 font-bold rounded text-[10px] ${d.status === 'CHECKED_OUT' ? 'bg-amber-950 text-amber-400 border border-amber-800' : d.status === 'UPLOADING' ? 'bg-indigo-950 text-indigo-400 border border-indigo-800 animate-pulse' : 'bg-emerald-950 text-emerald-400 border border-emerald-800'}`}>
                {d.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Unmatched Footage Queue */}
      {unmatchedQueue.length > 0 && (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="font-bold text-indigo-400">UNMATCHED / UNASSIGNED FOOTAGE QUEUE</h3>
            <span className="text-[10px] text-slate-400">Requires manual linking by Desk Officer / Commander</span>
          </div>
          <div className="space-y-3">
            {unmatchedQueue.map((f) => (
              <div key={f.id} className="p-4 bg-slate-950 border border-slate-800 rounded space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-amber-400">{f.deviceCode} (Dock: {f.dockId})</span>
                  <span className="text-[10px] text-slate-400">{f.uploadedAt}</span>
                </div>
                <div className="text-[10px] text-slate-300">Duration: <span className="font-bold">{f.duration}</span> | SHA-256: <span className="text-slate-400">{f.sha256Hash}</span></div>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleLinkFootage(f.id)}
                    className="px-3 py-1 bg-indigo-700 hover:bg-indigo-600 text-slate-100 font-bold rounded text-[10px]"
                  >
                    🔗 Link to Officer & Incident
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
