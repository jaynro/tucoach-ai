import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import { WebSocketProvider } from './context/WebSocketContext';
import { getInterviewId, storeInterviewId } from './utils/storage';
import { createInterview } from './services/ApiService';
function App() {
  const [interviewId, setInterviewId] = useState(() => getInterviewId() || '');
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);

  // Check if we have a stored interview ID
  useEffect(() => {
    // if (interviewId) {
    //   setIsInterviewStarted(true);
    // }
  }, [interviewId]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const startInterview = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Create a new interview via API
      const response = await createInterview();
      
      // Use the interview ID from the response
      const newInterviewId = response.interview_id;
      setInterviewId(newInterviewId);
      setIsInterviewStarted(true);
      storeInterviewId(newInterviewId);
    } catch (err) {
      setError('Error al crear la entrevista. Por favor, inténtalo de nuevo.');
      console.error('Error starting interview:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WebSocketProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col p-5 max-w-7xl mx-auto w-full">
          {!isInterviewStarted ? (
            <div className="flex flex-col items-center justify-center mt-24 text-center">
              <h2 className="text-4xl mb-2 text-gray-800 font-bold">Bienvenido a TuCoach AI</h2>
              <p className="text-xl mb-6 text-gray-600">Tu entrenador de entrevistas con IA</p>
              
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}
              
              <div className="flex flex-col w-full max-w-md">
                <button 
                  onClick={startInterview}
                  disabled={isLoading}
                  className="px-5 py-3 bg-primary hover:bg-primary-dark text-white rounded-md text-base transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <LoadingSpinner size="small" />
                      <span className="ml-2">Creando Entrevista...</span>
                    </div>
                  ) : 'Iniciar Entrevista'}
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