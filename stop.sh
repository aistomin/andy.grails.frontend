#!/bin/bash

echo "Stopping Andy Grails App..."

# Stop containers
if docker-compose down; then
    echo ""
    echo "🛑  The App stopped!"
    echo ""
    echo "    ┌─────────────────────────────────────┐"
    echo "    │                                     │"
    echo "    │   🧡 Containers are sleeping... 🧡  │"
    echo "    │                                     │"
    echo "    └─────────────────────────────────────┘"
    echo ""
    echo "To start again: ./start.sh"
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