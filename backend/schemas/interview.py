from pydantic import BaseModel
from typing import List, Literal

class InterviewRequest(BaseModel):
    user_id: int
    role: Literal["backend", "frontend", "devops"]
    seniority: Literal["junior", "senior", "techlead", "architect"]
    answers: List[str]  # User's answers to the mock interview questions

class InterviewFeedback(BaseModel):
    questions: List[str]
    answers: List[str]
    feedback: List[str]
    overall_score: float
