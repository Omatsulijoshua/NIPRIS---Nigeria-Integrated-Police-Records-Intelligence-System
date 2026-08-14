# NIPRIS — System Architecture Document

## 1. Monorepo & System Component Topology

NIPRIS follows a clean, modular monorepo architecture separating web applications, officer mobile clients, NestJS micro-services/backend, shared packages, and infrastructure definitions.

```
+-----------------------------------------------------------------------------------+
|                                  CLIENT LAYER                                     |
|  +---------------------------+  +--------------------------+  +-----------------+  |
|  | Web Portal (Next.js 14)   |  | Admin Portal (Next.js)   |  | Mobile (Flutter)|  |
|  | Patrol/Investigator/Cmd   |  | Infrastructure/System    |  | Android & iOS   |  |
|  +-------------+-------------+  +------------+-------------+  +--------+--------+  |
+----------------|-----------------------------|-------------------------|----------+
                 |                             |                         |
                 +----------------------+------v-------------------------+
                                        | (HTTPS / TLS 1.3 + WebSockets)
                                        v
+-----------------------------------------------------------------------------------+
|                                 API GATEWAY LAYER                                 |
|               Nginx Reverse Proxy / Cloudflare / Rate Limiter / WAF               |
+---------------------------------------+-------------------------------------------+
                                        |
                                        v
+-----------------------------------------------------------------------------------+
|                                  BACKEND LAYER                                    |
|                             NestJS Enterprise Backend                             |
|  +--------------------+  +-------------------+  +------------------------------+  |
|  | Auth & Session     |  | Identity & Person |  | Incident, Arrest, Case       |  |
|  | Guards & MFA       |  | Resolution Engine |  | Management Services          |  |
|  +--------------------+  +-------------------+  +------------------------------+  |
|  +--------------------+  +-------------------+  +------------------------------+  |
|  | RBAC/ABAC Scope    |  | National Cross-   |  | Digital Evidence & Bodycam   |  |
|  | Policy Engine      |  | State Search      |  | FFmpeg Ingestion & HLS        |  |
|  +--------------------+  +-------------------+  +------------------------------+  |
|  +-------------------------------------------------------------------------+  |
|  | Immutable Audit & Security Anomaly Interceptor Engine                   |  |
|  +-------------------------------------------------------------------------+  |
+-------------------+-+-------------------+--------------------+--------------------+
                    | |                   |                    |
        +-----------+ |                   |                    +------------+
        v             v                   v                                 v
+---------------+ +-------+ +---------------------------+ +-------------------------+
| PostgreSQL 16 | | Redis | | OpenSearch / Elastic      | | S3 Object Storage       |
| Prisma ORM    | | BullMQ| | (Controlled Search Index) | | (Evidence, Bodycam, Docs)|
+---------------+ +-------+ +---------------------------+ +-------------------------+
```

---

## 2. Shared Packages Architecture

- **`packages/types`**: Shared TypeScript interfaces, DTOs, Enums (Ranks, Roles, Incident Types, Warrant Statuses, Evidence Types).
- **`packages/ui`**: Shared UI design tokens, components (Shadcn/UI based), form controls, and access-control badges.
- **`packages/auth`**: JWT verification, TOTP MFA validation, session management utilities.
- **`packages/permissions`**: RBAC role evaluation, ABAC contextual policy engine, purpose-validation logic.
- **`packages/database`**: Prisma schema definition, migration scripts, application-level encryption middleware.
- **`packages/security`**: AES-256 field-level encryption, SHA-256 checksum generators, tamper-evident hash chaining.
- **`packages/evidence`**: S3 signed URL generator, FFmpeg HLS segmentation processor wrappers.
- **`packages/search`**: OpenSearch index management, query sanitizer, cross-state jurisdiction mapper.
- **`packages/audit`**: Append-only log formatter, anomaly alert detector.

---

## 3. Technology Stack Specification

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| **Web Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS, Shadcn/UI | Server-side rendering performance, high-density UI component library, strong typing. |
| **Mobile Frontend** | Flutter 3.x, Dart | Cross-platform native performance, secure device storage (KeyStore/Keychain), offline SQLite encryption. |
| **State & Forms** | React Query / TanStack Query, React Hook Form, Zod | Type-safe form validation, automatic cache invalidation, smooth data fetching. |
| **Backend API** | NestJS, TypeScript, REST + WebSockets (Socket.io) | Enterprise modular architecture, dependency injection, native async event pipelines. |
| **Primary Database** | PostgreSQL 16, Prisma ORM | Relational integrity, ACID compliance, GIS spatial indexing for incident locations. |
| **Caching & Queues**| Redis 7, BullMQ | High-speed session store, rate-limiting counters, async video transcode background queues. |
| **Object Storage** | S3-Compatible Storage (AWS S3 / MinIO) | Scalable evidence, bodycam video chunking, photo attachment storage with signed URLs. |
| **Search Engine** | OpenSearch / Elasticsearch | Controlled multi-jurisdiction index, high-speed fuzzy person search, audit search logs. |
| **Video Engine** | FFmpeg | Tamper checking, HLS video stream transcoding, metadata extraction, dynamic visual watermarking. |

---

## 4. Communication & Protocol Design

1. **REST APIs (HTTPS / TLS 1.3)**: Standard CRUD operations, authentication, record management, report submissions.
2. **WebSockets (WSS)**: Real-time officer emergency alerts, live wanted/missing broadcast, bodycam upload progress status notifications.
3. **Presigned Storage Access**: Direct client-to-S3 evidence uploads and short-lived (15-minute) watermarked video stream playlists. Raw S3 bucket paths are never exposed publicly.
