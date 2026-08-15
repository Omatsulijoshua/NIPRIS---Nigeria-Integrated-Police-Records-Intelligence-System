# NIPRIS Enterprise Architecture & Technical Specification

## Overview

NIPRIS is designed to handle high-throughput law enforcement transactions across 36 States + FCT, operating seamlessly in both cloud-connected national HQ mode and edge-disconnection offline station mode.

---

## Technical Stack

- **Backend API**: NestJS (TypeScript), Express, RxJS, Swagger OpenAPI
- **Frontend Portal**: Next.js 14 (React, App Router, Vanilla CSS)
- **Mobile Field App**: Flutter (Dart, Provider, Offline Queue Engine)
- **Database & ORM**: PostgreSQL 16 (Multi-AZ), Prisma ORM
- **Cache & Telemetry**: Redis 7 Cluster
- **Containerization**: Docker, Docker Compose
- **Orchestration**: Kubernetes (EKS), Horizontal Pod Autoscaler (HPA), Ingress TLS
- **Infrastructure-as-Code**: Terraform IaC
- **Security & Cryptography**: AES-256-GCM Field Encryption, SHA-256 Block Hash Chaining

---

## High-Level Component Flow

```
[ Citizen / Public ]  [ Patrol Mobile ]  [ Station Desktop ]
         │                    │                   │
         ▼                    ▼                   ▼
 ┌─────────────────────────────────────────────────────────┐
 │          NGINX TLS Ingress (nipris.police.gov.ng)      │
 └────────────────────────────┬────────────────────────────┘
                              │
                              ▼
 ┌─────────────────────────────────────────────────────────┐
 │    NestJS Microservice API Cluster (Kubernetes HPA)    │
 │  (Auth, Identity, Incidents, Arrests, Evidence, CAD)    │
 └──────┬─────────────────────┬─────────────────────┬──────┘
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐     ┌───────────────┐     ┌───────────────┐
│ PostgreSQL 16 │     │ Redis Cluster │     │ MinIO S3 WORM │
│ Multi-AZ DB   │     │ Cache & Queue │     │ Evidence Vault│
└───────────────┘     └───────────────┘     └───────────────┘
```
