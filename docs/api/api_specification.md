# NIPRIS — API Architecture & Endpoint Specification

NIPRIS exposes modular NestJS REST APIs and WebSocket namespaces. All sensitive endpoints enforce mandatory authentication, authorization, purpose validation, rate limiting, and immutable audit interceptors.

---

## 1. Modular API Domain Mapping

```
/api/v1
  ├── /auth            (Login, MFA, Session management, Token refresh, Logout)
  ├── /users           (Officer account provisioning, device binding)
  ├── /organizations   (Commands, Divisions, Stations topology configuration)
  ├── /roles           (Role matrix definitions and permissions)
  ├── /persons         (Person Master profiles, identity resolution)
  ├── /search          (Cross-State controlled search gateway)
  ├── /incidents       (Incident reporting, status workflow)
  ├── /arrests         (Arrest & custody booking records)
  ├── /cases           (Case files, timeline management)
  ├── /warrants        (Warrants issuing & execution status)
  ├── /wanted          (Wanted person alert registry)
  ├── /missing         (Missing person records)
  ├── /evidence        (Digital evidence intake, chain of custody)
  ├── /bodycam         (Bodycam recordings, streaming signed URLs)
  ├── /audit           (Immutable audit search & IA compliance monitoring)
  └── /admin           (System health, security alert configuration)
```

---

## 2. Mandatory NestJS Guards & Interceptors

Every endpoint pipeline executes the following security chain:

```
[Request]
   │
   ▼
1. RateLimitGuard (Sliding Window Redis counter per Officer ID & IP)
   │
   ▼
2. AuthenticationGuard (Verify RS256 JWT & active session token)
   │
   ▼
3. DeviceVerificationGuard (Check registered device fingerprint)
   │
   ▼
4. PurposeValidationGuard (Ensure operational reason code/text submitted for sensitive lookups)
   │
   ▼
5. AuthorizationGuard (RBAC Role & ABAC Scope context evaluation)
   │
   ▼
6. AuditInterceptor (Cryptographically log request payload summary, Officer ID, timestamp, outcome)
   │
   ▼
[Controller Action Handler]
```

---

## 3. Core API Endpoint Definitions

### 3.1 Authentication (`/api/v1/auth`)
- `POST /login`: Primary authentication (Badge ID + Password). Returns temporary MFA token if status active.
- `POST /mfa/verify`: Verify TOTP/hardware token. Yields rotating access token (JWT) & refresh token.
- `POST /refresh`: Rotate refresh token & refresh access token.
- `POST /logout`: Revoke active session and blacklist tokens in Redis.

### 3.2 Person Identity & Resolution (`/api/v1/persons`)
- `POST /search`: Execute multi-criteria search. Accepts name, DOB, photograph reference, NIN. Requires `purpose` header.
- `GET /:id`: Retrieve Person Master record by ID (Filtered by ABAC clearance).
- `POST /resolve`: Execute identity resolution returning `MATCH`, `POSSIBLE_MATCH`, or `NO_MATCH`.

### 3.3 Cross-State Search (`/api/v1/search/cross-state`)
- `POST /query`: Query central national index across state source registries. Returns state availability mapping.
- `POST /fetch-record`: Request specific cross-state record. Validates operational clearance before disclosure.

### 3.4 Arrest Records (`/api/v1/arrests`)
- `POST /`: Create arrest booking record.
- `GET /:id`: Retrieve arrest details and custody status.
- `PATCH /:id/legal-status`: Update legal status (`ARREST` → `CHARGE` → `PROSECUTION` → `RELEASED`).

### 3.5 Digital Evidence & Bodycam (`/api/v1/evidence`, `/api/v1/bodycam`)
- `POST /upload-url`: Request presigned S3 upload URL. Requires SHA-256 pre-calculation.
- `POST /ingest-complete`: Finalize upload, verify SHA-256 checksum, generate chain of custody event.
- `GET /:id/playback-url`: Generate short-lived (15-min) HLS streaming URL with dynamic access watermark.
