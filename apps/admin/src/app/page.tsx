export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pt-10">
      <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 space-y-4">
        <h2 className="text-xl font-semibold text-slate-100">Infrastructure Administration</h2>
        <p className="text-sm text-slate-400">
          Provision system accounts, manage state command organizations, configure security parameters, and inspect infrastructure logs. Infrastructure Super Admins are restricted from viewing criminal record content.
        </p>

        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="p-4 bg-slate-950 rounded border border-slate-800">
            <h3 className="text-xs font-mono text-slate-400">COMMAND TOPOLOGY</h3>
            <p className="text-lg font-bold text-slate-200 mt-1">36 States + FCT</p>
          </div>
          <div className="p-4 bg-slate-950 rounded border border-slate-800">
            <h3 className="text-xs font-mono text-slate-400">ACTIVE STATIONS</h3>
            <p className="text-lg font-bold text-slate-200 mt-1">Configurable</p>
          </div>
          <div className="p-4 bg-slate-950 rounded border border-slate-800">
            <h3 className="text-xs font-mono text-slate-400">SECURITY AUDIT</h3>
            <p className="text-lg font-bold text-emerald-400 mt-1">IMMUTABLE</p>
          </div>
        </div>
      </div>
    </div>
  );
}
