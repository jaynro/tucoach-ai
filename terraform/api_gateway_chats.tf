
# /chats resource
resource "aws_api_gateway_resource" "chats" {
  rest_api_id = aws_api_gateway_rest_api.backend_api.id
  parent_id   = aws_api_gateway_rest_api.backend_api.root_resource_id
  path_part   = "chats"
}

# POST /chats method
resource "aws_api_gateway_method" "post_chats" {
  rest_api_id   = aws_api_gateway_rest_api.backend_api.id
  resource_id   = aws_api_gateway_resource.chats.id
  http_method   = "POST"
  authorization = "NONE"
}

# Integration with Lambda for POST /chats
resource "aws_api_gateway_integration" "chats_integration" {
  rest_api_id             = aws_api_gateway_rest_api.backend_api.id
  resource_id             = aws_api_gateway_resource.chats.id
  http_method             = aws_api_gateway_method.post_chats.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.chats_lambda.invoke_arn
}

