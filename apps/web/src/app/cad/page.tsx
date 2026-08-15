'use client';

import { useState } from 'react';

export default function CadConsolePage() {
  const [showDispatchModal, setShowDispatchModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<any | null>(null);
  const [dispatchSuccess, setDispatchSuccess] = useState<string | null>(null);

  const incidents = [
    {
      cadNumber: 'CAD-2026-EDO-00912',
      title: 'Armed Hijacking & Vehicle Theft',
      category: 'ARMED_ROBBERY',
      priority: 'CRITICAL',
      location: 'Kilometer 42, Ore-Benin Expressway',
      lat: 6.335,
      lng: 5.603,
      status: 'QUEUED_FOR_DISPATCH',
      dispatchedUnit: null,
      time: '12 mins ago',
    },
  ];

  const units = [
    {
      unitId: 'unit-edo-patrol-01',
      callsign: 'PATROL-EDO-101',
      officer: 'Insp. Emmanuel Okafor',
      status: 'ON_PATROL',
      lat: 6.338,
      lng: 5.608,
      speed: '45 km/h',
      distanceKm: 0.65,
      etaMinutes: 1,
    },
    {
      unitId: 'unit-edo-patrol-02',
      callsign: 'PATROL-EDO-102',
      officer: 'Sgt. Ibrahim Musa',
      status: 'ON_PATROL',
      lat: 6.450,
      lng: 5.750,
      speed: '60 km/h',
      distanceKm: 20.35,
      etaMinutes: 20,
    },
  ];

  const handleDispatch = (unitCallsign: string) => {
    setDispatchSuccess(`✔ Unit ${unitCallsign} dispatched to Incident ${selectedIncident?.cadNumber}! Broadcast sent to field unit.`);
    setTimeout(() => {
      setShowDispatchModal(false);
      setDispatchSuccess(null);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">📡 COMPUTER-AIDED DISPATCH (CAD) & REAL-TIME TELEMETRY</h2>
          <p className="text-xs text-slate-400">Live Incident Dispatch Queue, Haversine Proximity-Based Nearest Unit Recommender & Patrol Telemetry.</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* CAD Incident Dispatch Queue (Left 2 cols) */}
        <div className="col-span-2 space-y-4">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
            <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2 flex justify-between items-center">
              <span>LIVE DISPATCH INCIDENT QUEUE</span>
              <span className="px-2 py-0.5 bg-red-950 text-red-400 border border-red-800 rounded text-[10px]">
                1 UNASSIGNED CALLOUT
              </span>
            </h3>

            <div className="space-y-3">
              {incidents.map((inc) => (
                <div key={inc.cadNumber} className="p-5 bg-slate-950 border border-slate-800 rounded-lg space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-amber-500 text-sm">{inc.cadNumber} — {inc.title}</span>
                      <div className="text-[10px] text-slate-500">{inc.location} (GPS: {inc.lat}, {inc.lng})</div>
                    </div>
                    <span className="px-2.5 py-0.5 bg-red-950 text-red-400 border border-red-800 font-bold rounded text-[10px]">
                      {inc.priority}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-800">
                    <span className="text-[10px] text-amber-400 font-bold">STATUS: {inc.status}</span>
                    <button
                      onClick={() => {
                        setSelectedIncident(inc);
                        setShowDispatchModal(true);
                      }}
                      className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
                    >
                      🎯 Dispatch Nearest Unit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Patrol Telemetry Grid (Right 1 col) */}
        <div className="space-y-4">
          <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
            <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">ACTIVE PATROL TELEMETRY GRID</h3>
            <div className="space-y-3">
              {units.map((u) => (
                <div key={u.unitId} className="p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-100">{u.callsign}</span>
                    <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded text-[10px] font-bold">
                      {u.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">Officer: {u.officer}</div>
                  <div className="text-[10px] text-amber-400">Speed: {u.speed} | GPS: {u.lat}, {u.lng}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showDispatchModal && selectedIncident && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-100">PROXIMITY-BASED NEAREST UNIT RECOMMENDATION</h3>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded text-[11px] text-slate-300">
              Target Incident: <strong className="text-amber-500">{selectedIncident.cadNumber}</strong> ({selectedIncident.title})
            </div>

            <div className="space-y-2">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Ranked by Haversine Distance:</div>
              {units.map((u) => (
                <div key={u.unitId} className="p-3 bg-slate-950 border border-slate-800 rounded flex justify-between items-center">
                  <div>
                    <div className="font-bold text-slate-100">{u.callsign} ({u.officer})</div>
                    <div className="text-[10px] text-emerald-400 font-bold">
                      Distance: {u.distanceKm} km | ETA: ~{u.etaMinutes} min
                    </div>
                  </div>
                  <button
                    onClick={() => handleDispatch(u.callsign)}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs"
                  >
                    Dispatch Unit
                  </button>
                </div>
              ))}
            </div>

            {dispatchSuccess && (
              <div className="p-3 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-[11px] font-bold">
                {dispatchSuccess}
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={() => setShowDispatchModal(false)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
