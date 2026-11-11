
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    startTime: "",
    endTime: "",
    deadline: "",
    capacity: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const organizer = localStorage.getItem("organizerName");

    if (!organizer) {
      router.push("/organizer/login");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          capacity: Number(form.capacity),
          organizer,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error || "Could not submit event.");
        return;
      }

      setMessage("Event submitted successfully for Admin approval!");

      setTimeout(() => {
        router.push("/organizer/events");
      }, 1500);
    } catch {
      setMessage("Server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#faf7ff] p-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/organizer"
          className="text-purple-700 font-medium hover:underline"
        >
          ← Back to Dashboard
        </Link>

        <div className="bg-white rounded-3xl shadow-lg p-8 mt-5">
          <h1 className="text-3xl font-bold text-purple-900">
            Create Campus Event 🎉
          </h1>

          <p className="text-gray-500 mt-2 mb-7">
            Fill in the event details and submit them for Admin approval.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-medium mb-2">Event Name</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Enter event name"
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                placeholder="Describe your event"
                rows={4}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Event Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Venue</label>
              <input
                name="venue"
                value={form.venue}
                onChange={handleChange}
                required
                placeholder="Enter venue"
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2">Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={form.startTime}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={form.endTime}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl p-3"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">
                Registration Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={form.deadline}
                onChange={handleChange}
                required
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Maximum Participants
              </label>
              <input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                required
                min="1"
                placeholder="Enter participant limit"
                className="w-full border rounded-xl p-3"
              />
            </div>

            {message && (
              <p className="text-green-700 bg-green-50 p-3 rounded-xl">
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-700 text-white rounded-xl p-3 font-semibold hover:bg-purple-800 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Event for Approval"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
