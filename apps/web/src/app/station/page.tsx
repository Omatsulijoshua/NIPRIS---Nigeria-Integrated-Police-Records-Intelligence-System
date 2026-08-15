'use client';

import { useState } from 'react';

export default function StationDashboardPage() {
  const [selectedRole, setSelectedRole] = useState<'STATION_COMMANDER' | 'DESK_OFFICER' | 'INVESTIGATING_OFFICER' | 'PATROL_OFFICER' | 'EVIDENCE_OFFICER'>('STATION_COMMANDER');

  const metrics = {
    officersOnDuty: 14,
    officersOffDuty: 8,
    incidentsToday: 5,
    openIncidents: 3,
    arrestsToday: 2,
    currentlyDetained: 12,
    cellCapacity: 20,
    overcrowdingAlert: false,
    activeCases: 9,
    evidenceReceivedToday: 4,
    bodycamsActive: 10,
    vehiclesAvailable: 4,
    tasksTodo: 6,
  };

  const activityFeed = [
    { id: 'act_001', time: '5m ago', category: 'INCIDENT', title: 'New Incident Reported (INC-2026-EDO-00912)', actor: 'Insp Grace Enagbare', details: 'Armed robbery complaint at Ring Road, Benin City.' },
    { id: 'act_002', time: '25m ago', category: 'ARREST', title: 'Arrest Booking Recorded (ARR-2026-EDO-00912)', actor: 'Sgt Monday Usifo', details: 'Suspect booked for felony theft at Station Cell #2.' },
    { id: 'act_003', time: '45m ago', category: 'EVIDENCE', title: 'Evidence Item Intake Sealed (EVD-2026-EDO-00912)', actor: 'DSP Chidi Okonkwo', details: 'Physical asset photo & knife intake logged in storage locker #14.' },
    { id: 'act_004', time: '1h ago', category: 'BODYCAM', title: 'Bodycam Video Uploaded (BWC-NPF-EDO-001)', actor: 'Sgt Monday Usifo', details: '45 mins shift video uploaded to SHA-256 evidence vault.' },
    { id: 'act_005', time: '2h ago', category: 'CUSTODY', title: 'Custody Transfer Initiated (TRF-2026-NCOS-00812)', actor: 'CSP Ibrahim Danjuma', details: 'Inmate transferred to NCoS Remand Center.' },
  ];

  const alerts = [
    { id: 'alt_001', severity: 'HIGH', category: 'CUSTODY_DETENTION', title: 'Pending Detention Review', description: 'Inmate Osagie Efe custody review due within 2 hours.' },
    { id: 'alt_002', severity: 'CRITICAL', category: 'WARRANT_ALERT', title: 'High-Risk Wanted Candidate Match', description: 'Facial candidate match flagged for Wanted Circular WAR-2026-EDO-00912.' },
    { id: 'alt_003', severity: 'WARNING', category: 'BODYCAM_COMPLIANCE', title: 'Bodycam Upload Pending', description: 'Device BWC-NPF-EDO-004 has 2 un-uploaded shift recordings.' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-mono text-xs">
      {/* Header & Role Switcher */}
      <div className="flex items-center justify-between bg-slate-900 p-6 border border-slate-800 rounded-lg">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">🏬 NIPRIS STATION — COMMAND & OPERATIONS DASHBOARD</h2>
          <p className="text-xs text-slate-400">Benin Central Police Station | Division: Benin Central | Command: Edo State Command</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] text-slate-400 font-bold">ADAPTIVE ROLE VIEW:</span>
          <select
            value={selectedRole}
            onChange={(e: any) => setSelectedRole(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded p-2 text-xs font-bold text-amber-400"
          >
            <option value="STATION_COMMANDER">Station Commander View</option>
            <option value="DESK_OFFICER">Desk Officer View</option>
            <option value="INVESTIGATING_OFFICER">Investigating Officer View</option>
            <option value="PATROL_OFFICER">Patrol Officer View</option>
            <option value="EVIDENCE_OFFICER">Evidence Officer View</option>
          </select>
        </div>
      </div>

      {/* TODAY Dashboard Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">OFFICERS ON DUTY</div>
          <div className="text-emerald-400 font-bold text-2xl">{metrics.officersOnDuty} Active</div>
          <div className="text-[10px] text-slate-400">{metrics.officersOffDuty} Off Duty | 2 On Leave</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">TODAY INCIDENTS</div>
          <div className="text-amber-400 font-bold text-2xl">{metrics.incidentsToday} Reported</div>
          <div className="text-[10px] text-slate-400">{metrics.openIncidents} Open Under Investigation</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">STATION CUSTODY</div>
          <div className="text-slate-100 font-bold text-2xl">{metrics.currentlyDetained} / {metrics.cellCapacity}</div>
          <div className="text-[10px] text-slate-400">Holding Cell Occupancy: 60%</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">ACTIVE INVESTIGATIONS</div>
          <div className="text-indigo-400 font-bold text-2xl">{metrics.activeCases} Cases</div>
          <div className="text-[10px] text-slate-400">3 Pending Prosecution Sheet</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">ARRESTS BOOKED TODAY</div>
          <div className="text-red-400 font-bold text-xl">{metrics.arrestsToday} Booked</div>
          <div className="text-[10px] text-slate-400">11 This Week | 42 This Month</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">EVIDENCE IN STORAGE</div>
          <div className="text-amber-400 font-bold text-xl">{metrics.evidenceReceivedToday} Intake Today</div>
          <div className="text-[10px] text-slate-400">87 Total Items Sealed</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">BODYCAMS ACTIVE</div>
          <div className="text-emerald-400 font-bold text-xl">{metrics.bodycamsActive} Online</div>
          <div className="text-[10px] text-slate-400">2 Video Uploads Pending</div>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">STATION FLEET</div>
          <div className="text-slate-100 font-bold text-xl">{metrics.vehiclesAvailable} Available</div>
          <div className="text-[10px] text-slate-400">3 In Use | 2 On Patrol</div>
        </div>
      </div>

      {/* Grid Layout: Activity Feed & Operational Alerts */}
      <div className="grid grid-cols-3 gap-6">
        {/* Activity Feed (2 Cols) */}
        <div className="col-span-2 p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="font-bold text-slate-200">⚡ REAL-TIME STATION ACTIVITY FEED</h3>
            <span className="text-[10px] text-slate-500">Live operational events</span>
          </div>

          <div className="space-y-3">
            {activityFeed.map((act) => (
              <div key={act.id} className="p-3 bg-slate-950 border border-slate-800 rounded space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-100">{act.title}</span>
                  <span className="text-[10px] text-slate-500">{act.time}</span>
                </div>
                <div className="text-slate-300">{act.details}</div>
                <div className="text-[10px] text-amber-400">Logged by: {act.actor}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Alerts HUD (1 Col) */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <h3 className="font-bold text-red-400">🔔 URGENT STATION ALERTS</h3>
            <span className="px-2 py-0.5 bg-red-950 text-red-400 font-bold rounded text-[10px]">3 ALERTS</span>
          </div>

          <div className="space-y-3">
            {alerts.map((alt) => (
              <div key={alt.id} className={`p-3 rounded border space-y-1 ${alt.severity === 'CRITICAL' ? 'bg-red-950/60 border-red-800 text-red-200' : 'bg-amber-950/60 border-amber-800 text-amber-200'}`}>
                <div className="font-bold">{alt.title}</div>
                <div className="text-[11px]">{alt.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
