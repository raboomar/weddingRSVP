resource "aws_s3_bucket" "lambda_bucket" {
  bucket = "rsvp-lambda-code-bucket"
}

resource "aws_s3_bucket_public_access_block" "lambda_bucket" {
  bucket                  = aws_s3_bucket.lambda_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket" "rsvp_web_app" {
  bucket        = "rami-dima-rsvp-web-app"
  force_destroy = true
}

resource "aws_s3_bucket_website_configuration" "rsvp_web_app_website_configuration" {
  bucket = aws_s3_bucket.rsvp_web_app.bucket
  index_document {
    suffix = "index.html"
  }
  error_document {
    key = "index.html"
  }
}

resource "aws_s3_bucket_versioning" "rsvp_web_app_versioning" {
  bucket = aws_s3_bucket.rsvp_web_app.id
  versioning_configuration {
    status = "Enabled"
  }
}
resource "aws_s3_bucket_server_side_encryption_configuration" "rsvp_web_app_encryption" {
  bucket = aws_s3_bucket.rsvp_web_app.bucket
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_cors_configuration" "rsvp_web_app_cors_configuration" {
  bucket = aws_s3_bucket.rsvp_web_app.id
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_policy" "rsvp_web_app_policy" {
  bucket = aws_s3_bucket.rsvp_web_app.id
  policy = data.aws_iam_policy_document.rsvp_web_app_s3_policy.json
}


data "aws_iam_policy_document" "rsvp_web_app_s3_policy" {
  statement {
    sid       = ""
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.rsvp_web_app.arn}/*"]
    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.rsvp_app_oci.iam_arn]
    }
  }

}
