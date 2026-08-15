'use client';

import { useState } from 'react';

export default function StationVisitorsTasksPage() {
  const [visitors, setVisitors] = useState([
    { number: 'VST-2026-STN001-00912', name: 'Barrister Nnamdi Kanu', NIN: 'NIN-99201920192', reason: 'LEGAL_COUNSEL', badge: 'BDG-045', checkIn: '30 mins ago', status: 'ACTIVE' },
  ]);

  const [tasks, setTasks] = useState([
    { number: 'TASK-2026-STN001-001', title: 'Conduct Crime Scene Canvas at Ring Road', officer: 'Sgt Monday Usifo (NPF-66120)', priority: 'HIGH', status: 'IN_PROGRESS' },
    { number: 'TASK-2026-STN001-002', title: 'Secure CCTV Footage from Bank of Industry', officer: 'Insp Grace Enagbare (NPF-94102)', priority: 'NORMAL', status: 'TODO' },
  ]);

  const [approvals, setApprovals] = useState([
    { number: 'APP-2026-STN001-001', category: 'FIREARM_RELEASE', officer: 'Sgt Monday Usifo', justification: 'AK-47 release for VIP escort to Asaba', status: 'PENDING' },
  ]);

  const handleCheckoutVisitor = (vstNum: string) => {
    setVisitors(visitors.map((v) => (v.number === vstNum ? { ...v, status: 'CHECKED_OUT' } : v)));
    alert(`✔ Visitor ${vstNum} checked out cleanly!`);
  };

  const handleActionApproval = (appNum: string, action: 'APPROVED' | 'REJECTED') => {
    setApprovals(approvals.map((a) => (a.number === appNum ? { ...a, status: action } : a)));
    alert(`✔ Approval Request ${appNum} actioned as ${action}!`);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">📋 VISITORS, TASK DELEGATION & WATCH HANDOVER</h2>
          <p className="text-xs text-slate-400">Visitor check-in kiosk, detainee lawyer access logs, internal task kanban, & Watch Commander handover.</p>
        </div>
      </div>

      {/* Visitors Check-In Board */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">STATION VISITOR LOG & DETAINEE VISITATION</h3>
        <div className="space-y-3">
          {visitors.map((v) => (
            <div key={v.number} className="p-4 bg-slate-950 border border-slate-800 rounded flex justify-between items-center">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-amber-400 text-sm">{v.number}</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-300 font-bold rounded text-[10px]">{v.reason}</span>
                  <span className="px-2 py-0.5 bg-indigo-950 text-indigo-300 border border-indigo-800 font-bold rounded text-[9px]">{v.badge}</span>
                </div>
                <div className="text-slate-100 font-bold text-xs">{v.name} ({v.NIN})</div>
                <div className="text-[10px] text-slate-400">Checked In: {v.checkIn}</div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-0.5 font-bold rounded text-[10px] ${v.status === 'ACTIVE' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'}`}>
                  {v.status}
                </span>
                {v.status === 'ACTIVE' && (
                  <button
                    onClick={() => handleCheckoutVisitor(v.number)}
                    className="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded text-[10px]"
                  >
                    👋 Check Out Visitor
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Kanban Delegation */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">INTERNAL WORK TASK DELEGATION KANBAN</h3>
        <div className="grid grid-cols-2 gap-4">
          {tasks.map((t) => (
            <div key={t.number} className="p-4 bg-slate-950 border border-slate-800 rounded space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-amber-500">{t.number}</span>
                <span className="px-2 py-0.5 bg-red-950 text-red-400 border border-red-800 font-bold rounded text-[9px]">{t.priority}</span>
              </div>
              <div className="text-slate-100 font-bold text-xs">{t.title}</div>
              <div className="text-[10px] text-slate-400">Assigned: <span className="text-amber-400 font-bold">{t.officer}</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* Administrative Approval Queue */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">STATION ADMINISTRATIVE APPROVAL QUEUE</h3>
        <div className="space-y-3">
          {approvals.map((a) => (
            <div key={a.number} className="p-4 bg-slate-950 border border-slate-800 rounded flex justify-between items-center">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-amber-400">{a.number}</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-300 font-bold rounded text-[10px]">{a.category}</span>
                </div>
                <div className="text-slate-100 font-bold text-xs">{a.justification}</div>
                <div className="text-[10px] text-slate-400">Requestor: <span className="text-slate-200 font-bold">{a.officer}</span></div>
              </div>
              {a.status === 'PENDING' ? (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleActionApproval(a.number, 'APPROVED')}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded text-[10px]"
                  >
                    ✔ Approve
                  </button>
                  <button
                    onClick={() => handleActionApproval(a.number, 'REJECTED')}
                    className="px-3 py-1 bg-red-950 hover:bg-red-900 text-red-400 border border-red-800 font-bold rounded text-[10px]"
                  >
                    ❌ Reject
                  </button>
                </div>
              ) : (
                <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold rounded text-[10px]">
                  {a.status}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
