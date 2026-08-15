import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NIPRIS — Nigeria Integrated Police Records Intelligence System',
  description: 'Restricted Enterprise Law Enforcement Information Platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-900 text-slate-100 antialiased min-h-screen flex flex-col">
        <header className="border-b border-slate-800 bg-slate-950 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-50">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded bg-amber-600 flex items-center justify-center font-bold text-slate-950 text-sm shrink-0">
              NPF
            </div>
            <div>
              <h1 className="font-bold text-sm sm:text-base tracking-wide text-slate-100">NIPRIS GATEWAY</h1>
              <p className="text-[10px] sm:text-xs text-slate-400">Nigeria Integrated Police Records & Intelligence System</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-[10px] sm:text-xs bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-amber-500 font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold">RESTRICTED ACCESS</span>
          </div>
        </header>
        <main className="p-3 sm:p-6 flex-1 w-full max-w-7xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
