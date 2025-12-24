from pydantic import BaseModel

class AnswerRequest(BaseModel):
    question_id: int
    answer: str

class FeedbackResponse(BaseModel):
    score: int
    feedback: str
    improved_answer: str

class Question(BaseModel):
    id: int
    question: str

