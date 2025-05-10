
# Lambda function for WebSocket API
resource "aws_lambda_function" "websocket_handler" {
  function_name = "${var.project_name}_websocket-${var.environment}"
  role          = aws_iam_role.websocket_lambda_role.arn
  handler       = "handler.lambda_handler"
  runtime       = "python3.13"
  timeout       = 90
  memory_size   = 256
  layers        = [aws_lambda_layer_version.dependencies_lambda_layer.arn, aws_lambda_layer_version.shared_lambda_layer.arn]

  filename         = data.archive_file.websocket_lambda_package.output_path
  source_code_hash = data.archive_file.websocket_lambda_package.output_base64sha256

  environment {
    variables = {
      ENVIRONMENT            = var.environment
      DYNAMODB_TABLE         = aws_dynamodb_table.tucoachai.name
      OPENROUTER_SECRET_NAME = "/interviews/openrouter-key"
    }
  }

}

# Create a zip file for the WebSocket Lambda function
data "archive_file" "websocket_lambda_package" {
  type        = "zip"
  source_dir  = "${path.module}/../backend/lambdas/src/websocket"
  output_path = "${path.module}/files/lambda_websocket.zip"
}

# IAM role for WebSocket Lambda
resource "aws_iam_role" "websocket_lambda_role" {
  name = "${var.project_name}WebsocketLambdaRole-${var.environment}"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# IAM policy for WebSocket Lambda
resource "aws_iam_policy" "websocket_lambda_policy" {
  name        = "${var.project_name}WebsocketLambdaPolicy-${var.environment}"
  description = "Policy for WebSocket Lambda function"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:logs:*:*:*"
      },
      {
        Action = [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:DeleteItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ]
        Effect   = "Allow"
        Resource = aws_dynamodb_table.tucoachai.arn
      },
      {
        Action = [
          "execute-api:ManageConnections"
        ]
        Effect   = "Allow"
        Resource = "${aws_apigatewayv2_api.websocket_api.execution_arn}/*"
      },
      {
        Action = [
          "ssm:GetParameter",
          "ssm:GetParameters"
        ]
        Effect   = "Allow"
        Resource = "arn:aws:ssm:${data.aws_region.current.name}:${data.aws_caller_identity.current.account_id}:parameter/interviews/openrouter-key"
      }
    ]
  })
}

# Attach policy to role
resource "aws_iam_role_policy_attachment" "websocket_lambda_policy_attachment" {
  role       = aws_iam_role.websocket_lambda_role.name
  policy_arn = aws_iam_policy.websocket_lambda_policy.arn
}

# Lambda permission for WebSocket API
resource "aws_lambda_permission" "websocket_api_permission" {
  statement_id  = "AllowExecutionFromWebSocketAPI"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.websocket_handler.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.websocket_api.execution_arn}/*/*"
}
