'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { NIGERIAN_STATES } from '@nipris/types';

export default function NewInterStateRequestPage() {
  const router = useRouter();
  const [targetState, setTargetState] = useState('Lagos');
  const [recordType, setRecordType] = useState('CRIMINAL_ARREST');
  const [targetRecordId, setTargetRecordId] = useState('ARR-2026-LAGOS-00891');
  const [justification, setJustification] = useState('');
  const [priority, setPriority] = useState('URGENT');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Formal Inter-State Access Request submitted to ${targetState} State Command. Pending Target Command Admin clearance.`);
    router.push('/inter-state');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-6 font-mono text-xs">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Submit Formal Cross-State Record Access Request</h2>
        <p className="text-xs text-slate-400">Inter-State law-enforcement clearance protocol across 36 Nigerian States + FCT.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 mb-1">TARGET STATE JURISDICTION</label>
            <select
              value={targetState}
              onChange={(e) => setTargetState(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            >
              {NIGERIAN_STATES.map((st) => (
                <option key={st} value={st}>{st} State</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">REQUEST PRIORITY</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            >
              <option value="ROUTINE">ROUTINE</option>
              <option value="URGENT">URGENT</option>
              <option value="EMERGENCY">EMERGENCY</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 mb-1">RECORD TYPE</label>
            <select
              value={recordType}
              onChange={(e) => setRecordType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            >
              <option value="CRIMINAL_ARREST">CRIMINAL ARREST RECORD</option>
              <option value="PERSON_PROFILE">PERSON MASTER PROFILE</option>
              <option value="CASE_FILE">MASTER CASE FILE</option>
              <option value="INTELLIGENCE_BULLETIN">INTELLIGENCE BULLETIN</option>
              <option value="DIGITAL_EVIDENCE">DIGITAL EVIDENCE VAULT ASSET</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">TARGET RECORD NUMBER / ID</label>
            <input
              type="text"
              value={targetRecordId}
              onChange={(e) => setTargetRecordId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 mb-1">OPERATIONAL PURPOSE & JUSTIFICATION RATIONALE</label>
          <textarea
            value={justification}
            onChange={(e) => setJustification(e.target.value)}
            placeholder="Detailed investigative rationale for requesting cross-jurisdiction law-enforcement records..."
            className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-slate-100 h-24 focus:outline-none focus:border-amber-600"
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
            Dispatch Inter-State Request
          </button>
        </div>
      </form>
    </div>
  );
}
