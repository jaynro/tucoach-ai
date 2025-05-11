import os
import requests
from pydantic import BaseModel

# Set your OpenRouter API Key
API_KEY = os.getenv("OPENROUTER_API_KEY")
HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

API_URL = "https://openrouter.ai/api/v1/chat/completions"

# Pydantic message model
class ChatMessage(BaseModel):
    role: str  # 'system', 'user', 'assistant'
    content: str

# Initial system prompt: bot is quizmaster
history = [
    ChatMessage(role="system", content="You are a Java interview bot. You ask one Java technical question at a time and wait for the user's answer."),
    ChatMessage(role="user", content="Start the first question."),
]

def get_bot_question():
    payload = {
        "model": "openai/gpt-3.5-turbo",  # Use OpenRouter-compatible model
        "messages": [msg.dict() for msg in history]
    }
    response = requests.post(API_URL, headers=HEADERS, json=payload)
    response.raise_for_status()
    message = response.json()["choices"][0]["message"]["content"]
    history.append(ChatMessage(role="assistant", content=message))
    return message

def submit_answer(answer: str):
    history.append(ChatMessage(role="user", content=answer))
    payload = {
        "model": "openai/gpt-3.5-turbo",
        "messages": [msg.dict() for msg in history]
    }
    response = requests.post(API_URL, headers=HEADERS, json=payload)
    response.raise_for_status()
    feedback = response.json()["choices"][0]["message"]["content"]
    history.append(ChatMessage(role="assistant", content=feedback))
    return feedback

# Run the interactive loop
if __name__ == "__main__":
    while True:
        question = get_bot_question()
        print(f"\n🤖 Bot: {question}\n")
        user_answer = input("Your answer (or type 'exit'): ")
        if user_answer.lower() == "exit":
            break
        evaluation = submit_answer(user_answer)
        print(f"\n🧠 Bot's Feedback: {evaluation}\n")
