
"use client";

import { useState } from "react";

export default function FeedbackForm() {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState("5");
  const [submitted, setSubmitted] = useState(false);

  function submitFeedback(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!feedback.trim()) {
      alert("Please enter your feedback.");
      return;
    }

    const saved = JSON.parse(
      localStorage.getItem("studentFeedback") || "[]"
    );

    saved.push({
      feedback,
      rating,
      date: new Date().toLocaleDateString(),
    });

    localStorage.setItem("studentFeedback", JSON.stringify(saved));

    setFeedback("");
    setSubmitted(true);
  }

  return (
    <form onSubmit={submitFeedback} className="mt-8 max-w-xl rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-800">
        Share Your Feedback
      </h2>

      <label className="mt-5 block font-medium text-gray-700">
        Your rating
      </label>

      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="mt-2 w-full rounded-xl border border-gray-200 p-3"
      >
        <option value="5">5 - Excellent</option>
        <option value="4">4 - Very Good</option>
        <option value="3">3 - Good</option>
        <option value="2">2 - Average</option>
        <option value="1">1 - Poor</option>
      </select>

      <label className="mt-5 block font-medium text-gray-700">
        Your feedback
      </label>

      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Write your feedback here..."
        rows={5}
        className="mt-2 w-full rounded-xl border border-gray-200 p-3"
      />

      <button
        type="submit"
        className="mt-5 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
      >
        Submit Feedback
      </button>

      {submitted && (
        <p className="mt-4 text-green-700">
          Thank you! Your feedback has been saved.
        </p>
      )}
    </form>
  );
}
