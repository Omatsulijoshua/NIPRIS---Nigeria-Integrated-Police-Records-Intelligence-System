# NIPRIS — Threat Model & Security Architecture

## 1. STRIDE Threat Analysis Framework

| Threat Category | Potential Attack Vector | NIPRIS Mitigation Strategy |
| :--- | :--- | :--- |
| **Spoofing** | Compromised officer credentials or stolen device. | Mandatory TOTP MFA, hardware key binding, device registration fingerprinting, session IP binding. |
| **Tampering** | Alteration of arrest records, evidence files, or bodycam footage. | Versioned record history (no hard-delete), SHA-256 evidence hashing upon upload, immutable audit logs. |
| **Repudiation** | Officer denying performing an unauthorized search or record edit. | Cryptographic append-only audit trail logging Officer ID, IP, device ID, timestamp, exact parameters, and outcome. |
| **Information Disclosure** | Unauthorized cross-state search, IDOR on person profiles, leaked evidence URLs. | RBAC + ABAC enforcement, short-lived signed S3 URLs (15-min limit), access watermarking, no public endpoints. |
| **Denial of Service** | Volumetric API flooding or bulk evidence download requests. | Redis-backed sliding-window rate limiting per IP/Officer, file transfer bandwidth caps, async queue decoupling. |
| **Elevation of Privilege**| Patrol officer manipulating JWT tokens to gain National Admin privileges. | Cryptographically signed JWT tokens (RS256), server-side permission re-evaluation on every request, no role trust from payload. |

---

## 2. High-Risk Law Enforcement Attack Vectors

### 2.1 Unauthorized Record Snooping / Stalking
- **Risk**: Internal rogue officers querying records of public figures, political figures, relatives, or personal contacts without operational purpose.
- **Mitigation**:
  - Mandatory operational purpose input before opening restricted person files.
  - Machine-learning & heuristic anomaly detection flagging high-frequency or off-duty queries.
  - Internal Affairs (IA) dashboard with automated alerts for unusual search patterns.

### 2.2 Direct Object Reference (IDOR) on Evidence & Bodycam Streams
- **Risk**: Altering evidence ID parameter in API calls (`GET /api/v1/evidence/EVID-9999/download`) to fetch unauthorized video.
- **Mitigation**:
  - `EvidenceAccessGuard` checks assigned case ID, officer command jurisdiction, and active warrant/case assignment before yielding a presigned URL.

### 2.3 Evidence Tampering & Overwriting
- **Risk**: Officer attempts to upload a modified video over original bodycam footage to conceal misconduct.
- **Mitigation**:
  - Read-only storage bucket policy after initial upload completion.
  - Immutability enforced via Object Lock (WORM - Write Once Read Many).
  - Pre-upload SHA-256 and post-ingestion SHA-256 validation.

### 2.4 Unverified Facial Recognition Matching
- **Risk**: Reliance on automated facial matching leads to wrongful arrest or detention.
- **Mitigation**:
  - Application logic forces status `CANDIDATE_MATCH` requiring human forensic officer verification (`CONFIRMED_IDENTITY` status) before any operational enforcement output.

---

## 3. Data Protection & Encryption Controls

### 3.1 Encryption in Transit
- Mandatory TLS 1.3 for all web, mobile, and API traffic.
- HTTP Strict Transport Security (HSTS) with 1-year duration and `includeSubDomains; preload`.

### 3.2 Encryption at Rest
- **Database**: PostgreSQL transparent data encryption (TDE) and application-level AES-256-GCM encryption for sensitive fields (e.g., NIN, phone numbers, biometric reference templates).
- **Object Storage**: S3 Server-Side Encryption with Customer-Managed Keys (SSE-KMS) rotated annually.

### 3.3 Zero-Trust Secret Management
- Secrets stored in HashiCorp Vault / AWS Secrets Manager.
- Zero secret credentials in git source code or frontend client builds.
