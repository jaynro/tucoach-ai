#!/bin/bash

# This script updates the WebSocket URL in the .env.production file
# It should be run during the deployment process

# Check if the WebSocket URL is provided
if [ -z "$1" ]; then
  echo "Error: WebSocket URL is required"
  echo "Usage: ./update-env.sh <websocket-url>"
  exit 1
fi

# Update the WebSocket URL in the .env.production file
echo "REACT_APP_WEBSOCKET_URL=$1" > .env.production

echo "Updated .env.production with WebSocket URL: $1"