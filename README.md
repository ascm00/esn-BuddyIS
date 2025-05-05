# ESN VŠE PRAGUE - BUDDY IS

## Getting Started

Before you begin, ensure you have:

- [Yarn](https://yarnpkg.com/getting-started/install) installed
- [Docker](https://docs.docker.com/get-docker/) installed and running

### Project Overview

Project consists of the following packages:

#### [@app/admin](./admin)

- **Location:** `./admin`
- **Description:** A React SPA that serves as the administration UI, built with Contember DataBinding for seamless integration with the Contember API.
- **Sentry:** [Sentry](https://sentry.io) is integrated into the project. To enable Sentry, set the `VITE_SENTRY_DSN` environment variable in the `.env.production` file.

#### [@app/api](./api)

- **Location:** `./api`
- **Description:** Defines the data model and permissions for the Contember API.

## Running the Project Locally

Follow these steps to set up and run your project locally:

1. **Install Dependencies**

   Run the following command to install all required dependencies:
   ```bash
   yarn install
   ```

2. **Start the Project**

   Start the admin application and all necessary services with:
   ```bash
   yarn run start
   ```

   This will launch the following components:

| Container        | Port | Url                                            |
|------------------|------|------------------------------------------------|
| Contember Engine | 1481 | [http://localhost:1481](http://localhost:1481) |
| Postgres         | 1482 | [http://localhost:1482](http://localhost:1482) |
| S3               | 1483 | [http://localhost:1483](http://localhost:1483) |
| MailPit          | 1484 | [http://localhost:1484](http://localhost:1484) |
| Adminer          | 1485 | [http://localhost:1485](http://localhost:1485) |
| S3 Dashboard     | 1486 | [http://localhost:1486](http://localhost:1486) |

When you're done, stop the Docker containers with:

```bash
docker compose down
```

- - -

## Next Steps

Your project is now running locally! Access the administration UI
at [http://localhost:1480](http://localhost:1480/).
