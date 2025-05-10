import React, { useState, useEffect } from 'react';
import './App.css';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import { WebSocketProvider } from './context/WebSocketContext';
import { getInterviewId, storeInterviewId } from './utils/storage';

function App() {
  const [interviewId, setInterviewId] = useState(() => getInterviewId() || '');
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);

  // Check if we have a stored interview ID
  useEffect(() => {
    if (interviewId) {
      setIsInterviewStarted(true);
    }
  }, [interviewId]);

  const startInterview = (id) => {
    setInterviewId(id);
    setIsInterviewStarted(true);
    storeInterviewId(id);
  };

  return (
    <WebSocketProvider>
      <div className="App">
        <Header />
        <main className="main-content">
          {!isInterviewStarted ? (
            <div className="start-interview">
              <h2>Welcome to TuCoach AI</h2>
              <p>Your AI-powered interview coach</p>
              <div className="interview-form">
                <input
                  type="text"
                  placeholder="Enter interview ID"
                  value={interviewId}
                  onChange={(e) => setInterviewId(e.target.value)}
                />
                <button 
                  onClick={() => startInterview(interviewId)}
                  disabled={!interviewId.trim()}
                >
                  Start Interview
                </button>
              </div>
            </div>
          ) : (
            <ChatInterface interviewId={interviewId} />
          )}
        </main>
      </div>
    </WebSocketProvider>
  );
}

export default App;