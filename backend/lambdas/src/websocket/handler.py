import json
import logging
import os

import boto3
from boto3.dynamodb.conditions import Key
from jinja2 import Template
from models import InterviewRecord
from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider
from utils import get_ssm_parameter

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Initialize DynamoDB client
dynamodb = boto3.resource("dynamodb")
connections_table = dynamodb.Table(os.environ.get("DYNAMODB_TABLE", "TuCoachAi-prod"))

OPENROUTER_SECRET_NAME = os.getenv("OPENROUTER_SECRET_NAME", "/interviews/openrouter-key")
openrouter_api_key = get_ssm_parameter(OPENROUTER_SECRET_NAME)

# Error messages
INTERVIEW_ID_MISSING_ERROR = "Missing required parameter: interview_id"
INTERVIEW_NOT_FOUND_ERROR = "Interview not found with the provided interview_id"
# Set your OpenAI API key
# openai.api_key = os.getenv("OPENAI_API_KEY")

# Static prompt templates
QUESTION_PROMPT_TEMPLATE = "Generate 3 technical interview questions for a {{role}} {{seniority}}."
FEEDBACK_PROMPT_TEMPLATE = "Provide feedback for the following answers to interview questions: {qa_pairs}"


# Initialize API Gateway management client
def get_api_client(domain_name, stage):
    return boto3.client("apigatewaymanagementapi", endpoint_url=f"https://{domain_name}/{stage}")


def get_interview(interview_id: str, user_id=None) -> InterviewRecord:
    """
    Retrieve an interview record from DynamoDB by interview_id and user_id.

    Args:
        interview_id (str): The interview ID to validate
        user_id (str, optional): The user ID associated with the interview

    Returns:
        InterviewRecord: The validated interview record
    """
    try:
        logger.info(f"Validating interview_id: {interview_id}, user_id: {user_id}")
        user_id = "anonymous" if not user_id else user_id

        partition_key = f"USER#{user_id}#INTERVIEW#{interview_id}"
        response = connections_table.query(KeyConditionExpression=Key("partition_key").eq(partition_key))
        items = response.get("Items", [])
        logger.info(f"Found {len(items)} items for specific user_id and interview_id")
        if len(items) == 0:
            raise ValueError(INTERVIEW_NOT_FOUND_ERROR)
        return InterviewRecord.from_dynamodb_item(items[0])
    except Exception as e:
        logger.error(f"Error validating interview_id: {str(e)}")
        raise ValueError(f"Error validating interview_id: {str(e)}")


def lambda_handler(event, context):
    """
    Handler for WebSocket API events.

    This function handles the following WebSocket events:
    - $connect: When a client connects to the WebSocket API
    - $disconnect: When a client disconnects from the WebSocket API
    - message: When a client sends a message through the WebSocket
    - $default: Default route for unmatched route keys

    Args:
        event (dict): The event dict from API Gateway
        context (object): The Lambda context object

    Returns:
        dict: Response to be returned to the client
    """
    logger.info(f"Event received: {json.dumps(event)}")

    route_key = event.get("requestContext", {}).get("routeKey")
    connection_id = event.get("requestContext", {}).get("connectionId")
    domain_name = event.get("requestContext", {}).get("domainName")
    stage = event.get("requestContext", {}).get("stage")

    if not connection_id or not domain_name or not stage:
        logger.error("Missing required event data")
        return {"statusCode": 400, "body": "Missing required event data"}

    # Handle different route keys
    if route_key == "$connect":
        return handle_connect(connection_id, event)
    elif route_key == "$disconnect":
        return handle_disconnect(connection_id)
    elif route_key == "message":
        return handle_message(connection_id, domain_name, stage, event)
    else:  # $default
        return handle_default(connection_id, domain_name, stage, event)


def handle_connect(connection_id, event):
    """
    Handle WebSocket $connect event.

    Stores the connection ID in DynamoDB for later use.

    Args:
        connection_id (str): The WebSocket connection ID
        event (dict): The event dict from API Gateway

    Returns:
        dict: Response with status code 200
    """
    logger.info(f"Client connected: {connection_id}")

    # Store connection ID in DynamoDB
    try:
        connections_table.put_item(
            Item={
                "partition_key": f"CONNECTION#{connection_id}",
                "sort_key": "0",
                "connected_at": event.get("requestContext", {}).get("connectedAt", ""),
                "user_data": {},  # Can be populated with user-specific data
            }
        )
        return {"statusCode": 200, "body": "Connected"}
    except Exception as e:
        logger.error(f"Error storing connection: {str(e)}")
        return {"statusCode": 500, "body": "Failed to connect"}


