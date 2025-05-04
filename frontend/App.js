version: '3.8'

services:
  backend:
    build: .
    container_name: tucoach-ai-backend
    ports:
      - "8000:8000"
    environment:
      - OPENAI_API_KEY=your_openai_key_here
    volumes:
      - .:/app
    restart: always

  frontend:
    build:
      context: ./frontend
    container_name: tucoach-ai-frontend
    ports:
      - "3000:3000"
    stdin_open: true
    tty: true
    environment:
      - REACT_APP_API_URL=http://localhost:8000
    volumes:
      - ./frontend:/app
    restart: always
