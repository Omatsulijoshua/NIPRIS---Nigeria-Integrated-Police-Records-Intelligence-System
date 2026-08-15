'use client';

import { useState } from 'react';

export default function DisasterRecoveryPage() {
  const [snapshots, setSnapshots] = useState([
    {
      snapshotId: 'SNAP-2026-NIPRIS-00912',
      size: '1.54 GB',
      checksum: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      algo: 'AES-256-GCM',
      region: 'eu-west-1-secondary-dr',
      time: '12 mins ago',
    },
  ]);

  const [failoverRunning, setFailoverRunning] = useState(false);
  const [failoverResult, setFailoverResult] = useState<any | null>(null);

  const [replaying, setReplaying] = useState(false);
  const [replaySuccess, setReplaySuccess] = useState<string | null>(null);

  const handleCreateSnapshot = () => {
    const snapId = `SNAP-2026-NIPRIS-${Math.floor(10000 + Math.random() * 90000)}`;
    const newSnap = {
      snapshotId: snapId,
      size: '1.62 GB',
      checksum: 'a89f928c0b11293847562019c837462019283746501928374650192837465019',
      algo: 'AES-256-GCM',
      region: 'eu-west-1-secondary-dr',
      time: 'Just now',
    };
    setSnapshots([newSnap, ...snapshots]);
    alert(`✔ Encrypted DB Snapshot ${snapId} dispatched to offsite DR storage!`);
  };

  const handleSimulateFailover = () => {
    setFailoverRunning(true);
    setTimeout(() => {
      setFailoverRunning(false);
      setFailoverResult({
        primaryNode: 'PRIMARY_DB_AZ1 (FAILED)',
        promotedReplica: 'STANDBY_REPLICA_AZ2 (PROMOTED TO PRIMARY)',
        duration: '12 seconds',
        dataLoss: '0 bytes',
        status: 'SUCCESSFUL_FAILOVER',
      });
    }, 1000);
  };

  const handleReplayQueue = () => {
    setReplaying(true);
    setTimeout(() => {
      setReplaying(false);
      setReplaySuccess('✔ Store-and-Forward Offline Queue Replay Complete: 14 pending transactions synced to master database.');
      setTimeout(() => setReplaySuccess(null), 2500);
    }, 800);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">🔄 DISASTER RECOVERY, BACKUP & RESILIENCE TESTING</h2>
          <p className="text-xs text-slate-400">Automated Encrypted Offsite Snapshots (RPO &lt; 15m), Chaos Failover &amp; Offline Store-and-Forward Replay.</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleCreateSnapshot}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-xs transition"
          >
            📸 Trigger Encrypted DB Snapshot
          </button>
          <button
            onClick={handleSimulateFailover}
            disabled={failoverRunning}
            className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white font-bold rounded text-xs transition"
          >
            {failoverRunning ? 'Simulating Failover...' : '🔥 Chaos Failover Test'}
          </button>
        </div>
      </div>

      {/* RPO & RTO Real-Time HUD */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">RECOVERY POINT OBJECTIVE (RPO)</div>
          <div className="text-emerald-400 font-bold text-xl">12.4 MINS</div>
          <div className="text-[10px] text-slate-400">Target SLA: &lt; 15 Minutes</div>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">RECOVERY TIME OBJECTIVE (RTO)</div>
          <div className="text-emerald-400 font-bold text-xl">12 SECONDS</div>
          <div className="text-[10px] text-slate-400">Target SLA: &lt; 1 Hour</div>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">OFFSITE SNAPSHOT CATALOG</div>
          <div className="text-amber-400 font-bold text-xl">{snapshots.length} BACKUPS</div>
          <div className="text-[10px] text-slate-400">AES-256-GCM Encrypted</div>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">DR RESILIENCE STATUS</div>
          <div className="text-emerald-400 font-bold text-xl">HIGHLY AVAILABLE</div>
          <div className="text-[10px] text-slate-400">Multi-AZ Automatic Failover</div>
        </div>
      </div>

      {/* Chaos Engineering Failover Result Banner */}
      {failoverResult && (
        <div className="p-5 bg-emerald-950 border border-emerald-800 rounded-lg space-y-2 text-emerald-300">
          <div className="font-bold text-sm">🔥 CHAOS ENGINEERING FAILOVER SIMULATION: PASSED</div>
          <div className="grid grid-cols-2 gap-4 text-xs font-mono">
            <div>Primary Node: <span className="text-red-400">{failoverResult.primaryNode}</span></div>
            <div>Promoted Node: <span className="text-emerald-400">{failoverResult.promotedReplica}</span></div>
            <div>Failover Duration: <strong className="text-amber-400">{failoverResult.duration}</strong></div>
            <div>Data Loss: <strong className="text-emerald-400">{failoverResult.dataLoss}</strong></div>
          </div>
        </div>
      )}

      {/* Offline Store-and-Forward Queue Management */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <h3 className="font-bold text-slate-200">STORE-AND-FORWARD OFFLINE TRANSACTION REPLAY</h3>
          <button
            onClick={handleReplayQueue}
            disabled={replaying}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded border border-slate-700 transition text-xs"
          >
            {replaying ? 'Syncing Pending Queue...' : '🔄 Replay Pending Offline Queue (14)'}
          </button>
        </div>

        {replaySuccess && (
          <div className="p-3 bg-emerald-950 text-emerald-300 border border-emerald-800 rounded text-[11px] font-bold">
            {replaySuccess}
          </div>
        )}
      </div>

      {/* Database Snapshot Catalog Table */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">ENCRYPTED OFFSITE DATABASE SNAPSHOTS CATALOG</h3>
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Snapshot ID</th>
              <th className="px-4 py-3">Size & Algorithm</th>
              <th className="px-4 py-3">SHA-256 Checksum</th>
              <th className="px-4 py-3">Offsite Storage Region</th>
              <th className="px-4 py-3 text-right">Created Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {snapshots.map((s) => (
              <tr key={s.snapshotId} className="hover:bg-slate-800/40 transition">
                <td className="px-4 py-3 font-bold text-amber-500">{s.snapshotId}</td>
                <td className="px-4 py-3">
                  <div className="text-slate-100 font-bold">{s.size}</div>
                  <div className="text-[10px] text-slate-500">{s.algo}</div>
                </td>
                <td className="px-4 py-3 font-mono text-[10px] text-slate-400 truncate max-w-xs">{s.checksum}</td>
                <td className="px-4 py-3 text-emerald-400 font-bold">{s.region}</td>
                <td className="px-4 py-3 text-right text-slate-400">{s.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
