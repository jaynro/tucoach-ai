import React, { useState, useEffect } from 'react';
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
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col p-5 max-w-7xl mx-auto w-full">
          {!isInterviewStarted ? (
            <div className="flex flex-col items-center justify-center mt-24 text-center">
              <h2 className="text-4xl mb-2 text-gray-800 font-bold">Welcome to TuCoach AI</h2>
              <p className="text-xl mb-8 text-gray-600">Your AI-powered interview coach</p>
              <div className="flex flex-col w-full max-w-md">
                <input
                  type="text"
                  placeholder="Enter interview ID"
                  value={interviewId}
                  onChange={(e) => setInterviewId(e.target.value)}
                  className="px-4 py-3 text-base border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button onClick={() => startInterview(interviewId)}
                  disabled={!interviewId.trim()}
                  className="px-5 py-3 bg-primary hover:bg-primary-dark text-white rounded-md text-base transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
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
