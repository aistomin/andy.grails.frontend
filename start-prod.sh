#!/bin/bash

echo "Starting Andy Grails PRODUCTION environment..."

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

# Build and start containers in detached mode
if docker compose -f docker-compose-prod.yml up --build -d; then
    echo ""
    echo "🚀  Containers started! Waiting for backend to be ready..."
    echo ""
    
    # Wait for backend to be ready
    echo "⏳  Waiting for backend to start..."
    backend_ready=false
    for i in {1..30}; do
        if curl -f http://localhost:8080/actuator/health > /dev/null 2>&1; then
            echo "✅  Backend is ready!"
            backend_ready=true
            break
        else
            echo "⏳  Attempt $i/30: Backend not ready yet..."
            sleep 2
        fi
    done
    
    if [ "$backend_ready" = true ]; then
        echo ""
        echo "🎉  PRODUCTION environment started successfully!"
    else
        echo ""
        echo "💥  Backend failed to start!"
        echo ""
        echo "    ┌─────────────────────────────────────┐"
        echo "    │                                     │"
        echo "    │    Backend is not responding...     │"
        echo "    │                                     │"
        echo "    │        Check the logs:              │"
        echo "    │  docker compose -f docker-compose-  │"
        echo "    │        prod.yml logs backend        │"
        echo "    │                                     │"
        echo "    └─────────────────────────────────────┘"
        echo ""
        echo "Error: Backend failed to start within the timeout period."
        echo "Please check the backend logs for more details."
        exit 1
    fi
    echo ""
    echo "    ┌─────────────────────────────────────┐"
    echo "    │                                     │"
    echo "    │   🚀 Production app is ready! 🚀    │"
    echo "    │                                     │"
    echo "    └─────────────────────────────────────┘"
    echo ""
    echo "Frontend: http://localhost:4200"
    echo "Backend: http://localhost:8080"
    echo "Database: localhost:55432"
    echo ""
    echo "To view logs: docker compose -f docker-compose-prod.yml logs -f"
    echo "To stop: ./stop-prod.sh"
else
    echo ""
    echo "💥  Something went wrong!"
    echo ""
    echo "    ┌─────────────────────────────────────┐"
    echo "    │                                     │"
    echo "    │   Container build failed...         │"
    echo "    │                                     │"
    echo "    │   Check the logs above!             │"
    echo "    │                                     │"
    echo "    └─────────────────────────────────────┘"
    echo ""
    echo "Error: Failed to start production environment. Please check the error messages above."
    exit 1
fi 