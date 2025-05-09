
# /interviews resource
resource "aws_api_gateway_resource" "interviews" {
  rest_api_id = aws_api_gateway_rest_api.backend_api.id
  parent_id   = aws_api_gateway_rest_api.backend_api.root_resource_id
  path_part   = "interviews"
}

# POST /interviews method
resource "aws_api_gateway_method" "post_interview" {
  rest_api_id   = aws_api_gateway_rest_api.backend_api.id
  resource_id   = aws_api_gateway_resource.interviews.id
  http_method   = "POST"
  authorization = "NONE"
}

# Integration with Lambda for POST /interviews
resource "aws_api_gateway_integration" "interviews_integration" {
  rest_api_id             = aws_api_gateway_rest_api.backend_api.id
  resource_id             = aws_api_gateway_resource.interviews.id
  http_method             = aws_api_gateway_method.post_interview.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.interviews_lambda.invoke_arn
}

