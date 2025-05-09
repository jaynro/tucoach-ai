# WebSocket API for Interview Chatbot

This document describes how to use the WebSocket API for the interview chatbot service.

## Overview

The WebSocket API allows real-time communication between the client and the interview chatbot service. This enables a more interactive and responsive user experience compared to traditional REST APIs.

## Connection URL

The WebSocket API can be accessed at the following URL:

```
wss://{api-id}.execute-api.{region}.amazonaws.com/v1
```

You can find the exact URL in the Terraform outputs after deployment:

```bash
terraform output websocket_api_url
```

## Authentication

Authentication can be implemented by passing a token as a query parameter when connecting to the WebSocket:

```
wss://{api-id}.execute-api.{region}.amazonaws.com/v1?token={your-token}
```

## Message Format

Messages sent to the WebSocket API should be in JSON format with the following structure:

```json
{
  "action": "message",
  "message": "Your message here",
  "interview_id": "required-interview-id"
}
```

The `action` field is used by API Gateway to route the message to the appropriate handler. Currently, the only supported action is `message`.

## Example Usage

### Required Parameters

- `interview_id`: A valid interview ID that exists in the system. This parameter is mandatory for all messages.

### Connecting to the WebSocket

```javascript
const socket = new WebSocket('wss://{api-id}.execute-api.{region}.amazonaws.com/v1');

socket.onopen = (event) => {
  console.log('Connected to WebSocket');
};

socket.onmessage = (event) => {
  const response = JSON.parse(event.data);
  console.log('Received:', response);
};

socket.onclose = (event) => {
  console.log('Disconnected from WebSocket');
};

socket.onerror = (error) => {
  console.error('WebSocket error:', error);
};
```

### Sending a Message

```javascript
const message = {
  action: 'message',
  message: 'Hello, I would like to start an interview',
  interview_id: 'your-interview-id'
};

socket.send(JSON.stringify(message));
```

### Handling Responses

Responses from the WebSocket API will be in JSON format with the following structure:

```json
{
  "message": "Response message",
  "type": "response",
  "interview_id": "your-interview-id"
}
```

The `type` field can be one of the following:
- `response`: A normal response
- `error`: An error message

## Error Handling

If an error occurs, the WebSocket API will send a message with `type` set to `error`:

```json
{
  "message": "Error message",
  "type": "error",
  "interview_id": "your-interview-id"
}
```

## Disconnecting

To disconnect from the WebSocket, simply close the connection:

```javascript
socket.close();
```

## Integration with Frontend

To integrate the WebSocket API with the frontend, you can create a service that manages the WebSocket connection and provides methods for sending and receiving messages.

Example integration in React:

```jsx
import React, { useEffect, useState } from 'react';

function InterviewChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to WebSocket when component mounts
    const ws = new WebSocket('wss://{api-id}.execute-api.{region}.amazonaws.com/v1');
    
    ws.onopen = () => {
      console.log('Connected to WebSocket');
    };
    
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      setMessages(prev => [...prev, { text: response.message, sender: 'bot' }]);
    };
    
    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
    };
    
    setSocket(ws);
    
    // Disconnect when component unmounts
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() && socket) {
      const message = {
        action: 'message',
        message: input,
        interview_id: 'your-interview-id' // You should get this from your application state
      };
      
      socket.send(JSON.stringify(message));
      setMessages(prev => [...prev, { text: input, sender: 'user' }]);
      setInput('');
    }
  };

  return (
    <div>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default InterviewChatbot;
