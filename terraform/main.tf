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

# Get current AWS region and account ID
data "aws_region" "current" {}
data "aws_caller_identity" "current" {}

# Retrieve OpenRouter API key from SSM Parameter Store
data "aws_ssm_parameter" "openrouter_api_key" {
  name            = "/interviews/openrouter-key"
  with_decryption = true
}
