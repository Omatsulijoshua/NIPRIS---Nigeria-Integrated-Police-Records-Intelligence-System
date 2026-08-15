'use client';

import { useState } from 'react';

export default function StationEvidenceRoomPage() {
  const [locations] = useState([
    { code: 'STN001-EVDRM-SAFE-01', name: 'High-Security Firearms Safe', type: 'SAFE', itemCount: 4, isHighSecurity: true },
    { code: 'STN001-EVDRM-A-RACK02-BIN05', name: 'General Evidence Storage Bin 05', type: 'LOCKER', itemCount: 12, isHighSecurity: false },
    { code: 'STN001-EVDRM-COLD-01', name: 'Biological Forensics Cold Fridge', type: 'COLD_STORAGE', itemCount: 2, isHighSecurity: true },
  ]);

  const [evidenceList, setEvidenceList] = useState([
    {
      evidenceNumber: 'SEVD-2026-STN001-00912',
      category: 'FIREARM',
      description: 'Beretta 9mm Pistol with 5 live rounds',
      storageCode: 'STN001-EVDRM-SAFE-01',
      barcodeTag: 'BC-SEVD-2026-STN001-00912',
      intakeOfficer: 'DSP Chidi Okonkwo',
      status: 'IN_STORAGE',
    },
    {
      evidenceNumber: 'SEVD-2026-STN001-00913',
      category: 'NARCOTICS',
      description: '1.2kg Sealed Cannabis Sativa bricks',
      storageCode: 'STN001-EVDRM-A-RACK02-BIN05',
      barcodeTag: 'BC-SEVD-2026-STN001-00913',
      intakeOfficer: 'Sgt Monday Usifo',
      status: 'IN_STORAGE',
    },
  ]);

  const [showIntakeModal, setShowIntakeModal] = useState(false);
  const [category, setCategory] = useState('FIREARM');
  const [description, setDescription] = useState('');
  const [storageCode, setStorageCode] = useState('STN001-EVDRM-SAFE-01');

  const handleCreateIntake = () => {
    if (!description) return;
    const evdNum = `SEVD-2026-STN001-${Math.floor(10000 + Math.random() * 90000)}`;
    const newEvd = {
      evidenceNumber: evdNum,
      category,
      description,
      storageCode,
      barcodeTag: `BC-${evdNum}`,
      intakeOfficer: 'DSP Chidi Okonkwo',
      status: 'IN_STORAGE',
    };
    setEvidenceList([newEvd, ...evidenceList]);
    setShowIntakeModal(false);
    setDescription('');
  };

  const handleCheckout = (evdNum: string) => {
    setEvidenceList(
      evidenceList.map((e) => (e.evidenceNumber === evdNum ? { ...e, status: 'CHECKED_OUT' } : e))
    );
    alert(`✔ Evidence ${evdNum} checked out for Court Presentation cleanly!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-amber-500">📦 EVIDENCE ROOM & STORAGE LAYOUT MANAGEMENT</h2>
          <p className="text-[10px] sm:text-xs text-slate-400">Physical storage layout (Rooms, Racks, Safes), barcode tags, & Chain-of-Custody ledger.</p>
        </div>
        <button
          onClick={() => setShowIntakeModal(true)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition shrink-0"
        >
          + Intake Physical Evidence
        </button>
      </div>

      {/* Storage Layout Map */}
      <div className="p-4 sm:p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">STATION STORAGE LOCATION LAYOUT BINS</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {locations.map((l) => (
            <div key={l.code} className="p-4 bg-slate-950 border border-slate-800 rounded space-y-2">
              <div className="flex justify-between items-center flex-wrap gap-1">
                <span className="font-bold text-amber-400 text-xs">{l.code}</span>
                {l.isHighSecurity && (
                  <span className="px-2 py-0.5 bg-red-950 text-red-400 border border-red-800 font-bold rounded text-[9px]">HIGH SECURITY</span>
                )}
              </div>
              <div className="text-slate-100 font-bold text-xs">{l.name}</div>
              <div className="text-[10px] text-slate-400">Type: {l.type} | Stored: <span className="text-emerald-400 font-bold">{l.itemCount} Items</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* Evidence Ledger */}
      <div className="p-4 sm:p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">STORED PHYSICAL EVIDENCE LEDGER</h3>
        <div className="space-y-4">
          {evidenceList.map((e) => (
            <div key={e.evidenceNumber} className="p-4 bg-slate-950 border border-slate-800 rounded space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                  <span className="font-bold text-amber-500">{e.evidenceNumber}</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-300 font-bold rounded text-[10px]">{e.category}</span>
                  <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold rounded text-[9px]">{e.barcodeTag}</span>
                </div>
                <span className={`px-2 py-0.5 font-bold rounded text-[10px] self-start sm:self-auto ${e.status === 'IN_STORAGE' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                  {e.status}
                </span>
              </div>
              <div className="text-slate-100 font-bold text-xs">{e.description}</div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] text-slate-400 pt-1">
                <div>Storage Location: <span className="text-amber-400 font-bold">{e.storageCode}</span></div>
                <div>Intake Officer: <span className="text-slate-200 font-bold">{e.intakeOfficer}</span></div>
              </div>
              {e.status === 'IN_STORAGE' && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleCheckout(e.evidenceNumber)}
                    className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-[10px]"
                  >
                    ↗ Check-out for Court / Lab
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Intake Modal */}
      {showIntakeModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 p-4 sm:p-6 rounded-lg w-full max-w-lg space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-amber-500 border-b border-slate-800 pb-2">PHYSICAL EVIDENCE INTAKE</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">EVIDENCE CATEGORY</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-amber-400 font-bold"
                >
                  <option value="FIREARM">Firearm / Ammunition</option>
                  <option value="NARCOTICS">Narcotics / Controlled Substance</option>
                  <option value="CURRENCY">Seized Cash Currency</option>
                  <option value="ELECTRONICS">Electronics / Device</option>
                  <option value="WEAPON_BLADE">Edged Weapon / Knife</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">STORAGE LOCATION BIN</label>
                <select
                  value={storageCode}
                  onChange={(e) => setStorageCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-amber-400 font-bold"
                >
                  <option value="STN001-EVDRM-SAFE-01">High-Security Firearms Safe</option>
                  <option value="STN001-EVDRM-A-RACK02-BIN05">General Storage Bin 05</option>
                  <option value="STN001-EVDRM-COLD-01">Cold Storage Fridge</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">ITEM NARRATIVE & MEASUREMENTS</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter physical item description, serial numbers, weights..."
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100 font-bold"
              />
            </div>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleCreateIntake}
                className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded"
              >
                Seal & Store Evidence
              </button>
              <button
                onClick={() => setShowIntakeModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded border border-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
