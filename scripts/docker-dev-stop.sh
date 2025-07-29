#!/bin/bash

echo "Stopping Andy Grails development environment..."

# Stop development containers
if docker-compose -f docker-compose.dev.yml down; then
    echo ""
    echo "🛑  Development environment stopped!"
    echo ""
    echo "    ┌─────────────────────────────────────┐"
    echo "    │                                     │"
    echo "    │   🧡 Containers are sleeping... 🧡   │"
    echo "    │                                     │"
    echo "    └─────────────────────────────────────┘"
    echo ""
    echo "To start again: ./scripts/docker-dev.sh"
else
    echo ""
    echo "💥  Failed to stop development environment!"
    echo ""
    echo "    ┌─────────────────────────────────────┐"
    echo "    │                                     │"
    echo "    │   Something went wrong...           │"
    echo "    │                                     │"
    echo "    │   Check the logs above!             │"
    echo "    │                                     │"
    echo "    └─────────────────────────────────────┘"
    echo ""
    echo "Error: Failed to stop development environment. Please check the error messages above."
    exit 1
fi 