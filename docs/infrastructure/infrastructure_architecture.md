# NIPRIS — Infrastructure & Deployment Topology Specification

NIPRIS employs a modern containerized infrastructure topology designed for cloud deployment, hybrid state command datacenters, and sovereign air-gapped law enforcement environments.

---

## 1. Monorepo Infrastructure Layout

```
/infrastructure
  ├── /docker
  │     ├── Dockerfile.backend
  │     ├── Dockerfile.web
  │     ├── Dockerfile.admin
  │     └── docker-compose.dev.yml
  ├── /kubernetes
  │     ├── base/              (Deployments, Services, ConfigMaps, Secrets)
  │     ├── overlays/
  │     │     ├── staging/
  │     │     └── production/  (HA StatefulSets, HPA rules)
  └── /terraform
        ├── main.tf
        ├── modules/
        │     ├── vpc/         (Isolated government subnet topology)
        │     ├── rds/         (PostgreSQL multi-AZ deployment)
        │     ├── s3/          (Object Lock WORM evidence buckets)
        │     └── opensearch/  (Dedicated search cluster)
```

---

## 2. Kubernetes Deployment Architecture

- **High Availability & Autoscaling**: Horizontal Pod Autoscalers (HPA) scale NestJS API pods based on CPU utilization and incoming HTTP request queue length.
- **Network Isolation**: Strict Kubernetes NetworkPolicies prevent direct traffic between web frontend pods and primary PostgreSQL databases. All data access must route through authenticated backend pods.
- **Ingress & WAF**: Ingress Controllers equipped with Web Application Firewall (WAF) rule sets protecting against OWASP Top 10 vulnerabilities.

---

## 3. CI/CD & DevSecOps Pipeline

```
[Git Commit / PR]
       │
       ▼
1. SAST & Secret Scanning (TruffleHog / SonarQube - Block committed keys)
       │
       ▼
2. Dependency Vulnerability Audit (npm audit / Snyk / Trivy container scan)
       │
       ▼
3. Automated Unit & Authorization Test Suite (Prisma mock & Guard verification)
       │
       ▼
4. Monorepo Build Verification (Next.js & NestJS compilation)
       │
       ▼
5. Container Image Signing & Push to Private Sovereign Registry
```
