import boto3
import uuid
from email_service import send_email

dynamo = boto3.resource('dynamodb')
table=dynamo.Table('rsvp-table')

def fetchAllGuest():
    print('💽 Fetching all guest....')
    response = table.scan()
    return response['Items']

def addNewGuest (guest):
    guestId = str(uuid.uuid4())
    print('Adding guest....')
    table.put_item(
        Item={
            'id' : guestId,
            'email':guest['email'],
            'guest': guest['guest']
        }
    )
    print("Sending email to: ",guest)
    send_email(guest['email'])
   