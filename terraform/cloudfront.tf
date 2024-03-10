
resource "aws_cloudfront_origin_access_identity" "rsvp_app_oci" {
  comment = "RSVP APP"
}

resource "aws_cloudfront_distribution" "rsvp_app_distribution" {
  origin {
    domain_name = aws_s3_bucket.rsvp_web_app.bucket_domain_name
    origin_id   = "S3-${aws_s3_bucket.rsvp_web_app.id}"
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.rsvp_app_oci.cloudfront_access_identity_path
    }
  }
  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${aws_s3_bucket.rsvp_web_app.id}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
  }
  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US", "CA"]
    }
  }
  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
