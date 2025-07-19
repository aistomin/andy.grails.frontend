# Andy Grails' Website. Frontend.

## Development server

This project uses Docker for development and production environments.

### Quick Start

**Development environment (with hot reload):**

```bash
./scripts/docker-dev.sh
```

**Production environment:**

```bash
./scripts/docker-prod.sh
```

Once running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

For detailed Docker setup instructions, see [DOCKER_README.md](DOCKER_README.md).

## Error Handling

The application includes comprehensive error handling for different HTTP status codes:

- **404 Errors**: Automatically redirects to a custom 404 page
- **500 Errors**: Automatically redirects to a custom 500 error page
- **Other Server Errors**: Handled with appropriate error messages

### Test Routes

For demonstration purposes, the following test routes are available:

- `/test-error`: Test page that calls the `/test/error` backend endpoint
  - If the backend returns 500, you'll be redirected to the 500 error page
  - If the backend responds successfully, you'll see "Everything works!"
- `/500`: Direct access to the 500 error page
- `/404`: Direct access to the 404 error page

## Running unit tests

To execute unit tests use the following command:

```bash
npm test
```
