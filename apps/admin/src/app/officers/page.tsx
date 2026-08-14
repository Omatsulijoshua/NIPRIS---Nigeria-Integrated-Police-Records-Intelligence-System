'use client';

import { useState } from 'react';
import { OfficerRank, OfficerRole, EmploymentStatus } from '@nipris/types';

export default function AdminOfficersPage() {
  const [officers, setOfficers] = useState([
    {
      id: 'off-super-admin',
      badgeNumber: 'NPF-1001',
      name: 'System Admin',
      rank: 'Inspector General of Police (IGP)',
      role: 'NATIONAL_SUPER_ADMIN',
      state: 'National',
      status: 'ACTIVE',
    },
    {
      id: 'off-patrol-edo',
      badgeNumber: 'NPF-2002',
      name: 'Emmanuel Okafor',
      rank: 'Inspector of Police',
      role: 'PATROL_OFFICER',
      state: 'Edo',
      status: 'ACTIVE',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [badgeNumber, setBadgeNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleCreateOfficer = (e: React.FormEvent) => {
    e.preventDefault();
    const newOff = {
      id: `off_${Date.now()}`,
      badgeNumber,
      name: `${firstName} ${lastName}`,
      rank: 'Superintendent of Police (SP)',
      role: 'INVESTIGATING_OFFICER',
      state: 'Edo',
      status: 'ACTIVE',
    };
    setOfficers([...officers, newOff]);
    setShowModal(false);
    setBadgeNumber('');
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  const toggleStatus = (id: string) => {
    setOfficers(
      officers.map((o) => {
        if (o.id === id) {
          const nextStatus = o.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
          return { ...o, status: nextStatus };
        }
        return o;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Officer Provisioning Directory</h2>
          <p className="text-xs text-slate-400">Administrative creation, command assignment, inter-state transfer, and account status management.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
        >
          + Provision New Officer
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-lg max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-100">Provision New Police Officer</h3>
            <form onSubmit={handleCreateOfficer} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">SERVICE BADGE NUMBER</label>
                <input
                  type="text"
                  value={badgeNumber}
                  onChange={(e) => setBadgeNumber(e.target.value)}
                  placeholder="NPF-3003"
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100 font-mono"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 mb-1">FIRST NAME</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Babatunde"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">LAST NAME</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Adeyemi"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">INSTITUTIONAL EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="officer@test.local"
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-slate-100 font-mono"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-slate-950 rounded font-bold"
                >
                  Provision Officer Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Badge ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Role Level</th>
              <th className="px-4 py-3">State</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-mono">
            {officers.map((off) => (
              <tr key={off.id} className="hover:bg-slate-800/50 transition">
                <td className="px-4 py-3 text-amber-500 font-bold">{off.badgeNumber}</td>
                <td className="px-4 py-3 text-slate-100 font-semibold">{off.name}</td>
                <td className="px-4 py-3 text-slate-300">{off.rank}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                    {off.role}
                  </span>
                </td>
                <td className="px-4 py-3">{off.state}</td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      off.status === 'ACTIVE'
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                        : 'bg-red-950 text-red-400 border border-red-800'
                    }`}
                  >
                    {off.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button
                    onClick={() => toggleStatus(off.id)}
                    className="text-xs text-slate-400 hover:text-slate-200 underline"
                  >
                    {off.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
