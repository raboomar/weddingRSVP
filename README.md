# RSVP App for My Wedding

Welcome to the RSVP app I'm creating for my upcoming wedding. This project is designed to help me manage the RSVPs for my special day. Below, you'll find all the information you need to get started, including the technology stack I'm using, the project's architecture, and how to set it up.

## Technology Stack

I've chosen a variety of technologies to create a robust and scalable RSVP app:

- **Infrastructure**: I'm using Terraform to define and provision the necessary infrastructure resources.
- **Hosting**: The backend is hosted on AWS Lambda.
- **API**: AWS API Gateway triggers the APIs I've created.
- **Data Storage**: Amazon S3 stores the Lambda code.
- **Database**: For the database, I've opted for Amazon DynamoDB to securely store RSVP information.
- **Frontend**: I'm building the user interface for my app using Angular.

## Project Overview

The RSVP app serves as a platform for my wedding guests to confirm their attendance. Here's how it works:

1. **Dynamic RSVP Form**: Guests can access a dynamic RSVP form on the frontend, which they can fill out with their names and other necessary information.

2. **Data Storage**: The RSVP data submitted by my guests is securely stored in Amazon DynamoDB, ensuring data integrity.

3. **Email Confirmation**: Once a guest submits their RSVP, an automatic email confirmation is sent to them. This email will contain important details about my wedding, including the venue address, date, and any other relevant information.

## Getting Started

To set up this project for my wedding, I'll follow these steps:

1. **Terraform Configuration**: I'll use Terraform to define and provision the required infrastructure resources on AWS. I'll make sure to configure my AWS credentials and settings in the Terraform scripts.

2. **AWS Lambda Setup**: I'll create AWS Lambda functions to handle the RSVP logic. These functions should integrate with Amazon DynamoDB to store and retrieve RSVP data.

3. **API Gateway Configuration**: I'll set up API Gateway to expose endpoints that trigger my Lambda functions.

4. **Amazon S3**: I'll store my Lambda code in Amazon S3 to make it accessible to my Lambda functions.

5. **DynamoDB Setup**: I'll create the necessary DynamoDB tables and configure them to store RSVP data.

6. **Frontend Development**: Using Angular, I'll build the frontend interface for my guests to access and submit their RSVPs.

7. **Email Automation**: I'll implement an email service to automatically send confirmation emails to guests after they submit their RSVP.

8. **Testing and Deployment**: I'll thoroughly test my app and deploy it to make it accessible to my guests.

I'm looking forward to my upcoming wedding and hope this RSVP app will make the planning process smoother. 🎉👰🤵
