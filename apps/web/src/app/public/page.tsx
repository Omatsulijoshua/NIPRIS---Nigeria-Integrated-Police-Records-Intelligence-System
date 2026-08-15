'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PublicCitizenPortalPage() {
  const [showTipModal, setShowTipModal] = useState(false);
  const [tipCategory, setTipCategory] = useState('Armed Robbery / Highway Obstruction');
  const [tipNarrative, setTipNarrative] = useState('');
  const [tipLocation, setTipLocation] = useState('Ore-Benin Expressway, Edo State');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [tipSubmittedRef, setTipSubmittedRef] = useState<string | null>(null);

  const [vehicleQuery, setVehicleQuery] = useState('EDO-291-BEN');
  const [vehicleResult, setVehicleResult] = useState<any | null>(null);

  const wantedPersons = [
    {
      name: 'Chidi Okonkwo (alias "Chidi the Cobra")',
      risk: 'ARMED_AND_DANGEROUS',
      bounty: '₦5,000,000 BOUNTY',
      warrant: 'WAR-2026-EDO-98380',
      remarks: 'Wanted by NPF Edo State Command for Armed Hijacking & Unlawful Firearms Possession.',
    },
  ];

  const handleSubmitTip = () => {
    if (!tipNarrative) return;
    const ref = `TIP-2026-EDO-${Math.floor(10000 + Math.random() * 90000)}`;
    setTipSubmittedRef(ref);
    setTimeout(() => {
      setShowTipModal(false);
      setTipSubmittedRef(null);
      setTipNarrative('');
      alert(`✔ Crime Tip Submitted! Reference Number: ${ref}. Thank you for assisting national law enforcement.`);
    }, 1200);
  };

  const handleVehicleLookup = () => {
    if (!vehicleQuery) return;
    if (vehicleQuery.toUpperCase() === 'EDO-291-BEN') {
      setVehicleResult({
        query: vehicleQuery,
        status: 'STOLEN_VEHICLE_ALERT',
        vehicle: 'Toyota Hilux 4x4 Commercial Logistics Van (Silver)',
        reportedDate: '2026-08-14',
        location: 'Ore-Benin Expressway, Edo State',
        instructions: '🚨 CRITICAL STOLEN VEHICLE ALERT: Do not approach occupants. Contact NPF Emergency Dispatch immediately at 112 / 0800-NIPRIS.',
      });
    } else {
      setVehicleResult({
        query: vehicleQuery,
        status: 'NOT_REPORTED_STOLEN',
        instructions: '✔ Vehicle is not reported stolen in the National Police Stolen Property Register.',
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-mono text-xs">
      {/* Hero Section */}
      <div className="p-8 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-center">
        <h1 className="text-3xl font-bold text-amber-500">🇳🇬 NIGERIA POLICE FORCE PUBLIC CITIZEN PORTAL</h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          Secure, direct citizen services portal for submitting anonymous crime tips, applying for Police Clearance Certificates (PCC Form NPF 11), verifying stolen vehicle records, and viewing active public safety circulars.
        </p>
        <div className="flex justify-center space-x-4 pt-2">
          <button
            onClick={() => setShowTipModal(true)}
            className="px-6 py-3 bg-red-700 hover:bg-red-600 text-white font-bold rounded-lg transition text-xs shadow-lg"
          >
            📢 Submit Anonymous Crime Tip
          </button>
          <Link
            href="/public/pcc"
            className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-lg transition text-xs shadow-lg"
          >
            📜 Police Clearance Certificate (PCC Form NPF 11)
          </Link>
        </div>
      </div>

      {/* Stolen Vehicle & Property Registry Lookup */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">🚗 STOLEN VEHICLE REGISTRY PUBLIC SEARCH</h3>
        <div className="flex space-x-3">
          <input
            type="text"
            value={vehicleQuery}
            onChange={(e) => setVehicleQuery(e.target.value)}
            placeholder="Enter Plate Number or VIN (e.g. EDO-291-BEN)..."
            className="flex-1 bg-slate-950 border border-slate-800 rounded p-2.5 text-xs text-slate-100 font-bold"
          />
          <button
            onClick={handleVehicleLookup}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded transition border border-slate-700"
          >
            Search Stolen Register
          </button>
        </div>

        {vehicleResult && (
          <div className={`p-4 rounded border font-bold ${vehicleResult.status === 'STOLEN_VEHICLE_ALERT' ? 'bg-red-950 text-red-300 border-red-800' : 'bg-emerald-950 text-emerald-300 border-emerald-800'}`}>
            <div>QUERY: {vehicleResult.query} — STATUS: {vehicleResult.status}</div>
            {vehicleResult.vehicle && <div className="text-slate-300 text-[11px] mt-1">Vehicle: {vehicleResult.vehicle} | Stolen Location: {vehicleResult.location}</div>}
            <div className="text-[10px] mt-2">{vehicleResult.instructions}</div>
          </div>
        )}
      </div>

      {/* Public Wanted Persons Circular Board */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">🚨 PUBLIC WANTED PERSONS CIRCULAR BOARD</h3>
        <div className="grid grid-cols-1 gap-4">
          {wantedPersons.map((wp, idx) => (
            <div key={idx} className="p-5 bg-slate-950 border-2 border-red-900/60 rounded-lg flex space-x-6 items-center">
              <div className="h-24 w-24 rounded bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-slate-500">
                [WANTED]
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-100 text-base">{wp.name}</span>
                  <span className="px-3 py-1 bg-red-950 text-red-400 border border-red-800 font-bold rounded text-xs">
                    {wp.bounty}
                  </span>
                </div>
                <div className="text-amber-400 text-xs font-semibold">Risk Level: {wp.risk} | Warrant #: {wp.warrant}</div>
                <p className="text-slate-400 text-[11px]">{wp.remarks}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showTipModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-100">SUBMIT CRIME & SAFETY TIP TO POLICE DISPATCH</h3>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">TIP CATEGORY</label>
              <input
                type="text"
                value={tipCategory}
                onChange={(e) => setTipCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">LOCATION LANDMARK</label>
              <input
                type="text"
                value={tipLocation}
                onChange={(e) => setTipLocation(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">TIP NARRATIVE & DETAILS</label>
              <textarea
                value={tipNarrative}
                onChange={(e) => setTipNarrative(e.target.value)}
                placeholder="Describe suspicious activities observed..."
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100 h-24"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
              />
              <label htmlFor="anonymous" className="text-slate-300 text-xs font-bold">Submit Anonymously (Do not record identity)</label>
            </div>
            {tipSubmittedRef && (
              <div className="p-3 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-[11px] font-bold">
                ✔ Tip Submitted! Reference Number: {tipSubmittedRef}
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowTipModal(false)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitTip}
                className="px-4 py-1.5 bg-red-700 hover:bg-red-600 text-white font-bold rounded text-xs"
              >
                Submit Crime Tip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
