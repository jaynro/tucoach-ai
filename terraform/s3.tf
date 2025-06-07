
resource "aws_s3_bucket" "public_site" {
  bucket = "tucoachai-website-295070998832"

  tags = {
    Name        = "tucoachai-website-295070998832"
    Environment = var.environment
    Project     = var.project_name
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "public_site" {
  bucket = aws_s3_bucket.public_site.id

  rule {
    bucket_key_enabled = true

    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_website_configuration" "public_site" {
  bucket = aws_s3_bucket.public_site.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# S3 bucket policy to allow public read access
resource "aws_s3_bucket_policy" "public_site_policy" {
  bucket = aws_s3_bucket.public_site.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "PublicReadGetObject"
        Effect    = "Allow"
        Principal = "*"
        Action    = "s3:GetObject"
        Resource  = "${aws_s3_bucket.public_site.arn}/*"
      }
    ]
  })
}

# Enable public access for the website bucket
resource "aws_s3_bucket_public_access_block" "public_site" {
  bucket = aws_s3_bucket.public_site.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}
