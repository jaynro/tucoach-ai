import openai
import os

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Static prompt templates
QUESTION_PROMPT_TEMPLATE = "Generate 3 technical interview questions for a {role} {seniority}."
FEEDBACK_PROMPT_TEMPLATE = "Provide feedback for the following answers to interview questions: {qa_pairs}"


def generate_mock_interview(role: str, seniority: str):
    prompt = QUESTION_PROMPT_TEMPLATE.format(role=role, seniority=seniority)
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a technical interviewer."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.7,
    )
    questions = response.choices[0].message.content.strip().split("\n")
    return [q for q in questions if q.strip()]


def generate_feedback(questions: list, answers: list):
    qa_pairs = "\n".join(
        f"Q: {q}\nA: {a}" for q, a in zip(questions, answers)
    )
    prompt = FEEDBACK_PROMPT_TEMPLATE.format(qa_pairs=qa_pairs)
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are an interview coach. Provide structured feedback."},
            {"role": "user", "content": prompt},
        ],
        temperature=0.7,
    )
    feedback_items = response.choices[0].message.content.strip().split("\n")
    return {
        "questions": questions,
        "answers": answers,
        "feedback": feedback_items,
        "overall_score": round(7 + 3 * (0.5 - response.usage.total_tokens % 100 / 100), 2),  # Mock score
    }
