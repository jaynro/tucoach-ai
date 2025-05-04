# TuCoach AI – Backend (FastAPI)

This is the FastAPI backend for **TuCoach AI**, which handles user authentication, mock interview generation, OpenAI-powered feedback, and subscription tracking.

---

## 🚧 Requirements

- Python 3.10+
- OpenAI API key
- AWS Cognito credentials (User Pool ID, App Client ID)
- SQLite (default, already configured)

---

## ⚙️ Setup Instructions

### 1. Create and activate a virtual environment
```bash
python -m venv env
source env/bin/activate  # or .\env\Scripts\activate on Windows
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Set environment variables
Create a `.env` file or export manually:
```bash
export OPENAI_API_KEY=your_openai_api_key
```

Update `auth.py` with your AWS Cognito details:
```python
COGNITO_REGION = "us-east-1"
COGNITO_USERPOOL_ID = "your-user-pool-id"
COGNITO_APP_CLIENT_ID = "your-client-id"
```

---

## ▶️ Run the server locally
```bash
uvicorn main:app --reload
```

The server will run at: [http://localhost:8000](http://localhost:8000)

---

## 🧪 Useful Endpoints

- `POST /auth/login` — Log in via AWS Cognito ID token
- `POST /interview/start` — Start a mock interview and get feedback
- `GET /subscription/{user_id}` — View subscription
- `POST /subscription/update` — Change user plan

---

## 🐳 Run with Docker
```bash
docker build -t tucoach-ai-backend .
docker run -p 8000:8000 -e OPENAI_API_KEY=your_openai_key tucoach-ai-backend
```

---

## 📁 Project Structure
```
backend/
├── main.py
├── database_and_user_model.py
├── routes/
├── schemas/
├── services/
├── requirements.txt
└── Dockerfile
```

---

For full system setup (frontend, CI/CD, K8s): see root `/README.md`.
