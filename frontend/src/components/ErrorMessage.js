import React from 'react';

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
    <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
      <div className="flex items-center">
        <span className="mr-2 text-xl">⚠️</span>
        <p className="flex-1 m-0 text-red-700">{message}</p>
        {onDismiss && (
          <button className="bg-transparent border-none text-red-700 cursor-pointer text-base px-1" onClick={onDismiss}>
            ✕ 
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorMessage;