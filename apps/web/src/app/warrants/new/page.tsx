'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewWarrantPage() {
  const router = useRouter();
  const [warrantType, setWarrantType] = useState('ARREST_WARRANT');
  const [targetPersonId, setTargetPersonId] = useState('person-chidi-001');
  const [issuingJudgeName, setIssuingJudgeName] = useState('Hon. Justice O. E. Nwachukwu');
  const [courtName, setCourtName] = useState('High Court 3, Benin Judicial Division');
  const [courtSealNumber, setCourtSealNumber] = useState('HCB/SEAL/2026/09912');
  const [offenseAllegations, setOffenseAllegations] = useState('');
  const [expirationDate, setExpirationDate] = useState('2026-11-15');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Judicial Warrant successfully ingested and verified!');
    router.push('/warrants');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Ingest Court-Issued Judicial Warrant</h2>
        <p className="text-xs text-slate-400">Record Arrest, Search, or Bench Warrant with judicial seal validation.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4 font-mono text-xs">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 mb-1">WARRANT TYPE</label>
            <select
              value={warrantType}
              onChange={(e) => setWarrantType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            >
              <option value="ARREST_WARRANT">ARREST WARRANT</option>
              <option value="SEARCH_WARRANT">SEARCH WARRANT</option>
              <option value="BENCH_WARRANT">BENCH WARRANT</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">TARGET PERSON MASTER ID</label>
            <input
              type="text"
              value={targetPersonId}
              onChange={(e) => setTargetPersonId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
              required
            />
          </div>
        </div>

        {/* Judicial Authority Metadata */}
        <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-3">
          <span className="text-amber-500 font-bold block text-[10px]">JUDICIAL AUTHORITY & COURT SEAL METADATA</span>

          <div>
            <label className="block text-slate-400 mb-1">ISSUING JUDGE / MAGISTRATE NAME</label>
            <input
              type="text"
              value={issuingJudgeName}
              onChange={(e) => setIssuingJudgeName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-slate-100"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-400 mb-1">COURT NAME & JURISDICTION</label>
              <input
                type="text"
                value={courtName}
                onChange={(e) => setCourtName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-slate-100"
                required
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1">COURT SEAL NUMBER</label>
              <input
                type="text"
                value={courtSealNumber}
                onChange={(e) => setCourtSealNumber(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-slate-100"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-slate-300 mb-1">OFFENSE ALLEGATIONS / GROUNDS FOR WARRANT</label>
          <textarea
            value={offenseAllegations}
            onChange={(e) => setOffenseAllegations(e.target.value)}
            placeholder="Statutory grounds and specific criminal allegations listed on court order..."
            className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-slate-100 h-20 focus:outline-none focus:border-amber-600"
            required
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-1">WARRANT EXPIRATION DATE</label>
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
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
            Ingest & Sign Judicial Warrant
          </button>
        </div>
      </form>
    </div>
  );
}
