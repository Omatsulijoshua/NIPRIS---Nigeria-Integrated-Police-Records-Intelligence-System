'use client';

import { useState } from 'react';

export default function InterAgencyWorkbenchPage() {
  const [activeTab, setActiveTab] = useState<'NIMC' | 'FRSC' | 'INEC' | 'NIS'>('NIMC');
  const [queryInput, setQueryInput] = useState('10928374829');
  const [rationaleInput, setRationaleInput] = useState('Verification of NIN for suspect identity booking NPF 14');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleQuery = () => {
    if (!rationaleInput || rationaleInput.trim().length < 10) {
      alert('⚠️ MANDATORY AUDIT POLICY: Operational Purpose Justification must be at least 10 characters.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (activeTab === 'NIMC') {
        setResult({
          nin: queryInput,
          verificationStatus: 'VERIFIED_MATCH',
          firstName: 'Chidi',
          lastName: 'Okonkwo',
          middleName: 'Emmanuel',
          dateOfBirth: '1988-04-12',
          gender: 'MALE',
          address: '42 Airport Road, Benin City, Edo State',
          biometricRef: 'NIMC-BIO-SHA256-99120837',
          verifiedAt: new Date().toLocaleString(),
        });
      } else if (activeTab === 'FRSC') {
        setResult({
          licenseOrVinNumber: queryInput,
          verificationStatus: 'VERIFIED_MATCH',
          driverName: 'Chidi Okonkwo',
          vehicleMakeModel: 'Toyota Hilux 4x4 Commercial Logistics Van',
          plateNumber: 'EDO-291-BEN',
          expiryDate: '2028-11-30',
          verifiedAt: new Date().toLocaleString(),
        });
      } else if (activeTab === 'INEC') {
        setResult({
          voterVin: queryInput,
          verificationStatus: 'VERIFIED_MATCH',
          voterName: 'Chidi Okonkwo',
          pollingUnit: 'PU 004 Oredo Ward 2, Benin City',
          state: 'Edo',
          lga: 'Oredo',
          verifiedAt: new Date().toLocaleString(),
        });
      } else if (activeTab === 'NIS') {
        setResult({
          passportNumber: queryInput,
          verificationStatus: 'VERIFIED_MATCH',
          holderName: 'Chidi Okonkwo',
          nationality: 'Nigerian',
          expiryDate: '2030-05-15',
          borderWatchlistClearance: 'CLEARED',
          verifiedAt: new Date().toLocaleString(),
        });
      }
    }, 700);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">🌐 INTER-AGENCY & EXTERNAL DATA GATEWAY</h2>
          <p className="text-xs text-slate-400">Direct integration APIs with NIMC, FRSC, INEC, NIS, and Interpol Watchlist.</p>
        </div>
      </div>

      {/* Mandatory Audit Notice Banner */}
      <div className="p-4 bg-amber-950 border border-amber-800 rounded-lg space-y-1 text-amber-300">
        <div className="font-bold text-sm">🔒 MANDATORY INTER-AGENCY PURPOSE AUDIT POLICY</div>
        <p className="text-[11px]">
          Every agency-to-agency verification request is recorded in the National Police Audit Ledger. Unjustified or frivolous lookups emit high-severity Internal Affairs alerts.
        </p>
      </div>

      {/* Agency Selection Tabs */}
      <div className="flex space-x-3 bg-slate-900 p-2 rounded-lg border border-slate-800">
        {(['NIMC', 'FRSC', 'INEC', 'NIS'] as const).map((ag) => (
          <button
            key={ag}
            onClick={() => {
              setActiveTab(ag);
              setResult(null);
              if (ag === 'NIMC') setQueryInput('10928374829');
              if (ag === 'FRSC') setQueryInput('ED88912/FRSC');
              if (ag === 'INEC') setQueryInput('INEC-VIN-90012837');
              if (ag === 'NIS') setQueryInput('A0991827');
            }}
            className={`px-5 py-2.5 rounded font-bold transition ${
              activeTab === ag ? 'bg-amber-600 text-slate-950' : 'bg-slate-950 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {ag === 'NIMC' && '🇳🇬 NIMC (NIN)'}
            {ag === 'FRSC' && '🚗 FRSC (License / VIN)'}
            {ag === 'INEC' && '🗳 INEC (Voter ID)'}
            {ag === 'NIS' && '✈ NIS (Passport / Border)'}
          </button>
        ))}
      </div>

      {/* Query Form & Result Container */}
      <div className="grid grid-cols-2 gap-6">
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
          <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">
            EXECUTE {activeTab} DATABASE QUERY
          </h3>

          <div>
            <label className="block text-[10px] text-slate-400 mb-1">
              {activeTab === 'NIMC' && '11-DIGIT NATIONAL IDENTIFICATION NUMBER (NIN)'}
              {activeTab === 'FRSC' && 'DRIVER LICENSE NO OR VEHICLE VIN'}
              {activeTab === 'INEC' && 'INEC VOTER IDENTIFICATION NUMBER (VIN)'}
              {activeTab === 'NIS' && 'INTERNATIONAL PASSPORT NUMBER'}
            </label>
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-xs text-slate-100 font-bold"
            />
          </div>

          <div>
            <label className="block text-[10px] text-slate-400 mb-1">OPERATIONAL PURPOSE RATIONALE (MANDATORY AUDIT LOG)</label>
            <textarea
              value={rationaleInput}
              onChange={(e) => setRationaleInput(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100 h-20"
              required
            />
          </div>

          <button
            onClick={handleQuery}
            disabled={loading}
            className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded transition"
          >
            {loading ? 'Querying Agency Encrypted Gateway...' : `Verify via ${activeTab} Gateway`}
          </button>
        </div>

        {/* Verification Response Inspector */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
          <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">
            AGENCY VERIFICATION RESPONSE PAYLOAD
          </h3>

          {result ? (
            <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-3">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="font-bold text-amber-500 text-sm">{activeTab} GATEWAY RESPONSE</span>
                <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold rounded text-[10px]">
                  ✔ {result.verificationStatus}
                </span>
              </div>
              <pre className="text-[11px] text-slate-300 whitespace-pre-wrap font-mono">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 border border-dashed border-slate-800 rounded">
              Enter query value and rationale to inspect real-time agency verification payload.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
