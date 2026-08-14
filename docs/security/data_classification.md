# NIPRIS — Data Classification Model & Access Rules

## 1. Data Classification Levels

NIPRIS establishes 7 distinct data classification tiers. Every record, table field, file attachment, and search parameter in the system is assigned to one of these levels:

```
[LEVEL 7: SEALED]                -> Highest sensitivity (Court-ordered expungements, protected witnesses)
[LEVEL 6: BIOMETRIC_RESTRICTED]   -> Raw fingerprint templates, facial biometric embeddings
[LEVEL 5: EVIDENCE_RESTRICTED]    -> Raw bodycam video, forensic evidence files, audio recordings
[LEVEL 4: HIGHLY_RESTRICTED]     -> Active undercover intelligence, IA investigation files
[LEVEL 3: LAW_ENFORCEMENT_RESTRICTED] -> Arrest records, warrant details, case files, incident reports
[LEVEL 2: INTERNAL]              -> Command structures, officer rosters, station metadata, device logs
[LEVEL 1: PUBLIC]                -> Fictional press releases, public missing person alerts (explicitly authorized)
```

---

## 2. Classification Matrix & Handling Controls

| Level Name | Access Requirement | Storage Control | Export Rule | Audit Requirement |
| :--- | :--- | :--- | :--- | :--- |
| **PUBLIC** | General system awareness (No criminal record access). | Standard DB storage. | Permitted. | Standard system log. |
| **INTERNAL** | Authenticated officers (Level 0 - 14). | Encrypted DB storage. | Restricted to authorized admins. | Standard audit log. |
| **LAW_ENFORCEMENT_RESTRICTED** | Authenticated officers with operational purpose & scope permission. | Encrypted DB storage (AES-256 sensitive fields). | Authorized export only with supervisor approval. | Full mandatory audit log (who, what, why, when). |
| **HIGHLY_RESTRICTED** | Assigned investigators, State/National Admins, IA. | App-level encrypted storage, restricted query scopes. | Strict supervisor export control. | Real-time security audit log + IA alert monitoring. |
| **EVIDENCE_RESTRICTED** | Evidence Officers, Assigned Investigators, Court Integration. | S3 SSE-KMS, Object Lock (WORM), signed URLs. | Watermarked export only. | Chain of custody audit trail. |
| **BIOMETRIC_RESTRICTED**| Forensics / Biometric Officers (Level 10) only. | Dedicated biometric vault, non-reversible templates. | Export prohibited. | Cryptographic biometric audit log. |
| **SEALED** | Explicit Judicial / Super Admin seal override. | Dual-custody encryption key lock. | Export strictly prohibited. | Immediate high-priority IA notification on access attempt. |

---

## 3. Sensitive Field Handling Policy

- **No Secret Logging**: Passwords, MFA secrets, JWT private keys, raw biometric payloads, and S3 signing keys **MUST NEVER** appear in application logs, audit logs, or error tracebacks.
- **Data Minimization in Search**: Search API responses return only minimal fields required for candidate matching (e.g., Person ID, Masked Name, Masked DOB, Jurisdiction summary) until full authorized record access is requested and validated.
