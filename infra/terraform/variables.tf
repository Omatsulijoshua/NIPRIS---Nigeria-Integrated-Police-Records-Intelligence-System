variable "aws_region" {
  type    = string
  default = "eu-west-1"
}

variable "eks_role_arn" {
  type    = string
  default = "arn:aws:iam::123456789012:role/NiprisEksClusterRole"
}

variable "subnet_ids" {
  type    = list(string)
  default = ["subnet-0123456789abcdef0", "subnet-0123456789abcdef1"]
}

variable "db_password" {
  type      = string
  sensitive = true
  default   = "NiprisSecureProductionPassword2026!"
}
