'use client';

import { useState } from 'react';

export default function StationSettingsPage() {
  const [profile, setProfile] = useState({
    stationCode: 'STN-EDO-BENIN-CENTRAL',
    name: 'Benin Central Police Station',
    lga: 'Oredo LGA',
    address: '1 Sapele Road, Benin City, Edo State',
    phoneNumber: '+234-803-000-1122',
    email: 'benin.central@police.gov.ng',
    commander: 'CSP Ibrahim Danjuma (NPF-88201)',
    cellCapacity: 20,
    operatingHours: '24/7',
  });

  const [units, setUnits] = useState([
    { code: 'UNT-PATROL-01', name: 'General Patrol & Response Unit', desc: '24/7 Rapid response patrol team' },
    { code: 'UNT-CID-01', name: 'Criminal Investigation Department (CID)', desc: 'Investigative detectives & forensics' },
    { code: 'UNT-DESK-01', name: 'Station Counter & Desk Guard', desc: 'Public intake, complaint desk, & station diary' },
    { code: 'UNT-TRAFFIC-01', name: 'Traffic Management Unit', desc: 'Traffic control & vehicular incident response' },
  ]);

  const [newUnitName, setNewUnitName] = useState('');
  const [newUnitCode, setNewUnitCode] = useState('');

  const handleAddUnit = () => {
    if (!newUnitName || !newUnitCode) return;
    setUnits([...units, { code: newUnitCode, name: newUnitName, desc: 'Station operational unit' }]);
    setNewUnitName('');
    setNewUnitCode('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">🏢 STATION PROFILE & INTERNAL UNITS SETUP</h2>
          <p className="text-xs text-slate-400">Manage station metadata, holding cell capacity, and internal operational units.</p>
        </div>
      </div>

      {/* Station Profile Card */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">STATION OPERATIONAL PROFILE</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] text-slate-500">STATION NAME & CODE</label>
            <div className="font-bold text-slate-100">{profile.name} ({profile.stationCode})</div>
          </div>
          <div>
            <label className="block text-[10px] text-slate-500">STATION COMMANDER</label>
            <div className="font-bold text-amber-400">{profile.commander}</div>
          </div>
          <div>
            <label className="block text-[10px] text-slate-500">LGA & JURISDICTION</label>
            <div className="font-bold text-slate-200">{profile.lga}, Edo State</div>
          </div>
          <div>
            <label className="block text-[10px] text-slate-500">HOLDING CELL CAPACITY</label>
            <div className="font-bold text-emerald-400">{profile.cellCapacity} Detainees</div>
          </div>
          <div>
            <label className="block text-[10px] text-slate-500">ADDRESS</label>
            <div className="text-slate-300">{profile.address}</div>
          </div>
          <div>
            <label className="block text-[10px] text-slate-500">CONTACT DIRECT</label>
            <div className="text-slate-300">{profile.phoneNumber} | {profile.email}</div>
          </div>
        </div>
      </div>

      {/* Internal Operational Units Management */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">INTERNAL OPERATIONAL UNITS</h3>
        <div className="grid grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Unit Code (e.g. UNT-CID-02)"
            value={newUnitCode}
            onChange={(e) => setNewUnitCode(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100"
          />
          <input
            type="text"
            placeholder="Unit Name (e.g. Anti-Robbery Task Force)"
            value={newUnitName}
            onChange={(e) => setNewUnitName(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100"
          />
          <button
            onClick={handleAddUnit}
            className="py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded"
          >
            + Create Internal Unit
          </button>
        </div>

        <div className="space-y-2 mt-4">
          {units.map((u) => (
            <div key={u.code} className="p-3 bg-slate-950 border border-slate-800 rounded flex justify-between items-center">
              <div>
                <span className="font-bold text-amber-400 mr-2">[{u.code}]</span>
                <span className="font-bold text-slate-100">{u.name}</span>
                <div className="text-[10px] text-slate-400">{u.desc}</div>
              </div>
              <span className="px-2 py-0.5 bg-slate-800 text-slate-300 border border-slate-700 font-bold text-[10px] rounded">
                ACTIVE UNIT
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
