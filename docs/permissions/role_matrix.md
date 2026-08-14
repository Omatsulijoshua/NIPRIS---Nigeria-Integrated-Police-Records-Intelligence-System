# NIPRIS — Role Hierarchy & Responsibilities Matrix

NIPRIS implements 14 distinct granular officer and administrative roles. Separation of powers is strictly enforced: infrastructure administrators are barred from reading criminal records without operational escalation, while operational officers cannot alter system or security configurations.

---

## 1. Granular Role Architecture (Levels 0 – 14)

### LEVEL 0 — NATIONAL SYSTEM SUPER ADMIN
- **Target Persona**: Platform Infrastructure Engineers / Systems Architects.
- **Scope**: Platform-wide infrastructure configuration, security parameters, system health, organization topology management.
- **Restrictions**: **Does NOT automatically have access to criminal records or case evidence**.

### LEVEL 1 — NATIONAL COMMAND ADMIN
- **Target Persona**: Inspector General of Police (IGP) Directorate / National HQ Command Staff.
- **Scope**: National statistical overview, nationwide active incidents, wanted/missing persons, cross-state operational alerts, agency data-sharing policies.
- **Dashboard**: National Command Center view.

### LEVEL 2 — STATE COMMAND ADMIN
- **Target Persona**: State Commissioner of Police (CP) / State Command Admins.
- **Scope**: Single State Command primary jurisdiction (e.g., Edo State Command). State-level incidents, arrests, active cases, officers, stations, bodycam compliance.
- **Restrictions**: Cannot open restricted out-of-state records without cross-state policy clearance.

### LEVEL 3 — AREA COMMAND ADMIN
- **Target Persona**: Area Commander (ACP).
- **Scope**: Area Command jurisdiction encompassing multiple Divisions and Police Stations.
- **Dashboard**: Area operational metrics, station readiness, active area warrants and cases.

### LEVEL 4 — DIVISION ADMIN
- **Target Persona**: Divisional Police Officer (DPO) / Division Admin.
- **Scope**: Divisional jurisdiction encompassing assigned police stations and units.
- **Dashboard**: Division incident queues, duty rosters, arrest logs, evidence intake summaries.

### LEVEL 5 — STATION COMMANDER
- **Target Persona**: Station Officer-in-Charge (Station Commander).
- **Scope**: Single Police Station operational domain.
- **Dashboard**: Daily incident queue, officers on duty, lockup/custody roster, bodycam checkout status, pending officer reports.

### LEVEL 6 — INVESTIGATING OFFICER
- **Target Persona**: Detectives / CID Investigators / Case Leads.
- **Scope**: Assigned cases, related person profiles, interviews, search warrants, physical & digital evidence management.
- **Dashboard**: "My Cases", assigned active investigations, evidence review timeline.

### LEVEL 7 — PATROL OFFICER
- **Target Persona**: Field Patrol Officers / Traffic / Response Units.
- **Scope**: Field assignments, active incident response, identity verification queries, wanted/missing person alerts, bodycam recording.
- **Dashboard**: Mobile Patrol dashboard, active duty status, quick identity lookup.

### LEVEL 8 — EVIDENCE OFFICER
- **Target Persona**: Police Property & Evidence Vault Custodians.
- **Scope**: Evidence intake, physical storage location tagging, digital evidence ingestion, chain-of-custody transfers, authorized court exports.
- **Dashboard**: Evidence Vault Intake & Management console.

### LEVEL 9 — BODYCAM / DEVICE ADMIN
- **Target Persona**: Technical Logistics & Bodycam Fleet Managers.
- **Scope**: Camera registration, firmware management, officer device binding, upload queue status, battery health monitoring.
- **Restrictions**: Technical device management only; cannot alter video content or delete footage.

### LEVEL 10 — FORENSIC / BIOMETRIC OFFICER
- **Target Persona**: Fingerprint & Facial Biometric Examiners.
- **Scope**: Biometric sample comparison, identity verification processing, candidate match evaluation.
- **Restrictions**: Biometric searches require documented operational authorization case reference.

### LEVEL 11 — AUDITOR
- **Target Persona**: Independent Oversight / Inspectorate / Compliance Officers.
- **Scope**: Read-only access to audit logs, search query logs, user session events, evidence access logs.
- **Restrictions**: **Strictly Read-Only**. Cannot modify or create any criminal records, user accounts, or evidence.

### LEVEL 12 — INTERNAL AFFAIRS / PROFESSIONAL STANDARDS (IA)
- **Target Persona**: Professional Standards Unit (PSU) / Internal Affairs Investigators.
- **Scope**: Officer misconduct investigations, access violation alerts, suspicious search pattern analysis, evidence tampering investigations.
- **Auditability**: IA activity itself is logged in an unalterable audit vault.

### LEVEL 13 — COURT / PROSECUTION INTEGRATION ROLE
- **Target Persona**: Authorized Police Prosecutors / State Counsel.
- **Scope**: Controlled read-only access to finalized case files, court-approved evidence metadata, charge sheets, witness statements.
- **Restrictions**: Restricted to specific prosecution case assignments. No general police intelligence access.

### LEVEL 14 — READ-ONLY AUTHORIZED VIEWER
- **Target Persona**: External Authorized Law Enforcement Liaison Officers.
- **Scope**: Viewing specifically shared case records or incident files explicitly granted via authorization tokens.
- **Restrictions**: Read-only, no export rights, no record modification.
