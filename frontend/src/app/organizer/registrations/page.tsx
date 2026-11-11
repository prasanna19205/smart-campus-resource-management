
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getEvents,
  getRegistrations,
  type CampusEvent,
  type Registration,
} from "../../lib/campusStore";

export default function OrganizerRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [organizerName, setOrganizerName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("organizerName") || "";
    setOrganizerName(name);

    const myEvents = getEvents().filter(
      (event) => event.organizer === name
    );

    const myEventIds = new Set(myEvents.map((event) => event.id));

    const myRegistrations = getRegistrations().filter(
      (registration) => myEventIds.has(registration.eventId)
    );

    setEvents(myEvents);
    setRegistrations(myRegistrations);
  }, []);

  return (
    <main className="min-h-screen bg-[#faf7ff] p-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/organizer" className="text-purple-700 font-medium">
          ← Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-purple-900 mt-6">
          Student Registrations 👥
        </h1>

        <p className="text-gray-500 mt-2 mb-7">
          Welcome, {organizerName || "Organizer"}! View registrations
          for your events.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">My Events</p>
            <h2 className="text-3xl font-bold text-purple-800 mt-2">
              {events.length}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Total Registrations</p>
            <h2 className="text-3xl font-bold text-purple-800 mt-2">
              {registrations.length}
            </h2>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            No events created yet.
          </div>
        ) : (
          <div className="space-y-6">
            {events.map((event) => {
              const eventRegistrations = registrations.filter(
                (registration) => registration.eventId === event.id
              );

              return (
                <section
                  key={event.id}
                  className="bg-white rounded-2xl shadow p-6"
                >
                  <div className="flex flex-wrap justify-between gap-3">
                    <h2 className="text-xl font-bold text-purple-900">
                      {event.title}
                    </h2>

                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {eventRegistrations.length} Students
                    </span>
                  </div>

                  {eventRegistrations.length === 0 ? (
                    <p className="text-gray-500 mt-5">
                      No students have registered for this event yet.
                    </p>
                  ) : (
                    <div className="overflow-x-auto mt-5">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-purple-50 text-purple-900">
                            <th className="p-3">Student</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Registration Date</th>
                          </tr>
                        </thead>

                        <tbody>
                          {eventRegistrations.map((registration, index) => (
                            <tr
                              key={`${registration.email}-${index}`}
                              className="border-b"
                            >
                              <td className="p-3">
                                {registration.studentName}
                              </td>
                              <td className="p-3">{registration.email}</td>
                              <td className="p-3">{registration.phone}</td>
                              <td className="p-3">
                                {registration.registrationDate}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
