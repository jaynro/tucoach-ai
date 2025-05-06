terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.94"
    }
  }
  backend "s3" {
    skip_region_validation = true
  }
  required_version = ">= 1.0.0"
}

provider "aws" {
  region = var.aws_region
}
