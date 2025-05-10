# Frontend Scripts

This directory contains utility scripts for the frontend application.

## update-env.sh

This script updates the WebSocket URL in the `.env.production` file. It should be run during the deployment process.

### Usage

```bash
./update-env.sh <websocket-url>
```

Example:

```bash
./update-env.sh wss://api-id.execute-api.region.amazonaws.com/v1
```

Make sure to make the script executable:

```bash
chmod +x update-env.sh
```