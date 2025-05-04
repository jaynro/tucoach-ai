from fastapi import APIRouter, Depends, HTTPException, status, Header
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from database_and_user_model import get_db, User
import requests
import os

router = APIRouter()

COGNITO_REGION = "us-east-1"
COGNITO_USERPOOL_ID = "your-user-pool-id"
COGNITO_APP_CLIENT_ID = "your-app-client-id"
COGNITO_ISSUER = f"https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{COGNITO_USERPOOL_ID}"
JWKS_URL = f"{COGNITO_ISSUER}/.well-known/jwks.json"

# Cache JWKS
jwks = requests.get(JWKS_URL).json()

from jose.utils import base64url_decode
from jose import jwk

def get_public_key(token):
    headers = jwt.get_unverified_header(token)
    kid = headers["kid"]
    for key in jwks["keys"]:
        if key["kid"] == kid:
            return jwk.construct(key)
    raise HTTPException(status_code=403, detail="Public key not found.")

def decode_cognito_token(token: str):
    try:
        key = get_public_key(token)
        decoded_token = jwt.decode(token, key, algorithms=["RS256"], audience=COGNITO_APP_CLIENT_ID, issuer=COGNITO_ISSUER)
        return decoded_token
    except JWTError as e:
        raise HTTPException(status_code=403, detail="Invalid token.")

@router.post("/login")
async def login_with_cognito(id_token: str = Header(...), db: Session = Depends(get_db)):
    payload = decode_cognito_token(id_token)
    email = payload.get("email")
    sub = payload.get("sub")
    name = payload.get("name", "")

    if not email or not sub:
        raise HTTPException(status_code=400, detail="Invalid token payload")

    user = db.query(User).filter(User.aws_sub == sub).first()
    if not user:
        user = User(email=email, aws_sub=sub, full_name=name)
        db.add(user)
    else:
        user.email = email  # sync updates
        user.full_name = name

    db.commit()
    db.refresh(user)

    return {"message": "Login successful", "user": {"id": user.id, "email": user.email, "name": user.full_name, "plan": user.subscription_plan}}
xs