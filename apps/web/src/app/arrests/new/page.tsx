'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewArrestBookingPage() {
  const router = useRouter();
  const [personId, setPersonId] = useState('person-chidi-001');
  const [personName, setPersonName] = useState('Chidi Okonkwo');
  const [stationId, setStationId] = useState('Benin Central Station');
  const [state, setState] = useState('Edo');
  const [location, setLocation] = useState('');
  const [legalBasis, setLegalBasis] = useState('');
  const [charges, setCharges] = useState('');
  const [custodyLocation, setCustodyLocation] = useState('Benin Central Station Lockup Cell 3');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Arrest & Custody Booking successfully processed!');
    router.push('/arrests');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Process New Arrest & Booking Record</h2>
        <p className="text-xs text-slate-400">Ingest suspect booking record, legal basis, initial charges, and custody location.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4 font-mono text-xs">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 mb-1">PERSON MASTER ID</label>
            <input
              type="text"
              value={personId}
              onChange={(e) => setPersonId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1">SUSPECT FULL NAME</label>
            <input
              type="text"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 mb-1">ARRESTING POLICE STATION</label>
            <input
              type="text"
              value={stationId}
              onChange={(e) => setStationId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1">STATE JURISDICTION</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 mb-1">ARREST LOCATION</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Ring Road Financial District, Benin City"
            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            required
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-1">LEGAL BASIS FOR ARREST</label>
          <textarea
            value={legalBasis}
            onChange={(e) => setLegalBasis(e.target.value)}
            placeholder="State statutory legal basis (e.g., Active warrant execution, Caught in flagrante delicto, Reasonable suspicion)..."
            className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-slate-100 h-20 focus:outline-none focus:border-amber-600"
            required
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-1">BOOKING CHARGES (SEPARATED BY COMMAS)</label>
          <input
            type="text"
            value={charges}
            onChange={(e) => setCharges(e.target.value)}
            placeholder="e.g. Armed Robbery (Section 402 Criminal Code), Illegal Firearms Possession"
            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            required
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-1">CUSTODY LOCATION / CELL DESIGNATION</label>
          <input
            type="text"
            value={custodyLocation}
            onChange={(e) => setCustodyLocation(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            required
          />
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 rounded font-bold"
          >
            Confirm & Log Arrest Booking
          </button>
        </div>
      </form>
    </div>
  );
}
