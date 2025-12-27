from pydantic import BaseModel

class AnswerRequest(BaseModel):
    question_id: int
    question_text: str
    answer_text: str

class FeedbackResponse(BaseModel):
    score: int
    feedback: str
    improved_answer: str

class Question(BaseModel):
    id: int
    title: str
    category: str
    difficulty: str