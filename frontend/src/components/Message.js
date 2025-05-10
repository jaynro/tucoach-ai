import React from 'react';
import './Message.css';

function Message({ message }) {
  const { text, sender, type } = message;
  
  // Determine message class based on sender and type
  const messageClass = `message ${sender} ${type || ''}`;
  
  return (
    <div className={messageClass}>
      <div className="message-content">
        {text}
      </div>
    </div>
  );
}

export default Message;