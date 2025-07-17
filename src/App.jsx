import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Flashcards from "./pages/Flashcards";
import InterviewQuestions from "./pages/InterviewQuestions";
import InterviewFeedback from "./pages/InterviewFeedback";
import InterviewStart from "./pages/InterviewStart";
import InterviewSession from "./pages/InterviewSession";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/flashcards" element={<Flashcards />} />
        <Route path="/interview-questions" element={<InterviewQuestions />} />
        <Route path="/interview-feedback" element={<InterviewFeedback />} />
        <Route path="/interview-start" element={<InterviewStart />} />
        <Route path="/interview-session" element={<InterviewSession />} />
        <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />

        

      </Routes>
    </Router>
  );
}

export default App;
