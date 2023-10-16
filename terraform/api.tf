resource "aws_apigatewayv2_api" "rsvp_http_api_gw" {
  name          = "rsvp-http-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_integration" "rsvp_api_integration" {
  api_id                 = aws_apigatewayv2_api.rsvp_http_api_gw.id
  integration_type       = "AWS_PROXY"
  connection_type        = "INTERNET"
  integration_method     = "POST"
  integration_uri        = aws_lambda_function.rsvp_service.invoke_arn
  passthrough_behavior   = "WHEN_NO_MATCH"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "rsvp_all_api_route" {
  api_id    = aws_apigatewayv2_api.rsvp_http_api_gw.id
  route_key = "GET /guest"
  target    = "integrations/${aws_apigatewayv2_integration.rsvp_api_integration.id}"
}

resource "aws_apigatewayv2_route" "read_item_api_route" {
  api_id    = aws_apigatewayv2_api.rsvp_http_api_gw.id
  route_key = "GET /guest/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.rsvp_api_integration.id}"
}

resource "aws_apigatewayv2_integration" "create_api_integration" {
  api_id                 = aws_apigatewayv2_api.rsvp_http_api_gw.id
  integration_type       = "AWS_PROXY"
  connection_type        = "INTERNET"
  integration_method     = "POST"
  integration_uri        = aws_lambda_function.rsvp_service.invoke_arn
  passthrough_behavior   = "WHEN_NO_MATCH"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "create_api_route" {
  api_id    = aws_apigatewayv2_api.rsvp_http_api_gw.id
  route_key = "POST /guest"
  target    = "integrations/${aws_apigatewayv2_integration.create_api_integration.id}"
}

resource "aws_apigatewayv2_integration" "update_api_integration" {
  api_id                 = aws_apigatewayv2_api.rsvp_http_api_gw.id
  integration_type       = "AWS_PROXY"
  connection_type        = "INTERNET"
  integration_method     = "POST"
  integration_uri        = aws_lambda_function.rsvp_service.invoke_arn
  passthrough_behavior   = "WHEN_NO_MATCH"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "update_api_route" {
  api_id    = aws_apigatewayv2_api.rsvp_http_api_gw.id
  route_key = "PUT /guest/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.update_api_integration.id}"
}

resource "aws_apigatewayv2_integration" "delete_api_integration" {
  api_id                 = aws_apigatewayv2_api.rsvp_http_api_gw.id
  integration_type       = "AWS_PROXY"
  connection_type        = "INTERNET"
  integration_method     = "POST"
  integration_uri        = aws_lambda_function.rsvp_service.invoke_arn
  passthrough_behavior   = "WHEN_NO_MATCH"
  payload_format_version = "2.0"
}

resource "aws_apigatewayv2_route" "delete_api_route" {
  api_id    = aws_apigatewayv2_api.rsvp_http_api_gw.id
  route_key = "DELETE /guest/{id}"
  target    = "integrations/${aws_apigatewayv2_integration.delete_api_integration.id}"
}

resource "aws_apigatewayv2_stage" "rsvp_api_deploy_stage" {
  api_id      = aws_apigatewayv2_api.rsvp_http_api_gw.id
  auto_deploy = true
  name        = "$default"
  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.main_api_gw.arn

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
      }
    )
  }
}

resource "aws_cloudwatch_log_group" "main_api_gw" {
  name = "/aws/api-gw/${aws_apigatewayv2_api.rsvp_http_api_gw.name}"

  retention_in_days = 3
}

output "api_endpoint" {
  value       = aws_apigatewayv2_api.rsvp_http_api_gw.api_endpoint
  description = "API endpoint"
}
