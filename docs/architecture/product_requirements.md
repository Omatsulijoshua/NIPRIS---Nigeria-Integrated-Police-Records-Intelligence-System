# NIPRIS — Product Requirements Document (PRD)

## 1. System Vision & Purpose
**NIPRIS (Nigeria Integrated Police Records Intelligence System)** is an enterprise, high-security, Nigeria-first law-enforcement information platform designed to provide authorized police personnel and law-enforcement officers with controlled access to criminal records, person master profiles, incidents, arrests, cases, warrants, missing/wanted persons, digital evidence, bodycam recordings, and cross-state criminal intelligence.

### Key Mandate & Guardrails
- **Restricted Law Enforcement Access Only**: Strictly intended for authenticated, authorized law-enforcement personnel. **No public-facing criminal history lookup exists**.
- **Nigeria-First Design**: Modeled specifically for the Nigerian organizational structure (National HQ, State Commands, FCT, Area Commands, Divisions, Stations, Units) and Nigerian legal compliance (Nigeria Data Protection Act - NDPA).
- **Zero-Trust & Complete Auditability**: Every search, record view, record mutation, evidence access, and login attempt is cryptographically logged and auditable.
- **Architectural Inspiration**: Architecturally inspired by modern enterprise law-enforcement systems (e.g., U.S. CJIS/NGI/III principles of record isolation, central index routing, and strict identity verification), but **has no affiliation with, connection to, or replica status of any foreign government system**.

---

## 2. Core Functional Requirements

### 2.1 Organizational & Hierarchy Management
- Configurable multi-tier organizational tree:
  - **Level 1**: National Headquarters / Directorate
  - **Level 2**: State Commands (36 States) + FCT Command
  - **Level 3**: Area Commands
  - **Level 4**: Divisions
  - **Level 5**: Police Stations
  - **Level 6**: Units & Departments (e.g., CID, Cybercrime, Traffic, Forensics, Evidence, Command & Control)
- Dynamic creation of specialized formations and administrative jurisdiction boundaries.

### 2.2 User Provisioning & Officer Identity
- Administrative provisioning only (no public or self-registration).
- Attributes: Officer ID, Rank, Department, Command/Division/Station, Role, Employment Status, Contact Details, MFA Status, Assigned Devices.
- Suspended, terminated, expired, or locked accounts immediately lose all system access.

### 2.3 Person Master Record & Identity Resolution
- Master Person Index containing legal identity, aliases, DOB, photograph, biometric references (fingerprint hash/template), and linked records.
- **Identity Resolution**: Multi-criteria matching engine returning `MATCH`, `POSSIBLE MATCH`, or `NO MATCH`.
- **Facial/Biometric Rule**: Candidate matches from automated biometric systems **MUST NEVER** be treated as confirmed identities without human verification.

### 2.4 Incident Management
- Incident creation, tagging (type, location, coordinates, reporting/responding officers, victims, witnesses, vehicles, evidence).
- Visual status workflow (`Reported` → `Dispatched` → `Responding` → `On Scene` → `Under Investigation` → `Closed` → `Reopened`).

### 2.5 Arrest & Booking Subsystem
- Full arrest records: Arresting Officer, Station, Date/Time, Location, Legal Basis, Charges, Booking Data, Custody & Bail Status.
- **Legal Distinction Enforced**: Interface & database strictly separate `ARREST`, `CHARGE`, `PROSECUTION`, `CONVICTION`, `ACQUITTAL`, `DISMISSED`, `PENDING`, and `RELEASED`. An arrest record never implies guilt or conviction.

### 2.6 Case Management
- Case file structure binding Incidents, Arrests, Persons, Charges, Evidence, Interviews, Warrants, Court Records, and Timeline.
- Visual case timeline and disposition tracking.

### 2.7 Warrants, Wanted & Missing Persons
- **Warrants**: Active, Executed, Cancelled, Expired, Suspended states with issuing authority and charge tracking.
- **Wanted Persons**: Photograph, alert classification, risk level, jurisdiction, active warrants.
- **Missing Persons**: Identifying details, reporting agency, last known location, associated evidence.

### 2.8 Cross-State Search Architecture
- Controlled central national index determining record locations across state jurisdictions.
- Officers perform searches with mandatory purpose documentation.
- Policy engine validates permissions before disclosing record summaries or detailed files. Unpermitted cross-state access attempts fail and generate security alerts.

### 2.9 Digital Evidence & Body-Worn Camera Subsystem
- **Digital Evidence**: Secure intake for video, audio, image, PDF, and forensic files with SHA-256 checksum hashing, virus scanning, signed URL delivery, and automated retention lifecycle.
- **Bodycam Workflow**: Device registration, officer assignment, recording ingestion, tamper-evident hashing, chain of custody logging, and watermark-embedded secure web playback.

### 2.10 Mobile Officer Application
- Flutter application tailored for Android patrol devices (and iOS compatible).
- Features: Login, MFA, Duty Status, Person Lookup, Warrants, Wanted/Missing Alerts, Incident Reporting, Bodycam status, encrypted offline storage.

### 2.11 Immutable Audit & Security Anomaly Detection
- Append-only audit table logging every read, search, write, export, login, and authorization check.
- Anomaly monitoring flagging excessive searches, off-jurisdiction queries, and bulk downloads for human internal affairs review.

---

## 3. Non-Functional Requirements (NFRs)

| Category | Requirement | Target Metric |
| :--- | :--- | :--- |
| **Performance** | API Response Time (95th percentile) | < 200ms for single record lookups; < 500ms for complex searches |
| **Scalability** | Active Concurrent Officers | Support 100,000+ registered officers, 10,000 concurrent active sessions |
| **Availability** | System Uptime SLA | 99.9% uptime (24/7/365 operational availability) |
| **Security** | Data Encryption | AES-256 at rest (DB + S3), TLS 1.3 in transit |
| **Audit Log Integrity**| Log Retention & Immutability | Minimum 7 years retention, write-once append-only storage |
| **Video Playback** | Stream Ingestion & Delivery | Adaptive bitrate HLS streaming with custom access watermarking |

---

## 4. Compliance & Legal Framework
- **Nigeria Data Protection Act (NDPA)**: Lawful basis for processing law-enforcement data, minimization, strict purpose limitation, and data subject privacy protections within statutory law enforcement exemptions.
- **Evidence Act (Nigeria)**: Digital chain-of-custody tracking, cryptographic hash verification, and certified electronic record reporting for court admissibility.
