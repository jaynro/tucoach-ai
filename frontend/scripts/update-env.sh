#!/bin/bash

# This script updates the WebSocket URL and API URL in the .env.production file
# It should be run during the deployment process

# Check if the WebSocket URL is provided
if [ -z "$1" ] || [ -z "$2" ]; then
  echo "Error: WebSocket URL and API URL are required"
  echo "Usage: ./update-env.sh <websocket-url> <api-url>"
  exit 1
fi

# Create the .env.production file with both URLs
cat > .env.production << EOF
# Production environment variables
# This will be replaced with the actual WebSocket URL from Terraform outputs
REACT_APP_WEBSOCKET_URL=$1
# This will be replaced with the actual API URL from Terraform outputs
REACT_APP_API_URL=$2
EOF

echo "Updated .env.production with WebSocket URL: $1 and API URL: $2"