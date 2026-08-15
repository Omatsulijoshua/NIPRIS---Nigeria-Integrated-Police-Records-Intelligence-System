'use client';

export default function InfraDashboardPage() {
  const healthComponents = [
    { name: 'PostgreSQL HA Database', status: 'UP', latency: '2 ms', type: 'Primary Relational Data' },
    { name: 'Redis Cache & Session Cluster', status: 'UP', latency: '1 ms', type: 'In-Memory Cache' },
    { name: 'S3 WORM Digital Evidence Vault', status: 'UP', latency: '12 ms', type: 'Immutable Storage' },
    { name: 'SHA-256 Audit Block Hash Chain', status: 'INTACT', latency: '0 ms', type: 'Cryptographic Ledger' },
  ];

  const edgeNodes = [
    { state: 'Edo State Command', node: 'node-edo-command-01', status: 'ONLINE', txPending: 0, lastSync: 'Just now' },
    { state: 'Lagos State Command', node: 'node-lagos-command-01', status: 'ONLINE', txPending: 0, lastSync: 'Just now' },
    { state: 'FCT National HQ', node: 'node-fct-hq-01', status: 'ONLINE', txPending: 0, lastSync: 'Just now' },
    { state: 'Kano State Command', node: 'node-kano-command-01', status: 'ONLINE', txPending: 0, lastSync: 'Just now' },
    { state: 'Rivers State Command', node: 'node-rivers-command-01', status: 'ONLINE', txPending: 0, lastSync: 'Just now' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">⚡ INFRASTRUCTURE, KUBERNETES & SYSTEM HEALTH</h2>
          <p className="text-xs text-slate-400">High Availability Multi-AZ Monitoring, Edge Command Node Sync & Container Telemetry.</p>
        </div>
      </div>

      {/* Cluster Metrics HUD */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">SYSTEM HEALTH STATUS</div>
          <div className="text-emerald-400 font-bold text-lg">✔ HEALTHY</div>
          <div className="text-[10px] text-slate-400">Version: 1.0.0-PROD</div>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">K8S BACKEND REPLICAS</div>
          <div className="text-amber-500 font-bold text-lg">5 / 5 PODS</div>
          <div className="text-[10px] text-slate-400">HPA Auto-Scaling Enabled</div>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">CLUSTER CPU UTILIZATION</div>
          <div className="text-slate-100 font-bold text-lg">34.2%</div>
          <div className="text-[10px] text-slate-400">Target Threshold: 70%</div>
        </div>
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-1">
          <div className="text-[10px] text-slate-500">CLUSTER MEMORY UTILIZATION</div>
          <div className="text-slate-100 font-bold text-lg">42.8%</div>
          <div className="text-[10px] text-slate-400">Target Threshold: 80%</div>
        </div>
      </div>

      {/* Core Component Health */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">CORE INFRASTRUCTURE COMPONENTS</h3>
        <div className="grid grid-cols-2 gap-4">
          {healthComponents.map((comp) => (
            <div key={comp.name} className="p-4 bg-slate-950 border border-slate-800 rounded flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-100">{comp.name}</div>
                <div className="text-[10px] text-slate-500">{comp.type} (Latency: {comp.latency})</div>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded font-bold text-[10px]">
                {comp.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 36 States + FCT Edge Command Node Sync */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">EDGE COMMAND NODES SYNCHRONIZATION GRID (36 STATES + FCT)</h3>
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-950 text-slate-400 text-[10px] uppercase border-b border-slate-800">
            <tr>
              <th className="px-4 py-2.5">State Command</th>
              <th className="px-4 py-2.5">Node ID</th>
              <th className="px-4 py-2.5">Pending Tx</th>
              <th className="px-4 py-2.5">Last Sync</th>
              <th className="px-4 py-2.5 text-right">Node Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {edgeNodes.map((n) => (
              <tr key={n.node} className="hover:bg-slate-800/40">
                <td className="px-4 py-2.5 font-bold text-slate-100">{n.state}</td>
                <td className="px-4 py-2.5 text-amber-500 font-mono text-[11px]">{n.node}</td>
                <td className="px-4 py-2.5 text-slate-400">{n.txPending} tx</td>
                <td className="px-4 py-2.5 text-slate-400">{n.lastSync}</td>
                <td className="px-4 py-2.5 text-right">
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded font-bold text-[10px]">
                    ✔ {n.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
