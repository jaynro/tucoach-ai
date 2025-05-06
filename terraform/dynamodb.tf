resource "aws_dynamodb_table" "tucoachai" {
  name                        = "TuCoachAi-${var.environment}"
  billing_mode                = "PAY_PER_REQUEST"
  hash_key                    = "partition_key"
  range_key                   = "sort_key"
  deletion_protection_enabled = true

  attribute {
    name = "partition_key"
    type = "S"
  }

  attribute {
    name = "sort_key"
    type = "S"
  }

  tags = {
    Name        = "TuCoachAi"
    Environment = var.environment
    Project     = "TuCoachAi"
  }

  point_in_time_recovery {
    enabled = true
  }

  server_side_encryption {
    enabled = true
  }

  lifecycle {
    prevent_destroy = true
  }
}

