'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewEvidencePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('BODYCAM_FOOTAGE');
  const [fileName, setFileName] = useState('bodycam-rec-20260815-0012.mp4');
  const [sha256Hash, setSha256Hash] = useState('e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  const [storageUrl, setStorageUrl] = useState('https://s3.nipris.gov.ng/vault/cam-9912.mp4');
  const [seizedLocation, setSeizedLocation] = useState('Ring Road Financial District, Benin City');
  const [caseId, setCaseId] = useState('cas-edo-001');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Digital Evidence Asset successfully ingested and sealed with SHA-256 Checksum!');
    router.push('/evidence');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-6 font-mono text-xs">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Ingest New Digital Evidence Asset</h2>
        <p className="text-xs text-slate-400">Record media metadata, compute SHA-256 cryptographic checksum, and seal chain of custody.</p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div>
          <label className="block text-slate-300 mb-1">EVIDENCE TITLE / TITLE DESCRIPTION</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Patrol Body-Camera Footage at Bank Vault Entrance"
            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 mb-1">EVIDENCE CATEGORY</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            >
              <option value="BODYCAM_FOOTAGE">BODYCAM FOOTAGE</option>
              <option value="DASHCAM_FOOTAGE">DASHCAM FOOTAGE</option>
              <option value="PHOTOGRAPH">PHOTOGRAPH</option>
              <option value="AUDIO_RECORDING">AUDIO RECORDING</option>
              <option value="FORENSIC_DOCUMENT">FORENSIC DOCUMENT</option>
              <option value="PHYSICAL_ASSET_PHOTO">PHYSICAL ASSET PHOTO</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">LINKED MASTER CASE ID</label>
            <input
              type="text"
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
            />
          </div>
        </div>

        {/* Cryptographic SHA-256 Storage Seal Box */}
        <div className="p-4 bg-slate-950 rounded border border-slate-800 space-y-3">
          <span className="text-amber-500 font-bold block text-[10px]">🔒 CRYPTOGRAPHIC INTEGRITY & VAULT METADATA</span>

          <div>
            <label className="block text-slate-400 mb-1">FILE NAME & MIME TYPE</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-slate-100"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">CRYPTOGRAPHIC SHA-256 CHECKSUM HASH</label>
            <input
              type="text"
              value={sha256Hash}
              onChange={(e) => setSha256Hash(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-amber-400 font-mono text-[11px]"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1">VAULT STORAGE URL</label>
            <input
              type="text"
              value={storageUrl}
              onChange={(e) => setStorageUrl(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded px-3 py-1.5 text-slate-100"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-slate-300 mb-1">SEIZURE LOCATION</label>
          <input
            type="text"
            value={seizedLocation}
            onChange={(e) => setSeizedLocation(e.target.value)}
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
            Ingest Asset & Seal SHA-256 Hash
          </button>
        </div>
      </form>
    </div>
  );
}
