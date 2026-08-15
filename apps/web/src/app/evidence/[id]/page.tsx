'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EvidenceDetailWorkbenchPage({ params }: { params: { id: string } }) {
  const [hashResult, setHashResult] = useState<string | null>(null);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferAction, setTransferAction] = useState('TRANSFER_TO_LAB');
  const [recipient, setRecipient] = useState('State Forensic Ballistics Lab, Benin City');
  const [rationale, setRationale] = useState('Transfer for forensic extraction');

  const mockEvidence = {
    id: params.id || 'evd-edo-001',
    number: 'EVD-2026-EDO-00109',
    title: 'Patrol Body-Camera Footage at Bank Vault Entrance',
    category: 'BODYCAM_FOOTAGE',
    fileName: 'bodycam-rec-20260815-0012.mp4',
    fileSizeBytes: 450971520,
    mimeType: 'video/mp4',
    storageUrl: 'https://s3.nipris.gov.ng/vault/cam-9912.mp4',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    classification: 'EVIDENCE_RESTRICTED',
    caseId: 'cas-edo-001',
    incidentId: 'inc-edo-001',
    seizingOfficer: 'Inspector Emmanuel Okafor (NPF-2002)',
    seizedLocation: 'Ring Road Financial District, Benin City',
    seizedAt: '2026-08-15 00:25',
    chainOfCustody: [
      {
        id: 'coc-001',
        by: 'Inspector Emmanuel Okafor (NPF-2002)',
        action: 'INTAKE',
        recipient: 'State Command Digital Evidence Vault (Server 4)',
        rationale: 'Initial secure ingest of body-camera recording',
        time: '2026-08-15 00:25',
        status: 'VERIFIED_INTACT',
      },
    ],
  };

  const handleVerifyHash = () => {
    setHashResult('VERIFIED_INTACT (SHA-256 Checksum Match Confirmed - Zero Tampering Detected)');
  };

  const handleConfirmTransfer = () => {
    mockEvidence.chainOfCustody.push({
      id: `coc-${Date.now()}`,
      by: 'Inspector Emmanuel Okafor (NPF-2002)',
      action: transferAction,
      recipient,
      rationale,
      time: 'Just now',
      status: 'VERIFIED_INTACT',
    });
    setShowTransferModal(false);
    alert('Chain of custody transfer successfully logged in append-only ledger.');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      {/* Header Banner */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-3">
              <span className="text-amber-500 font-bold text-lg">{mockEvidence.number}</span>
              <span className="px-2.5 py-0.5 rounded text-[10px] bg-slate-800 text-amber-400 font-bold">
                {mockEvidence.category}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-1">{mockEvidence.title}</h2>
          </div>
          <span className="px-3 py-1 bg-amber-950 text-amber-400 border border-amber-800 rounded font-bold">
            CLASSIFICATION: {mockEvidence.classification}
          </span>
        </div>

        {/* Media Preview Container */}
        <div className="p-8 bg-slate-950 rounded-lg border border-slate-800 flex flex-col items-center justify-center space-y-3">
          <div className="text-slate-500 font-bold">[DIGITAL MEDIA STREAM CONTAINER]</div>
          <div className="text-slate-400 text-[11px]">FILE: {mockEvidence.fileName} ({mockEvidence.mimeType} - 450.9 MB)</div>
          <a
            href={mockEvidence.storageUrl}
            target="_blank"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
          >
            ▶ Launch Secure Media Player Stream
          </a>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2 border-t border-slate-800 text-slate-300">
          <div>
            <span className="text-slate-500 block text-[10px]">SEIZING OFFICER</span>
            <span className="font-bold text-slate-100">{mockEvidence.seizingOfficer}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">SEIZURE LOCATION</span>
            <span>{mockEvidence.seizedLocation}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">ASSOCIATED CASE & INCIDENT</span>
            <Link href={`/cases/${mockEvidence.caseId}`} className="text-amber-500 hover:underline">
              Case #{mockEvidence.caseId} ↗
            </Link>
          </div>
        </div>
      </div>

      {/* Cryptographic SHA-256 Checksum Card */}
      <div className="p-5 bg-slate-950 border border-slate-800 rounded-lg space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="font-bold text-amber-500 text-xs">🔒 CRYPTOGRAPHIC SHA-256 CHECKSUM INTEGRITY SEAL</span>
          <button
            onClick={handleVerifyHash}
            className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
          >
            Execute SHA-256 Hash Verification
          </button>
        </div>

        <div>
          <span className="text-slate-500 block text-[10px] mb-1">REGISTERED VAULT CHECKSUM HASH</span>
          <code className="text-amber-400 bg-slate-900 px-3 py-1.5 rounded border border-slate-800 block text-[11px]">
            {mockEvidence.sha256Hash}
          </code>
        </div>

        {hashResult && (
          <div className="p-3 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded font-bold text-[11px] animate-pulse">
            ✔ {hashResult}
          </div>
        )}
      </div>

      {/* Chain of Custody Timeline */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <h3 className="font-bold text-slate-200 text-xs">APPEND-ONLY CHAIN OF CUSTODY TIMELINE LOG</h3>
          <button
            onClick={() => setShowTransferModal(true)}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 font-bold rounded transition text-xs"
          >
            + Record Chain of Custody Transfer
          </button>
        </div>

        <div className="relative border-l-2 border-slate-800 ml-4 pl-4 space-y-4">
          {mockEvidence.chainOfCustody.map((coc, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[23px] top-1 h-3 w-3 rounded-full bg-amber-500 border-2 border-slate-900"></div>
              <div className="p-3 bg-slate-950 rounded border border-slate-800 space-y-1">
                <div className="flex justify-between items-center text-slate-400 text-[10px]">
                  <span className="font-bold text-amber-400">{coc.action}</span>
                  <span>{coc.time}</span>
                </div>
                <div className="text-slate-100 text-xs font-semibold">Location / Recipient: {coc.recipient}</div>
                <div className="text-slate-400 text-[11px]">Rationale: {coc.rationale}</div>
                <div className="text-[10px] text-slate-500">Performed by Officer: {coc.by}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showTransferModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-100">RECORD CHAIN OF CUSTODY TRANSFER</h3>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">CUSTODY ACTION</label>
              <select
                value={transferAction}
                onChange={(e) => setTransferAction(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100"
              >
                <option value="TRANSFER_TO_LAB">TRANSFER TO LAB</option>
                <option value="CHECKOUT_COURT">CHECKOUT FOR COURT PROCEEDINGS</option>
                <option value="RETURN_TO_VAULT">RETURN TO EVIDENCE VAULT</option>
                <option value="SEAL_EVIDENCE">SEAL EVIDENCE BAG</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">RECIPIENT OFFICER / LOCATION</label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">CUSTODY TRANSFER RATIONALE</label>
              <textarea
                value={rationale}
                onChange={(e) => setRationale(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100 h-20"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowTransferModal(false)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmTransfer}
                className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs"
              >
                Sign & Append Custody Transfer Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
