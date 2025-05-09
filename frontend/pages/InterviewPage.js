import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const InterviewPage = () => {
  const [role, setRole] = useState("backend");
  const [seniority, setSeniority] = useState("junior");
  const [answers, setAnswers] = useState(["", "", ""]);
  const [interviewId, setInterviewId] = useState("");
  const [socket, setSocket] = useState(null);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const startInterview = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await fetch("http://localhost:8000/interview/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        role,
        seniority,
        answers,
      }),
    });
    const data = await response.json();
    setInterviewId(data.interview_id);
    localStorage.setItem("feedback", JSON.stringify(data));
    navigate("/feedback");
  };

  // Initialize WebSocket connection
  useEffect(() => {
    // Only connect if we have an interview ID
    if (!interviewId) return;

    // Get WebSocket URL from environment or config
    const wsUrl = process.env.REACT_APP_WEBSOCKET_URL || "wss://your-api-gateway-url/v1";
    
    const ws = new WebSocket(wsUrl);
    
    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };
    
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      console.log("Received message:", response);
      
      // Handle different message types
      if (response.type === "response") {
        // Handle normal response
      } else if (response.type === "error") {
        // Handle error
        console.error("WebSocket error:", response.message);
      }
    };
    
    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
    };
    
    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
    
    setSocket(ws);
    
    // Clean up on unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [interviewId]); // Only re-run when interviewId changes

  // Function to send message via WebSocket
  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN && interviewId) {
      const payload = {
        action: "message",
        message: message,
        interview_id: interviewId,
        user_id: JSON.parse(localStorage.getItem("user"))?.id // Optional, helps with validation
      };
      
      socket.send(JSON.stringify(payload));
    } else {
      console.error("WebSocket not connected or interview ID not available");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Start Mock Interview</h2>

      <label className="block mb-2">Role:</label>
      <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full mb-4">
        <option value="backend">Backend</option>
        <option value="frontend">Frontend</option>
        <option value="devops">DevOps</option>
      </select>

      <label className="block mb-2">Seniority:</label>
      <select value={seniority} onChange={(e) => setSeniority(e.target.value)} className="w-full mb-4">
        <option value="junior">Junior</option>
        <option value="senior">Senior</option>
        <option value="techlead">Tech Lead</option>
        <option value="architect">Architect</option>
      </select>

      <label className="block mb-2">Your Answers:</label>
      {answers.map((a, i) => (
        <textarea
          key={i}
          className="w-full mb-2"
          rows={3}
          placeholder={`Answer ${i + 1}`}
          value={a}
          onChange={(e) => {
            const newAnswers = [...answers];
            newAnswers[i] = e.target.value;
            setAnswers(newAnswers);
          }}
        />
      ))}

      <button onClick={startInterview} className="bg-blue-600 text-white px-4 py-2 rounded mt-4">
        Submit and Get Feedback
      </button>
    </div>
  );
};

export default InterviewPage;
