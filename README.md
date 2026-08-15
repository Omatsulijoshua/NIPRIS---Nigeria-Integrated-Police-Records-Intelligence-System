# NIPRIS — Nigeria Integrated Police Records & Intelligence System

[![NIPRIS CI/CD](https://img.shields.io/badge/NIPRIS-Production_Grade-amber.svg)](https://github.com/Omatsulijoshua/NIPRIS---Nigeria-Integrated-Police-Records-Intelligence-System)
[![Build Status](https://img.shields.io/badge/Build-Passing-emerald.svg)](https://github.com/Omatsulijoshua/NIPRIS---Nigeria-Integrated-Police-Records-Intelligence-System)
[![Phases Verified](https://img.shields.io/badge/Phases-25%2F25%20Verified-blue.svg)](https://github.com/Omatsulijoshua/NIPRIS---Nigeria-Integrated-Police-Records-Intelligence-System)

**NIPRIS (Nigeria Integrated Police Records & Intelligence System)** is a production-grade, Nigeria-first enterprise law-enforcement information, criminal record, digital evidence, body-camera, and police intelligence platform built for authorized police personnel across all 36 States + Federal Capital Territory (FCT).

---

## 🏛 System Architecture Overview

NIPRIS is engineered as an enterprise monorepo using NestJS, Next.js 14, Flutter Mobile, Prisma ORM, PostgreSQL, Redis, Docker, Kubernetes, and Terraform.

```
NIPRIS Monorepo Ecosystem
├── apps/
│   ├── backend/        # NestJS REST & OpenAPI API Server (Port 3001)
│   ├── web/            # Next.js 14 Web Portal (Port 3000)
│   └── mobile/         # Flutter Offline-First Patrol Officer App
├── packages/
│   ├── types/          # Shared TypeScript Data Interfaces & Enums
│   ├── permissions/    # ABAC/RBAC Policy Engine & Verification Test Runners
│   └── prisma/         # Master Database Schema & Migrations
├── k8s/                # Kubernetes Deployment, HPA, Ingress & StatefulSet Manifests
├── infra/terraform/    # Infrastructure-as-Code (VPC, EKS, RDS, WORM S3 Vault)
└── Dockerfile.backend / Dockerfile.web / docker-compose.yml
```

---

## 🚀 Key Modules & Feature Sitemap

| Module / Feature | Description | Path |
| :--- | :--- | :--- |
| **Police Command Hierarchy** | 6-Tier Organizational Structure (National HQ down to Stations) | `/organizations` |
| **Officer Auth & MFA** | Role-Based & Attribute-Based Access Control with MFA enforcement | `/auth` |
| **Person Identity System** | National NIN identity resolution & master person records | `/persons` |
| **Incidents & Crime Tracking** | Crime intake, dispatcher assignment, & incident timeline | `/incidents` |
| **Arrests & Detention System** | Administrative arrest booking & legal custody tracking | `/arrests` |
| **Cases & Investigations** | Investigative case management & team assignment | `/cases` |
| **Warrants & Wanted Circulars** | Judicial arrest/search warrants & wanted person circulars | `/warrants` |
| **Digital Evidence Vault** | WORM S3 vault with SHA-256 chain-of-custody tracking | `/evidence` |
| **Bodycam & Dashcam Telemetry**| Real-time video ingestion, GPS tracking & marker tagging | `/bodycam` |
| **Inter-State Sharing** | Cross-state data sharing with emergency overrides | `/inter-state` |
| **Informants & Intelligence** | Encrypted informant true identity & 5x5x5 evaluation | `/intelligence` |
| **Cryptographic Audit Ledger** | SHA-256 block hash chaining & compliance risk scoring | `/audit` |
| **Advanced Analytics & Heatmap**| Biometric facial matching & crime trend forecasting | `/analytics` |
| **Court Integration & NPF 14** | Form NPF 14 charge sheet generator & judicial record locking | `/courts` |
| **Correctional Integration** | NCoS custody transfers, remand warrant tracker & cell capacity alerts | `/custody` |
| **Inter-Agency Data Gateway** | NIMC (NIN), FRSC (DL/VIN), INEC (Voter ID), NIS (Passport) gateways | `/inter-agency` |
| **Public Citizen Services** | Anonymous tip intake, Police Clearance Certificate (PCC Form NPF 11) | `/public` |
| **CAD & Patrol Telemetry** | Computer-Aided Dispatch & Haversine nearest unit recommender | `/cad` |
| **High Availability & Infra** | Kubernetes HPA metrics, edge node sync & container health | `/infra` |
| **Security & Zero-Trust** | AES-256-GCM field encryption, zero-trust guard & pen-test scanner | `/security` |
| **Disaster Recovery & Chaos** | Automated DB snapshots (RPO<15m, RTO<1h) & failover simulator | `/dr` |

---

## 🔒 Strict Legal & Security Guardbands

1. **Law-Enforcement Restricted**: Public criminal background searches are strictly prohibited. Access requires authenticated police session with verified MFA.
2. **Constitutional Guardband**: Clear separation between `ARREST` (administrative custody) and `CONVICTION` (judicial finding of guilt). Arrest records strictly do not imply guilt.
3. **Mandatory Operational Rationale**: Every record query requires a minimum 10-character operational rationale, emitting cryptographic audit entries.
4. **Human-in-the-Loop Biometric Matches**: Facial recognition matches are flagged as `requiresHumanVerification: true` and cannot confirm identity without authorized officer sign-off.
5. **Judicial Order Lock**: Orders like `STAY_OF_PROCEEDINGS` or `JUDICIAL_INJUNCTION` lock criminal case records (`isJudiciallyLocked: true`) against administrative alterations.
6. **Cell Capacity Alerts**: Holding cell occupancy exceeding 85% automatically triggers high-priority `OVERCROWDING_ALERT` flags.

---

## 🛠 Local Setup & Running Instructions

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x
- Docker & Docker Compose

### 1. Install Workspace Dependencies
```bash
npm install
```

### 2. Build Monorepo Packages
```bash
npm run build --workspace=@nipris/types
npm run build --workspace=@nipris/backend
npm run build --workspace=@nipris/web
```

### 3. Run via Docker Compose
```bash
docker-compose up -d
```
- Backend REST & Swagger API: `http://localhost:3001/api/v1` (Swagger docs at `/api/docs`)
- Web Portal: `http://localhost:3000`

---

## 🏆 Complete 25-Phase Verification Roadmap

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

---

## 📄 License & Legal Notice
**NIPRIS (Nigeria Integrated Police Records & Intelligence System)** is proprietary national law enforcement software developed for the Federal Republic of Nigeria. Unauthorized dissemination or access is strictly prohibited under the Cybercrimes (Prohibition, Prevention, etc.) Act.
