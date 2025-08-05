#!/bin/bash

echo "Starting Andy Grails App in the Dev Mode..."

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
if docker-compose up --build -d; then
    echo ""
    echo "🚀  Containers started! Waiting for backend to be ready..."
    echo ""
    
    # Wait for backend to be ready
    echo "⏳  Waiting for backend to start..."
    for i in {1..30}; do
        if curl -f http://localhost:8080/actuator/health > /dev/null 2>&1; then
            echo "✅  Backend is ready!"
            break
        else
            echo "⏳  Attempt $i/30: Backend is not ready yet..."
            sleep 2
        fi
    done
    
    echo ""
    echo "🎉  The App started successfully!"
    echo ""
    echo "    ┌─────────────────────────────────────┐"
    echo "    │                                     │"
    echo "    │   🧡 Your App is ready to rock! 🧡  │"
    echo "    │                                     │"
    echo "    └─────────────────────────────────────┘"
    echo ""
    echo "Frontend: http://localhost:4200"
    echo "Backend: http://localhost:8080"
    echo "Database: localhost:55432"
    echo ""
    echo "To view logs: docker-compose logs -f"
    echo "To stop: ./stop.sh"
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
    echo "Error: Failed to start the App. Please check the error messages above."
    exit 1
fi 