# TuCoach AI - Technical Specification

## Project Organization

### Folder Structure

The project is organized into three main directories:

```
tucoach-ai/
├── backend/         # Backend services and AWS Lambda functions
├── frontend/        # Frontend React application
├── terraform/       # Infrastructure as Code (IaC) for AWS resources
├── doc/             # Documentation
└── .github/         # GitHub Actions workflows for CI/CD
```

### Backend Architecture

The backend is built using AWS serverless services, primarily:

- AWS Lambda for compute
- Amazon API Gateway for REST API endpoints
- Amazon DynamoDB for data storage

#### Backend Directory Structure

```
backend/
├── lambdas/                 # Lambda function code
│   ├── src/                 # Source code for Lambda functions
│   │   └── interviews/      # Interview-related Lambda functions
│   │       └── handler.py   # Main Lambda handler
│   └── pyproject.toml       # Python project configuration
├── layers/                  # Lambda layers (shared code)
│   └── shared/              # Shared layer for common functionality
│       ├── python/          # Python code for the shared layer
│       │   ├── __init__.py
│       │   └── models.py    # Data models shared across functions
│       └── tests/           # Tests for shared code
```

#### Lambda Functions

Lambda functions are organized in the `backend/lambdas/src/` directory, with each functional area having its own subdirectory. Currently, the project includes:

- `interviews/`: Handles interview creation and management

Each Lambda function follows a standard structure with a `handler.py` file that contains the AWS Lambda handler function.

#### Lambda Layers

Shared code is organized in Lambda layers under `backend/layers/`. The main shared layer includes:

- `models.py`: Contains data models for DynamoDB records
- Common utilities and helper functions

Lambda layers are deployed separately and attached to Lambda functions, allowing code reuse across multiple functions.

### DynamoDB Table Structure

The application uses a single DynamoDB table with a composite key design pattern to support multiple entity types and access patterns.

#### Table Design

- **Table Name**: `TuCoachAi-${environment}`
- **Primary Key**: 
  - Partition Key: `partition_key` (String)
  - Sort Key: `sort_key` (String)

#### Record Types

The table stores different types of records, each with a specific format:

1. **Interview Records**:
   - `partition_key`: `USER#${user_id}#INTERVIEW#${interview_id}`
   - `sort_key`: Timestamp (for versioning/sorting)
   - Additional attributes:
     - `user_id`: Identifier of the user
     - `interview_id`: Unique identifier for the interview
     - `role`: Type of role (backend, frontend, devops)
     - `seniority`: Level of seniority (junior, senior, techlead, architect)
     - `created_at`: Creation timestamp
     - `updated_at`: Last update timestamp
     - `record_type`: "INTERVIEW"

#### Access Patterns

The table design supports the following access patterns:

1. Get all interviews for a specific user
2. Get a specific interview by ID
3. Get the latest version of an interview

### Frontend Structure

The frontend is organized as follows:

```
frontend/
├── App.js           # Main application component
└── pages/           # Application pages
    ├── InterviewPage.js  # Interview experience page
    ├── LoginPage.js      # User authentication page
    └── FeedbackPage.js   # Feedback collection page
```

### Infrastructure as Code (Terraform)

The infrastructure is defined using Terraform in the `terraform/` directory:

```
terraform/
├── main.tf                    # Main Terraform configuration
├── variables.tf               # Input variables
├── outputs.tf                 # Output values
├── dynamodb.tf                # DynamoDB table definition
├── lambda_interviews.tf       # Interview Lambda function resources
├── lambda_layers.tf           # Lambda layers configuration
├── api_gateway.tf             # API Gateway main configuration
└── api_gateway_interviews.tf  # API Gateway endpoints for interviews
```

## Deployment Process

The system is deployed using Terraform, which provisions all the necessary AWS resources:

1. **DynamoDB Table**: Creates the single-table design for all application data
2. **Lambda Layers**: Deploys shared code as Lambda layers
3. **Lambda Functions**: Deploys the application's Lambda functions with appropriate IAM roles and permissions
4. **API Gateway**: Sets up the REST API with proper routes, methods, and integrations
5. **CloudWatch**: Configures logging and monitoring

The deployment process is automated through GitHub Actions workflows defined in `.github/workflows/main.yml`, which run Terraform commands to apply the infrastructure changes when code is pushed to specific branches.
