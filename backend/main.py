import json
from rsvp_services import add_new_guest, fetch_all_guest


def lambda_handler(event, context):
    print("🤖 event: ", json.dumps(event))
    http_method = event['routeKey']

    match http_method:
        case "POST /guest":
            event_body = json.loads(event['body'])
            return add_new_guest(event_body)
        case "GET /guest":
            return fetch_all_guest()
        case _:
            print("No routes match....")
            return {
                'statusCode': 500,
                'body': None,
                'headers': {
                    'Content-Type': 'application/json'
                }}
