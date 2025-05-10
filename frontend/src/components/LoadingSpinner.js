import React from 'react';
import './LoadingSpinner.css';

/**
 * Loading spinner component
 * @param {Object} props - Component props
 * @param {string} props.size - Size of the spinner (small, medium, large)
 * @param {string} props.color - Color of the spinner
 * @returns {JSX.Element} Loading spinner component
 */
function LoadingSpinner({ size = 'medium', color = 'primary' }) {
  const spinnerClass = `spinner spinner-${size} spinner-${color}`;
  
  return (
    <div className={spinnerClass}>
      <div className="spinner-circle"></div>
    </div>
  );
}

export default LoadingSpinner;