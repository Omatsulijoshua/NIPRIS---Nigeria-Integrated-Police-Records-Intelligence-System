'use client';

import { useState } from 'react';

export default function OfficerLoginPage() {
  const [step, setStep] = useState<'CREDENTIALS' | 'MFA'>('CREDENTIALS');
  const [badgeNumber, setBadgeNumber] = useState('');
  const [password, setPassword] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [challengeToken, setChallengeToken] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sessionSuccess, setSessionSuccess] = useState<any>(null);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Direct mock or API call
      if (badgeNumber.trim() === '' || password.trim() === '') {
        throw new Error('Please enter your Officer Badge Number and Password.');
      }

      if (password === 'wrong') {
        throw new Error('Invalid Officer Service ID or password credentials.');
      }

      // Simulate challenge token generation
      setChallengeToken(`challenge_demo_${Date.now()}`);
      setStep('MFA');
    } catch (err: any) {
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!totpCode || totpCode.length !== 6) {
        throw new Error('Please enter your 6-digit TOTP code.');
      }

      setSessionSuccess({
        badgeNumber,
        role: badgeNumber === 'NPF-1001' ? 'NATIONAL_SUPER_ADMIN' : 'PATROL_OFFICER',
        sessionId: `sess_${Date.now()}`,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      });
    } catch (err: any) {
      setError(err.message || 'MFA validation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto pt-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex h-12 w-12 rounded bg-amber-600 items-center justify-center font-bold text-slate-950 text-xl shadow-lg">
          NPF
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-100">Officer Login Gateway</h2>
        <p className="text-xs text-slate-400 font-mono">NIPRIS LAW ENFORCEMENT AUTHENTICATION</p>
      </div>

      {sessionSuccess ? (
        <div className="p-6 bg-slate-900 border border-emerald-800 rounded-lg space-y-4">
          <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>OFFICER SESSION ESTABLISHED</span>
          </div>
          <div className="text-xs font-mono text-slate-300 space-y-1 bg-slate-950 p-3 rounded border border-slate-800">
            <div>BADGE NUMBER: {sessionSuccess.badgeNumber}</div>
            <div>ROLE SCOPE: {sessionSuccess.role}</div>
            <div>SESSION ID: {sessionSuccess.sessionId}</div>
            <div>MFA STATUS: VERIFIED</div>
          </div>
          <button
            onClick={() => {
              setSessionSuccess(null);
              setStep('CREDENTIALS');
              setBadgeNumber('');
              setPassword('');
              setTotpCode('');
            }}
            className="w-full py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition"
          >
            Revoke Session & Logout
          </button>
        </div>
      ) : (
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg shadow-xl space-y-4">
          {error && (
            <div className="p-3 bg-red-950 border border-red-800 text-red-300 text-xs rounded font-mono">
              [SECURITY ALERT]: {error}
            </div>
          )}

          {step === 'CREDENTIALS' ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">OFFICER BADGE NUMBER / SERVICE ID</label>
                <input
                  type="text"
                  value={badgeNumber}
                  onChange={(e) => setBadgeNumber(e.target.value)}
                  placeholder="e.g. NPF-1001"
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-600 font-mono"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">PASSWORD</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-amber-600 font-mono"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-2.5 rounded text-sm transition shadow"
                >
                  {loading ? 'Validating Credentials...' : 'Authenticate Credentials'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleMfaSubmit} className="space-y-4">
              <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded text-xs text-amber-300">
                Credentials validated for <strong>{badgeNumber}</strong>. Enter your 6-digit TOTP code from your registered security device.
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">6-DIGIT TOTP CODE</label>
                <input
                  type="text"
                  maxLength={6}
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value)}
                  placeholder="123456"
                  className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-2.5 text-center text-xl tracking-widest text-amber-500 font-mono focus:outline-none focus:border-amber-600"
                  required
                />
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-2.5 rounded text-sm transition shadow"
                >
                  {loading ? 'Verifying MFA...' : 'Verify TOTP & Establish Session'}
                </button>
                <button
                  type="button"
                  onClick={() => setStep('CREDENTIALS')}
                  className="w-full py-1.5 text-xs text-slate-400 hover:text-slate-200 transition"
                >
                  Back to Credentials
                </button>
              </div>
            </form>
          )}

          <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-500 text-center font-mono">
            UNAUTHORIZED ACCESS ATTEMPTS ARE LOGGED & PROSECUTED
          </div>
        </div>
      )}
    </div>
  );
}
