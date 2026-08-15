# Terraform Infrastructure-as-Code for NIPRIS National Police System
terraform {
  required_version = ">= 1.5.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# National Law-Enforcement Hybrid Cloud VPC
resource "aws_vpc" "nipris_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "nipris-national-vpc"
    Environment = "production"
    System      = "NIPRIS"
  }
}

# EKS Kubernetes Cluster for Police Systems
resource "aws_eks_cluster" "nipris_eks" {
  name     = "nipris-production-cluster"
  role_arn = var.eks_role_arn

  vpc_config {
    subnet_ids = var.subnet_ids
  }
}

# AWS RDS Multi-AZ PostgreSQL Database
resource "aws_db_instance" "nipris_db" {
  allocated_storage     = 100
  max_allocated_storage = 1000
  engine                = "postgres"
  engine_version        = "16.1"
  instance_class        = "db.m6i.xlarge"
  db_name               = "nipris_db"
  username              = "nipris_admin"
  password              = var.db_password
  multi_az              = true
  storage_encrypted     = true
  skip_final_snapshot   = false

  tags = {
    Name   = "nipris-national-rds"
    System = "NIPRIS"
  }
}

# WORM Digital Evidence S3 Vault
resource "aws_s3_bucket" "nipris_evidence_vault" {
  bucket = "nipris-digital-evidence-vault-worm-prod"

  tags = {
    Name   = "nipris-evidence-vault"
    System = "NIPRIS"
  }
}
