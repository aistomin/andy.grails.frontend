#!/bin/bash

echo "Starting Andy Grails production environment..."

# Build and start production containers
docker-compose up --build

echo "Production environment started!"
echo "Frontend: http://localhost:4200"
echo "Backend: http://localhost:8080"
echo "Database: localhost:55432" 