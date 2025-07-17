// src/pages/InterviewStart.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function InterviewStart() {
  const navigate = useNavigate();
  const [jobDescription, setJobDescription] = useState("");
  const [technology, setTechnology] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStartInterview = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://127.0.0.1:8000/api/interview/question",
        {
          job_description: jobDescription,
          technology,
          years_of_experience: yearsOfExperience,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/interview-session", { state: { questions: response.data.questions } });
    } catch (err) {
      console.log("Token being sent:", token);

      console.error(err);
      setError("Failed to start interview. Check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-600 to-blue-600 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Start Your AI Interview</h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <form onSubmit={handleStartInterview} className="space-y-4">
          <textarea
            placeholder="Enter the Job Description..."
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Technology of Interest (e.g., React, FastAPI)"
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Years of Experience"
            className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded hover:bg-purple-700 transition"
          >
            {loading ? "Starting..." : "Start Interview"}
          </button>
        </form>
      </div>
    </div>
  );
}
