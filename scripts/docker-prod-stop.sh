#!/bin/bash

echo "Stopping Andy Grails production environment..."

# Stop production containers
if docker-compose down; then
    echo ""
    echo "🛑  Production environment stopped!"
    echo ""
    echo "    ┌─────────────────────────────────────┐"
    echo "    │                                     │"
    echo "    │   🧡 Service is offline... 🧡       │"
    echo "    │                                     │"
    echo "    └─────────────────────────────────────┘"
    echo ""
    echo "To start again: ./scripts/docker-prod.sh"
else
    echo ""
    echo "💥  Failed to stop production environment!"
    echo ""
    echo "    ┌─────────────────────────────────────┐"
    echo "    │                                     │"
    echo "    │   Something went wrong...           │"
    echo "    │                                     │"
    echo "    │   Check the logs above!             │"
    echo "    │                                     │"
    echo "    └─────────────────────────────────────┘"
    echo ""
    echo "Error: Failed to stop production environment. Please check the error messages above."
    exit 1
fi 