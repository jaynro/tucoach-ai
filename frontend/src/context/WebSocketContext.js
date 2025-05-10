import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import WebSocketService from '../services/WebSocketService';

// Create context
const WebSocketContext = createContext(null);

// WebSocket URL from environment variables
const websocketUrl = process.env.REACT_APP_WEBSOCKET_URL || 'wss://localhost:3001/v1';

/**
 * WebSocket Provider component
 * @param {Object} props - Component props
 * @returns {JSX.Element} Provider component
 */
export const WebSocketProvider = ({ children }) => {
  const [service] = useState(() => new WebSocketService(websocketUrl));
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [lastMessage, setLastMessage] = useState(null);
  const [error, setError] = useState(null);

  // Connect to WebSocket on mount
  useEffect(() => {
    const handleOpen = () => {
      setConnectionStatus('connected');
      setError(null);
    };

    const handleClose = () => {
      setConnectionStatus('disconnected');
    };

    const handleError = (err) => {
      setConnectionStatus('error');
      setError('WebSocket connection error');
    };

    const handleMessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setLastMessage(data);
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
        setLastMessage(event.data);
      }
    };

    // Add event listeners
    service.addListener('open', handleOpen);
    service.addListener('close', handleClose);
    service.addListener('error', handleError);
    service.addListener('message', handleMessage);

    // Connect to WebSocket
    service.connect().catch(err => {
      setConnectionStatus('error');
      setError('Failed to connect to WebSocket');
    });

    // Clean up on unmount
    return () => {
      service.removeListener('open', handleOpen);
      service.removeListener('close', handleClose);
      service.removeListener('error', handleError);
      service.removeListener('message', handleMessage);
      service.disconnect();
    };
  }, [service]);

  // Send message function
  const sendMessage = useCallback((message) => {
    return service.sendMessage(message);
  }, [service]);

  // Connect function
  const connect = useCallback(() => {
    setConnectionStatus('connecting');
    return service.connect();
  }, [service]);

  // Disconnect function
  const disconnect = useCallback(() => {
    service.disconnect();
    setConnectionStatus('disconnected');
  }, [service]);

  // Context value
  const value = {
    connectionStatus,
    lastMessage,
    error,
    sendMessage,
    connect,
    disconnect
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

/**
 * Custom hook to use the WebSocket context
 * @returns {Object} WebSocket context value
 */
export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocketContext must be used within a WebSocketProvider');
  }
  return context;
};

export default WebSocketContext;