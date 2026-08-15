'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function InformantsRegistryPage() {
  const [informants, setInformants] = useState([
    {
      id: 'inf-viper-09',
      codeName: 'INFORMANT-VIPER-09',
      encryptedIdentity: '🔒 AES-256-GCM ENCRYPTED (RESTRICTED TO HANDLER & LEVEL 0 SUPER ADMIN)',
      handler: 'Inspector Emmanuel Okafor (NPF-2002)',
      reliability: 'B2 (HIGH CONFIDENCE)',
      status: 'ACTIVE',
    },
    {
      id: 'inf-eagle-02',
      codeName: 'INFORMANT-EAGLE-02',
      encryptedIdentity: '🔒 AES-256-GCM ENCRYPTED (RESTRICTED TO HANDLER & LEVEL 0 SUPER ADMIN)',
      handler: 'DSP Fatimah Mohammed (Intelligence Bureau)',
      reliability: 'A1 (CONFIRMED EXCELLENT)',
      status: 'ACTIVE',
    },
  ]);

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Confidential Informants (CI) Cryptographic Registry</h2>
          <p className="text-xs text-slate-400">Strict true identity concealment with handling officer access controls.</p>
        </div>
        <Link href="/intelligence" className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded">
          ← Back to Intelligence Dashboard
        </Link>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">ACTIVE CONFIDENTIAL INFORMANT PROFILES</h3>
        <div className="grid grid-cols-2 gap-4">
          {informants.map((inf) => (
            <div key={inf.id} className="p-5 bg-slate-950 border border-slate-800 rounded-lg space-y-3 shadow-xl">
              <div className="flex justify-between items-start">
                <span className="font-bold text-amber-500 text-base">{inf.codeName}</span>
                <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded text-[10px] font-bold">
                  {inf.status}
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded border border-slate-800 space-y-1">
                <span className="text-[10px] text-slate-500 block">TRUE IDENTITY STATUS</span>
                <p className="text-red-400 font-bold text-[11px]">{inf.encryptedIdentity}</p>
              </div>

              <div className="space-y-1 text-slate-300">
                <div className="text-[10px] text-slate-500">HANDLING OFFICER</div>
                <div className="font-bold text-slate-100">{inf.handler}</div>
                <div className="text-[10px] text-amber-400 mt-1">RELIABILITY RATING: {inf.reliability}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
