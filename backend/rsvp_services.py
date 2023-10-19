import boto3
import uuid
from email_service import send_email

dynamo = boto3.resource('dynamodb')
table=dynamo.Table('rsvp-table')

def fetch_all_Guest():
    print('💽 Fetching all guest....')
    response = table.scan()
    return response['Items']
    
def fetch_guest(guest_id):
    print('💽 Fetching guest: ', guest_id)
    response = table.get_item(Key={'id': guest_id})
    return response['Item']

def add_new_guest (guest):
    guestId = str(uuid.uuid4())
    print('Adding guest....')
    table.put_item(
        Item={
            'id' : guestId,
            'email':guest['email'],
            'dateRsvp': guest['date'],
            'guest': guest['guest']
        }
    )
    print("Sending email to: ",guest)
    send_email(guest['email'])
   