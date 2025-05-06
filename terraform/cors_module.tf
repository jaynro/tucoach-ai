
# CORS Module for API Gateway Resources
# This module adds OPTIONS methods to all resources in the API Gateway

# Function to recursively add OPTIONS methods to all resources
locals {
  # Get all resources in the API Gateway
  all_resources = [
    aws_api_gateway_resource.chats.id,
  ]
}

# Create OPTIONS method for each resource
resource "aws_api_gateway_method" "resource_options_method" {
  count         = length(local.all_resources)
  rest_api_id   = aws_api_gateway_rest_api.backend_api.id
  resource_id   = local.all_resources[count.index]
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# Create method response for each OPTIONS method
resource "aws_api_gateway_method_response" "resource_options_200" {
  count         = length(local.all_resources)
  rest_api_id   = aws_api_gateway_rest_api.backend_api.id
  resource_id   = local.all_resources[count.index]
  http_method   = aws_api_gateway_method.resource_options_method[count.index].http_method
  status_code   = "200"
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

# Create integration for each OPTIONS method
resource "aws_api_gateway_integration" "resource_options_integration" {
  count                   = length(local.all_resources)
  rest_api_id             = aws_api_gateway_rest_api.backend_api.id
  resource_id             = local.all_resources[count.index]
  http_method             = aws_api_gateway_method.resource_options_method[count.index].http_method
  type                    = "MOCK"
  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

# Create integration response for each OPTIONS method
resource "aws_api_gateway_integration_response" "resource_options_integration_response" {
  count         = length(local.all_resources)
  rest_api_id   = aws_api_gateway_rest_api.backend_api.id
  resource_id   = local.all_resources[count.index]
  http_method   = aws_api_gateway_method.resource_options_method[count.index].http_method
  status_code   = aws_api_gateway_method_response.resource_options_200[count.index].status_code
  
  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
    "method.response.header.Access-Control-Allow-Methods" = "'GET,POST,PUT,DELETE,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }
}
