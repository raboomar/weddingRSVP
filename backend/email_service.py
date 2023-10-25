from email.message import EmailMessage
import os,ssl,smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email_html import html_body

def send_email (gust_email):
    sender_email = os.environ['email_sender']
    password = os.environ['email_password']
    receiver_email = gust_email
    subject = 'Thank you for RSVPing'
    message = MIMEMultipart("alternative")
    message["Subject"] = subject
    message["From"] = sender_email
    message["To"] = receiver_email
    html = html_body()
    email_body = MIMEText(html, "html")
    message.attach(email_body)
    
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login( sender_email, password)
        smtp.sendmail( sender_email,receiver_email,message.as_string())
