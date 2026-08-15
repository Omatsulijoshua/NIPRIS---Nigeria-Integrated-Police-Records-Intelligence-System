# NIPRIS Deployment & Operations Guide

## 1. Local Edge Node Deployment (Police Station / Division Level)

Police stations deploy NIPRIS locally using Docker Compose to ensure 100% operation during internet or power blackouts.

```bash
cd /opt/nipris
docker-compose up -d
```

---

## 2. Kubernetes Cloud Production Deployment (National HQ / AWS EKS)

Deploy NIPRIS to Kubernetes cluster with 3-15 auto-scaling backend pods:

```bash
kubectl create namespace nipris-prod
kubectl apply -f k8s/postgresql-statefulset.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/hpa.yaml
kubectl apply -f k8s/ingress.yaml
```

---

## 3. Terraform Cloud Infrastructure Provisioning

Provision cloud resources using Terraform IaC:

```bash
cd infra/terraform
terraform init
terraform plan
terraform apply -auto-approve
```
