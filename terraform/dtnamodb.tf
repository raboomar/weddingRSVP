resource "aws_dynamodb_table" "rsvp_table" {
  name           = "rsvp-table"
  billing_mode   = "PROVISIONED"
  read_capacity  = 5
  write_capacity = 5
  hash_key       = "id"
  attribute {
    name = "id"
    type = "S"
  }

}
