import json

import boto3
import botocore
import uuid

from email_service import send_email
from reservation import Guest, GustList

dynamo = boto3.resource('dynamodb')
table = dynamo.Table('rsvp-table')


def build_response(status_code: int, data):
    return {
        'statusCode': status_code,
        'body': data,
        'headers': {
            'Content-Type': 'application/json'
        }
    }


def fetch_all_guest():
    print('💽 Fetching all guest....')
    try:
        response = table.scan()
        return build_response(200, json.dumps(response['Items']))
    except botocore.exceptions.ClientError as error:
        print('Something went wrong.')
        build_response(500, [])


def add_new_guest(guest):
    try:
        guest_id = str(uuid.uuid4())
        print('Adding guest....')
        guest_list = []
        for guests in guest['guest']:
            guest_list.append(Guest(guests.get('firstName'), guests.get('lastName')))
        reservation = GustList(
            guest_id=guest_id,
            email=guest['email'],
            date=guest['date'],
            guests=guest_list
        )
        table.put_item(
            Item=reservation.to_dict()
        )
        print("Sending email to: ", guest)
        send_email(guest['email'])
        return build_response(201, reservation.to_dict())
    except botocore.exceptions.ClientError as error:
        print(f'Something went wrong.{error}')
        build_response(500, [])
