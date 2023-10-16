import json
from rsvpServices import addNewGuest


def lambda_handler(event, context):
     print("🤖 event: ", json.dumps(event))
     http_method = event['routeKey']
     
     match http_method:
        case "POST /guest":
            event_body = json.loads(event['body'])
            addNewGuest(event_body)
        case _:
            print("No routes match....")
            return {
            'statusCode': 500,
            'body': None,
            'headers': {
            'Content-Type': 'application/json'
                 }}
            
     return {
        'statusCode': 200,
        'body': None,
        'headers': {
        'Content-Type': 'application/json'
    }
    }