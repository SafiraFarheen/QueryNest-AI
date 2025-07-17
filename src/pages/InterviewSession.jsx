// src/pages/InterviewSession.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import InterviewRecorder from "../components/InterviewRecorder";

import axios from "axios";

export default function InterviewSession() {
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState("");

  useEffect(() => {
    if (location.state && location.state.questions) {
      setQuestions(location.state.questions);
    }
  }, [location]);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
        setAnswers([...answers, { question: questions[currentIndex], answer: currentAnswer }]);
        setCurrentAnswer("");
        setCurrentIndex(currentIndex + 1);
    } else {
        const allAnswers = [...answers, { question: questions[currentIndex], answer: currentAnswer }];

        const combinedAnswers = allAnswers
            .map((a, idx) => `Q${idx + 1}: ${a.question}\nA${idx + 1}: ${a.answer}`)
            .join("\n\n");

        navigate("/interview-feedback", { state: { transcript: combinedAnswers } });
    }
};


  if (questions.length === 0) {
    return (
      
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-700 to-indigo-900">
        <p className="text-white text-lg">Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 p-4">
      {/* Camera + mic recorder */}
      <InterviewRecorder onRecordingComplete={(blob) => {
        console.log("Recording complete:", blob);
        // Later: Upload to FastAPI using FormData if needed
      }} />

      {/* Interview questions card */}
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl w-full">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">AI Interview Session</h2>
        <p className="text-gray-700 mb-4">Question {currentIndex + 1} of {questions.length}</p>
        <p className="text-gray-900 font-medium mb-6">{questions[currentIndex]}</p>

        <textarea
          className="w-full p-3 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows="4"
          placeholder="Type your answer here..."
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
        ></textarea>

        <button
          onClick={handleNext}
          className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
        >
          {currentIndex < questions.length - 1 ? "Next" : "Finish Interview"}
        </button>
      </div>
    </div>
  );
}
