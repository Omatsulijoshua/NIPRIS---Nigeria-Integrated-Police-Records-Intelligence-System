'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewCasePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('HIGH');
  const [leadInvestigatorId, setLeadInvestigatorId] = useState('off-inv-edo');
  const [state, setState] = useState('Edo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Master Case File successfully initiated and assigned!');
    router.push('/cases');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Initiate Master Case & Investigation File</h2>
        <p className="text-xs text-slate-400">Open official detective case file, assign lead investigator, and set priority level.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4 font-mono text-xs">
        <div>
          <label className="block text-slate-300 mb-1">CASE TITLE / CODE NAME</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Operation Commercial Shield - Benin Vault Heist"
            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 mb-1">PRIORITY RATING</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
              <option value="CRITICAL">CRITICAL</option>
            </select>
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
          <label className="block text-slate-300 mb-1">LEAD INVESTIGATOR OFFICER ID</label>
          <input
            type="text"
            value={leadInvestigatorId}
            onChange={(e) => setLeadInvestigatorId(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            required
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-1">CASE OBJECTIVES & INVESTIGATIVE SCOPE</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Outline primary investigative goals, targeted criminal syndicate, evidence collection guidelines..."
            className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-slate-100 h-28 focus:outline-none focus:border-amber-600"
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
            Initiate Master Case File
          </button>
        </div>
      </form>
    </div>
  );
}
