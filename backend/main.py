# Import necessary modules
import json
import boto3

# Assign a variable ot the boto3 api client to query dynamo DB
dynamo = boto3.client('dynamodb')


def lambda_handler(event, context):
     print("🤖 event: ", json.dumps(event))
     return {
        'statusCode': 200,
        'body': None,
        'headers': {
        'Content-Type': 'application/json'
    }
    }