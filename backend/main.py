import json
from rsvp_services import add_new_guest, fetch_all_Guest, fetch_guest


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
            add_new_guest(event_body)
            response['statusCode'] = 201
            return response
        case "GET /guest":
            guest_list = fetch_all_Guest() 
            response['statusCode'] = 200
            response['body'] = json.dumps(guest_list)
            return response
        case "GET /guest/{id}":
            guest_id = event['pathParameters']['id']
            guest_list = fetch_guest(guest_id) 
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
            
   
    