import React, { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';
import Message from './Message';
import { useWebSocketContext } from '../context/WebSocketContext';
import ErrorMessage from './ErrorMessage';
import { createMessage } from '../utils/websocket';
import LoadingSpinner from './LoadingSpinner';

function ChatInterface({ interviewId }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
  const messagesEndRef = useRef(null);
  
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
    <div className="chat-interface">
      <div className="chat-header">
        <h2>Interview Session</h2>
        <div className="connection-status">
          Status: <span className={`status-${connectionStatus}`}>{connectionStatus}</span>
        </div>
      </div>
      
      {error && (
        <ErrorMessage 
          message={error} 
          onDismiss={() => setError(null)} 
        />
      )}
      <div className="messages-container">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
        {isWaitingForResponse && (
          <div className="loading-indicator">
            <LoadingSpinner size="small" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="message-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          disabled={connectionStatus !== 'connected'}
        />
        <button 
          type="submit" 
          disabled={!input.trim() || connectionStatus !== 'connected'}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatInterface;