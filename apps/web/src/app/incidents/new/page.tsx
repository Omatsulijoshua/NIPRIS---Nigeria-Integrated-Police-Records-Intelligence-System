'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewIncidentPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [incidentType, setIncidentType] = useState('Armed Robbery');
  const [locationName, setLocationName] = useState('');
  const [priority, setPriority] = useState('HIGH');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Incident Report successfully logged and dispatched!');
    router.push('/incidents');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Intake New Incident Report</h2>
        <p className="text-xs text-slate-400">Record emergency dispatch or field officer incident report into NIPRIS gateway.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4 font-mono text-xs">
        <div>
          <label className="block text-slate-300 mb-1">INCIDENT TITLE</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Armed Robbery at Commercial Bank Branch"
            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 mb-1">INCIDENT CATEGORY</label>
            <select
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            >
              <option value="Armed Robbery">Armed Robbery</option>
              <option value="Homicide">Homicide</option>
              <option value="Assault">Assault</option>
              <option value="Cybercrime">Cybercrime</option>
              <option value="Traffic Accident">Traffic Accident</option>
              <option value="Kidnapping">Kidnapping</option>
              <option value="Burglary">Burglary</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">PRIORITY LEVEL</label>
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
        </div>

        <div>
          <label className="block text-slate-300 mb-1">LOCATION NAME / ADDRESS</label>
          <input
            type="text"
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
            placeholder="e.g. Ring Road, Benin City, Edo State"
            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            required
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-1">DETAILED INCIDENT DESCRIPTION</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide exhaustive description of events, responding units, weapons involved, and immediate casualties..."
            className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-slate-100 h-28 focus:outline-none focus:border-amber-600"
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
            Log Incident & Dispatch Units
          </button>
        </div>
      </form>
    </div>
  );
}
