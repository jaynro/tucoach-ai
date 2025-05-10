/**
 * Utility functions for WebSocket communication
 */

/**
 * Create a message object to send to the WebSocket server
 * @param {string} message - The message text
 * @param {string} interviewId - The interview ID
 * @returns {Object} The message object
 */
export const createMessage = (message, interviewId) => {
  return {
    action: 'message',
    message,
    interview_id: interviewId
  };
};

/**
 * Parse a WebSocket message
 * @param {string} data - The raw message data
 * @returns {Object|null} The parsed message or null if parsing failed
 */
export const parseMessage = (data) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing WebSocket message:', error);
    return null;
  }
};

/**
 * Check if a message is an error message
 * @param {Object} message - The message object
 * @returns {boolean} True if the message is an error message
 */
export const isErrorMessage = (message) => {
  return message && message.type === 'error';
};

/**
 * Format a WebSocket URL with a token
 * @param {string} url - The base WebSocket URL
 * @param {string} token - The authentication token
 * @returns {string} The formatted WebSocket URL
 */
export const formatWebSocketUrl = (url, token) => {
  if (!token) return url;
  
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}token=${token}`;
};