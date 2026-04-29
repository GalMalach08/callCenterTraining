from pydantic import BaseModel

class AnswerRequest(BaseModel):
    question_id: int
    question_text: str
    answer_text: str

class Probs(BaseModel):
    bad: float
    good: float

class AIResponse(BaseModel):
    probs: Probs
    predicted_label: str
    confidence: float

class FeedbackResponse(BaseModel):
    score: int
    feedback: str

class Question(BaseModel):
    id: int
    title: str
    category: str
    difficulty: str