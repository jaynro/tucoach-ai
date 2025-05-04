from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database_and_user_model import get_db, User
from schemas.subscription import PlanUpdateRequest, PlanInfoResponse

router = APIRouter()

@router.get("/{user_id}", response_model=PlanInfoResponse)
def get_user_subscription(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return {"user_id": user.id, "plan": user.subscription_plan}


@router.post("/update")
def update_subscription_plan(request: PlanUpdateRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == request.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.subscription_plan = request.new_plan
    db.commit()
    return {"message": "Subscription updated", "new_plan": user.subscription_plan}
