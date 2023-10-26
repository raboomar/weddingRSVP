

data "archive_file" "lambda-rsvp-zip" {
  type        = "zip"
  source_dir  = "../${path.module}/backend"
  output_path = "../${path.module}/backend.zip"
}

resource "aws_s3_object" "lambda_rsvp" {
  bucket = aws_s3_bucket.lambda_bucket.id
  key    = "rsvp_lambda_code.zip"
  source = data.archive_file.lambda-rsvp-zip.output_path
  etag   = filemd5(data.archive_file.lambda-rsvp-zip.output_path)
}


resource "aws_lambda_function" "rsvp_service" {
  function_name    = "rsvp_service"
  s3_bucket        = aws_s3_bucket.lambda_bucket.id
  s3_key           = "rsvp_lambda_code.zip"
  handler          = "main.lambda_handler"
  runtime          = "python3.10"
  source_code_hash = data.archive_file.lambda-rsvp-zip.output_base64sha256
  role             = aws_iam_role.lambda_exec.arn

  environment {
    variables = {
      email_sender   = var.email_sender,
      email_password = var.email_password
    }
  }
}

resource "aws_iam_role_policy" "lambda_exec_policy" {
  name = "rsvp-api-exec-role-policy"
  role = aws_iam_role.lambda_exec.id

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": "dynamodb:*",
            "Effect": "Allow",
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": "logs:CreateLogGroup",
            "Resource": "arn:aws:logs:us-east-1:839399074955:*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "logs:CreateLogStream",
                "logs:PutLogEvents"
            ],
            "Resource": [
                "arn:aws:logs:us-east-1:839399074955:log-group:/aws/lambda/*:*"
            ]
        }        
      ]  
}  
EOF
}

resource "aws_iam_role" "lambda_exec" {
  name = "rsvp-api-exec-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_policy" "function_logging_policy" {
  name = "rsvp-lambda-logging-policy"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        Action : [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Effect : "Allow",
        Resource : "arn:aws:logs:*:*:*"
      }
    ]
  })
}

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/${aws_lambda_function.rsvp_service.function_name}"
  retention_in_days = 3
  lifecycle {
    prevent_destroy = false
  }
}

resource "aws_iam_role_policy_attachment" "function_logging_policy_attachment" {
  role       = aws_iam_role.lambda_exec.id
  policy_arn = aws_iam_policy.function_logging_policy.arn
}

