// src/pages/InterviewFeedback.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function InterviewFeedback() {
  const [feedback, setFeedback] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { transcript } = location.state || { transcript: "" };

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          "http://127.0.0.1:8000/api/feedback/generate",
          { transcript },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setFeedback(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeedback();
  }, [transcript]);

  if (!feedback) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Analyzing your interview...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-teal-900 to-teal-700 text-white">
      <div className="max-w-md w-full bg-black bg-opacity-40 rounded-xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Your Interview Feedback</h1>
        <p className="mb-2">⭐ Technical Score: {feedback.technical_score}</p>
        <p className="mb-2">🗣️ Communication Score: {feedback.communication_score}</p>
        <p className="mb-2">💪 Confidence Score: {feedback.confidence_score}</p>
        <p className="mt-4 bg-gray-800 p-4 rounded-lg">{feedback.feedback_text}</p>
        <button
          onClick={() => navigate("/dashboard")}
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
