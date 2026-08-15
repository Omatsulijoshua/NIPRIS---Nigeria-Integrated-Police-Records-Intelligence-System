'use client';

import { useState } from 'react';

export default function StationVehiclesPage() {
  const [vehicles, setVehicles] = useState([
    { plate: 'NPF-EDO-001', callSign: 'PATROL-ALPHA', model: 'Toyota Hilux 4x4 Patrol Van', odometer: 14250, fuel: 85, status: 'AVAILABLE', driver: 'Unassigned' },
    { plate: 'NPF-EDO-002', callSign: 'PATROL-BRAVO', model: 'Innoson G80 Armored Tactical', odometer: 28900, fuel: 60, status: 'PATROL', driver: 'Sgt Monday Usifo (NPF-66120)' },
  ]);

  const [equipment, setEquipment] = useState([
    { code: 'EQP-AK47-001', name: 'AK-47 Assault Rifle 7.62mm', serial: 'AK-NPF-88912', category: 'FIREARM', status: 'IN_ARMORY', officer: 'Unassigned' },
    { code: 'EQP-ARMOR-001', name: 'Tactical Kevlar Vest Level III', serial: 'ARM-NPF-44120', category: 'BODY_ARMOR', status: 'ISSUED', officer: 'Sgt Monday Usifo (NPF-66120)' },
  ]);

  const handleDispatch = (plate: string) => {
    setVehicles(
      vehicles.map((v) => (v.plate === plate ? { ...v, status: 'PATROL', driver: 'Sgt Monday Usifo (NPF-66120)' } : v))
    );
    alert(`✔ Vehicle ${plate} dispatched for Evening Patrol Sector B cleanly!`);
  };

  const handleIssueEquipment = (code: string) => {
    setEquipment(
      equipment.map((e) => (e.code === code ? { ...e, status: 'ISSUED', officer: 'Sgt Monday Usifo (NPF-66120)' } : e))
    );
    alert(`✔ Armory Equipment ${code} issued to Officer Sgt Monday Usifo (30 rounds issued)!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-amber-500">🚔 STATION FLEET VEHICLES & TACTICAL ARMORY</h2>
          <p className="text-[10px] sm:text-xs text-slate-400">Patrol vehicle dispatch, odometer mileage logs, armory weapon sign-out, & defect maintenance alerts.</p>
        </div>
      </div>

      {/* Fleet Status Board */}
      <div className="p-4 sm:p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">PATROL FLEET VEHICLE STATUS BOARD</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vehicles.map((v) => (
            <div key={v.plate} className="p-4 bg-slate-950 border border-slate-800 rounded space-y-3">
              <div className="flex justify-between items-center flex-wrap gap-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-amber-400 text-sm">{v.plate}</span>
                  <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold rounded text-[10px]">{v.callSign}</span>
                </div>
                <span className={`px-2 py-0.5 font-bold rounded text-[10px] ${v.status === 'AVAILABLE' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                  {v.status}
                </span>
              </div>
              <div className="text-slate-100 font-bold text-xs">{v.model}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] text-slate-400 bg-slate-900/50 p-2 rounded border border-slate-800/50">
                <div>Mileage: <span className="text-slate-200 font-bold">{v.odometer.toLocaleString()} km</span></div>
                <div>Fuel Level: <span className="text-emerald-400 font-bold">{v.fuel}%</span></div>
                <div className="sm:col-span-2">Assigned Driver: <span className="text-amber-400 font-bold">{v.driver}</span></div>
              </div>
              {v.status === 'AVAILABLE' && (
                <div className="pt-1 flex justify-end">
                  <button
                    onClick={() => handleDispatch(v.plate)}
                    className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-[10px]"
                  >
                    🚔 Log Patrol Dispatch
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Armory Tactical Equipment */}
      <div className="p-4 sm:p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">TACTICAL ARMORY & EQUIPMENT SIGN-OUT</h3>
        <div className="space-y-3">
          {equipment.map((e) => (
            <div key={e.code} className="p-4 bg-slate-950 border border-slate-800 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                  <span className="font-bold text-amber-500">{e.code}</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-300 font-bold rounded text-[10px]">{e.category}</span>
                  <span className="text-slate-400 text-[10px]">SN: {e.serial}</span>
                </div>
                <div className="text-slate-100 font-bold text-xs">{e.name}</div>
                <div className="text-[10px] text-slate-400">Assigned Officer: <span className="text-amber-400 font-bold">{e.officer}</span></div>
              </div>
              <div className="flex items-center space-x-3 self-end sm:self-auto">
                <span className={`px-2 py-0.5 font-bold rounded text-[10px] ${e.status === 'IN_ARMORY' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                  {e.status}
                </span>
                {e.status === 'IN_ARMORY' && (
                  <button
                    onClick={() => handleIssueEquipment(e.code)}
                    className="px-3 py-1 bg-indigo-700 hover:bg-indigo-600 text-slate-100 font-bold rounded text-[10px]"
                  >
                    🛡 Sign Out Weapon / Gear
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
