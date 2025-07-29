#!/bin/bash

echo "Starting Andy Grails production environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo ""
    echo "🐳  Oops! Docker is not running!"
    echo ""
    echo "    ┌─────────────────────────────────────┐"
    echo "    │                                     │"
    echo "    │   😈 Docker daemon is offline...    │"
    echo "    │                                     │"
    echo "    │      Please start the service!      │"
    echo "    │                                     │"
    echo "    └─────────────────────────────────────┘"
    echo ""
    echo "Error: Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build and start production containers
if docker-compose up --build; then
    echo ""
    echo "🚀  Production environment deployed successfully!"
    echo ""
    echo "    ┌─────────────────────────────────────┐"
    echo "    │                                     │"
    echo "    │   🧡 Live and ready for users! 🧡   │"
    echo "    │                                     │"
    echo "    └─────────────────────────────────────┘"
    echo ""
    echo "Frontend: http://localhost:4200"
    echo "Backend: http://localhost:8080"
    echo "Database: localhost:55432"
else
    echo ""
    echo "💥  Production deployment failed!"
    echo ""
    echo "    ┌─────────────────────────────────────┐"
    echo "    │                                     │"
    echo "    │   Deployment unsuccessful...        │"
    echo "    │                                     │"
    echo "    │   Check the logs above!             │"
    echo "    │                                     │"
    echo "    └─────────────────────────────────────┘"
    echo ""
    echo "Error: Failed to start production environment. Please check the error messages above."
    exit 1
fi 