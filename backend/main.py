from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from schemas import AnswerRequest, FeedbackResponse, Question
from questions import QUESTIONS
from ai_client import get_ai_feedback

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/ping")
def ping() -> dict:
    return {"pong": True}

@app.get("/questions", response_model=List[Question])
def get_questions():
    return QUESTIONS

@app.post("/answer", response_model=FeedbackResponse)
async def submit_answer(payload: AnswerRequest):
    question_obj = next((q for q in QUESTIONS if q["id"] == payload.question_id), None)
    if question_obj is None:
        raise HTTPException(status_code=404, detail="Question not found")

    score = 8
    feedback = "התשובה בסדר, אבל אפשר לשפר."
    improved_answer = f"נסי לענות כך: {payload.answer}"

    return FeedbackResponse(
        score=score,
        feedback=feedback,
        improved_answer=improved_answer,
    )


@app.post("/answer", response_model=FeedbackResponse)
async def submit_answer(payload: AnswerRequest):
    question_obj = next((q for q in QUESTIONS if q["id"] == payload.question_id), None)
    if question_obj is None:
        raise HTTPException(status_code=404, detail="Question not found")

    # כרגע אפשר להחזיר תשובה פיקטיבית:
    return FeedbackResponse(
        score=8,
        feedback="התשובה בסדר, אבל אפשר לשפר",
        improved_answer=f"נסי לענות כך: {payload.answer}"
    )
