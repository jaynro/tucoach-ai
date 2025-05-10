import React from 'react';
import './ConnectionStatus.css';

/**
 * Component for displaying WebSocket connection status
 * @param {Object} props - Component props
 * @param {string} props.status - The connection status (connected, connecting, disconnected, error)
 * @returns {JSX.Element} Connection status component
 */
function ConnectionStatus({ status }) {
  const statusClass = `connection-status status-${status}`;
  
  let statusText = 'Unknown';
  let statusIcon = '⚪';
  
  switch (status) {
    case 'connected':
      statusText = 'Connected';
      statusIcon = '🟢';
      break;
    case 'connecting':
      statusText = 'Connecting...';
      statusIcon = '🟡';
      break;
    case 'disconnected':
      statusText = 'Disconnected';
      statusIcon = '⚪';
      break;
    case 'error':
      statusText = 'Connection Error';
      statusIcon = '🔴';
      break;
    default:
      break;
  }
  
  return (
    <div className={statusClass}>
      <span className="status-icon">{statusIcon}</span>
      <span className="status-text">{statusText}</span>
    </div>
  );
}

export default ConnectionStatus;