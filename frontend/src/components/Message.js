import React from 'react';

function Message({ message }) {
  const { text, sender, type } = message;
  
  // Determine message styling based on sender and type
  const messageContainerClasses = `flex mb-4 max-w-[80%] ${
    sender === 'user' ? 'self-end ml-auto' : 'self-start mr-auto'
  }`;
  
  const messageContentClasses = `px-4 py-3 rounded-2xl text-base break-words ${
    sender === 'user' 
      ? 'bg-primary text-white rounded-br-sm' 
      : type === 'error'
        ? 'bg-red-50 text-red-700 border border-red-200'
        : 'bg-gray-100 text-gray-800 rounded-bl-sm'
  }`;
  
  return (
    <div className={messageContainerClasses}>
      <div className={messageContentClasses}>
        {text} 
      </div>
    </div>
  );
}

export default Message;