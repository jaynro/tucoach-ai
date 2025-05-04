import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("feedback");
    if (stored) {
      setFeedback(JSON.parse(stored));
    } else {
      navigate("/interview");
    }
  }, [navigate]);

  if (!feedback) return <p>Loading feedback...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Interview Feedback</h2>
      {feedback.questions.map((q, idx) => (
        <div key={idx} className="mb-6">
          <p className="font-semibold">Q: {q}</p>
          <p className="text-gray-600">A: {feedback.answers[idx]}</p>
          <p className="text-green-700">Feedback: {feedback.feedback[idx]}</p>
        </div>
      ))}
      <p className="mt-6 font-bold">Overall Score: {feedback.overall_score}/10</p>
      <button onClick={() => navigate("/interview")} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
        Try Another Interview
      </button>
    </div>
  );
};

export default FeedbackPage;

