
# API Gateway REST API
resource "aws_api_gateway_rest_api" "backend_api" {
  name        = "${var.project_name}_REST-${var.environment}"
  description = "Tu Coach AI REST API"

  endpoint_configuration {
    types = ["EDGE"]
  }

  tags = {
    Name        = "${var.project_name}REST"
    Environment = var.environment
    Project     = var.project_name
  }
}

# API Gateway Deployment
resource "aws_api_gateway_deployment" "backend_api" {
  depends_on = [
    aws_api_gateway_integration.interviews_integration,
  ]

  rest_api_id = aws_api_gateway_rest_api.backend_api.id

  triggers = {
    redeployment = sha1(jsonencode([
      aws_api_gateway_resource.interviews.id,
      aws_api_gateway_method.post_interview.id,
    ]))
  }

  lifecycle {
    create_before_destroy = true
  }
}

# API Gateway Stage
resource "aws_api_gateway_stage" "backend_api" {
  depends_on    = [aws_api_gateway_account.api_gateway_account]
  deployment_id = aws_api_gateway_deployment.backend_api.id
  rest_api_id   = aws_api_gateway_rest_api.backend_api.id
  stage_name    = "v1"

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gateway.arn
    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
    })
  }

  tags = {
    Environment = var.environment
    Project     = var.project_name
  }
}

# CloudWatch Log Group for API Gateway
resource "aws_cloudwatch_log_group" "api_gateway" {
  name              = "/aws/apigateway/${aws_api_gateway_rest_api.backend_api.name}"
  retention_in_days = 30

  tags = {
    Name        = "${var.project_name}ApiGatewayLogs"
    Environment = var.environment
    Project     = var.project_name
  }
}

# API Gateway Usage Plan
resource "aws_api_gateway_usage_plan" "backend_api" {
  name        = "${var.project_name}UsagePlan-${var.environment}"
  description = "Usage plan for Piggy API"

  api_stages {
    api_id = aws_api_gateway_rest_api.backend_api.id
    stage  = aws_api_gateway_stage.backend_api.stage_name
  }

  quota_settings {
    limit  = 1000
    period = "DAY"
  }

  throttle_settings {
    burst_limit = 100
    rate_limit  = 50
  }

  tags = {
    Name        = "${var.project_name}UsagePlan"
    Environment = var.environment
    Project     = var.project_name
  }
}

# CloudWatch Logs role for API Gateway
resource "aws_iam_role" "cloudwatch_logs_role" {
  name = "${var.project_name}CloudWatchLogsRole-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "apigateway.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = {
    Name        = "${var.project_name}CloudWatchLogsRole"
    Environment = var.environment
    Project     = var.project_name
  }
}

# IAM Policy for CloudWatch Logs
resource "aws_iam_policy" "cloudwatch_logs_policy" {
  name        = "${var.project_name}CloudWatchLogsPolicy-${var.environment}"
  description = "Policy for API Gateway to write logs to CloudWatch"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:DescribeLogGroups",
          "logs:DescribeLogStreams",
          "logs:PutLogEvents",
          "logs:GetLogEvents",
          "logs:FilterLogEvents"
        ]
        Resource = "*"
      }
    ]
  })
}

# Attach the policy to the role
resource "aws_iam_role_policy_attachment" "cloudwatch_logs_policy_attachment" {
  role       = aws_iam_role.cloudwatch_logs_role.name
  policy_arn = aws_iam_policy.cloudwatch_logs_policy.arn
}

# Set up the CloudWatch Logs role ARN in the account settings
resource "aws_api_gateway_account" "api_gateway_account" {
  cloudwatch_role_arn = aws_iam_role.cloudwatch_logs_role.arn
}

# --- Gateway Responses for CORS ---

# Configure DEFAULT_5XX response to include CORS headers
resource "aws_api_gateway_gateway_response" "default_5xx" {
  rest_api_id   = aws_api_gateway_rest_api.backend_api.id
  response_type = "DEFAULT_5XX"

  response_parameters = {
    "gatewayresponse.header.Access-Control-Allow-Origin"  = "'*'"
    "gatewayresponse.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "gatewayresponse.header.Access-Control-Allow-Methods" = "'GET,POST,PUT,DELETE,OPTIONS'"
  }

  response_templates = {
    "application/json" = "{\"message\":$context.error.messageString}"
  }
}

# Optional: Configure DEFAULT_4XX response as well for consistency
resource "aws_api_gateway_gateway_response" "default_4xx" {
  rest_api_id   = aws_api_gateway_rest_api.backend_api.id
  response_type = "DEFAULT_4XX"

  response_parameters = {
    "gatewayresponse.header.Access-Control-Allow-Origin"  = "'*'"
    "gatewayresponse.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "gatewayresponse.header.Access-Control-Allow-Methods" = "'GET,POST,PUT,DELETE,OPTIONS'"
  }

  response_templates = {
    "application/json" = "{\"message\":$context.error.messageString}"
  }
}
