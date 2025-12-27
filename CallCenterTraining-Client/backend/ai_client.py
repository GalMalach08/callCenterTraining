import os
import httpx

AI_ENGINE_URL = os.getenv("AI_ENGINE_URL", "http://localhost:9000/evaluate")

async def get_ai_feedback(question: str, answer: str):
    payload = {
        "question": question,
        "answer": answer
    }

    async with httpx.AsyncClient(timeout=20) as client:
        response = await client.post(AI_ENGINE_URL, json=payload)
        response.raise_for_status()
        return response.json()

