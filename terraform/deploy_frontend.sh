
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

# Get CloudFront distribution ID
echo "Getting CloudFront distribution ID..."
DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?Comment=='TuCoach AI Landing Page Distribution'].Id" --output text)

if [ -n "$DISTRIBUTION_ID" ] && [ "$DISTRIBUTION_ID" != "None" ]; then
    echo "Creating CloudFront invalidation for distribution: $DISTRIBUTION_ID"
    aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
    echo "CloudFront invalidation created. Changes may take a few minutes to propagate."
else
    echo "No CloudFront distribution found. Skipping invalidation."
fi

echo "Deployment complete!"
if [ -n "$DISTRIBUTION_ID" ] && [ "$DISTRIBUTION_ID" != "None" ]; then
    CLOUDFRONT_URL=$(aws cloudfront get-distribution --id $DISTRIBUTION_ID --query "Distribution.DomainName" --output text)
    echo "CloudFront URL: https://$CLOUDFRONT_URL"
fi
