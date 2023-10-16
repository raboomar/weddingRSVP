import json
from rsvp_services import addNewGuest, fetchAllGuest


def lambda_handler(event, context):
     print("🤖 event: ", json.dumps(event))
     http_method = event['routeKey']
     
     response =  {
        'statusCode': '',
        'body': '',
        'headers': {
        'Content-Type': 'application/json'
             }
        }
     match http_method:
        case "POST /guest":
            event_body = json.loads(event['body'])
            addNewGuest(event_body)
            response['statusCode'] = 201
            return response
        case "GET /guest":
            guest_list = fetchAllGuest() 
            response['statusCode'] = 200
            response['body'] = json.dumps(guest_list)
            return response
        case _:
            print("No routes match....")
            return {
            'statusCode': 500,
            'body': None,
            'headers': {
            'Content-Type': 'application/json'
                 }}
            
   
    