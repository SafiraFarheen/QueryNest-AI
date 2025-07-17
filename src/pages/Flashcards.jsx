import React, { useState } from "react";
import axios from "axios";

export default function Flashcards() {
  const [topic, setTopic] = useState("");
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateFlashcards = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://127.0.0.1:8000/api/flashcards",
        { topic },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCards(res.data.flashcards);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-700 to-teal-800 text-white">
      <div className="max-w-md mx-auto bg-black bg-opacity-40 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Generate Flashcards</h2>
        <input
          type="text"
          placeholder="Enter a topic (e.g., React, Python)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 rounded text-black mb-4"
        />
        <button
          onClick={generateFlashcards}
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded transition"
        >
          {loading ? "Generating..." : "Generate Flashcards"}
        </button>

        <div className="mt-6 grid gap-4">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-white text-black p-4 rounded shadow">
              <p className="font-semibold">Q: {card.question}</p>
              <p className="mt-2">A: {card.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
