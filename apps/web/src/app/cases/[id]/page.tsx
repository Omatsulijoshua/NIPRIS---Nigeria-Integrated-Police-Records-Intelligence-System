'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CaseDetailWorkbenchPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState('UNDER_INVESTIGATION');

  const mockCase = {
    id: params.id || 'cas-edo-001',
    number: 'CAS-2026-EDO-00109',
    title: 'Operation Commercial Shield - Benin Vault Heist',
    description: 'Comprehensive armed robbery investigation involving multi-state syndicate.',
    priority: 'CRITICAL',
    classification: 'LAW_ENFORCEMENT_RESTRICTED',
    leadInvestigator: 'Detective SP Babatunde Adeyemi (CID)',
    teamOfficers: [
      'Detective SP Babatunde Adeyemi (CID)',
      'Inspector Emmanuel Okafor (NPF-2002)',
      'Forensic Specialist Dr. Amaka Egwu',
    ],
    linkedIncidents: [{ id: 'inc-edo-001', number: 'INC-2026-EDO-00101', title: 'Armed Robbery at Commercial Bank' }],
    linkedArrests: [{ id: 'arr-edo-001', number: 'ARR-2026-EDO-00812', personName: 'Chidi Okonkwo' }],
    linkedPersons: [{ id: 'person-chidi-001', name: 'Chidi Okonkwo', role: 'PRIMARY SUSPECT' }],
    linkedEvidence: [
      { id: 'ev-001', type: 'BODYCAM', title: 'Patrol Bodycam Recording during Vault Breach', url: 'https://s3.nipris.gov.ng/evidence/cam-9912.mp4' },
      { id: 'ev-002', type: 'PHOTO', title: 'Latent Fingerprint Lifted from Bank Vault Door', url: 'https://s3.nipris.gov.ng/evidence/fingerprint-vault.jpg' },
      { id: 'ev-003', type: 'DOCUMENT', title: 'State Forensic Ballistics Analysis Report', url: 'https://s3.nipris.gov.ng/evidence/ballistics-report.pdf' },
    ],
    timeline: [
      { action: 'CASE_INITIATED', by: 'CID Lead', time: '2026-08-15 00:15', details: 'Master case file registered.' },
      { action: 'INCIDENT_ATTACHED', by: 'CID Lead', time: '2026-08-15 00:20', details: 'Incident INC-2026-EDO-00101 attached to case.' },
      { action: 'ARREST_LINKED', by: 'CID Lead', time: '2026-08-15 00:45', details: 'Arrest booking ARR-2026-EDO-00812 attached to case.' },
      { action: 'EVIDENCE_ATTACHED', by: 'Forensics', time: '2026-08-15 01:00', details: 'Latent fingerprint lift and bodycam recording attached.' },
    ],
  };

  const handleUpdateStatus = (newStatus: string) => {
    setStatus(newStatus);
    alert(`Case status updated to ${newStatus}.`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      {/* Header Banner */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center space-x-3">
              <span className="text-amber-500 font-bold text-lg">{mockCase.number}</span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-400 border border-red-800">
                {mockCase.priority} PRIORITY
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-100">{mockCase.title}</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400">STATUS:</span>
            <span className="px-3 py-1 bg-amber-950 text-amber-400 border border-amber-800 rounded font-bold">
              {status}
            </span>
          </div>
        </div>

        <p className="text-slate-300 text-xs">{mockCase.description}</p>

        {/* Lead Investigator & Team Bar */}
        <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-slate-400 text-[11px]">
          <div>
            <span className="text-slate-500">LEAD INVESTIGATOR:</span>{' '}
            <span className="text-slate-100 font-bold">{mockCase.leadInvestigator}</span>
          </div>
          <div>
            <span className="text-slate-500">INVESTIGATIVE TEAM:</span>{' '}
            <span className="text-slate-300">{mockCase.teamOfficers.length} Officers Assigned</span>
          </div>
        </div>

        {/* Status Transition Action Bar */}
        <div className="pt-3 border-t border-slate-800 flex items-center space-x-2">
          <span className="text-slate-500 mr-2">CASE STATUS ACTION:</span>
          <button
            onClick={() => handleUpdateStatus('UNDER_INVESTIGATION')}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded"
          >
            Mark Active Investigation
          </button>
          <button
            onClick={() => handleUpdateStatus('PENDING_PROSECUTION')}
            className="px-3 py-1 bg-indigo-950 hover:bg-indigo-900 text-indigo-400 border border-indigo-800 rounded font-bold"
          >
            Forward to DPP (Pending Prosecution)
          </button>
          <button
            onClick={() => handleUpdateStatus('CLOSED')}
            className="px-3 py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-400 border border-emerald-800 rounded font-bold"
          >
            Close Case File
          </button>
          <button
            onClick={() => handleUpdateStatus('REOPENED')}
            className="px-3 py-1 bg-red-950 hover:bg-red-900 text-red-400 border border-red-800 rounded font-bold"
          >
            Reopen Case File
          </button>
        </div>
      </div>

      {/* Linked Assets Workspace */}
      <div className="grid grid-cols-3 gap-6">
        {/* Linked Incidents & Arrests */}
        <div className="space-y-6">
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
            <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">LINKED INCIDENTS</h3>
            {mockCase.linkedIncidents.map((inc) => (
              <div key={inc.id} className="p-2.5 bg-slate-950 rounded border border-slate-800 space-y-1">
                <Link href={`/incidents/${inc.id}`} className="font-bold text-amber-500 hover:underline">
                  {inc.number} ↗
                </Link>
                <div className="text-[10px] text-slate-400">{inc.title}</div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
            <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">LINKED ARREST BOOKINGS</h3>
            {mockCase.linkedArrests.map((arr) => (
              <div key={arr.id} className="p-2.5 bg-slate-950 rounded border border-slate-800 space-y-1">
                <Link href={`/arrests/${arr.id}`} className="font-bold text-amber-500 hover:underline">
                  {arr.number} ↗
                </Link>
                <div className="text-[10px] text-slate-400">Suspect: {arr.personName}</div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
            <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">PERSONS OF INTEREST</h3>
            {mockCase.linkedPersons.map((p) => (
              <div key={p.id} className="p-2.5 bg-slate-950 rounded border border-slate-800 flex justify-between items-center">
                <Link href={`/persons/${p.id}`} className="font-bold text-amber-500 hover:underline">
                  {p.name} ↗
                </Link>
                <span className="px-1.5 py-0.5 bg-slate-800 text-[10px] rounded font-bold text-slate-300">{p.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Evidence & Case Timeline */}
        <div className="col-span-2 space-y-6">
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
            <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">DIGITAL & PHYSICAL EVIDENCE ASSETS</h3>
            <div className="divide-y divide-slate-800">
              {mockCase.linkedEvidence.map((ev) => (
                <div key={ev.id} className="py-2.5 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 bg-slate-800 text-amber-400 font-bold text-[10px] rounded">{ev.type}</span>
                      <span className="font-bold text-slate-100">{ev.title}</span>
                    </div>
                    <div className="text-[10px] text-slate-500">{ev.url}</div>
                  </div>
                  <a href={ev.url} target="_blank" className="text-amber-500 hover:underline text-xs">
                    Inspect Asset ↗
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Case Timeline */}
          <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
            <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">INTERACTIVE INVESTIGATIVE TIMELINE</h3>
            <div className="relative border-l-2 border-slate-800 ml-4 pl-4 space-y-4">
              {mockCase.timeline.map((event, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[23px] top-1 h-3 w-3 rounded-full bg-amber-500 border-2 border-slate-900"></div>
                  <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
                    <div className="flex justify-between items-center text-slate-400 text-[10px]">
                      <span className="font-bold text-amber-400">{event.action}</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="text-slate-200 text-xs font-semibold">{event.details}</div>
                    <div className="text-[10px] text-slate-500">Logged by: {event.by}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
