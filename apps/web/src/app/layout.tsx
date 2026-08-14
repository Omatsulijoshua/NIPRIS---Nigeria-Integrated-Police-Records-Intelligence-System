import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NIPRIS — Nigeria Integrated Police Records Intelligence System',
  description: 'Restricted Enterprise Law Enforcement Information Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-900 text-slate-100 antialiased min-h-screen">
        <header className="border-b border-slate-800 bg-slate-950 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded bg-amber-600 flex items-center justify-center font-bold text-slate-950 text-sm">
              NPF
            </div>
            <div>
              <h1 className="font-bold text-base tracking-wide text-slate-100">NIPRIS GATEWAY</h1>
              <p className="text-xs text-slate-400">Nigeria Integrated Police Records & Intelligence System</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs bg-slate-900 px-3 py-1.5 rounded border border-slate-800 text-amber-500 font-mono">
            <span>RESTRICTED LAW ENFORCEMENT ACCESS ONLY</span>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
