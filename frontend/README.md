# TuCoach AI – Frontend (React)

This is the React-based frontend for **TuCoach AI**, which handles user login through AWS Cognito, mock interview setup, and displays AI-generated feedback.

---

## 🧰 Requirements

- Node.js 18+
- AWS Cognito configuration
- Backend API (default: http://localhost:8000)

---

## ⚙️ Setup Instructions

### 1. Install dependencies
```bash
npm install
```

### 2. Create an `.env` file
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_COGNITO_CLIENT_ID=your-app-client-id
REACT_APP_COGNITO_DOMAIN=your-domain.auth.us-east-1.amazoncognito.com
```

---

## ▶️ Run the Development Server
```bash
npm start
```
Open: [http://localhost:3000](http://localhost:3000)

---

## 🔑 Key Routes

- `/login` – Cognito login & token validation
- `/interview` – Role/seniority input + user answers
- `/feedback` – AI-powered feedback display

---

## 🐳 Docker Usage
```bash
docker build -t tucoach-ai-frontend .
docker run -p 3000:3000 \
  -e REACT_APP_API_URL=http://localhost:8000 \
  -e REACT_APP_COGNITO_CLIENT_ID=your-client-id \
  -e REACT_APP_COGNITO_DOMAIN=your-domain.auth.us-east-1.amazoncognito.com \
  tucoach-ai-frontend
```

---

## 📁 Directory Structure
```
frontend/
├── App.js
├── pages/
│   ├── LoginPage.js
│   ├── InterviewPage.js
│   └── FeedbackPage.js
├── .env.example
├── Dockerfile
└── README.md
```

---

See the root `/README.md` for end-to-end deployment, Kubernetes, and CI/CD setup.
