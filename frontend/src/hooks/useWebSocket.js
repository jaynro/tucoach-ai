import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for managing WebSocket connections
 * @param {string} url - The WebSocket URL to connect to
 * @param {Object} options - Additional options for the WebSocket
 * @returns {Object} WebSocket state and methods
 */
function useWebSocket(url, options = {}) {
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [lastMessage, setLastMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  
  const socketRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);
  
  const { 
    reconnectInterval = 5000,
    reconnectAttempts = 10,
    autoReconnect = true,
  } = options;
  
  // Connect to WebSocket
  const connect = useCallback(() => {
    try {
      setConnectionStatus('connecting');
      
      // Create new WebSocket connection
      const socket = new WebSocket(url);
      socketRef.current = socket;
      
      // Setup event handlers
      socket.onopen = () => {
        setConnectionStatus('connected');
        setErrorMessage(null);
      };
      
      socket.onmessage = (event) => {
        setLastMessage(event.data);
      };
      
      socket.onclose = (event) => {
        setConnectionStatus('disconnected');
        
        // Attempt to reconnect if enabled
        if (autoReconnect && reconnectAttempts > 0) {
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        }
      };
      
      socket.onerror = (error) => {
        setErrorMessage('WebSocket error occurred');
        console.error('WebSocket error:', error);
      };
      
    } catch (error) {
      setConnectionStatus('disconnected');
      setErrorMessage(`Failed to connect: ${error.message}`);
      console.error('WebSocket connection error:', error);
    }
  }, [url, autoReconnect, reconnectAttempts, reconnectInterval]);
  
  // Disconnect from WebSocket
  const disconnect = useCallback(() => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.close();
    }
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    setConnectionStatus('disconnected');
  }, []);
  
  // Send message through WebSocket
  const sendMessage = useCallback((message) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
      return true;
    }
    return false;
  }, []);
  
  // Connect on mount, disconnect on unmount
  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);
  
  return {
    connectionStatus,
    lastMessage,
    errorMessage,
    sendMessage,
    connect,
    disconnect
  };
}

export default useWebSocket;