# Cron Job Service in Nest JS with MongoDB
Overview: You are tasked with creating a service on Nest JS that manages cron jobs using MongoDB
for storage. The service should allow users to create, update, delete, and retrieve cron jobs.
Cron jobs should be triggered based on scheduled timings (weekly, monthly, etc.) and should
include a start date. The service should be scalable to handle a large number of cron jobs
efficiently. Additionally, the service should implement rate limiting and API throttling to ensure
stability and prevent abuse. A webhook should also be added to receive data from other
services and store it in JSON format, assigning every received data with an ID and the
creation date of the cron jobs. The service should also store the history of cron job triggers
and their responses, all with timestamps for creation and updates.

## Solution:
![solution.svg](yolo-assignment.drawio.svg)