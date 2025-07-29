#!/bin/bash

echo "Stopping Andy Grails environment..."

# Stop containers
if docker-compose -f docker-compose.dev.yml down; then
    echo ""
    echo "🛑  Environment stopped!"
    echo ""
    echo "    ┌─────────────────────────────────────┐"
    echo "    │                                     │"
    echo "    │   🧡 Containers are sleeping... 🧡   │"
    echo "    │                                     │"
    echo "    └─────────────────────────────────────┘"
    echo ""
    echo "To start again: ./start.sh"
else
    echo ""
    echo "💥  Failed to stop environment!"
    echo ""
    echo "    ┌─────────────────────────────────────┐"
    echo "    │                                     │"
    echo "    │   Something went wrong...           │"
    echo "    │                                     │"
    echo "    │   Check the logs above!             │"
    echo "    │                                     │"
    echo "    └─────────────────────────────────────┘"
    echo ""
    echo "Error: Failed to stop environment. Please check the error messages above."
    exit 1
fi 