'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function BodycamPlaybackWorkbenchPage({ params }: { params: { id: string } }) {
  const [retention, setRetention] = useState('EVIDENTIARY_HOLD_PERMANENT');
  const [redactionApplied, setRedactionApplied] = useState(false);
  const [activeMarker, setActiveMarker] = useState<number | null>(null);

  const mockRecording = {
    id: params.id || 'rec-edo-001',
    number: 'BWC-2026-EDO-00991',
    serial: 'BWC-NPF-EDO-0012',
    officer: 'Inspector Emmanuel Okafor (NPF-2002)',
    caseId: 'cas-edo-001',
    incidentId: 'inc-edo-001',
    streamUrl: 'https://s3.nipris.gov.ng/bodycam/rec-9912.mp4',
    sha256: 'd41d8cd98f00b204e9800998ecf8427e991288aa77bb66cc55dd44ee33ff2211',
    telemetry: {
      speed: '42.5 km/h',
      lat: '6.3350 N',
      long: '5.6030 E',
      dutyStatus: 'ON_PATROL',
    },
    markers: [
      { sec: 240, time: '04:00', tag: 'WEAPON_DRAWN', notes: 'Suspect brandished firearm at bank rear entrance' },
      { sec: 610, time: '10:10', tag: 'ARREST_MADE', notes: 'Primary suspect subdued and handcuffed' },
    ],
  };

  const handleApplyRedaction = () => {
    setRedactionApplied(true);
    alert('Face Blur & License Plate Masking Filters applied to video stream preview.');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      {/* Header Banner */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-3">
              <span className="text-amber-500 font-bold text-lg">{mockRecording.number}</span>
              <span className="px-2.5 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-bold">
                CAMERA: {mockRecording.serial}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-100 mt-1">Officer: {mockRecording.officer}</h2>
          </div>
          <div className="flex space-x-2">
            <span className="px-3 py-1 rounded bg-red-950 text-red-400 border border-red-800 font-bold">
              RETENTION: {retention}
            </span>
            <span className={`px-3 py-1 rounded font-bold border ${redactionApplied ? 'bg-indigo-950 text-indigo-400 border-indigo-800' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
              REDACTION: {redactionApplied ? 'REDACTION_APPLIED' : 'UNREDACTED'}
            </span>
          </div>
        </div>

        {/* Video Player Container with Telemetry Overlay */}
        <div className="relative p-10 bg-slate-950 rounded-lg border border-slate-800 flex flex-col items-center justify-center min-h-[300px] overflow-hidden">
          {/* Telemetry HUD Overlay */}
          <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-800 p-3 rounded space-y-1 text-[10px]">
            <div className="text-amber-400 font-bold">📡 REAL-TIME GPS & VEHICLE TELEMETRY HUD</div>
            <div className="text-slate-200">GPS COORDINATES: {mockRecording.telemetry.lat}, {mockRecording.telemetry.long}</div>
            <div className="text-slate-200">VEHICLE SPEED: {mockRecording.telemetry.speed}</div>
            <div className="text-slate-200">DUTY STATUS: {mockRecording.telemetry.dutyStatus}</div>
          </div>

          {redactionApplied && (
            <div className="absolute top-4 right-4 bg-indigo-950/90 border border-indigo-800 text-indigo-300 p-2 rounded text-[10px] font-bold animate-pulse">
              👁 FACE BLUR & LICENSE MASKING PREVIEW ACTIVE
            </div>
          )}

          <div className="text-slate-500 font-bold text-sm text-center pt-8">
            [VIDEO PLAYBACK STREAM PLAYER]
            <div className="text-slate-400 text-xs mt-1">SHA-256: {mockRecording.sha256.substring(0, 24)}...</div>
          </div>

          <a
            href={mockRecording.streamUrl}
            target="_blank"
            className="mt-6 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
          >
            ▶ Launch High-Bitrate Video Player Stream
          </a>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800 text-slate-300">
          <div>
            <span className="text-slate-500 block text-[10px]">LINKED INCIDENT</span>
            <Link href={`/incidents/${mockRecording.incidentId}`} className="text-amber-500 hover:underline">
              Incident #{mockRecording.incidentId} ↗
            </Link>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">LINKED CASE FILE</span>
            <Link href={`/cases/${mockRecording.caseId}`} className="text-amber-500 hover:underline">
              Case #{mockRecording.caseId} ↗
            </Link>
          </div>
        </div>
      </div>

      {/* Time-Sync Markers & Redaction Workbench */}
      <div className="grid grid-cols-2 gap-6">
        {/* Time-Sync Markers */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-3">
          <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">TIME-SYNC CRITICAL EVENT MARKERS</h3>
          <div className="space-y-2">
            {mockRecording.markers.map((mk) => (
              <div
                key={mk.sec}
                onClick={() => setActiveMarker(mk.sec)}
                className="p-3 bg-slate-950 rounded border border-slate-800 hover:border-amber-600 cursor-pointer transition space-y-1"
              >
                <div className="flex justify-between font-bold">
                  <span className="text-amber-400">⏱ [{mk.time}] {mk.tag}</span>
                  <span className="text-[10px] text-slate-500">Jump to {mk.sec}s</span>
                </div>
                <p className="text-slate-300 text-[11px]">{mk.notes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Video Redaction & Masking Control Panel */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
          <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">VIDEO REDACTION & MASKING CONTROLS</h3>
          <p className="text-slate-400 text-[11px]">
            Apply automated or manual facial blur, bystander anonymization, and license plate masking for legal disclosure compliance.
          </p>

          <div className="space-y-2 text-slate-300">
            <label className="flex items-center space-x-2 bg-slate-950 p-2.5 rounded border border-slate-800 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-amber-600" />
              <span>Automated Face Detection & Bystander Blur</span>
            </label>
            <label className="flex items-center space-x-2 bg-slate-950 p-2.5 rounded border border-slate-800 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded accent-amber-600" />
              <span>Vehicle License Plate Masking</span>
            </label>
          </div>

          <button
            onClick={handleApplyRedaction}
            className="w-full py-2.5 bg-indigo-900 hover:bg-indigo-800 text-indigo-200 border border-indigo-700 font-bold rounded transition"
          >
            👁 Apply Redaction & Preview Masked Video Stream
          </button>
        </div>
      </div>
    </div>
  );
}
