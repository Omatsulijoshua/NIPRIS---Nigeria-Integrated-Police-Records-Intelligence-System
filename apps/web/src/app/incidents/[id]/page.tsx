'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function IncidentWorkbenchPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState('UNDER_INVESTIGATION');
  const [reportText, setReportText] = useState('');

  const mockIncident = {
    id: params.id || 'inc-edo-001',
    number: 'INC-2026-EDO-00101',
    title: 'Armed Robbery at Commercial Bank Branch',
    type: 'Armed Robbery',
    location: 'Ring Road, Benin City, Edo State',
    occurredAt: '2026-08-15 00:10',
    priority: 'CRITICAL',
    classification: 'LAW_ENFORCEMENT_RESTRICTED',
    reportingOfficer: 'Inspector Emmanuel Okafor (NPF-2002)',
    assignedOfficers: ['Inspector Emmanuel Okafor (NPF-2002)', 'Detective SP Babatunde Adeyemi'],
    linkedPersons: [
      { id: 'person-chidi-001', name: 'Chidi Okonkwo', role: 'SUSPECT', notes: 'Identified via bank CCTV' },
      { id: 'person-vic-002', name: 'Alhaji Musa Ibrahim', role: 'VICTIM', notes: 'Branch Manager' },
    ],
    timeline: [
      { action: 'INCIDENT_REPORTED', by: 'NPF-2002', status: 'REPORTED', time: '2026-08-15 00:10', details: 'Emergency dispatch intake' },
      { action: 'OFFICERS_DISPATCHED', by: 'NPF-1001', status: 'DISPATCHED', time: '2026-08-15 00:14', details: 'Patrol units unit-12 and unit-15 dispatched' },
      { action: 'ON_SCENE', by: 'NPF-2002', status: 'ON_SCENE', time: '2026-08-15 00:22', details: 'Benin patrol unit arrived on scene. Vault area cordoned off.' },
      { action: 'STATUS_TRANSITION', by: 'NPF-2002', status: 'UNDER_INVESTIGATION', time: '2026-08-15 00:35', details: 'State CID Detectives assigned. Forensics collecting latent prints.' },
    ],
    reports: [
      { officer: 'NPF-2002', text: 'Arrived on scene at 00:22 AM. Perimeter secured. No active hostages.', time: '00:25 AM' },
    ],
  };

  const handleAddReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText) return;
    mockIncident.reports.push({
      officer: 'NPF-2002',
      text: reportText,
      time: 'Just now',
    });
    setReportText('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-amber-500 font-mono font-bold text-lg">{mockIncident.number}</span>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-red-950 text-red-400 border border-red-800">
              PRIORITY: {mockIncident.priority}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-mono text-slate-400">STATUS:</span>
            <span className="px-3 py-1 bg-amber-950 text-amber-400 border border-amber-800 rounded text-xs font-bold font-mono">
              {status}
            </span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-100">{mockIncident.title}</h2>
        <div className="text-xs font-mono text-slate-400 space-x-4">
          <span>CATEGORY: {mockIncident.type}</span>
          <span>LOCATION: {mockIncident.location}</span>
          <span>REPORTING OFFICER: {mockIncident.reportingOfficer}</span>
        </div>

        {/* Workflow Lifecycle Quick Actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center space-x-2 font-mono text-xs">
          <span className="text-slate-500 mr-2">TRANSITION STATUS:</span>
          <button
            onClick={() => setStatus('DISPATCHED')}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded"
          >
            Dispatch Units
          </button>
          <button
            onClick={() => setStatus('ON_SCENE')}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded"
          >
            Mark On Scene
          </button>
          <button
            onClick={() => setStatus('CLOSED')}
            className="px-3 py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 rounded font-bold"
          >
            Close Incident
          </button>
          <button
            onClick={() => setStatus('REOPENED')}
            className="px-3 py-1 bg-red-950 hover:bg-red-900 text-red-400 border border-red-800 rounded font-bold"
          >
            Reopen Incident
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 font-mono text-xs">
        {/* Left Column: Linked Persons & Officers */}
        <div className="space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
            <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">LINKED PERSONS (VICTIMS / SUSPECTS)</h3>
            <div className="space-y-2">
              {mockIncident.linkedPersons.map((p) => (
                <div key={p.id} className="p-2.5 bg-slate-950 rounded border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <Link href={`/persons/${p.id}`} className="font-bold text-amber-500 hover:underline">
                      {p.name}
                    </Link>
                    <span className="px-1.5 py-0.5 bg-slate-800 text-[10px] rounded text-slate-300 font-bold">{p.role}</span>
                  </div>
                  <div className="text-[10px] text-slate-400">{p.notes}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
            <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">ASSIGNED RESPONDING OFFICERS</h3>
            <ul className="space-y-1 text-slate-300">
              {mockIncident.assignedOfficers.map((off, idx) => (
                <li key={idx} className="p-2 bg-slate-950 rounded border border-slate-800">
                  ✔ {off}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle & Right Column: Interactive Timeline & Field Reports */}
        <div className="col-span-2 space-y-6">
          {/* Visual Incident Timeline */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
            <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">VISUAL INCIDENT TIMELINE</h3>
            <div className="relative border-l-2 border-slate-800 ml-4 pl-4 space-y-4">
              {mockIncident.timeline.map((event, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[23px] top-1 h-3 w-3 rounded-full bg-amber-500 border-2 border-slate-900"></div>
                  <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center text-slate-400 text-[10px]">
                      <span className="font-bold text-amber-400">{event.action}</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="text-slate-200 text-xs font-semibold">{event.details}</div>
                    <div className="text-[10px] text-slate-500">Performed by Officer: {event.by}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Officer Field Reports */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
            <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">OFFICER FIELD REPORTS</h3>

            <div className="space-y-2">
              {mockIncident.reports.map((rep, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                    <span>OFFICER: {rep.officer}</span>
                    <span>TIMESTAMP: {rep.time}</span>
                  </div>
                  <p className="text-slate-200 text-xs">{rep.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={handleAddReport} className="pt-2 space-y-2">
              <label className="block text-slate-400 text-[10px]">APPEND OFFICER FIELD REPORT</label>
              <textarea
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder="Type officer observational notes or scene updates..."
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100 font-mono h-16 focus:outline-none focus:border-amber-600"
                required
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
              >
                Append Field Report to File
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
