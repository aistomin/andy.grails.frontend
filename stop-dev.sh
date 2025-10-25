#!/bin/bash

echo "Stopping Andy Grails App..."

# NUCLEAR OPTION: Complete annihilation
echo ""
echo "💥  FULL STOP - Removing everything..."
echo ""

# Stop containers and remove volumes
echo "🧹  Stopping containers and removing volumes..."
docker compose -f docker-compose-dev.yml down --remove-orphans -v

# Remove project-specific images
echo "🧹  Removing images..."
docker rmi andy-grails-frontend_frontend-dev 2>/dev/null || true
docker rmi andygrails/andy-grails-backend:latest 2>/dev/null || true

# Prune build cache
echo "🧹  Pruning Docker build cache..."
docker builder prune -af --filter "until=24h" 2>/dev/null || true

# Remove dangling images
echo "🧹  Removing dangling images..."
docker image prune -af 2>/dev/null || true

if [ $? -eq 0 ]; then
    echo ""
    echo "🛑  The App stopped and purged!"
    echo ""
    echo "    ┌─────────────────────────────────────┐"
    echo "    │                                     │"
    echo "    │   🧡 Everything is GONE! 🧡         │"
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