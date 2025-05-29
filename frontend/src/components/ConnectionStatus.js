import React from 'react';

/**
 * Component for displaying WebSocket connection status
 * @param {Object} props - Component props
 * @param {string} props.status - The connection status (connected, connecting, disconnected, error)
 * @returns {JSX.Element} Connection status component
 */
function ConnectionStatus({ status }) {
  
  let statusText = 'Desconocido';
  let statusIcon = '⚪';
  
  switch (status) {
    case 'connected':
      statusText = 'Conectado';
      statusIcon = '🟢';
      break;
    case 'connecting':
      statusText = 'Conectando...';
      statusIcon = '🟡';
      break;
    case 'disconnected':
      statusText = 'Desconectado';
      statusIcon = '⚪';
      break;
    case 'error':
      statusText = 'Error de Conexión';
      statusIcon = '🔴';
      break;
    default:
      break;
  }
  
  // Determine text color based on status
  const statusColorClass = {
    connected: 'text-green-600',
    connecting: 'text-yellow-600',
    disconnected: 'text-gray-500',
    error: 'text-red-600'
  }[status] || 'text-gray-500';
  
  return (
    <div className={`flex items-center ${statusColorClass} font-medium`}>
      <span className="mr-1">{statusIcon}</span>
      <span>{statusText}</span>
    </div>
  );

export default ConnectionStatus;