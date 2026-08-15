'use client';

import { useState } from 'react';

export default function StationCaseOperationsPage() {
  const [workload] = useState({
    officerName: 'DSP Chidi Okonkwo (NPF-77319)',
    activeCasesCount: 3,
    pendingTasksCount: 4,
    overdueActionsCount: 1,
    avgInvestigationDays: 5.2,
  });

  const [cases, setCases] = useState([
    {
      caseId: 'cas_edo_001',
      caseNumber: 'CAS-2026-EDO-00912',
      title: 'State vs Osagie Efe (Armed Robbery at Ring Road)',
      leadOfficer: 'DSP Chidi Okonkwo',
      assignedDate: '3 days ago',
      checklist: {
        CRIME_SCENE_VISITED: true,
        WITNESSES_INTERVIEWED: true,
        SUSPECT_INTERVIEWED: true,
        EVIDENCE_COLLECTED: true,
        FORENSICS_REQUESTED: false,
        LEGAL_REVIEW_DONE: true,
        PROSECUTION_FILE_COMPILED: true,
        COURT_DATE_SET: false,
      },
      prosecutionSheetCompiled: true,
    },
  ]);

  const [showTransferModal, setShowTransferModal] = useState(false);
  const [targetLevel, setTargetLevel] = useState('STATE_CID');
  const [transferReason, setTransferReason] = useState('');

  const handleToggleChecklist = (caseId: string, itemKey: string) => {
    setCases(
      cases.map((c) => {
        if (c.caseId === caseId) {
          const current = (c.checklist as any)[itemKey];
          return {
            ...c,
            checklist: { ...c.checklist, [itemKey]: !current },
          };
        }
        return c;
      })
    );
  };

  const handleTransferCase = () => {
    if (!transferReason) return;
    alert(`✔ Case transferred to ${targetLevel} cleanly! Audit trail logged.`);
    setShowTransferModal(false);
    setTransferReason('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-mono text-xs">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-amber-500">📁 STATION CASE OPERATIONS & WORKLOAD MANAGEMENT</h2>
          <p className="text-xs text-slate-400">Investigator workload metrics, investigation milestone checklists, prosecution sheets, & State CID transfers.</p>
        </div>
      </div>

      {/* Investigator Workload HUD */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-2">
          <h3 className="font-bold text-slate-200">INVESTIGATING OFFICER WORKLOAD MONITOR</h3>
          <span className="text-amber-400 font-bold">{workload.officerName}</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-1">
            <div className="text-[10px] text-slate-500">ACTIVE CASES</div>
            <div className="text-amber-400 font-bold text-xl">{workload.activeCasesCount} Assigned</div>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-1">
            <div className="text-[10px] text-slate-500">PENDING TASKS</div>
            <div className="text-slate-100 font-bold text-xl">{workload.pendingTasksCount} Tasks</div>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-1">
            <div className="text-[10px] text-slate-500">OVERDUE ACTIONS</div>
            <div className="text-red-400 font-bold text-xl">{workload.overdueActionsCount} Overdue</div>
          </div>
          <div className="p-4 bg-slate-950 border border-slate-800 rounded space-y-1">
            <div className="text-[10px] text-slate-500">AVG INVESTIGATION TIME</div>
            <div className="text-emerald-400 font-bold text-xl">{workload.avgInvestigationDays} Days</div>
          </div>
        </div>
      </div>

      {/* Case Operations Ledger */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-lg space-y-4">
        <h3 className="font-bold text-slate-200 border-b border-slate-800 pb-2">ACTIVE INVESTIGATION CASES</h3>
        <div className="space-y-6">
          {cases.map((c) => (
            <div key={c.caseId} className="p-4 bg-slate-950 border border-slate-800 rounded space-y-3">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <div>
                  <span className="font-bold text-amber-500 text-sm">{c.caseNumber}</span>
                  <div className="text-slate-100 font-bold text-xs">{c.title}</div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowTransferModal(true)}
                    className="px-3 py-1 bg-indigo-900 hover:bg-indigo-800 text-indigo-200 border border-indigo-700 font-bold rounded text-[10px]"
                  >
                    ↗ Transfer to State CID
                  </button>
                </div>
              </div>

              {/* Investigation Checklist Grid */}
              <div className="space-y-2">
                <div className="text-[10px] text-slate-400 font-bold">INVESTIGATION MILESTONES CHECKLIST:</div>
                <div className="grid grid-cols-4 gap-2">
                  {Object.entries(c.checklist).map(([key, isDone]) => (
                    <button
                      key={key}
                      onClick={() => handleToggleChecklist(c.caseId, key)}
                      className={`p-2 rounded border text-left flex items-center justify-between font-bold text-[10px] ${isDone ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-500'}`}
                    >
                      <span>{key.replace(/_/g, ' ')}</span>
                      <span>{isDone ? '✔' : '⏳'}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prosecution Charge Sheet Box */}
              <div className="p-3 bg-slate-900 border border-slate-800 rounded space-y-1 text-[10px]">
                <div className="flex justify-between items-center text-amber-400 font-bold border-b border-slate-800 pb-1">
                  <span>POLICE PROSECUTION CHARGE SHEET</span>
                  <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded">ENDORSED BY STATION COMMANDER</span>
                </div>
                <div className="text-slate-300">Charges: <span className="text-slate-100 font-bold">Section 312 Criminal Code Act (Armed Robbery)</span></div>
                <div className="text-slate-300">IO Recommendation: <span className="text-slate-100 font-bold">Immediate arraignment before Magistrate Court 1 Benin City.</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Transfer Modal */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg w-full max-w-lg space-y-4">
            <h3 className="text-lg font-bold text-amber-500 border-b border-slate-800 pb-2">TRANSFER CASE TO HIGHER COMMAND / CID</h3>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">TARGET COMMAND LEVEL</label>
              <select
                value={targetLevel}
                onChange={(e) => setTargetLevel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-amber-400 font-bold"
              >
                <option value="STATE_CID">Edo State CID (Benein City)</option>
                <option value="FCID">Force CID (FCID Abuja / Annex Lagos)</option>
                <option value="AREA_COMMAND">Oredo Area Command</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] text-slate-400 mb-1">REASON FOR CASE TRANSFER</label>
              <textarea
                rows={3}
                value={transferReason}
                onChange={(e) => setTransferReason(e.target.value)}
                placeholder="State reasons for transferring case file..."
                className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-slate-100 font-bold"
              />
            </div>
            <div className="flex space-x-3 pt-2">
              <button
                onClick={handleTransferCase}
                className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-slate-100 font-bold rounded"
              >
                Approve & Execute Case Transfer
              </button>
              <button
                onClick={() => setShowTransferModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded border border-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
