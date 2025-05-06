
# IAM Role for the Auth Lambda function
resource "aws_iam_role" "lambda_role" {
  name = "${var.project_name}ChatsLambdaRole-${var.environment}"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
  
  tags = {
    Name        = "${var.project_name}ChatsLambdaRole"
    Environment = var.environment
    Project     = var.project_name
  }
}

# IAM Policy for the Auth Lambda function
resource "aws_iam_policy" "lambda_policy" {
  name        = "${var.project_name}ChatsLambdaPolicy-${var.environment}"
  description = "Policy for the Chats Lambda function"
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:PutItem",
          "dynamodb:GetItem",
          "dynamodb:Query"
        ]
        Resource = aws_dynamodb_table.tucoachai.arn
      }
    ]
  })
}

# Attach the policy to the role
resource "aws_iam_role_policy_attachment" "lambda_policy_attachment" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = aws_iam_policy.lambda_policy.arn
}

# CloudWatch Log Group for the Lambda function
resource "aws_cloudwatch_log_group" "lambda_logs" {
  name              = "/aws/lambda/${var.project_name}_chats-${var.environment}"
  retention_in_days = 30
  
  tags = {
    Name        = "${var.project_name}ChatsLambdaLogs"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Lambda function for Auth API
resource "aws_lambda_function" "chats_lambda" {
  function_name    = "${var.project_name}_chats-${var.environment}"
  role             = aws_iam_role.lambda_role.arn
  handler          = "handler.lambda_handler"
  runtime          = "python3.13"
  filename         = data.archive_file.lambda_zip.output_path
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  timeout          = 30
  memory_size      = 256
  
  environment {
    variables = {
      ENVIRONMENT         = var.environment
      DYNAMODB_TABLE      = aws_dynamodb_table.tucoachai.name
    }
  }
  
  depends_on = [
    aws_cloudwatch_log_group.lambda_logs,
    aws_iam_role_policy_attachment.lambda_policy_attachment
  ]
  
  tags = {
    Name        = "${var.project_name}AuthLambda"
    Environment = var.environment
    Project     = var.project_name
  }
}

# Create a zip file of the Lambda function code
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../backend/lambdas/src/chats"
  output_path = "${path.module}/files/lambda.zip"
}

# Lambda permission for API Gateway
resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.chats_lambda.function_name
  principal     = "apigateway.amazonaws.com"
  
  # Allow invocation from any method on the /auth resource
  source_arn = "${aws_api_gateway_rest_api.backend_api.execution_arn}/*/*/chats*"
}
