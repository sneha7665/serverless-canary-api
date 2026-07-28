output "api_endpoint" {
  value = "${aws_api_gateway_stage.prod.invoke_url}/health"
}

output "protected_endpoint" {
  value = "${aws_api_gateway_stage.prod.invoke_url}/api/hello"
}

output "cognito_user_pool_id" {
  value = aws_cognito_user_pool.pool.id
}

output "cognito_client_id" {
  value = aws_cognito_user_pool_client.client.id
}