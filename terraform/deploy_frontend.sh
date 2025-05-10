
#!/bin/bash
set -e

# Get the directory of the script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

# Build the React app
echo "Building React app..."
cd "$PROJECT_ROOT/frontend"
npm run build

# Sync the build folder with the S3 bucket
# Get the region where the S3 bucket is located
BUCKET_REGION=$(aws s3api get-bucket-location --bucket tucoachai-website-295070998832 --output text)
[ "$BUCKET_REGION" = "None" ] && BUCKET_REGION="us-east-2"
echo "Deploying to S3 bucket..."
aws s3 sync build/ s3://tucoachai-website-295070998832/ --delete --region $BUCKET_REGION

echo "Deployment complete! Your site should be available at https://piggy.precisionbytes.io"
