'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function StationLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const stationNavItems = [
    { label: '📊 Command HUD', href: '/station' },
    { label: '📖 Station Diary', href: '/station/diary' },
    { label: '📝 Complaints', href: '/station/complaints' },
    { label: '📅 Duty Roster', href: '/station/duty' },
    { label: '⏱ Attendance', href: '/station/attendance' },
    { label: '🔒 Custody & Cells', href: '/station/custody' },
    { label: '📂 Case Operations', href: '/station/cases' },
    { label: '📦 Evidence Room', href: '/station/evidence' },
    { label: '📹 Bodycam Ops', href: '/station/bodycam' },
    { label: '🚔 Vehicles & Armory', href: '/station/vehicles' },
    { label: '📋 Visitors & Tasks', href: '/station/visitors' },
    { label: '👮 Officers Roster', href: '/station/officers' },
    { label: '⚙ Settings', href: '/station/settings' },
  ];

  return (
    <div className="space-y-4 font-mono text-xs">
      {/* Mobile Station Module Header & Dropdown Trigger */}
      <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-amber-500 font-bold text-sm sm:text-base">🏛 NIPRIS STATION MODULE</span>
            <span className="px-2 py-0.5 bg-slate-800 text-slate-300 font-bold rounded text-[10px]">STN-EDO-BENIN-CENTRAL</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden px-3 py-1 bg-slate-900 border border-slate-700 text-amber-500 rounded font-bold"
          >
            {mobileMenuOpen ? '✕ Close' : '☰ Station Menu'}
          </button>
        </div>

        {/* Desktop Horizontal Scroll Navigation */}
        <div className="hidden md:flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
          {stationNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded transition font-bold whitespace-nowrap text-[11px] ${
                  isActive
                    ? 'bg-amber-600 text-slate-950 shadow-md'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-slate-100 border border-slate-800'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border border-slate-800 rounded-lg p-3 grid grid-cols-2 gap-2 animate-fadeIn">
          {stationNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2.5 rounded font-bold text-center text-[11px] transition ${
                  isActive
                    ? 'bg-amber-600 text-slate-950'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}

      {/* Page Content Container */}
      <div className="w-full">{children}</div>
    </div>
  );
}
