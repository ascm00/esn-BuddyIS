ESN VŠE PRAGUE - BUDDY IS

Welcome to your new project created with Contember AI Studio! If you need assistance, feel free to join the conversation in our GitHub Discussions.

Getting Started

Before you begin, ensure you have:

Yarn installed
Docker installed and running
Project Overview

Your project consists of the following packages:

@app/admin

Location: ./admin
Description: A React SPA that serves as the administration UI, built with Contember DataBinding for seamless integration with the Contember API.
Sentry: Sentry is integrated into the project. To enable Sentry, set the VITE_SENTRY_DSN environment variable in the .env.production file.

Running the Project Locally

Follow these steps to set up and run your project locally:

Install Dependencies

Run the following command to install all required dependencies:

yarn install
Start the Project

Start the admin application and all necessary services with:

yarn run start
This will launch the following components:

Container	Port	Url
Contember Engine	1481	http://localhost:1481
Postgres	1482	http://localhost:1482
S3	1483	http://localhost:1483
MailPit	1484	http://localhost:1484
Adminer	1485	http://localhost:1485
S3 Dashboard	1486	http://localhost:1486
When you're done, stop the Docker containers with:

docker compose down
Next Steps

Your project is now running locally! Access the administration UI at http://localhost:1480.
