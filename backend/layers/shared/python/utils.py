import boto3
import logging
from typing import Optional

logger = logging.getLogger(__name__)

def get_ssm_parameter(parameter_name: str, with_decryption: bool = True) -> Optional[str]:
    """
    Retrieve a parameter from AWS SSM Parameter Store.
    
    Args:
        parameter_name (str): The name of the parameter in SSM Parameter Store
        with_decryption (bool): Whether to decrypt the parameter value if it's encrypted
        
    Returns:
        Optional[str]: The parameter value, or None if the parameter doesn't exist
    """
    try:
        ssm_client = boto3.client("ssm")
        response = ssm_client.get_parameter(Name=parameter_name, WithDecryption=with_decryption)
        return response["Parameter"]["Value"]
    except Exception as e:
        logger.error(f"Error retrieving SSM parameter {parameter_name}: {str(e)}")
        return None