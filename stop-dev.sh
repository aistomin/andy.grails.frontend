#!/bin/bash

echo "Stopping Andy Grails App..."

# Stop containers and remove this project's locally built images and volumes
echo ""
echo "🧹  Stopping containers and removing images and volumes..."
if docker compose -f docker-compose-dev.yml down --rmi local -v --remove-orphans; then
    echo ""
    echo "🛑  The App stopped and cleaned up!"
    echo ""
    echo "    ┌─────────────────────────────────────┐"
    echo "    │                                     │"
    echo "    │   🧡 See you next time! 🧡          │"
    echo "    │                                     │"
    echo "    └─────────────────────────────────────┘"
    echo ""
    echo "To start fresh: ./start-dev.sh"
    echo ""
else
    echo ""
    echo "💥  Failed to stop the App!"
    echo ""
    echo "    ┌─────────────────────────────────────┐"
    echo "    │                                     │"
    echo "    │   Something went wrong...           │"
    echo "    │                                     │"
    echo "    │   Check the logs above!             │"
    echo "    │                                     │"
    echo "    └─────────────────────────────────────┘"
    echo ""
    echo "Error: Failed to stop the App. Please check the error messages above."
    exit 1
fi 