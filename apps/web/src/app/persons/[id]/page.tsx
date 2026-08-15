'use client';

import { useState } from 'react';

export default function PersonProfilePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<
    'Overview' | 'Arrests' | 'Cases' | 'Incidents' | 'Charges' | 'Warrants' | 'Wanted Status' | 'Evidence' | 'Reports' | 'Court' | 'Audit'
  >('Overview');

  const mockPerson = {
    id: params.id || 'person-chidi-001',
    nin: '12345678901',
    firstName: 'Chidi',
    lastName: 'Okonkwo',
    middleName: 'Emeka',
    aliases: ['"Chidi the Cobra"', '"Emeso"'],
    dob: '1992-05-14',
    sex: 'Male',
    nationality: 'Nigerian',
    state: 'Edo State Command',
    identityStatus: 'CANDIDATE_MATCH (Human Forensic Verification Pending)',
    classification: 'LAW_ENFORCEMENT_RESTRICTED',
  };

  const tabs = [
    'Overview',
    'Arrests',
    'Cases',
    'Incidents',
    'Charges',
    'Warrants',
    'Wanted Status',
    'Evidence',
    'Reports',
    'Court',
    'Audit',
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg flex items-start space-x-6">
        <div className="h-24 w-24 rounded bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-slate-600 text-xs">
          [PHOTO]
        </div>
        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-100">
              {mockPerson.firstName} {mockPerson.middleName} {mockPerson.lastName}
            </h2>
            <span className="px-2.5 py-1 rounded text-xs font-bold bg-amber-950 text-amber-400 border border-amber-800">
              {mockPerson.classification}
            </span>
          </div>
          <div className="text-xs font-mono text-slate-400 space-x-4">
            <span>PERSON ID: {mockPerson.id}</span>
            <span>NIN: {mockPerson.nin}</span>
            <span>DOB: {mockPerson.dob}</span>
            <span>SEX: {mockPerson.sex}</span>
          </div>
          <div className="pt-2 text-xs font-mono text-amber-500 bg-slate-950 px-3 py-1.5 rounded border border-slate-800 inline-block">
            STATUS: {mockPerson.identityStatus}
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex space-x-1 border-b border-slate-800 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-2 text-xs font-semibold rounded-t font-mono transition whitespace-nowrap ${
              activeTab === tab
                ? 'bg-slate-900 text-amber-500 border-t border-x border-slate-800'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-b-lg font-mono text-xs">
        {activeTab === 'Overview' && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">LEGAL IDENTITY OVERVIEW</h3>
            <div className="grid grid-cols-2 gap-4 text-slate-300">
              <div>NATIONALITY: {mockPerson.nationality}</div>
              <div>PRIMARY JURISDICTION: {mockPerson.state}</div>
              <div>ALIASES: {mockPerson.aliases.join(', ')}</div>
              <div>IDENTIFIERS: NIN ({mockPerson.nin}), DRIVERS_LICENSE (EDO-99182-DL)</div>
            </div>
          </div>
        )}

        {activeTab === 'Arrests' && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-200 border-b border-slate-800 pb-2">ARREST & BOOKING HISTORY</h3>
            <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-amber-500">ARREST RECORD #EDO-ARR-2026-0041</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">LEGAL STATUS: CHARGE</span>
              </div>
              <p className="text-slate-400">Date: 2026-01-14 | Location: Benin Central Area | Basis: Reasonable Suspicion</p>
              <div className="text-[11px] text-slate-400 italic">
                Notice: An arrest record indicates a legal booking and strictly does NOT constitute proof of conviction.
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'Overview' && activeTab !== 'Arrests' && (
          <div className="p-4 bg-slate-950 border border-slate-800 rounded text-slate-400 flex items-center justify-between">
            <span>[DATA MODULE]: {activeTab.toUpperCase()} RECORDS</span>
            <span className="text-amber-500 text-[10px]">AUTHORIZED ACCESS AUDITED</span>
          </div>
        )}
      </div>
    </div>
  );
}
