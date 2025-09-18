# Andy Grails' Website. Frontend

This is the frontend service for the [Andy Grails' website](https://andy-grails.de/) —  
a personal music project under the nickname _Andy Grails_.

The app is built with **Angular** and consumes RESTful APIs provided by the backend service.

For the full project including backend and main repository, visit:  
[https://github.com/aistomin/andy.grails](https://github.com/aistomin/andy.grails)

## Getting Started

This project uses Docker for development and production environments.

### Dockerfiles

This project includes two Dockerfiles:

- **`Dockerfile.dev`**: Development environment with hot reload using `ng serve`
- **`Dockerfile.prod`**: Production environment with nginx serving the built Angular app

The CI/CD pipeline automatically builds and publishes the production image to Docker Hub.

### Nginx Configurations

- **`nginx.conf`**: Development configuration with API proxy to backend
- **`nginx.prod.conf`**: Production configuration without API proxy (for standalone deployment)

### Quick Start (Development)

**Start the App:**

```bash
./start-dev.sh
```

**Stop the App:**

```bash
./stop-dev.sh
```

Once running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

### Production Environment

To run the production environment locally (using the production Docker image):

**Start Production App:**

```bash
./start-prod.sh
```

**Stop Production App:**

```bash
./stop-prod.sh
```

Once running, open your browser and navigate to `http://localhost:4200/`. This runs the production build with nginx serving the optimized Angular application.

**Note:** The production environment includes the full stack (database, backend, and frontend) and builds the frontend locally using `Dockerfile.prod`.

### Managing the App

**View logs (Development):**

```bash
docker-compose -f docker-compose-dev.yml logs -f
```

**View logs (Production):**

```bash
docker compose -f docker-compose-prod.yml logs -f
```

**Restart the App (Development):**

```bash
./stop-dev.sh
./start-dev.sh
```

**Restart the App (Production):**

```bash
./stop-prod.sh
./start-prod.sh
```

For detailed Docker setup instructions, see [DOCKER_README.md](DOCKER_README.md).

## Error Handling

The application includes comprehensive error handling for different scenarios:

- **404 Errors**: Automatically redirects to a custom 404 page
- **500 Errors**: Automatically redirects to a custom 500 error page
- **Network Errors**: Automatically redirects to a custom network error page when the backend is unreachable
- **Other Server Errors**: Handled with appropriate error messages

### Test Routes

For demonstration purposes, the following test routes are available:

- `/test/error`: Test page that calls the `/test/error` backend endpoint
  - If the backend returns 500, you'll be redirected to the 500 error page
  - If the backend responds successfully, you'll see "Everything works!"
- `/500`: Direct access to the 500 error page
- `/404`: Direct access to the 404 error page
- `/network/error`: Direct access to the network error page

## Running unit tests

To execute unit tests use the following command:

```bash
npm test
```

## How to Contribute

1. **Make your changes** and [run tests](#running-unit-tests)

2. **Test your changes work** in both [development](#quick-start-development) and [production](#production-environment) environments

3. **Submit a pull request** with a clear description of your changes.

**Important**: You must verify that the production Docker Compose setup displays the website correctly and that your changes work as intended.
