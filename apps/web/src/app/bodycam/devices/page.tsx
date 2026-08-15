'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CameraDevicesPage() {
  const [devices, setDevices] = useState([
    {
      id: 'dev-bwc-001',
      serial: 'BWC-NPF-EDO-0012',
      model: 'Axon Body 3 / Patrol Cam V2',
      type: 'BODY_WORN_CAMERA',
      unit: 'Edo State Command Station A',
      assignedOfficer: 'Inspector Emmanuel Okafor (NPF-2002)',
      status: 'IN_SERVICE',
      battery: 94,
    },
  ]);

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Camera Device Fleet Configuration</h2>
          <p className="text-xs text-slate-400">Manage Body-Worn Camera & Dashcam serial registrations and officer assignments.</p>
        </div>
        <Link href="/bodycam" className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded">
          ← Back to Bodycam Dashboard
        </Link>
      </div>

      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">REGISTERED DEVICE FLEET</h3>
        <div className="divide-y divide-slate-800">
          {devices.map((d) => (
            <div key={d.id} className="py-3 flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-amber-500 text-sm">{d.serial}</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded font-bold">{d.type}</span>
                </div>
                <div className="text-slate-400 text-[11px]">MODEL: {d.model} | UNIT: {d.unit}</div>
                <div className="text-slate-300">ASSIGNED OFFICER: {d.assignedOfficer}</div>
              </div>
              <div className="text-right space-y-1">
                <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded font-bold text-[10px]">
                  {d.status}
                </span>
                <div className="text-[10px] text-slate-400">BATTERY: {d.battery}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
