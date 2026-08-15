'use client';

import { useState } from 'react';

export default function StationComplaintsPage() {
  const [complaints, setComplaints] = useState([
    {
      id: 'cmp_001',
      complaintNumber: 'CMP-2026-STN001-00912',
      receivedAt: '1 hour ago',
      complainantName: 'Chief Emeka Nnamdi',
      complainantPhone: '+234-803-555-0192',
      source: 'WALK_IN_CITIZEN',
      category: 'ARMED_ROBBERY',
      description: 'Complainant states armed robbers invaded premises along Ring Road at 02:00 hours.',
      location: 'Ring Road, Benin City',
      status: 'CONVERTED_TO_INCIDENT',
      assignedOfficer: 'DSP Chidi Okonkwo (NPF-77319)',
      resultingIncident: 'INC-2026-EDO-00912',
    },
    {
      id: 'cmp_002',
      complaintNumber: 'CMP-2026-STN001-00913',
      receivedAt: '3 hours ago',
      complainantName: 'Mrs. Funke Adebayo',
      complainantPhone: '+234-802-111-9920',
      source: 'PHONE',
      category: 'BURGLARY',
      description: 'Break-in reported at commercial store front on Sapele Road. Locks forced.',
      location: '14 Sapele Road, Benin City',
      status: 'ASSIGNED',
      assignedOfficer: 'DSP Chidi Okonkwo (NPF-77319)',
      resultingIncident: null,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [complainantName, setComplainantName] = useState('');
  const [complainantPhone, setComplainantPhone] = useState('');
  const [source, setSource] = useState('WALK_IN_CITIZEN');
  const [category, setCategory] = useState('ARMED_ROBBERY');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Benin City');

  const handleCreateComplaint = () => {
    if (!complainantName || !description) return;
    const cmpNum = `CMP-2026-STN001-${Math.floor(10000 + Math.random() * 90000)}`;
    const newCmp = {
      id: `cmp_${Date.now()}`,
      complaintNumber: cmpNum,
      receivedAt: 'Just now',
      complainantName,
      complainantPhone,
      source,
      category,
      description,
      location,
      status: 'NEW',
      assignedOfficer: 'Unassigned',
      resultingIncident: null,
    };
    setComplaints([newCmp, ...complaints]);
    setShowModal(false);
    setComplainantName('');
    setDescription('');
  };

  const handleConvertToIncident = (cmpId: string) => {
    const incNum = `INC-2026-EDO-${Math.floor(10000 + Math.random() * 90000)}`;
    setComplaints(
      complaints.map((c) => (c.id === cmpId ? { ...c, status: 'CONVERTED_TO_INCIDENT', resultingIncident: incNum } : c))
    );
    alert(`✔ Complaint converted to formal Incident ${incNum}!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">📋 COMPLAINT MANAGEMENT & WORKFLOW PIPELINE</h2>
          <p className="text-xs text-slate-400">Citizen & Officer Complaint Intake $\rightarrow$ Review $\rightarrow$ Incident Conversion $\rightarrow$ Case Investigation.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
        >
          + Register New Complaint
        </button>
      </div>

      {/* Complaints Pipeline Table */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">ACTIVE STATION COMPLAINTS LEDGER</h3>
        <div className="space-y-4">
          {complaints.map((c) => (
            <div key={c.complaintNumber} className="p-4 bg-slate-950 border border-slate-800 rounded space-y-2">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-amber-500">{c.complaintNumber}</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-300 font-bold rounded text-[10px]">{c.category}</span>
                  <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold rounded text-[9px]">SOURCE: {c.source}</span>
                </div>
                <span className={`px-2 py-0.5 font-bold rounded text-[10px] ${c.status === 'CONVERTED_TO_INCIDENT' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                  {c.status}
                </span>
              </div>
              <p className="text-slate-200 font-bold text-xs">{c.description}</p>
              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 pt-1">
                <div>Complainant: <span className="text-slate-200 font-bold">{c.complainantName} ({c.complainantPhone})</span></div>
                <div>Location: <span className="text-slate-200 font-bold">{c.location}</span></div>
                <div>Assigned Investigator: <span className="text-amber-400 font-bold">{c.assignedOfficer}</span></div>
                <div>Resulting Incident: <span className="text-emerald-400 font-bold">{c.resultingIncident || 'None Yet'}</span></div>
              </div>
              {c.status !== 'CONVERTED_TO_INCIDENT' && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleConvertToIncident(c.id)}
                    className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-slate-950 font-bold rounded text-[10px]"
                  >
                    ⚡ Convert to Formal Incident
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Intake Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg w-full max-w-lg space-y-4">
            <h3 className="text-lg font-bold text-amber-500 border-b border-slate-800 pb-2">REGISTER COMPLAINT INTAKE</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">COMPLAINANT NAME</label>
                <input
                  type="text"
                  value={complainantName}
                  onChange={(e) => setComplainantName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100 font-bold"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">PHONE NUMBER</label>
                <input
                  type="text"
                  value={complainantPhone}
                  onChange={(e) => setComplainantPhone(e.target.value)}
                  placeholder="+234-803-000-0000"
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100 font-bold"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">ORIGIN SOURCE</label>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-amber-400 font-bold"
                >
                  <option value="WALK_IN_CITIZEN">Walk-in Citizen</option>
                  <option value="PHONE">Phone Intake</option>
                  <option value="ONLINE_REFERRAL">Online Referral</option>
                  <option value="OFFICER">Officer Referral</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">CATEGORY</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-amber-400 font-bold"
                >
                  <option value="ARMED_ROBBERY">Armed Robbery</option>
                  <option value="BURGLARY">Burglary</option>
                  <option value="ASSAULT">Assault</option>
                  <option value="FRAUD_SCAM">Fraud / Scam</option>
                  <option value="MISSING_PERSON">Missing Person</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">COMPLAINT NARRATIVE & DETAILS</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter detailed facts..."
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100 font-bold"
              />
            </div>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleCreateComplaint}
                className="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded"
              >
                Register Complaint Intake
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded border border-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
