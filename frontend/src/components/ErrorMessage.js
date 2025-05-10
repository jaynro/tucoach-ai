import React from 'react';
import './ErrorMessage.css';

/**
 * Component for displaying error messages
 * @param {Object} props - Component props
 * @param {string} props.message - The error message to display
 * @param {Function} props.onDismiss - Function to call when the error is dismissed
 * @returns {JSX.Element} Error message component
 */
function ErrorMessage({ message, onDismiss }) {
  if (!message) return null;
  
  return (
    <div className="error-message">
      <div className="error-content">
        <span className="error-icon">⚠️</span>
        <p>{message}</p>
        {onDismiss && (
          <button className="dismiss-button" onClick={onDismiss}>
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;