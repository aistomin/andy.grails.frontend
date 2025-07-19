# Docker Setup for Andy Grails Frontend

This project now supports Docker for both development and production environments, making it easier to run the entire stack (frontend, backend, and database) consistently.

## Prerequisites

- Docker and Docker Compose installed on your system
- The backend image `andygrails/andy-grails-backend:latest` available on Docker Hub

## Quick Start

### Development Environment (with hot reload)

```bash
# Start the development environment
./scripts/docker-dev.sh

# Or manually:
docker-compose -f docker-compose.dev.yml up --build
```

This will start:

- **Frontend**: http://localhost:4200 (with hot reload)
- **Backend**: http://localhost:8080
- **Database**: localhost:55432

### Production Environment

```bash
# Start the production environment
./scripts/docker-prod.sh

# Or manually:
docker-compose up --build
```

This will start:

- **Frontend**: http://localhost:4200 (optimized build)
- **Backend**: http://localhost:8080
- **Database**: localhost:55432

## Environment Variables

You can customize the database configuration using environment variables:

```bash
export DB_NAME=your_db_name
export DB_USER=your_db_user
export DB_PASSWORD=your_db_password
```

Default values:

- `DB_NAME`: andy_grails
- `DB_USER`: andy
- `DB_PASSWORD`: andy

## Docker Files Explained

### `Dockerfile`

- Multi-stage build for production
- Builds the Angular app and serves it with nginx
- Optimized for production deployment

### `Dockerfile.dev`

- Single-stage build for development
- Includes Angular CLI and development dependencies
- Supports hot reloading

### `docker-compose.yml`

- Production orchestration
- Includes frontend, backend, and database services
- Uses nginx to serve the built Angular app

### `docker-compose.dev.yml`

- Development orchestration
- Includes hot reloading for the frontend
- Mounts source code for live development

### `nginx.conf`

- Nginx configuration for serving the Angular app
- Handles Angular routing (SPA)
- Includes API proxy configuration
- Optimized for performance and security

## Development Workflow

1. **Start the development environment**:

   ```bash
   ./scripts/docker-dev.sh
   ```

2. **Make changes to your code** - they will automatically reload in the browser

3. **Access the application**:

   - Frontend: http://localhost:4200
   - Backend API: http://localhost:8080

4. **Stop the environment**:
   ```bash
   docker-compose -f docker-compose.dev.yml down
   ```

## Production Deployment

1. **Build and start production environment**:

   ```bash
   ./scripts/docker-prod.sh
   ```

2. **The application will be available at**:
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:8080

## Benefits of This Setup

1. **Consistent Environment**: Same setup across all developers
2. **No Local Dependencies**: No need to install Node.js, npm, or Angular CLI locally
3. **Easy Deployment**: Can be deployed to any environment that supports Docker
4. **Network Isolation**: Services communicate through Docker networks
5. **Version Control**: Exact versions of all dependencies are locked

## Troubleshooting

### Port Conflicts

If you get port conflicts, you can modify the port mappings in the docker-compose files:

```yaml
ports:
  - '4201:4200' # Change 4200 to 4201
```

### Database Issues

If the database doesn't start properly:

```bash
# Remove existing volumes
docker-compose down -v

# Start fresh
docker-compose up --build
```

### Frontend Build Issues

If the frontend build fails:

```bash
# Clean Docker cache
docker system prune -a

# Rebuild
docker-compose up --build
```

## API Configuration

The frontend is configured to communicate with the backend at `http://localhost:8080`. In the Docker environment, the services communicate through the internal Docker network, but the frontend still needs to reach the backend through the exposed port.

If you need to change the API endpoint, modify the `baseUrl` in `src/app/services/api.service.ts`.
