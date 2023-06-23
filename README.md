# Building a Dockerized Node.js API for Managing Orders Data in PostgreSQL
---
## Prerequisites

Make sure you have installed all of the following prerequisites on your machine:

- #### Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop/) 
## Environment Variables

To run this project, you will need to add the environment variables which is listed in .env.example file to your .env file, which will be placed in the .config/ directory.

## Run Project Locally

1. Clone the repository

```bash
$ git clone https://github.com/jainiljakasaniya/manage-order-data.git
```

2. Navigate to the project directory

```bash
$ cd manage-order-data
```

3. Set up the PostgreSQL database

- Open the init.sql file and modify the table schema if needed.
- Make sure you have Docker running.
- Build and run the Docker containers:

```bash
$ docker-compose build
```
```bash
$ docker-compose up
```

4. The Node.js API should now be running on http://localhost:4000.
5. The Node.js API Documentation now be running on http://localhost:4000/docs.

## API Endpoints

The following endpoints:

- POST /orders: Create a new order.
- GET /orders/:orderId: Retrieve a specific order by its ID.
- GET /orders?priority=high: Retrieve all orders and also apply filter based on product name and priority.
- DELETE /orders/:orderId: Delete a specific order by its ID.
## Tech Stack

**Database:** PostgreSQL
**Server:** Node.js, Express.js