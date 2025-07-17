// src/pages/InterviewQuestions.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function InterviewQuestions() {
  const [jobDescription, setJobDescription] = useState("");
  const [technology, setTechnology] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://127.0.0.1:8000/api/interview/question",
        {
          job_description: jobDescription,
          technology,
          years_of_experience: yearsOfExperience,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQuestions(res.data.questions);
    } catch (err) {
      console.error(err);
      setError("Failed to generate questions. Check your inputs and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-600 flex flex-col items-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl mt-10">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Generate Interview Questions
        </h2>
        {error && <p className="text-red-500 text-center mb-2">{error}</p>}
        <form onSubmit={handleGenerate} className="space-y-4">
          <textarea
            placeholder="Enter Job Description..."
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Technology of Interest (e.g., React, FastAPI)"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={technology}
            onChange={(e) => setTechnology(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Years of Experience"
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={yearsOfExperience}
            onChange={(e) => setYearsOfExperience(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded hover:bg-indigo-700 transition"
          >
            {loading ? "Generating..." : "Generate Questions"}
          </button>
        </form>
      </div>

      {questions.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl mt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 text-center">
            Generated Questions
          </h3>
          <ul className="list-decimal list-inside space-y-2">
            {questions.map((q, idx) => (
              <li key={idx} className="text-gray-700">
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
