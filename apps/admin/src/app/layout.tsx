import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NIPRIS — Administration Console',
  description: 'National & Infrastructure Administration Console',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-900 text-slate-100 antialiased min-h-screen">
        <header className="border-b border-slate-800 bg-slate-950 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded bg-red-700 flex items-center justify-center font-bold text-slate-100 text-sm">
              ADM
            </div>
            <div>
              <h1 className="font-bold text-base tracking-wide text-slate-100">NIPRIS ADMIN CONSOLE</h1>
              <p className="text-xs text-slate-400">System Infrastructure & Organization Management</p>
            </div>
          </div>
          <div className="text-xs bg-slate-900 px-3 py-1.5 rounded border border-slate-800 text-red-400 font-mono">
            INFRASTRUCTURE ADMIN SCOPE
          </div>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
