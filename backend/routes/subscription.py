from pydantic import BaseModel
from typing import Literal

class PlanUpdateRequest(BaseModel):
    user_id: int
    new_plan: Literal["basic", "standard", "premium"]

class PlanInfoResponse(BaseModel):
    user_id: int
    plan: str
