# NIPRIS — Disaster Recovery & Business Continuity Architecture

## 1. Recovery Targets & SLAs

| Target Metric | SLA Threshold | Strategy |
| :--- | :--- | :--- |
| **Recovery Point Objective (RPO)** | < 1 Minute | Asynchronous multi-region database streaming replication & write-ahead log (WAL) archiving. |
| **Recovery Time Objective (RTO)** | < 15 Minutes | Automated Kubernetes failover to secondary standby datacenter. |
| **Audit Log Data Loss SLA** | 0 Seconds (Zero Loss) | Synchronous dual-commit audit logging to write-once storage. |

---

## 2. Backup & Restoration Strategy

### 2.1 PostgreSQL Database Backups
- Continuous Write-Ahead Log (WAL) archiving to encrypted S3 backup bucket.
- Daily full automated database snapshots retained for 30 days.
- Weekly cold offline backups archived to air-gapped tape storage or isolated vault.

### 2.2 Digital Evidence & Bodycam Backup
- Primary S3 bucket configured with cross-region replication (CRR) to a secondary geographically isolated storage cluster.
- Immutable Object Lock (WORM compliance) prevents deletion or modification during statutory retention periods.

### 2.3 Periodic Disaster Recovery Drill Protocol
- Quarterly automated restore drills testing full database point-in-time recovery (PITR) to isolated validation environments.
- Automated checksum verification asserting data integrity post-restoration.
