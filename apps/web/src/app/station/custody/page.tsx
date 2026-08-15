'use client';

import { useState } from 'react';

export default function StationCustodyPage() {
  const [cellStatus] = useState({
    capacityLimit: 20,
    currentlyDetained: 12,
    occupancyPercentage: 60,
    isOvercrowded: false,
    cells: [
      { cellId: 'CELL-01', capacity: 5, occupied: 4 },
      { cellId: 'CELL-02', capacity: 5, occupied: 3 },
      { cellId: 'CELL-03', capacity: 5, occupied: 3 },
      { cellId: 'CELL-04', capacity: 5, occupied: 2 },
    ],
  });

  const [detainees, setDetainees] = useState([
    {
      custodyNumber: 'LCD-2026-STN001-00912',
      personName: 'Osagie Efe',
      cellId: 'CELL-02',
      intakeTime: '10 hours ago',
      reason: 'Suspected armed robbery suspect booked under section 312 PC.',
      risk: 'HIGH',
      status: 'DETAINED',
      detentionDeadline: '14 hours remaining (24h clock)',
      propertyVoucher: 'PROP-2026-STN001-00912',
    },
    {
      custodyNumber: 'LCD-2026-STN001-00913',
      personName: 'Tunde Bakare',
      cellId: 'CELL-01',
      intakeTime: '4 hours ago',
      reason: 'Commercial burglary suspect.',
      risk: 'MEDIUM',
      status: 'DETAINED',
      detentionDeadline: '20 hours remaining (24h clock)',
      propertyVoucher: 'PROP-2026-STN001-00913',
    },
  ]);

  const [showIntakeModal, setShowIntakeModal] = useState(false);
  const [personName, setPersonName] = useState('');
  const [arrestId, setArrestId] = useState('ARR-2026-EDO-00912');
  const [cellId, setCellId] = useState('CELL-01');
  const [reason, setReason] = useState('');

  const handleCreateIntake = () => {
    if (!personName || !reason) return;
    const custodyNum = `LCD-2026-STN001-${Math.floor(10000 + Math.random() * 90000)}`;
    const newDetainee = {
      custodyNumber: custodyNum,
      personName,
      cellId,
      intakeTime: 'Just now',
      reason,
      risk: 'MEDIUM',
      status: 'DETAINED',
      detentionDeadline: '24 hours remaining (24h clock)',
      propertyVoucher: `PROP-2026-STN001-${Math.floor(10000 + Math.random() * 90000)}`,
    };
    setDetainees([newDetainee, ...detainees]);
    setShowIntakeModal(false);
    setPersonName('');
    setReason('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">🔒 LOCAL STATION CUSTODY & PROPERTY INTAKE</h2>
          <p className="text-xs text-slate-400">Holding cell management, suspect personal property vouchers, & 24h/48h constitutional detention clock.</p>
        </div>
        <button
          onClick={() => setShowIntakeModal(true)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
        >
          + Process Detainee Custody Intake
        </button>
      </div>

      {/* Cell Capacity & Occupancy HUD */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <h3 className="font-bold text-slate-200">HOLDING CELL OCCUPANCY & CAPACITY HUD</h3>
          <span className="text-slate-400 font-bold">TOTAL CAPACITY: {cellStatus.capacityLimit} DETAINEES</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {cellStatus.cells.map((cell) => (
            <div key={cell.cellId} className="p-4 bg-slate-950 border border-slate-800 rounded space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-amber-400">{cell.cellId}</span>
                <span className="text-[10px] text-slate-400">{cell.occupied} / {cell.capacity} Occupied</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded overflow-hidden">
                <div
                  className="bg-amber-500 h-full"
                  style={{ width: `${(cell.occupied / cell.capacity) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Detainees Ledger */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">ACTIVE STATION CUSTODY RECORDS</h3>
        <div className="space-y-4">
          {detainees.map((d) => (
            <div key={d.custodyNumber} className="p-4 bg-slate-950 border border-slate-800 rounded space-y-2">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-amber-500">{d.custodyNumber}</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-200 font-bold rounded text-[10px]">CELL: {d.cellId}</span>
                  <span className="px-2 py-0.5 bg-red-950 text-red-400 border border-red-800 font-bold rounded text-[9px]">RISK: {d.risk}</span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold rounded text-[10px]">
                  {d.status}
                </span>
              </div>
              <div className="text-slate-100 font-bold text-sm">{d.personName}</div>
              <p className="text-slate-300 font-bold text-xs">{d.reason}</p>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1">
                <div>Property Voucher: <span className="text-amber-400 font-bold">{d.propertyVoucher}</span></div>
                <div>Constitutional Remand Clock: <span className="text-red-400 font-bold">{d.detentionDeadline}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Intake Modal */}
      {showIntakeModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg w-full max-w-lg space-y-4">
            <h3 className="text-lg font-bold text-amber-500 border-b border-slate-800 pb-2">PROCESS DETAINEE CUSTODY INTAKE</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">DETAINEE FULL NAME</label>
                <input
                  type="text"
                  value={personName}
                  onChange={(e) => setPersonName(e.target.value)}
                  placeholder="Suspect Name"
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100 font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">ASSIGN HOLDING CELL</label>
                <select
                  value={cellId}
                  onChange={(e) => setCellId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-amber-400 font-bold"
                >
                  <option value="CELL-01">CELL-01 (Occupancy: 4/5)</option>
                  <option value="CELL-02">CELL-02 (Occupancy: 3/5)</option>
                  <option value="CELL-03">CELL-03 (Occupancy: 3/5)</option>
                  <option value="CELL-04">CELL-04 (Occupancy: 2/5)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">DETENTION REASON & STATUTORY SECTION</label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter detention reason narrative..."
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100 font-bold"
              />
            </div>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleCreateIntake}
                className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded"
              >
                Complete Custody Intake
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
