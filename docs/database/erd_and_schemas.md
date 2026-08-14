# NIPRIS — Database ERD & Entity Schema Architecture

NIPRIS utilizes PostgreSQL 16 managed via Prisma ORM. Large multimedia files (photos, bodycam recordings, documents) are stored in S3 object storage; database tables maintain metadata, cryptographic checksums, and storage keys.

---

## 1. Entity-Relationship Overview

```
+-------------------+       +-------------------+       +-------------------+
|   Organization    |----<  |      Officer      |----<  |     UserSession   |
+-------------------+       +-------------------+       +-------------------+
                                      |
                                      | (Assigned / Investigated)
                                      v
+-------------------+       +-------------------+       +-------------------+
|   PersonMaster    |----<  |     Incident      |----<  |     Evidence      |
+-------------------+       +-------------------+       +-------------------+
  |           |                       |                           |
  v           v                       v                           v
+-------+  +-------+            +-----------+           +-------------------+
|Arrest |  |Warrant|            |   Case    |           | BodycamRecording  |
+-------+  +-------+            +-----------+           +-------------------+
                                      |                           |
                                      v                           v
                                +-----------+           +-------------------+
                                |AuditLog   |           |ChainOfCustody     |
                                +-----------+           +-------------------+
```

---

## 2. Complete Core Schema Definitions (Prisma Data Models)

