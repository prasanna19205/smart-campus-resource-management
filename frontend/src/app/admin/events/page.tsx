
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type CampusEvent = {
  id: number;
  title: string;
  description: string;
  date: string;
  venue: string;
  startTime: string;
  endTime: string;
  deadline: string;
  capacity: number;
  organizer: string;
  status: "Pending" | "Approved" | "Rejected";
};

export default function AdminEventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchEvents() {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();

      if (response.ok) {
        setEvents(data);
      } else {
        alert(data.error || "Could not load events.");
      }
    } catch {
      alert("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("adminName")) {
      router.push("/admin/login");
      return;
    }

    fetchEvents();
  }, [router]);

  async function handleStatusChange(
    id: number,
    status: "Approved" | "Rejected"
  ) {
    try {
      const response = await fetch("/api/events", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: id,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Could not update event.");
        return;
      }

      await fetchEvents();
      alert(data.message);
    } catch {
      alert("Could not connect to the server.");
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.push("/admin")}
          className="text-blue-600 mb-6"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold mb-2">
          Event Approvals
        </h1>

        <p className="text-gray-600 mb-8">
          Review events submitted by organizers.
        </p>

        {loading ? (
          <div className="bg-white p-8 rounded-xl shadow text-center">
            Loading events...
          </div>
        ) : events.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center">
            No event requests found.
          </div>
        ) : (
          <div className="space-y-5">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <div>
                    <h2 className="text-xl font-bold">
                      {event.title}
                    </h2>
                    <p className="text-gray-600 mt-2">
                      {event.description}
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                    {event.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 text-sm text-gray-700">
                  <p><strong>Date:</strong> {event.date}</p>
                  <p><strong>Venue:</strong> {event.venue}</p>
                  <p><strong>Organizer:</strong> {event.organizer}</p>
                  <p><strong>Capacity:</strong> {event.capacity}</p>
                  <p>
                    <strong>Time:</strong> {event.startTime} - {event.endTime}
                  </p>
                  <p>
                    <strong>Registration deadline:</strong> {event.deadline}
                  </p>
                </div>

                {event.status === "Pending" && (
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => handleStatusChange(event.id, "Approved")}
                      className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleStatusChange(event.id, "Rejected")}
                      className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
