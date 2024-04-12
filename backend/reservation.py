class Guest:
    def __init__(self, firstName: str, lastName: str):
        self.firstName = firstName
        self.lastName = lastName


class GustList:
    def __init__(self, guest_id: str, email: str, date: str, guests: list[Guest]):
        self.guest_id = guest_id
        self.email = email
        self.date = date
        self.guests = guests

    def to_dict(self):
        # Convert Reservation object to a dictionary suitable for DynamoDB
        return {
            "id": self.guest_id,
            'email': self.email,
            'dateRsvp': self.date,
            'guest': [guest.__dict__ for guest in self.guests]
        }