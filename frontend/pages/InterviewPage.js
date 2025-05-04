import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InterviewPage = () => {
  const [role, setRole] = useState("backend");
  const [seniority, setSeniority] = useState("junior");
  const [answers, setAnswers] = useState(["", "", ""]);
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
    localStorage.setItem("feedback", JSON.stringify(data));
    navigate("/feedback");
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
