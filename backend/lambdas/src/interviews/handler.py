"""
Lambda for the interviews resource.
"""

import json
import logging
import os
import uuid
from dataclasses import asdict
from typing import Optional

import boto3
from aws_lambda_powertools import Tracer
from aws_lambda_powertools.event_handler import APIGatewayRestResolver
from aws_lambda_powertools.utilities.typing import LambdaContext
from models import InterviewRecord

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
    "Access-Control-Allow-Headers": ("Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"),
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
}


@app.post("/interviews")
@tracer.capture_method
def create_interview() -> tuple[dict[str, str], Optional[int]]:  # noqa: PLR0911
    """Creates a new interview in the system"""
    body = app.current_event.json_body or {}
    
    try:
        # Generate a new UUID for the interview
        interview_id = str(uuid.uuid4())
        user_id = "anonymous"
        
        # Get optional role and seniority from request body
        role = body.get("role", "backend")
        seniority = body.get("seniority", "junior")
        
        # Validate role and seniority against allowed values
        allowed_roles = ["backend", "frontend", "devops"]
        allowed_seniorities = ["junior", "senior", "techlead", "architect"]
        if role not in allowed_roles or seniority not in allowed_seniorities:
            return {"message": f"Invalid role or seniority. Allowed roles: {allowed_roles}, allowed seniorities: {allowed_seniorities}"}, 400

        # Create an interview record
        interview = InterviewRecord(user_id=user_id, interview_id=interview_id, role=role, seniority=seniority)

        # Save to DynamoDB
        table.put_item(Item=interview.to_dynamodb_item())

        logger.info(f"Interview created with ID: {interview_id}")
        return asdict(interview), 200
    except Exception as e:
        logger.error(f"Error creating interview: {str(e)}")
        return {"message": f"Error creating interview: {str(e)}"}, 500


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
