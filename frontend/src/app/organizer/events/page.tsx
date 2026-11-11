
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getEvents, type CampusEvent } from "../../lib/campusStore";

const featuredEventIds = [
  "05c0129e-3058-4445-8555-e1e8f706df2e",
  "a4fbcdcc-a4d9-4c2b-8341-ddc18ce21513",
];

export default function ManageEventsPage() {
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [organizerName, setOrganizerName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("organizerName") || "";
    setOrganizerName(name);

    const allEvents = getEvents();

    // Show this organizer's events and the two existing featured events.
    const organizerEvents = allEvents.filter(
      (event) =>
        event.organizer === name || featuredEventIds.includes(event.id)
    );

    setEvents(organizerEvents);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto">

        <Link
          href="/organizer"
          className="text-purple-700 font-semibold hover:text-pink-600"
        >
          ← Back to Dashboard
        </Link>

        <div className="flex flex-wrap justify-between items-center gap-4 mt-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-purple-900">
              Manage Events 📅
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome, {organizerName || "Organizer"}!
            </p>
            <p className="text-sm text-gray-500 mt-1">
              View and manage your campus events.
            </p>
          </div>

          <Link
            href="/organizer/events/create"
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-semibold shadow-md transition"
          >
            + Create Event
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-7">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-purple-100">
            <p className="text-gray-500 text-sm">Total Events</p>
            <p className="text-3xl font-bold text-purple-800 mt-2">
              {events.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-green-100">
            <p className="text-gray-500 text-sm">Approved</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {events.filter((event) => event.status === "Approved").length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-yellow-100">
            <p className="text-gray-500 text-sm">Pending</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {events.filter((event) => event.status === "Pending").length}
            </p>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-10 text-center">
            <p className="text-5xl mb-4">📭</p>
            <h2 className="text-xl font-bold text-purple-900">
              No events created yet
            </h2>
            <p className="text-gray-500 mt-2">
              Create your first campus event to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {events.map((event, index) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-sm p-6 border border-purple-100 hover:shadow-md transition"
              >
                <div className="flex flex-wrap justify-between items-start gap-3">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-purple-900">
                      {event.title}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {event.description}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      event.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : event.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-3 mt-5 text-gray-700 text-sm">
                  <p>📅 <strong>Date:</strong> {event.date}</p>
                  <p>📍 <strong>Venue:</strong> {event.venue}</p>
                  <p>🕒 <strong>Time:</strong> {event.startTime} – {event.endTime}</p>
                  <p>⏳ <strong>Deadline:</strong> {event.deadline || "Not specified"}</p>
                  <p>👥 <strong>Capacity:</strong> {event.capacity}</p>
                  <p>👤 <strong>Organizer:</strong> {event.organizer || "Not specified"}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-sm text-gray-500 mt-8">
          Smart Campus Resource & Event Management System
        </p>
      </div>
    </main>
  );
}
