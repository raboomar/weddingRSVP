import os
from email.message import EmailMessage
import ssl
import smtplib

def send_email (gust_email):
    sender = os.environ['email_sender']
    password = os.environ['email_password']
    receiver =gust_email
    subject = 'Thank you for RSVPing'
    print(sender,password,receiver )
    body = """
    HIIIII WELCOME!!!!!
    """
    em = EmailMessage()
    em['From'] = sender
    em['To'] = receiver
    em['Subject'] = subject
    em.set_content(body)

    context = ssl.create_default_context()

    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(sender, password)
        smtp.sendmail(sender,receiver,em.as_string())