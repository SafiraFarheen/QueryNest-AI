import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

export default function InterviewRecorder({ onRecordingComplete }) {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleStartCapture = () => {
    setCapturing(true);
    setRecordedChunks([]);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener("dataavailable", (e) => {
      if (e.data.size > 0) {
        setRecordedChunks((prev) => prev.concat(e.data));
      }
    });
    mediaRecorderRef.current.start();
  };

  const handleStopCapture = async () => {
    mediaRecorderRef.current.stop();
    setCapturing(false);

    const blob = new Blob(recordedChunks, { type: "video/webm" });
    onRecordingComplete && onRecordingComplete(blob);

    console.log("Uploading recording...");
    const formData = new FormData();
    formData.append("file", blob, "interview_recording.webm");

    try {
      const token = localStorage.getItem("token");
      await axios.post("http://127.0.0.1:8000/api/interview/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload successful!");
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="space-y-4">
      <Webcam audio ref={webcamRef} mirrored className="rounded-lg shadow" />
      {!capturing ? (
        <button
          onClick={handleStartCapture}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Start Recording
        </button>
      ) : (
        <button
          onClick={handleStopCapture}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Stop Recording
        </button>
      )}
    </div>
  );
}
