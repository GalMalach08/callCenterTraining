from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from schemas import AnswerRequest, FeedbackResponse, Question
from ai_client import get_ai_feedback
from questions import QUESTIONS
import httpx

USE_MOCK_AI = True
AI_API_URL = "https://future-ai-api.com/analyze"

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/questions", response_model=List[Question])
def get_questions() -> List[Question]:
    return QUESTIONS


@app.post("/answer", response_model=FeedbackResponse)
async def submit_answer(payload: AnswerRequest):
    if USE_MOCK_AI:
        return get_feedback_mock(payload)

    return await get_feedback_ai(payload)


def get_feedback_mock(payload: AnswerRequest) -> FeedbackResponse:
    return FeedbackResponse(
        score=8,
        feedback="התשובה בסדר, אבל אפשר לשפר.",
        improved_answer=f"נסי לענות כך: {payload.answer_text}"
    )


async def get_feedback_ai(payload: AnswerRequest) -> FeedbackResponse:
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.post(
                AI_API_URL,
                json=payload.dict()
            )

        response.raise_for_status()

        return FeedbackResponse(**response.json())

    except httpx.RequestError:
        raise HTTPException(status_code=502, detail="AI service unavailable")

    except httpx.HTTPStatusError:
        raise HTTPException(status_code=502, detail="AI service error")