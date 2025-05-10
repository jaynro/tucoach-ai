import React from 'react';

/**
 * Loading spinner component
 * @param {Object} props - Component props
 * @param {string} props.size - Size of the spinner (small, medium, large)
 * @param {string} props.color - Color of the spinner
 * @returns {JSX.Element} Loading spinner component
 */
function LoadingSpinner({ size = 'medium', color = 'primary' }) {
  // Size classes
  const sizeClasses = {
    small: 'w-4 h-4 border-2',
    medium: 'w-6 h-6 border-2',
    large: 'w-9 h-9 border-3'
  };
  
  // Color classes
  const colorClasses = {
    primary: 'border-t-primary',
    secondary: 'border-t-gray-500',
    success: 'border-t-green-600',
    danger: 'border-t-red-600'
  };
  
  const spinnerClass = `inline-block ${sizeClasses[size] || sizeClasses.medium}`;
  
  return (
    <div className="inline-block">
      <div className={`${spinnerClass} rounded-full border-gray-200 ${colorClasses[color] || colorClasses.primary} animate-spin`}></div>
    </div> 
  );
}

export default LoadingSpinner;