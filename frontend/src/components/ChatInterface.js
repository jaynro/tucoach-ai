import React, { useState, useEffect, useRef } from 'react';
import Message from './Message';
import { useWebSocketContext } from '../context/WebSocketContext';
import ErrorMessage from './ErrorMessage';
import { createMessage } from '../utils/websocket';
import LoadingSpinner from './LoadingSpinner';
// Import Microphone and Stop icons
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/solid';

function ChatInterface({ interviewId }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const messagesEndRef = useRef(null);
  
  // New state variables for speech recognition
  const [isRecording, setIsRecording] = useState(false);
  const [speechApiSupported, setSpeechApiSupported] = useState(false);
  const recognitionRef = useRef(null);
  
  const { sendMessage, lastMessage, connectionStatus, error: wsError } = useWebSocketContext();


  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle WebSocket errors
  useEffect(() => {
    if (wsError) {
      setError(wsError);
    }
  }, [wsError]);

  // Initialize SpeechRecognition
  useEffect(() => {
    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      setSpeechApiSupported(true);
      const recognitionInstance = new SpeechRecognitionAPI();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript;
        setInput(prevInput => prevInput + (prevInput.length > 0 && prevInput.slice(-1) !== ' ' ? ' ' : '') + transcript + ' ');
        setIsRecording(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        let errorMessage = `Speech recognition error: ${event.error}.`;
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            errorMessage = "Microphone access denied. Please enable microphone permissions in your browser settings.";
        } else if (event.error === 'no-speech') {
            errorMessage = "No speech was detected. Please try again.";
        }
        setError(errorMessage);
        setIsRecording(false);
      };

      recognitionInstance.onend = () => {
        // Ensure recording state is reset if stopped for other reasons (e.g. silence timeout)
        setIsRecording(false);
      };
      
      recognitionRef.current = recognitionInstance;
    } else {
      setSpeechApiSupported(false);
      console.warn("Speech recognition not supported in this browser.");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // Handle incoming messages
  useEffect(() => {
    if (lastMessage) {
      // lastMessage is already parsed in the WebSocketContext
      const message = lastMessage;
      if (message) {
        setMessages(prev => [...prev, {
          text: message.message,
          sender: 'bot',
          type: message.type || 'response'
        }]);

        // Check if it's an error message
        if (message.type === 'error') {
          setError(message.message);
        }
        
        // No longer waiting for a response
        setIsWaitingForResponse(false);
      }
    }
  }, [lastMessage]);

  // Add a welcome message when the component mounts
  useEffect(() => {
    setMessages([
      {
        text: 'Welcome to your interview session! I\'m your AI interview coach. How can I help you today?',
        sender: 'bot',
        type: 'response'
      }
    ]);
  }, []);

  const handleToggleRecording = () => {
    if (!speechApiSupported) {
      setError("Speech recognition is not supported in this browser.");
      return;
    }
    if (recognitionRef.current) {
      if (isRecording) {
        recognitionRef.current.stop();
        // setIsRecording(false); // onend or onresult will handle this
      } else {
        setError(null); // Clear previous errors before starting new recording
        try {
            recognitionRef.current.start();
            setIsRecording(true);
        } catch (e) {
            console.error("Error starting speech recognition:", e);
            setError("Could not start voice recording. Please ensure microphone permissions are granted.");
            setIsRecording(false);
        }
      }
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message to the chat
    setMessages(prev => [...prev, {
      text: input,
      sender: 'user'
    }]);
    
    // Create and send message
    const messageObj = createMessage(input, interviewId);
    sendMessage(messageObj);
    
    // Set waiting for response
    setIsWaitingForResponse(true);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[80vh] bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-secondary-light border-b border-secondary">
        <h2 className="text-xl font-semibold text-gray-800">Interview Session</h2>
        <div className="text-sm text-gray-600">
          Status: <span className={`font-bold ${
            connectionStatus === 'connected' ? 'text-green-600' : 
            connectionStatus === 'connecting' ? 'text-yellow-600' : 'text-red-600'
          }`}>{connectionStatus}</span>
        </div>
      </div>
      
      {error && (
        <ErrorMessage message={error} onDismiss={() => setError(null)} />
      )}
      {!speechApiSupported && connectionStatus === 'connected' && (
        <div className="p-2 bg-yellow-100 text-yellow-700 text-sm text-center">
          Speech recognition is not supported in this browser. Please type your responses.
        </div>
      )}
      <div className="flex-1 p-5 overflow-y-auto flex flex-col">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
        {isWaitingForResponse && (
          <div className="flex justify-center items-center p-3">
            <LoadingSpinner size="small" />
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>
      
      <form className="flex p-4 border-t border-secondary items-center" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isRecording ? "Listening..." : "Type your message here..."}
          disabled={connectionStatus !== 'connected' || isRecording}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-md mr-3 text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
        />
        {speechApiSupported && (
          <button
            type="button"
            onClick={handleToggleRecording}
            disabled={connectionStatus !== 'connected'}
            className={`p-3 rounded-md text-white mr-2 transition-colors ${
              isRecording
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } disabled:bg-gray-300 disabled:cursor-not-allowed`}
            aria-label={isRecording ? "Stop recording" : "Start recording"}
          >
            {isRecording ? <StopIcon className="h-5 w-5" /> : <MicrophoneIcon className="h-5 w-5" />}
          </button>
        )}
        <button 
          type="submit" 
          disabled={!input.trim() || connectionStatus !== 'connected' || isRecording}
          className="px-5 py-3 bg-primary hover:bg-primary-dark text-white rounded-md text-base transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Send
        </button> 
      </form>
    </div>
  );
}

export default ChatInterface;