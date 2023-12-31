resource "aws_lambda_permission" "apigw_read_all" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.rsvp_service.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.rsvp_http_api_gw.execution_arn}/*/GET/guest"
}

resource "aws_lambda_permission" "apigw_read_item" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.rsvp_service.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.rsvp_http_api_gw.execution_arn}/*/GET/guest/{id}"
}

resource "aws_lambda_permission" "apigw_post_item" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.rsvp_service.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.rsvp_http_api_gw.execution_arn}/*/POST/guest"
}

resource "aws_lambda_permission" "apigw_put_item" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.rsvp_service.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.rsvp_http_api_gw.execution_arn}/*/PUT/guest/{id}"
}

resource "aws_lambda_permission" "apigw_delete_item" {
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.rsvp_service.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.rsvp_http_api_gw.execution_arn}/*/DELETE/guest/{id}"
}
