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

## Improvements Needed:
* Use some sort of in-memory based database to save nearby schedules locally so that we don't have to read from the main database regularly, instead we can synchronize the memory based database every few minutes or something to get the updates (example: Redis)

* Use a Request Queue instead of just spawning new API Runner thread everytime we can use push the task in a queue which can be then consumed by another service whose whole task will be to execute the given task and when completed dequeue that task from the queue and get another task from the queue (example: Kafka pub sub model)