def handle_disconnect(connection_id):
    """
    Handle WebSocket $disconnect event.

    Removes the connection ID from DynamoDB.

    Args:
        connection_id (str): The WebSocket connection ID

    Returns:
        dict: Response with status code 200
    """
    logger.info(f"Client disconnected: {connection_id}")

    # Remove connection ID from DynamoDB
    try:
        connections_table.delete_item(Key={"partition_key": f"CONNECTION#{connection_id}", "sort_key": "0"})
        return {"statusCode": 200, "body": "Disconnected"}
    except Exception as e:
        logger.error(f"Error removing connection: {str(e)}")
        return {"statusCode": 500, "body": "Failed to disconnect"}


def handle_message(connection_id, domain_name, stage, event):
    """
    Handle WebSocket 'message' event.

    Processes the message from the client and sends a response.

    Args:
        connection_id (str): The WebSocket connection ID
        domain_name (str): The API Gateway domain name
        stage (str): The API Gateway stage
        event (dict): The event dict from API Gateway

    Returns:
        dict: Response with status code 200
    """
    logger.info(f"Message received from {connection_id}")

    # Parse the message body
    body = {}
    try:
        body = json.loads(event.get("body", "{}"))
        logger.info(f"Parsed message body: {body}")

        # Retrieve the interview
        interview_id = body.get("interview_id")
        if not interview_id:
            raise ValueError(INTERVIEW_ID_MISSING_ERROR)
        user_id = body.get("user_id")  # Optional, makes validation more efficient
        interview = get_interview(interview_id, user_id)

        logger.info(f"Retrieved interview: {interview}")

        # Continue with the rest of the message processing
        message = body.get("message", "")

        model = OpenAIModel(
            "qwen/qwen3-0.6b-04-28:free",
            provider=OpenAIProvider(
                api_key=openrouter_api_key,
                base_url="https://openrouter.ai/api/v1",
            ),
        )
        agent = Agent(
            model,
            system_prompt=Template(QUESTION_PROMPT_TEMPLATE).render(role=interview.role, seniority=interview.seniority),
        )

        logger.info("Running agent for message: %s", message)
        result = agent.run_sync(message)
        logger.info("Got agent result")
        response_message = result.output

        logger.info("Usage: %s", result.usage())

        # Initialize API client
        api_client = get_api_client(domain_name, stage)
        logger.info("API client initialized with domain name: %s and stage: %s", domain_name, stage)

        # Include interview_id in the response
        response_data = {"message": response_message, "type": "response", "interview_id": interview_id}

        # Send response back to the client
        logger.info("Sending response back to client with id: %s", connection_id)
        api_client.post_to_connection(ConnectionId=connection_id, Data=json.dumps(response_data))
        logger.info("Response sent")

        return {"statusCode": 200, "body": json.dumps({"message": "Message processed", "interview_id": interview_id})}
    except Exception as e:
        interview_id = body.get("interview_id", "") if body else ""
        logger.error(f"Error processing message: {str(e)}")

        # Try to send error message back to client
        try:
            api_client = get_api_client(domain_name, stage)
            api_client.post_to_connection(
                ConnectionId=connection_id,
                Data=json.dumps(
                    {
                        "message": f"Error processing message: {str(e)}",
                        "type": "error",
                        "interview_id": interview_id,  # Include interview_id if available
                    }
                ),
            )
        except Exception as send_error:
            logger.error(f"Error sending error message: {str(send_error)}")

        return {"statusCode": 500, "body": "Failed to process message"}


def handle_default(connection_id, domain_name, stage, event):
    """
    Handle WebSocket $default event.

    Processes messages that don't match any defined route.

    Args:
        connection_id (str): The WebSocket connection ID
        domain_name (str): The API Gateway domain name
        stage (str): The API Gateway stage
        event (dict): The event dict from API Gateway

    Returns:
        dict: Response with status code 200
    """
    logger.info(f"Default route message from {connection_id}")

    # Try to extract interview_id from the message body if possible
    interview_id = ""
    try:
        if event.get("body"):
            body = json.loads(event.get("body", "{}"))
            interview_id = body.get("interview_id", "")
            logger.info(f"Extracted interview_id from default route: {interview_id}")
    except Exception as e:
        logger.error(f"Error extracting interview_id from default route: {str(e)}")

    # Send error message back to the client
    try:
        api_client = get_api_client(domain_name, stage)
        api_client.post_to_connection(
            ConnectionId=connection_id,
            Data=json.dumps(
                {
                    "message": "Unsupported action. Please use 'message' action and include a valid interview_id.",
                    "type": "error",
                    # We can't include interview_id here as we don't have it for default route
                    "interview_id": interview_id,
                }
            ),
        )

        return {"statusCode": 200, "body": "Default route handled"}
    except Exception as e:
        logger.error(f"Error handling default route: {str(e)}")
        return {"statusCode": 500, "body": "Failed to handle default route"}
