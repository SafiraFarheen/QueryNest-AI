// src/pages/ResumeAnalyzer.jsx
import React, { useState } from "react";
import axios from "axios";

export default function ResumeAnalyzer() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!resumeFile) {
      setError("Please upload your resume file.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("job_description", jobDescription);

      const res = await axios.post(
        "http://127.0.0.1:8000/api/resume/analyze",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAnalysis(res.data);
    } catch (err) {
      console.error(err);
      setError("Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-green-700 to-teal-700 text-white">
      <div className="bg-black bg-opacity-50 rounded-lg p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Resume Analyzer</h2>
        {error && <p className="text-red-400 text-center mb-2">{error}</p>}
        <form onSubmit={handleAnalyze} className="space-y-4">
          <textarea
            placeholder="Paste the job description here..."
            className="w-full p-3 rounded text-black"
            rows={4}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResumeFile(e.target.files[0])}
            className="w-full p-3 rounded text-black bg-white"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded transition"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </form>

        {analysis && (
          <div className="mt-6 bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Analysis Results:</h3>
            <p>✅ Score: {analysis.score}</p>
            <p className="mt-2 font-semibold">Skill Gaps:</p>
            <ul className="list-disc list-inside">
              {analysis.skill_gaps.map((gap, idx) => (
                <li key={idx}>{gap}</li>
              ))}
            </ul>
            <p className="mt-2 font-semibold">Suggestions:</p>
            <ul className="list-disc list-inside">
              {analysis.suggestions.map((sug, idx) => (
                <li key={idx}>{sug}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
