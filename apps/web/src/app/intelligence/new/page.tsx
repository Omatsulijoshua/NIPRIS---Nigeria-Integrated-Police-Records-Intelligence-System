'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewIntelReportPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [rawSummary, setRawSummary] = useState('');
  const [sourceReliability, setSourceReliability] = useState('B_USUALLY_RELIABLE');
  const [informationValidity, setInformationValidity] = useState('V2_PROBABLY_TRUE');
  const [classification, setClassification] = useState('TOP_SECRET_LAW_ENFORCEMENT');
  const [informantPseudonym, setInformantPseudonym] = useState('INFORMANT-VIPER-09');
  const [disseminationClearance, setDisseminationClearance] = useState('RESTRICTED_TO_STATE_COMMAND_SPECIAL_ANTI_ROBBERY');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Classified Intelligence Report successfully ingested with NATO 6x6 Reliability Evaluation Code!');
    router.push('/intelligence');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-6 font-mono text-xs">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Intake Classified Intelligence Report</h2>
        <p className="text-xs text-slate-400">Record raw intelligence with NATO/Law Enforcement 6x6 reliability matrix evaluation.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div>
          <label className="block text-slate-300 mb-1">INTELLIGENCE REPORT TITLE</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Cross-Border Firearm Smuggling Syndicate Operations in Ore Corridor"
            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 mb-1">SOURCE RELIABILITY (A - F)</label>
            <select
              value={sourceReliability}
              onChange={(e) => setSourceReliability(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            >
              <option value="A_COMPLETELY_RELIABLE">A - COMPLETELY RELIABLE</option>
              <option value="B_USUALLY_RELIABLE">B - USUALLY RELIABLE</option>
              <option value="C_FAIRLY_RELIABLE">C - FAIRLY RELIABLE</option>
              <option value="D_NOT_USUALLY_RELIABLE">D - NOT USUALLY RELIABLE</option>
              <option value="E_UNRELIABLE">E - UNRELIABLE</option>
              <option value="F_CANNOT_BE_JUDGED">F - RELIABILITY CANNOT BE JUDGED</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">INFORMATION VALIDITY (1 - 6)</label>
            <select
              value={informationValidity}
              onChange={(e) => setInformationValidity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            >
              <option value="V1_CONFIRMED">1 - CONFIRMED BY OTHER SOURCES</option>
              <option value="V2_PROBABLY_TRUE">2 - PROBABLY TRUE</option>
              <option value="V3_POSSIBLY_TRUE">3 - POSSIBLY TRUE</option>
              <option value="V4_DOUBTFUL">4 - DOUBTFUL</option>
              <option value="V5_IMPROBABLE">5 - IMPROBABLE</option>
              <option value="V6_CANNOT_BE_JUDGED">6 - TRUTH CANNOT BE JUDGED</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 mb-1">CLASSIFICATION LEVEL</label>
            <select
              value={classification}
              onChange={(e) => setClassification(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            >
              <option value="CONFIDENTIAL_INTEL">CONFIDENTIAL INTEL</option>
              <option value="TOP_SECRET_LAW_ENFORCEMENT">TOP SECRET LAW ENFORCEMENT</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">INFORMANT PSEUDONYM CODE NAME</label>
            <input
              type="text"
              value={informantPseudonym}
              onChange={(e) => setInformantPseudonym(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100 font-bold"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 mb-1">RAW INTELLIGENCE SUMMARY</label>
          <textarea
            value={rawSummary}
            onChange={(e) => setRawSummary(e.target.value)}
            placeholder="Detailed tactical intelligence observation..."
            className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-slate-100 h-24 focus:outline-none focus:border-amber-600"
            required
          />
        </div>

        <div>
          <label className="block text-slate-300 mb-1">DISSEMINATION CLEARANCE LEVEL</label>
          <input
            type="text"
            value={disseminationClearance}
            onChange={(e) => setDisseminationClearance(e.target.value)}
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
            Ingest & Sign Classified Intel Report
          </button>
        </div>
      </form>
    </div>
  );
}
