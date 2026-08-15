'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PersonSearchPage() {
  const [name, setName] = useState('');
  const [nin, setNin] = useState('');
  const [purpose, setPurpose] = useState('');
  const [showPurposeModal, setShowPurposeModal] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name && !nin) {
      alert('Please enter a Name or NIN identifier to search.');
      return;
    }
    setShowPurposeModal(true);
  };

  const executeAuthorizedSearch = () => {
    if (!purpose || purpose.trim().length === 0) {
      alert('Operational Purpose Justification is strictly required.');
      return;
    }

    setShowPurposeModal(false);
    setSearched(true);
    setResults([
      {
        id: 'person-chidi-001',
        nin: nin || '12345678901',
        name: 'Chidi Okonkwo',
        aliases: ['"Chidi the Cobra"', '"Emeso"'],
        dob: '1992-05-14',
        sex: 'Male',
        state: 'Edo State Command',
        classification: 'LAW_ENFORCEMENT_RESTRICTED',
      },
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-100">Person Master Index Search</h2>
        <p className="text-xs text-slate-400">Search authorized person records across national law enforcement index.</p>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <form onSubmit={handleSearchClick} className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">PERSON NAME / ALIAS</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Chidi Okonkwo"
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">NIN IDENTIFIER (11 DIGITS)</label>
            <input
              type="text"
              value={nin}
              onChange={(e) => setNin(e.target.value)}
              placeholder="e.g. 12345678901"
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 font-mono"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-sm transition"
            >
              Initiate Authorized Search
            </button>
          </div>
        </form>
      </div>

      {showPurposeModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center space-x-2 text-amber-500 font-bold text-sm">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>
              <span>MANDATORY OPERATIONAL PURPOSE ENTRY</span>
            </div>
            <p className="text-xs text-slate-300">
              Pursuant to NIPRIS security policy, every search must record an official operational purpose code or case reference.
            </p>

            <div>
              <label className="block text-[10px] font-mono text-slate-400 mb-1">OPERATIONAL PURPOSE JUSTIFICATION</label>
              <textarea
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g. Active homicide investigation case #2026-EDO-0019 / Warrant execution"
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100 font-mono h-24 focus:outline-none focus:border-amber-600"
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowPurposeModal(false)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={executeAuthorizedSearch}
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 rounded text-xs font-bold"
              >
                Confirm & Log Audit
              </button>
            </div>
          </div>
        </div>
      )}

      {searched && (
        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden space-y-2">
          <div className="p-4 bg-slate-950 border-b border-slate-800 flex justify-between items-center text-xs font-mono text-slate-400">
            <span>RESULTS FOUND: {results?.length || 0}</span>
            <span>AUDIT EVENT RECORDED</span>
          </div>

          <div className="divide-y divide-slate-800 font-mono text-xs">
            {results?.map((person) => (
              <div key={person.id} className="p-4 flex items-center justify-between hover:bg-slate-800/40 transition">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-slate-100 text-sm">{person.name}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-amber-500 border border-slate-700">
                      ID: {person.id}
                    </span>
                  </div>
                  <div className="text-slate-400 text-[11px] space-x-4">
                    <span>NIN: {person.nin}</span>
                    <span>DOB: {person.dob}</span>
                    <span>SEX: {person.sex}</span>
                    <span>JURISDICTION: {person.state}</span>
                  </div>
                </div>
                <Link
                  href={`/persons/${person.id}`}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-semibold rounded border border-slate-700 transition"
                >
                  View Master Profile
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
