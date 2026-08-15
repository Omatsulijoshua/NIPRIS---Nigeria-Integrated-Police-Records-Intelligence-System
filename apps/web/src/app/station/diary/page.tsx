'use client';

import { useState } from 'react';

export default function StationDiaryPage() {
  const [entries, setEntries] = useState([
    {
      entryNumber: 'SDE-2026-STN001-00912',
      recordedAt: '10:15 AM',
      eventType: 'COMPLAINT_RECEIVED',
      officer: 'Insp Grace Enagbare (NPF-94102)',
      description: 'Walk-in citizen Chief Emeka Nnamdi reported armed robbery incident at Ring Road, Benin City.',
      linked: 'INCIDENT: INC-2026-EDO-00912',
      isImmutable: true,
      versionIndex: 1,
    },
    {
      entryNumber: 'SDE-2026-STN001-00913',
      recordedAt: '10:30 AM',
      eventType: 'PATROL_DEPARTURE',
      officer: 'Sgt Monday Usifo (NPF-66120)',
      description: 'Patrol Team Alpha departed station for routine patrol along Benin-Sapele expressway.',
      linked: 'VEHICLE: NPF-EDO-01',
      isImmutable: true,
      versionIndex: 1,
    },
    {
      entryNumber: 'SDE-2026-STN001-00914',
      recordedAt: '11:05 AM',
      eventType: 'ARREST_BOOKING',
      officer: 'Sgt Monday Usifo (NPF-66120)',
      description: 'Suspect Osagie Efe brought to station counter under arrest for felony theft.',
      linked: 'ARREST: ARR-2026-EDO-00912',
      isImmutable: true,
      versionIndex: 1,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [eventType, setEventType] = useState('COMPLAINT_RECEIVED');
  const [description, setDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateEntry = () => {
    if (!description) return;
    const entryNum = `SDE-2026-STN001-${Math.floor(10000 + Math.random() * 90000)}`;
    const newEntry = {
      entryNumber: entryNum,
      recordedAt: 'Just now',
      eventType,
      officer: 'Insp Grace Enagbare (NPF-94102)',
      description,
      linked: 'NONE',
      isImmutable: true,
      versionIndex: 1,
    };
    setEntries([newEntry, ...entries]);
    setShowModal(false);
    setDescription('');
  };

  const filtered = entries.filter((e) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return e.entryNumber.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.eventType.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">📖 DIGITAL STATION DIARY (DAILY OPERATIONAL LOG)</h2>
          <p className="text-xs text-slate-400">Immutable versioned operational diary entries replacing legacy paper logging.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
        >
          + Log Station Diary Entry
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg flex space-x-4 items-center">
        <input
          type="text"
          placeholder="Search by Entry #, Event Type, or Keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100 font-bold"
        />
        <span className="text-[10px] text-slate-400 font-bold">TOTAL ENTRIES: {filtered.length}</span>
      </div>

      {/* Digital Station Diary Ledger */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">STATION DIARY IMMUTABLE LEDGER</h3>
        <div className="space-y-3">
          {filtered.map((e) => (
            <div key={e.entryNumber} className="p-4 bg-slate-950 border border-slate-800 rounded space-y-2">
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-1.5">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-amber-500">{e.entryNumber}</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-300 font-bold rounded text-[10px]">{e.eventType}</span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold rounded text-[9px]">✔ IMMUTABLE (v{e.versionIndex})</span>
                </div>
                <span className="text-slate-400">{e.recordedAt}</span>
              </div>
              <p className="text-slate-200 font-bold text-xs">{e.description}</p>
              <div className="flex justify-between items-center text-[10px] text-slate-400">
                <div>Recorded By: <span className="text-slate-300 font-bold">{e.officer}</span></div>
                <div>Linked Entity: <span className="text-amber-400 font-bold">{e.linked}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Entry Creation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg w-full max-w-lg space-y-4">
            <h3 className="text-lg font-bold text-amber-500 border-b border-slate-800 pb-2">LOG DIGITAL STATION DIARY ENTRY</h3>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">EVENT CATEGORY TYPE</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-amber-400 font-bold"
              >
                <option value="COMPLAINT_RECEIVED">Complaint Received</option>
                <option value="ARREST_BOOKING">Arrest Booking</option>
                <option value="RELEASE">Custody Release</option>
                <option value="PATROL_DEPARTURE">Patrol Departure</option>
                <option value="PATROL_RETURN">Patrol Return</option>
                <option value="INCIDENT">Incident Event</option>
                <option value="VISITOR_LOG">Visitor Arrival/Departure</option>
                <option value="EVIDENCE_RECEIPT">Evidence Receipt</option>
                <option value="VEHICLE_MOVEMENT">Vehicle Movement</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">OPERATIONAL DESCRIPTION</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter detailed diary entry narrative..."
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100 font-bold"
              />
            </div>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleCreateEntry}
                className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded"
              >
                Save Immutable Entry
              </button>
              <button
                onClick={() => setShowModal(false)}
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
