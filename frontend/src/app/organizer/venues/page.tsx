
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getVenueRequests,
  saveVenueRequest,
  type VenueRequest,
} from "../../lib/campusStore";

export default function VenueRequestsPage() {
  const [requests, setRequests] = useState<VenueRequest[]>([]);
  const [organizer, setOrganizer] = useState("");

  const [form, setForm] = useState({
    venue: "",
    date: "",
    startTime: "",
    endTime: "",
    purpose: "",
  });

  useEffect(() => {
    const name = localStorage.getItem("organizerName") || "";
    setOrganizer(name);

    setRequests(
      getVenueRequests().filter((request) => request.organizer === name)
    );
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!organizer) {
      alert("Please log in as an organizer first.");
      return;
    }

    const newRequest: VenueRequest = {
      id: crypto.randomUUID(),
      ...form,
      organizer,
      status: "Pending",
    };

    saveVenueRequest(newRequest);

    setRequests((previous) => [...previous, newRequest]);

    setForm({
      venue: "",
      date: "",
      startTime: "",
      endTime: "",
      purpose: "",
    });

    alert("Venue request submitted for Admin approval!");
  }

  return (
    <main className="min-h-screen bg-[#faf7ff] p-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/organizer" className="text-purple-700 font-medium">
          ← Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-purple-900 mt-6">
          Venue Requests 🏛️
        </h1>

        <p className="text-gray-500 mt-2 mb-7">
          Request campus venues and track approval status.
        </p>

        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-purple-900 mb-5">
            Submit a Venue Request
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-2">Venue Name</label>
              <input
                required
                value={form.venue}
                onChange={(e) =>
                  setForm({ ...form, venue: e.target.value })
                }
                placeholder="e.g. Main Auditorium"
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Date</label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(e) =>
                  setForm({ ...form, date: e.target.value })
                }
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2">Start Time</label>
                <input
                  type="time"
                  required
                  value={form.startTime}
                  onChange={(e) =>
                    setForm({ ...form, startTime: e.target.value })
                  }
                  className="w-full border rounded-xl p-3"
                />
              </div>

              <div>
                <label className="block font-medium mb-2">End Time</label>
                <input
                  type="time"
                  required
                  value={form.endTime}
                  onChange={(e) =>
                    setForm({ ...form, endTime: e.target.value })
                  }
                  className="w-full border rounded-xl p-3"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-2">Purpose</label>
              <textarea
                required
                rows={3}
                value={form.purpose}
                onChange={(e) =>
                  setForm({ ...form, purpose: e.target.value })
                }
                placeholder="Explain why you need this venue"
                className="w-full border rounded-xl p-3"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-700 text-white rounded-xl p-3 font-semibold hover:bg-purple-800"
            >
              Submit Venue Request
            </button>
          </form>
        </div>

        <h2 className="text-2xl font-bold text-purple-900 mb-4">
          My Venue Requests
        </h2>

        {requests.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow">
            No venue requests submitted yet.
          </div>
        ) : (
          <div className="grid gap-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-2xl shadow p-5"
              >
                <div className="flex justify-between flex-wrap gap-3">
                  <h3 className="font-bold text-lg text-purple-900">
                    {request.venue}
                  </h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    request.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : request.status === "Rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {request.status}
                  </span>
                </div>

                <p className="mt-3 text-gray-600">📅 {request.date}</p>
                <p className="text-gray-600">
                  🕒 {request.startTime} – {request.endTime}
                </p>
                <p className="text-gray-600 mt-2">
                  Purpose: {request.purpose}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
