#!/bin/bash

echo "Stopping Andy Grails PRODUCTION environment..."

# Stop containers
if docker compose -f docker-compose-prod.yml down --remove-orphans; then
    echo ""
    echo "🛑  PRODUCTION environment stopped!"
    echo ""
    echo "    ┌─────────────────────────────────────┐"
    echo "    │                                     │"
    echo "    │ 🧡 Production containers sleeping 🧡│"
    echo "    │                                     │"
    echo "    └─────────────────────────────────────┘"
    echo ""
    echo "To start again: ./start-prod.sh"
else
    echo ""
    echo "💥  Failed to stop production environment!"
    echo ""
    echo "    ┌─────────────────────────────────────┐"
    echo "    │                                     │"
    echo "    │        Something went wrong...      │"
    echo "    │                                     │"
    echo "    │        Check the logs above!        │"
    echo "    │                                     │"
    echo "    └─────────────────────────────────────┘"
    echo ""
    echo "Error: Failed to stop production environment. Please check the error messages above."
    exit 1
fi 