output "vpc_id" {
  value = aws_vpc.nipris_vpc.id
}

output "eks_cluster_endpoint" {
  value = aws_eks_cluster.nipris_eks.endpoint
}

output "rds_endpoint" {
  value = aws_db_instance.nipris_db.endpoint
}

output "evidence_vault_bucket" {
  value = aws_s3_bucket.nipris_evidence_vault.bucket
}
