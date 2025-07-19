#!/bin/bash

echo "Starting Andy Grails development environment..."

# Build and start development containers
docker-compose -f docker-compose.dev.yml up --build

echo "Development environment started!"
echo "Frontend: http://localhost:4200"
echo "Backend: http://localhost:8080"
echo "Database: localhost:55432" 