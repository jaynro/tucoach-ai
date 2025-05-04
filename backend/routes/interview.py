from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database_and_user_model import get_db, User
from schemas.interview import InterviewRequest, InterviewFeedback
from services.openai_service import generate_mock_interview, generate_feedback

router = APIRouter()

@router.post("/start", response_model=InterviewFeedback)
def start_mock_interview(request: InterviewRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == request.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    questions = generate_mock_interview(request.role, request.seniority)
    feedback = generate_feedback(questions, request.answers)

    return feedback
