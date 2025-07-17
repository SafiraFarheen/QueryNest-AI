// src/pages/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBrain, FaQuestion, FaRocket, FaFileAlt } from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Flashcards",
      description: "Generate flashcards to prepare for interviews quickly.",
      icon: <FaBrain size={40} />,
      onClick: () => navigate("/flashcards"),
    },
    {
      title: "Interview Questions",
      description: "Practice with AI-generated technical interview questions.",
      icon: <FaQuestion size={40} />,
      onClick: () => navigate("/interview-questions"),
    },
    {
      title: "Start AI Interview",
      description: "Experience a real-time AI mock interview session.",
      icon: <FaRocket size={40} />,
      onClick: () => navigate("/interview-start"),
    },
    {
      title: "Resume Analyzer",
      description: "Analyze your resume against job descriptions.",
      icon: <FaFileAlt size={40} />,
      onClick: () => navigate("/resume-analyzer"),
    },
  ];

  const recentInterviews = [
    { date: "2025-07-20", score: 85, tech: "FastAPI" },
    { date: "2025-07-18", score: 78, tech: "React" },
    { date: "2025-07-15", score: 90, tech: "Python" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 flex flex-col items-center p-6">
      <div className="flex items-center justify-between w-full max-w-5xl mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome, Safira 👋</h1>
          <p className="text-white/70">Ready to continue your preparation?</p>
        </div>
        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Log Out
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mb-10">
        {features.map((feature, index) => (
          <div
            key={index}
            onClick={feature.onClick}
            className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 cursor-pointer transform hover:scale-105 transition shadow-lg text-white"
          >
            <div className="flex items-center justify-center mb-4 text-green-300">{feature.icon}</div>
            <h2 className="text-xl font-semibold mb-2 text-center">{feature.title}</h2>
            <p className="text-sm text-center text-gray-200">{feature.description}</p>
          </div>
        ))}
      </div>
      <div className="w-full max-w-5xl">
        <h2 className="text-2xl font-semibold text-white mb-4">Recent Interviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentInterviews.map((interview, idx) => (
            <div key={idx} className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-4 text-white">
              <p className="text-lg font-medium">{interview.tech} Interview</p>
              <p>Date: {interview.date}</p>
              <p>Score: {interview.score}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
