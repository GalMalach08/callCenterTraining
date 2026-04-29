from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from schemas import AnswerRequest, FeedbackResponse, Question, AIResponse
from ai_client import get_ai_feedback
from questions import QUESTIONS
import httpx

USE_MOCK_AI = False
AI_API_URL = "https://tomerbabila-customer-support-api.hf.space/api/predict"

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


def generate_hebrew_feedback(ai_response: AIResponse) -> str:
    label = ai_response.predicted_label
    good_prob = ai_response.probs.good
    bad_prob = ai_response.probs.bad

    if label == "good":
        if good_prob >= 0.9:
            return "תשובה מצוינת! התשובה שלך מושלמת."
        elif good_prob >= 0.75:
            return "תשובה טובה מאוד! כל הכבוד."
        elif good_prob >= 0.6:
            return "תשובה סבירה, אבל יש מקום לשיפור קל."
        else:
            return "התשובה בכיוון הנכון, אך מומלץ לשפר אותה."
    else:
        if bad_prob >= 0.9:
            return "התשובה לא מתאימה בכלל. יש לנסות שוב מההתחלה."
        elif bad_prob >= 0.75:
            return "התשובה לא מספיק טובה. נסה לשפר משמעותית."
        elif bad_prob >= 0.6:
            return "התשובה דורשת שיפור. נסה להוסיף פרטים ולדייק יותר."
        else:
            return "התשובה לא רעה, אך יש מה לשפר. נסה שוב."


async def get_feedback_ai(payload: AnswerRequest) -> FeedbackResponse:
    try:
        async with httpx.AsyncClient(timeout=10) as client:
            response = await client.post(
                AI_API_URL,
                json={"text": payload.answer_text} 
            )

        response.raise_for_status()
        data = response.json()
        ai_response = AIResponse(**data)    

        feedback = generate_hebrew_feedback(ai_response)
        good_prob = ai_response.probs.good
        score = int(good_prob * 10)

        return FeedbackResponse(
            score=score,
            feedback=feedback,
        )

    except httpx.RequestError:
        raise HTTPException(status_code=502, detail="AI service unavailable")
    except httpx.HTTPStatusError:
        raise HTTPException(status_code=502, detail="AI service error")