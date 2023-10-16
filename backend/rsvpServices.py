import boto3

dynamo = boto3.client('dynamodb')

def addNewGuest (guest):
    print('Adding guest....',guest)