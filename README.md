# NIPRIS — Nigeria Integrated Police Records & Intelligence System

[![NIPRIS CI/CD](https://img.shields.io/badge/NIPRIS-Production_Grade-amber.svg)](https://github.com/Omatsulijoshua/NIPRIS---Nigeria-Integrated-Police-Records-Intelligence-System)
[![Build Status](https://img.shields.io/badge/Build-Passing-emerald.svg)](https://github.com/Omatsulijoshua/NIPRIS---Nigeria-Integrated-Police-Records-Intelligence-System)
[![Master Platform](https://img.shields.io/badge/Master_Platform-Phases_0--25_Verified-blue.svg)](https://github.com/Omatsulijoshua/NIPRIS---Nigeria-Integrated-Police-Records-Intelligence-System)
[![Station Module](https://img.shields.io/badge/Station_Module-Phases_1--16_Verified-purple.svg)](https://github.com/Omatsulijoshua/NIPRIS---Nigeria-Integrated-Police-Records-Intelligence-System)
[![Mobile Responsive](https://img.shields.io/badge/UI-Mobile_Responsive-emerald.svg)](https://github.com/Omatsulijoshua/NIPRIS---Nigeria-Integrated-Police-Records-Intelligence-System)

**NIPRIS (Nigeria Integrated Police Records & Intelligence System)** is a production-grade, Nigeria-first enterprise law-enforcement information, criminal records management, digital evidence vault, bodycam telemetry, and police station management platform. Engineered for authorized Nigeria Police Force (NPF) personnel across all 36 States + Federal Capital Territory (FCT).

---

## 🏛 1. System Architecture & Monorepo Layout

NIPRIS is architected as an enterprise monorepo using **NestJS (Node.js/TypeScript)**, **Next.js 14 (App Router)**, **Flutter Mobile**, **Prisma ORM**, **PostgreSQL**, **Redis**, **Docker**, **Kubernetes**, and **Terraform**.

```
NIPRIS Monorepo Ecosystem
├── apps/
│   ├── backend/        # NestJS REST & OpenAPI Server (Port 3001)
│   ├── web/            # Next.js 14 Responsive Web Portal (Port 3000)
│   └── mobile/         # Flutter Offline-First Field Patrol Officer App
├── packages/
│   ├── types/          # Shared TypeScript Interfaces, Enums & DTOs
│   ├── permissions/    # ABAC/RBAC Policy Engine & Automated Verification Runners
│   └── db/ (prisma)    # Master Database Schema & Migrations
├── k8s/                # Kubernetes Deployment, HPA, Ingress & StatefulSet Manifests
├── infra/terraform/    # Infrastructure-as-Code (VPC, EKS, RDS, WORM S3 Vault)
└── Dockerfile.backend / Dockerfile.web / docker-compose.yml
```

---

## 🏢 2. Multi-Level Command Hierarchy & Organizational Structure

NIPRIS strictly models the official 6-tier Nigeria Police Force command structure:

$$\text{Nigeria (National HQ)} \longrightarrow \text{State Command} \longrightarrow \text{Area Command} \longrightarrow \text{Division} \longrightarrow \text{Police Station} \longrightarrow \text{Station Unit} \longrightarrow \text{Officer}$$

- **National Headquarters**: Country-wide record oversight, inter-agency gateways, national intelligence.
- **State Commands (36 States + FCT)**: State CID, inter-station coordination, state analytics.
- **Area Commands & Divisions**: Zonal & divisional operational supervision.
- **Police Stations**: Local ground zero for complaint intake, station diary, holding cells, duty rosters, fleet dispatch, evidence storage, and bodycam local docks.
- **Station Units**: Patrol, CID, Traffic, Desk/GD, Armory, Admin.

---

## 🏬 3. Police Station Management System — 16 Operational Subsystems

The **Police Station Management System** is built as a first-class operational module directly inside NIPRIS. It shares authentication, RBAC/ABAC permissions, officer records, person identities, incident management, cases, warrants, digital evidence, bodycams, audit logging, and notifications without duplication.

```
Station Module Dashboard Sitemap & Navigation Layout (/station/*)
├── /station             # Command Center Master Dashboard & Real-Time Alerts HUD
├── /station/diary       # Digital Station Diary (SDE) - Immutable SHA-256 Log
├── /station/complaints  # Public Complaints Intake, Assignment & Incident Conversion
├── /station/duty        # Shift Schedules & Duty Roster Planner
├── /station/attendance  # Officer Clock-In/Out & Real-Time Status Board
├── /station/custody     # Holding Cell Occupancy & Property Intake Vouchers
├── /station/cases       # Station Case Operations & Prosecution Charge Sheets
├── /station/evidence    # Evidence Room Storage Bins & Barcode Tag Generator
├── /station/bodycam     # Bodycam Local Docking Queue & Unmatched Video Resolver
├── /station/vehicles    # Fleet Vehicles Dispatch & Tactical Armory Sign-Out
├── /station/visitors    # Visitor Kiosk, Task Kanban & Watch Commander Handover
├── /station/officers    # Officer Station Roster & Role Assignments
└── /station/settings    # Station Operational Profile & Holding Cell Configuration
```

### Detailed Breakdown of the 16 Station Phases

1. **Station Architecture & Data Models (`StationPhase1`)**:
   - Extended Prisma schema with 18 operational models (`StationProfile`, `StationUnit`, `StationDiaryEntry`, `StationComplaint`, `DutyShift`, `DutyAssignment`, `OfficerAttendance`, `LocalCustodyRecord`, `CustodyEvent`, `PersonProperty`, `StationStorageLocation`, `StationVehicle`, `VehicleLog`, `StationEquipment`, `EquipmentAssignment`, `StationVisitorLog`, `StationTask`, `StationApprovalRequest`).
2. **Station Organization & Units (`StationPhase2`)**:
   - Configuration of station profiles (LGA, geolocation, holding cell limits), unit creation (Patrol, CID, Traffic, Armory), and station role assignment (`STATION_COMMANDER`, `DESK_OFFICER`, `INVESTIGATING_OFFICER`, `PATROL_OFFICER`, `EVIDENCE_OFFICER`).
3. **Command Center Master Dashboard (`StationPhase3`)**:
   - Role-adaptive dashboard (`/station`) with 8 real-time metric cards (On-Duty Officers, Today Complaints, Currently Detained, Active Investigations, Evidence Intake, Active Bodycams, Fleet Availability), live activity feeds, and urgent operational alert HUD.
4. **Digital Station Diary (`StationPhase4`)**:
   - Digital Station Diary (`SDE-2026-STN001-00912`) replacing traditional paper books. Enforces strict SHA-256 immutability (`✔ IMMUTABLE (v1)`), live text search, and chronological audit timelines.
5. **Complaints Management (`StationPhase5`)**:
   - Complaint intake (`CMP-2026-STN001-00912`) from walk-in citizens or phone, investigator assignment, conversion to formal crime incident (`INC-2026-EDO-00912`), and administrative closure workflows.
6. **Duty Roster & Attendance (`StationPhase6`)**:
   - Shift pattern generator (`DAY`, `EVENING`, `NIGHT`, `PATROL`, `DESK`), officer duty roster assignment, biometric/timestamped clock-in/out attendance, and live officer status board (`ON_PATROL`, `AT_DESK`, `IN_COURT`, `OFF_DUTY`).
7. **Local Station Custody & Property Intake (`StationPhase7`)**:
   - Local detainee booking (`LCD-2026-STN001-00912`), suspect property vouchers (`PROP-2026-STN001-00912`), cell occupancy monitor with >85% overcrowding alerts, and 24h/48h constitutional remand clock countdown.
8. **Case Operations & Workload (`StationPhase8`)**:
   - Case assignment to lead detectives, officer workload monitor, 8-milestone investigation checklist, Police Prosecution Charge Sheet compiler with Station Commander endorsement, and State CID transfer workflows.
9. **Evidence Room & Storage Layout (`StationPhase9`)**:
   - Physical storage layout bins (`STN001-EVDRM-A-RACK02-BIN05`), firearms safes, cold storage units, physical intake (`SEVD-2026-STN001-00912`), barcode tag generation (`BC-SEVD-2026-STN001-00912`), check-out chain-of-custody, and court release/destruct certificates.
10. **Bodycam Station Operations (`StationPhase10`)**:
    - Hardware inventory (`BWC-NPF-EDO-001`), officer shift checkout, station docking auto-upload queue (`DOCK-STN001-01`), SHA-256 verification hash checks, unmatched footage resolver, and station compliance rate reporting.
11. **Vehicles & Tactical Armory (`StationPhase11`)**:
    - Patrol fleet vehicle inventory (`NPF-EDO-001` | Call Sign `PATROL-ALPHA`), dispatch & mileage logger (departure vs arrival odometer), tactical armory weapon sign-out (`AK-NPF-88912` with ammo count check), and defect maintenance alert reports.
12. **Visitors, Tasks & Handover (`StationPhase12`)**:
    - Public visitor check-in kiosk, detainee lawyer access logs, internal task kanban delegation, multi-level administrative approval requests, and Watch Commander end-of-shift signed handover reports (`HND-2026-STN001-001`).
13. **Station Reporting & Analytics (`StationPhase13`)**:
    - Station operational summary reporting engine, crime trends by LGA/sector, officer performance metrics, cell detention duration analytics, and CSV/PDF report exporter.
14. **Mobile Station Integration (`StationPhase14`)**:
    - RESTful mobile sync endpoints for the Flutter companion app supporting offline-first station diary entry drafting, patrol status updates, and barcode scanning.
15. **Security & Station Isolation (`StationPhase15`)**:
    - ABAC multi-tenancy isolation tests ensuring officers from Station A cannot view un-shared local records of Station B without explicit inter-station authorization.
16. **Performance & Capacity Load (`StationPhase16`)**:
    - High-concurrency load testing verifying sub-100ms API response times under simulated peak station operational traffic across multiple divisions.

---

## 📱 4. Mobile Responsiveness & UI/UX Architecture

The NIPRIS Next.js 14 Web Portal (`apps/web`) is built with Tailwind CSS to deliver a **fluid, mobile-first responsive layout**:
- **Mobile Viewports (< 640px)**: Collapsible hamburger menu, single-column dashboard cards, touch-optimized button targets, and scrollable data tables.
- **Tablet Viewports (640px - 1024px)**: 2-column adaptive grid cards and compact navigation bars.
- **Desktop Viewports (> 1024px)**: Full multi-column dashboard, side-by-side activity feeds, and persistent horizontal sub-module navigation tabs.

---

## 🔒 5. Security, Compliance & Legal Guardbands

1. **Law-Enforcement Restricted**: Access strictly requires authenticated police session with verified Multi-Factor Authentication (MFA). Public access is restricted to anonymous tip filing and PCC application checks.
2. **Constitutional Guardband**: Enforces strict legal distinction between `ARREST` (administrative custody) and `CONVICTION` (judicial finding of guilt). Arrest records strictly do not imply guilt.
3. **Mandatory Operational Rationale**: Every sensitive query requires a minimum 10-character operational rationale, emitting immutable audit entries to the SHA-256 audit ledger.
4. **Human-in-the-Loop Biometrics**: Facial recognition candidate matches are flagged as `requiresHumanVerification: true` and cannot confirm identity without authorized officer sign-off.
5. **Judicial Order Lock**: Orders such as `STAY_OF_PROCEEDINGS` or `JUDICIAL_INJUNCTION` lock criminal case records (`isJudiciallyLocked: true`) against administrative tampering.
6. **Holding Cell Overcrowding Alerts**: Cell occupancy exceeding station holding capacity automatically triggers high-priority `OVERCROWDING_ALERT` flags to the Station Commander.

---

## 🛠 6. Setup, Installation & Running Instructions

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x
- Docker & Docker Compose

### 1. Install Dependencies
```bash
npm install
```

### 2. Build Monorepo Workspaces
```bash
npm run build --workspace=@nipris/types
npm run build --workspace=@nipris/backend
npm run build --workspace=@nipris/web
```

### 3. Run Station Phase Verification Test Suite
```bash
# Run Station Phase 12 Verification
npx ts-node packages/permissions/src/test-station-phase12.ts

# Run Station Phase 11 Verification
npx ts-node packages/permissions/src/test-station-phase11.ts
```

### 4. Run via Docker Compose
```bash
docker-compose up -d
```
- **Backend Swagger API**: `http://localhost:3001/api/v1` (Swagger Docs at `/api/docs`)
- **Responsive Web Portal**: `http://localhost:3000`

---

## 🏆 7. Master Platform & Station Module Verification Status

### Master Platform Roadmap (Phases 0 - 25) — VERIFIED & COMPLETED
- [x] **Phase 0**: Monorepo Architecture & Data Models
- [x] **Phase 1**: RBAC/ABAC Security & Access Control Policy Engine
- [x] **Phase 2**: Person Identity & Master Person Index System
- [x] **Phase 3**: Incident Management & Crime Intake Subsystem
- [x] **Phase 4**: Arrest, Custody & Detention Management Subsystem
- [x] **Phase 5**: Criminal Case & Investigative Subsystem
- [x] **Phase 6**: Warrants, Search Orders & Wanted Persons Subsystem
- [x] **Phase 7**: Digital Evidence & Chain-of-Custody Subsystem
- [x] **Phase 8**: Body-Worn Camera & Dashcam Telemetry Subsystem
- [x] **Phase 9**: Inter-State Law Enforcement Data Sharing Subsystem
- [x] **Phase 10**: Confidential Informants & Intelligence Subsystem
- [x] **Phase 11**: Cryptographic Audit Ledger & Compliance Engine
- [x] **Phase 12**: Advanced Analytics, Heatmaps & Biometric Search
- [x] **Phase 13**: Mobile Police Field Application
- [x] **Phase 14**: Court & Judicial Integration System (Form NPF 14)
- [x] **Phase 15**: Correctional & Detention Center Integration (NCoS)
- [x] **Phase 16**: Inter-Agency & External Data Gateway (NIMC, FRSC, INEC, NIS)
- [x] **Phase 17**: Public Citizen & Police Services Portal (PCC Form NPF 11)
- [x] **Phase 18**: Computer-Aided Dispatch (CAD) & Patrol Telemetry
- [x] **Phase 19**: High Availability, Cloud-Native & Hybrid Infrastructure
- [x] **Phase 20**: Security Audit, Hardening & Zero-Trust
- [x] **Phase 21**: Disaster Recovery, Backup & Resilience Testing
- [x] **Phase 22**: System Health & Readiness Probes
- [x] **Phase 23**: Automated Penetration Test & Vulnerability Scanner
- [x] **Phase 24**: Store-and-Forward Offline Queue Replay
- [x] **Phase 25**: Final Master System Handover & Verification Release

### Police Station Management Module (Phases 1 - 16) — VERIFIED & COMPLETED
- [x] **Station Phase 1**: Station Architecture & Prisma Operational Models
- [x] **Station Phase 2**: Station Organization, Units & Officer Assignments
- [x] **Station Phase 3**: Command Center Master Dashboard & Real-Time Alerts HUD
- [x] **Station Phase 4**: Digital Station Diary (SDE) & Immutability Engine
- [x] **Station Phase 5**: Public Complaints Management & Incident Conversion
- [x] **Station Phase 6**: Duty Roster Scheduling & Officer Clock-In Attendance
- [x] **Station Phase 7**: Local Custody Intake, Property Vouchers & Remand Clock
- [x] **Station Phase 8**: Case Operations, Investigator Workload & Prosecution Sheet
- [x] **Station Phase 9**: Evidence Room Bins, Barcode Tagging & Chain of Custody
- [x] **Station Phase 10**: Bodycam Local Docking, SHA-256 Hash & Video Linker
- [x] **Station Phase 11**: Fleet Vehicles Dispatch, Armory Sign-Out & Defect Alerts
- [x] **Station Phase 12**: Visitors Kiosk, Task Delegation & Watch Commander Handover
- [x] **Station Phase 13**: Station Reporting Analytics Engine
- [x] **Station Phase 14**: Mobile Station Integration (Flutter Sync)
- [x] **Station Phase 15**: Security Station Isolation & Multi-Tenancy Testing
- [x] **Station Phase 16**: Performance Concurrent Load & Capacity Benchmark

---

## 📄 8. License & Legal Notice

**NIPRIS (Nigeria Integrated Police Records & Intelligence System)** is proprietary national law enforcement software developed for the Federal Republic of Nigeria. Unauthorized dissemination, reverse engineering, or unauthenticated access is strictly prohibited under the Cybercrimes (Prohibition, Prevention, etc.) Act.
