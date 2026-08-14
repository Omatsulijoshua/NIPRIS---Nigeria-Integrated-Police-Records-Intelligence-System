export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pt-10">
      <div className="p-6 rounded-lg bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-100">Officer Authentication Portal</h2>
          <span className="px-2.5 py-1 rounded text-xs font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
            SYSTEM ONLINE
          </span>
        </div>
        <p className="text-sm text-slate-400">
          Authorized personnel must provide institutional credentials, Service ID, and multi-factor TOTP token to establish an operational session. All activities are recorded in an unalterable audit log.
        </p>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">ENCRYPTION: TLS 1.3 / AES-256-GCM</span>
          <button className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-semibold rounded text-sm transition">
            Proceed to Officer Login
          </button>
        </div>
      </div>
    </div>
  );
}