```prisma
// Core Prisma Schema Outline for NIPRIS

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum OrgLevel {
  NATIONAL_HQ
  STATE_COMMAND
  AREA_COMMAND
  DIVISION
  POLICE_STATION
  SPECIAL_UNIT
}

enum OfficerRole {
  NATIONAL_SUPER_ADMIN // Level 0
  NATIONAL_COMMAND_ADMIN // Level 1
  STATE_COMMAND_ADMIN // Level 2
  AREA_COMMAND_ADMIN // Level 3
  DIVISION_ADMIN // Level 4
  STATION_COMMANDER // Level 5
  INVESTIGATING_OFFICER // Level 6
  PATROL_OFFICER // Level 7
  EVIDENCE_OFFICER // Level 8
  BODYCAM_ADMIN // Level 9
  FORENSIC_OFFICER // Level 10
  AUDITOR // Level 11
  INTERNAL_AFFAIRS // Level 12
  COURT_INTEGRATION // Level 13
  READ_ONLY_VIEWER // Level 14
}

enum IdentityMatchStatus {
  MATCH
  POSSIBLE_MATCH
  NO_MATCH
}

enum LegalStatus {
  ARREST
  CHARGE
  PROSECUTION
  CONVICTION
  ACQUITTAL
  DISMISSED
  PENDING
  RELEASED
}

enum WarrantStatus {
  ACTIVE
  EXECUTED
  CANCELLED
  EXPIRED
  SUSPENDED
}

enum ClassificationLevel {
  PUBLIC
  INTERNAL
  LAW_ENFORCEMENT_RESTRICTED
  HIGHLY_RESTRICTED
  SEALED
  BIOMETRIC_RESTRICTED
  EVIDENCE_RESTRICTED
}

model Organization {
  id          String       @id @default(uuid())
  code        String       @unique
  name        String
  level       OrgLevel
  parentId    String?
  parent      Organization? @relation("OrgHierarchy", fields: [parentId], references: [id])
  children    Organization[] @relation("OrgHierarchy")
  state       String?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  officers    Officer[]

  @@map("organizations")
}

model Officer {
  id              String       @id @default(uuid())
  badgeNumber     String       @unique
  firstName       String
  lastName        String
  rank            String
  email           String       @unique
  passwordHash    String
  role            OfficerRole
  orgId           String
  organization    Organization @relation(fields: [orgId], references: [id])
  mfaEnabled      Boolean      @default(false)
  mfaSecret       String?
  isSuspended     Boolean      @default(false)
  assignedDevices Device[]
  auditLogs       AuditLog[]
  createdAt       DateTime     @default(now())

  @@map("officers")
}

model PersonMaster {
  id              String       @id @default(uuid())
  nin             String?      @unique // App-level encrypted
  firstName       String
  lastName        String
  middleName      String?
  aliases         String[]
  dateOfBirth     DateTime
  sex             String
  nationality     String       @default("Nigerian")
  photoUrl        String?
  biometricRef    String?      // Non-reversible hash/reference
  classification  ClassificationLevel @default(LAW_ENFORCEMENT_RESTRICTED)
  incidents       IncidentPerson[]
  arrests         Arrest[]
  warrants        Warrant[]
  cases           CasePerson[]
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt

  @@map("persons")
}

model Incident {
  id              String       @id @default(uuid())
  incidentNumber  String       @unique
  title           String
  description     String
  incidentType    String
  locationName    String
  latitude        Float?
  longitude       Float?
  occurredAt      DateTime
  reportingOfficerId String
  status          String       @default("REPORTED")
  classification  ClassificationLevel @default(LAW_ENFORCEMENT_RESTRICTED)
  persons         IncidentPerson[]
  evidence        Evidence[]
  createdAt       DateTime     @default(now())

  @@map("incidents")
}

model IncidentPerson {
  id          String       @id @default(uuid())
  incidentId  String
  incident    Incident     @relation(fields: [incidentId], references: [id])
  personId    String
  person      PersonMaster @relation(fields: [personId], references: [id])
  relationship String      // Suspect, Victim, Witness, Reporter
}

model Arrest {
  id              String       @id @default(uuid())
  arrestNumber    String       @unique
  personId        String
  person          PersonMaster @relation(fields: [personId], references: [id])
  incidentId      String?
  arrestingOfficerId String
  arrestedAt      DateTime
  location        String
  legalBasis      String
  charges         String[]
  legalStatus     LegalStatus  @default(ARREST)
  bailStatus      String?
  custodyLocation String
  createdAt       DateTime     @default(now())

  @@map("arrests")
}

model Warrant {
  id              String       @id @default(uuid())
  warrantNumber   String       @unique
  personId        String
  person          PersonMaster @relation(fields: [personId], references: [id])
  issuingAuthority String
  jurisdiction    String
  issuedAt        DateTime
  expiresAt       DateTime?
  status          WarrantStatus @default(ACTIVE)
  charges         String[]
  createdAt       DateTime     @default(now())

  @@map("warrants")
}

model Case {
  id              String       @id @default(uuid())
  caseNumber      String       @unique
  title           String
  summary         String
  leadOfficerId   String
  status          String       @default("UNDER_INVESTIGATION")
  persons         CasePerson[]
  evidence        Evidence[]
  createdAt       DateTime     @default(now())

  @@map("cases")
}

model CasePerson {
  id          String       @id @default(uuid())
  caseId      String
  case        Case         @relation(fields: [caseId], references: [id])
  personId    String
  person      PersonMaster @relation(fields: [personId], references: [id])
  roleInCase  String       // Suspect, Defendant, Witness
}

model Evidence {
  id              String       @id @default(uuid())
  evidenceNumber  String       @unique
  caseId          String?
  case            Case?        @relation(fields: [caseId], references: [id])
  incidentId      String?
  incident        Incident?    @relation(fields: [incidentId], references: [id])
  fileType        String
  fileSize        Int
  storagePath     String
  sha256Hash      String
  retentionDate   DateTime?
  chainEvents     ChainOfCustody[]
  createdAt       DateTime     @default(now())

  @@map("evidence")
}

model BodycamRecording {
  id              String       @id @default(uuid())
  deviceId        String
  officerId       String
  recordingStart  DateTime
  recordingEnd    DateTime
  storagePath     String
  sha256Hash      String
  durationSeconds Int
  isSealed        Boolean      @default(false)
  createdAt       DateTime     @default(now())

  @@map("bodycam_recordings")
}

model ChainOfCustody {
  id              String       @id @default(uuid())
  evidenceId      String
  evidence        Evidence     @relation(fields: [evidenceId], references: [id])
  action          String       // CREATED, ACCESSED, TRANSFERRED, EXPORTED
  performedBy     String
  reason          String
  timestamp       DateTime     @default(now())

  @@map("chain_of_custody")
}

model AuditLog {
  id              String       @id @default(uuid())
  officerId       String?
  officer         Officer?     @relation(fields: [officerId], references: [id])
  action          String
  resource        String
  purpose         String?
  ipAddress       String
  deviceId        String?
  outcome         String       // SUCCESS, DENIED, ERROR
  metadata        Json?
  timestamp       DateTime     @default(now())

  @@map("audit_logs")
}

model Device {
  id              String       @id @default(uuid())
  serialNumber    String       @unique
  deviceType      String       // BODYCAM, MOBILE_TERMINAL
  officerId       String?
  officer         Officer?     @relation(fields: [officerId], references: [id])
  status          String       @default("ACTIVE")
  lastSyncAt      DateTime?

  @@map("devices")
}
```
