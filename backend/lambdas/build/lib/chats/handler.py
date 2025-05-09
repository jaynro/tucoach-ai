"""
Lambda for the chats resource.
"""

import json
import logging
import os
from typing import Optional

import boto3
from aws_lambda_powertools import Tracer
from aws_lambda_powertools.event_handler import APIGatewayRestResolver
from aws_lambda_powertools.utilities.typing import LambdaContext

# Initialize utilities
logger = logging.getLogger(__name__)
tracer = Tracer()
app = APIGatewayRestResolver()

# Initialize Cognito client
dynamodb = boto3.resource("dynamodb")
DYNAMODB_TABLE = os.environ.get("DYNAMODB_TABLE", "TuCoachAi")
table = dynamodb.Table(DYNAMODB_TABLE)

# CORS headers
CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": (
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
    ),
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
}


@app.post("/chats")
@tracer.capture_method
def create_chat() -> tuple[dict[str, str], Optional[int]]:  # noqa: PLR0911
    """Creates a new chat in the system"""
    logger.info("Creating new chat")
    return {"message": "Chat created successfully"}, 200


@tracer.capture_lambda_handler
def lambda_handler(event: dict, context: LambdaContext) -> dict:
    """Main Lambda handler function"""
    logger.info("Event received: %s", json.dumps(event))

    # Handle OPTIONS requests directly for CORS preflight
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    # Process the event with the API Gateway resolver
    response = app.resolve(event, context)

    # Ensure CORS headers are included in the response
    if "headers" not in response:
        response["headers"] = {}
    response["headers"].update(CORS_HEADERS)

    # Log the response
    logger.info("Response sent", response=response)

    return response
