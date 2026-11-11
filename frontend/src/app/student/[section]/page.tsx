
"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import FeedbackForm from "./FeedbackForm";
import EventRegistrationForm from "./EventRegistrationForm";

import {
  getVenueRequests,
  getResourceRequests,
  VenueRequest,
  ResourceRequest,
} from "../../lib/campusStore";

type CampusEvent = {
  id: number;
  title: string;
  description: string;
  date: string;
  venue: string | null;
  startTime: string;
  endTime: string;
  deadline: string | null;
  capacity: number;
  organizer: string | null;
  status: "Pending" | "Approved" | "Rejected";
};

const pageBackground = "min-h-screen bg-[#faf7ff]";
const cardStyle =
  "rounded-3xl border border-[#eee6fa] bg-white shadow-[0_8px_30px_rgba(120,90,160,0.07)]";
const backLink =
  "inline-flex items-center gap-2 font-semibold text-[#7963a8] transition hover:text-[#59427f] hover:underline";

function StudentSectionContent() {
  const params = useParams<{ section: string }>();
  const searchParams = useSearchParams();

  const section = params.section;
  const eventId = searchParams.get("event");

  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(true);

  const [venues, setVenues] = useState<VenueRequest[]>([]);
  const [resources, setResources] = useState<ResourceRequest[]>([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();

        if (!response.ok) {
          console.error("Could not fetch events:", data.error);
          return;
        }

        setEvents(
          data.filter(
            (event: CampusEvent) => event.status === "Approved"
          )
        );
      } catch (error) {
        console.error("Event fetch error:", error);
      } finally {
        setEventsLoading(false);
      }
    }

    fetchEvents();

    setVenues(
      getVenueRequests().filter(
        (venue) => venue.status === "Approved"
      )
    );

    setResources(
      getResourceRequests().filter(
        (resource) => resource.status === "Approved"
      )
    );
  }, []);

  // EVENTS SECTION
  if (section === "events") {
    const selectedEvent = events.find(
      (event) => String(event.id) === eventId
    );

    // Individual event details
    if (eventId) {
      if (eventsLoading) {
        return (
          <main className={`${pageBackground} px-6 py-16`}>
            <div className={`${cardStyle} mx-auto max-w-4xl p-12 text-center`}>
              <p className="text-lg font-medium text-[#7963a8]">
                Loading event details...
              </p>
            </div>
          </main>
        );
      }

      if (!selectedEvent) {
        return (
          <main className={`${pageBackground} px-6 py-16`}>
            <div className={`${cardStyle} mx-auto max-w-4xl p-10 text-center`}>
              <div className="mb-5 text-5xl">🌸</div>
              <h1 className="text-2xl font-bold text-[#403653]">
                Event not available
              </h1>
              <p className="mt-3 text-[#81788e]">
                This event may not have been approved by Admin yet.
              </p>

              <Link
                href="/student/events"
                className="mt-6 inline-block rounded-xl bg-[#e9defb] px-6 py-3 font-semibold text-[#654b91] transition hover:bg-[#ddcdf5]"
              >
                ← Back to Events
              </Link>
            </div>
          </main>
        );
      }

      return (
        <main className={`${pageBackground} px-6 py-10`}>
          <div className="mx-auto max-w-5xl">
            <Link href="/student/events" className={backLink}>
              ← Back to Events
            </Link>

            <div className={`${cardStyle} mt-7 overflow-hidden`}>
              <div className="bg-gradient-to-r from-[#e9defb] via-[#fbe6ef] to-[#e1f0ff] px-8 py-10 sm:px-10">
                <span className="inline-flex rounded-full border border-white/80 bg-white/75 px-4 py-2 text-sm font-semibold text-[#725b98]">
                  ✓ Approved Event
                </span>

                <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#403653] sm:text-4xl">
                  {selectedEvent.title}
                </h1>

                <p className="mt-3 max-w-2xl leading-7 text-[#71677f]">
                  {selectedEvent.description || "Explore this campus event and be part of the experience."}
                </p>
              </div>

              <div className="p-7 sm:p-10">
                <h2 className="mb-6 text-xl font-bold text-[#403653]">
                  Event Information
                </h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[#f5efff] p-5">
                    <p className="text-sm font-medium text-[#8b7ba5]">
                      📅 Event Date
                    </p>
                    <p className="mt-2 font-semibold text-[#514266]">
                      {selectedEvent.date || "Not specified"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#eaf4ff] p-5">
                    <p className="text-sm font-medium text-[#718ba9]">
                      🕒 Event Time
                    </p>
                    <p className="mt-2 font-semibold text-[#405b79]">
                      {selectedEvent.startTime} - {selectedEvent.endTime}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#eaf8f0] p-5">
                    <p className="text-sm font-medium text-[#729b82]">
                      📍 Venue
                    </p>
                    <p className="mt-2 font-semibold text-[#426d52]">
                      {selectedEvent.venue || "Not specified"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#fff0e8] p-5">
                    <p className="text-sm font-medium text-[#b48a72]">
                      👤 Organiser
                    </p>
                    <p className="mt-2 font-semibold text-[#805b47]">
                      {selectedEvent.organizer || "Not specified"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#fcecf3] p-5">
                    <p className="text-sm font-medium text-[#aa7891]">
                      ⏳ Registration Deadline
                    </p>
                    <p className="mt-2 font-semibold text-[#81516a]">
                      {selectedEvent.deadline || "Not specified"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#f0efff] p-5">
                    <p className="text-sm font-medium text-[#817bb0]">
                      🎟️ Registration Capacity
                    </p>
                    <p className="mt-2 font-semibold text-[#57517e]">
                      {selectedEvent.capacity}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <section className="mt-8">
              <EventRegistrationForm
                eventId={selectedEvent.id}
                eventName={selectedEvent.title}
              />
            </section>
          </div>
        </main>
      );
    }

    // All approved events
    return (
      <main className={`${pageBackground} px-6 py-10`}>
        <div className="mx-auto max-w-6xl">
          <Link href="/student" className={backLink}>
            ← Back to Dashboard
          </Link>

          <div className="mt-7 rounded-3xl bg-gradient-to-r from-[#e9defb] via-[#fbe8f0] to-[#e3f1ff] px-8 py-9">
            <p className="font-semibold text-[#806c9d]">
              EXPLORE YOUR CAMPUS
            </p>
            <h1 className="mt-3 text-3xl font-bold text-[#403653] sm:text-4xl">
              Campus Events 🎉
            </h1>
            <p className="mt-3 max-w-2xl text-[#71677f]">
              Discover exciting events approved by the campus administration.
              Find something interesting and be part of campus life!
            </p>
          </div>

          {eventsLoading ? (
            <div className={`${cardStyle} mt-8 p-10 text-center text-[#7963a8]`}>
              Loading approved events...
            </div>
          ) : events.length === 0 ? (
            <div className={`${cardStyle} mt-8 p-10 text-center`}>
              <div className="text-5xl">🌷</div>
              <h2 className="mt-4 text-xl font-bold text-[#403653]">
                No approved events yet
              </h2>
              <p className="mt-2 text-[#81788e]">
                Check back later for upcoming campus events!
              </p>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {events.map((event, index) => (
                <article
                  key={event.id}
                  className={`${cardStyle} overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(120,90,160,0.13)]`}
                >
                  <div
                    className={`h-2 ${
                      index % 4 === 0
                        ? "bg-[#d9c8f4]"
                        : index % 4 === 1
                        ? "bg-[#f4cddd]"
                        : index % 4 === 2
                        ? "bg-[#c9e2fa]"
                        : "bg-[#ccebd8]"
                    }`}
                  />

                  <div className="p-7">
                    <span className="inline-flex rounded-full bg-[#e7f6ec] px-3 py-1 text-xs font-semibold text-[#568465]">
                      ✓ Approved
                    </span>

                    <h2 className="mt-5 text-2xl font-bold text-[#403653]">
                      {event.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#81788e]">
                      {event.description}
                    </p>

                    <div className="mt-6 space-y-3 rounded-2xl bg-[#faf8fd] p-5 text-sm text-[#71677f]">
                      <p>📅 <strong>Date:</strong> {event.date}</p>
                      <p>🕒 <strong>Time:</strong> {event.startTime} - {event.endTime}</p>
                      <p>📍 <strong>Venue:</strong> {event.venue || "Not specified"}</p>
                    </div>

                    <Link
                      href={`/student/events?event=${encodeURIComponent(String(event.id))}`}
                      className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#e9defb] px-6 py-3 font-semibold text-[#654b91] transition hover:bg-[#ddcdf5]"
                    >
                      View Event Details →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  }

  // FEEDBACK SECTION
  if (section === "feedback") {
    return (
      <main className={`${pageBackground} px-6 py-10`}>
        <div className="mx-auto max-w-4xl">
          <Link href="/student" className={backLink}>
            ← Back to Dashboard
          </Link>

          <div className="mt-7 mb-8 rounded-3xl bg-gradient-to-r from-[#fbe6ef] to-[#e9defb] p-8">
            <p className="font-semibold text-[#96718a]">
              YOUR VOICE MATTERS
            </p>
            <h1 className="mt-3 text-3xl font-bold text-[#403653]">
              Student Feedback 💬
            </h1>
            <p className="mt-3 text-[#81788e]">
              Share your suggestions and experiences to help us improve
              campus life.
            </p>
          </div>

          <FeedbackForm />
        </div>
      </main>
    );
  }

  // APPROVED VENUES SECTION
  if (section === "venues") {
    return (
      <main className={`${pageBackground} px-6 py-10`}>
        <div className="mx-auto max-w-4xl">
          <Link href="/student" className={backLink}>
            ← Back to Dashboard
          </Link>

          <div className="mt-7 rounded-3xl bg-gradient-to-r from-[#e1f0ff] to-[#e9defb] p-8">
            <p className="font-semibold text-[#718ba9]">
              FIND YOUR SPACE
            </p>
            <h1 className="mt-3 text-3xl font-bold text-[#403653]">
              Approved Venues 🏛️
            </h1>
            <p className="mt-3 text-[#71677f]">
              Explore venues approved by the campus administration.
            </p>
          </div>

          {venues.length === 0 ? (
            <div className={`${cardStyle} mt-8 p-8 text-center text-[#81788e]`}>
              No approved venue requests available yet.
            </div>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {venues.map((venue) => (
                <div
                  key={venue.id}
                  className={`${cardStyle} p-6 transition hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-[#eaf4ff] p-3 text-2xl">
                    🏛️
                  </div>

                  <h2 className="text-xl font-bold text-[#403653]">
                    {venue.venue}
                  </h2>

                  <p className="mt-4 text-sm text-[#81788e]">
                    📅 Date: {venue.date}
                  </p>

                  <p className="mt-2 text-sm text-[#81788e]">
                    🕒 Time: {venue.startTime} - {venue.endTime}
                  </p>

                  <p className="mt-3 text-sm text-[#71677f]">
                    Purpose: {venue.purpose}
                  </p>

                  <span className="mt-5 inline-flex rounded-full bg-[#e7f6ec] px-3 py-1 text-xs font-semibold text-[#568465]">
                    ✓ Approved
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  }

  // APPROVED RESOURCES SECTION
  if (section === "resources") {
    return (
      <main className={`${pageBackground} px-6 py-10`}>
        <div className="mx-auto max-w-4xl">
          <Link href="/student" className={backLink}>
            ← Back to Dashboard
          </Link>

          <div className="mt-7 rounded-3xl bg-gradient-to-r from-[#e0f4e9] to-[#e1f0ff] p-8">
            <p className="font-semibold text-[#729b82]">
              MAKE THE MOST OF CAMPUS
            </p>
            <h1 className="mt-3 text-3xl font-bold text-[#403653]">
              Approved Resources 💻
            </h1>
            <p className="mt-3 text-[#71677f]">
              Explore the resources approved for student use.
            </p>
          </div>

          {resources.length === 0 ? (
            <div className={`${cardStyle} mt-8 p-8 text-center text-[#81788e]`}>
              No approved resource requests available yet.
            </div>
          ) : (
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {resources.map((resource, index) => (
                <div
                  key={`${resource.resource}-${index}`}
                  className={`${cardStyle} p-6 transition hover:-translate-y-1 hover:shadow-lg`}
                >
                  <div className="mb-4 inline-flex rounded-2xl bg-[#eaf8f0] p-3 text-2xl">
                    💻
                  </div>

                  <h2 className="text-xl font-bold text-[#403653]">
                    {resource.resource}
                  </h2>

                  <p className="mt-4 text-sm text-[#81788e]">
                    Quantity: {resource.quantity}
                  </p>

                  <p className="mt-3 text-sm text-[#71677f]">
                    Purpose: {resource.purpose}
                  </p>

                  <span className="mt-5 inline-flex rounded-full bg-[#e7f6ec] px-3 py-1 text-xs font-semibold text-[#568465]">
                    ✓ Approved
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className={`${pageBackground} min-h-screen px-6 py-16`}>
      <div className={`${cardStyle} mx-auto max-w-3xl p-10 text-center`}>
        <h1 className="text-2xl font-bold text-[#403653]">
          Section not found
        </h1>
        <Link href="/student" className="mt-5 inline-block text-[#7963a8] hover:underline">
          ← Back to Dashboard
        </Link>
      </div>
    </main>
  );
}

export default function StudentSectionPage() {
  return (
    <Suspense
      fallback={
        <main className={`${pageBackground} px-6 py-16`}>
          <p className="text-center font-medium text-[#7963a8]">
            Loading student dashboard...
          </p>
        </main>
      }
    >
      <StudentSectionContent />
    </Suspense>
  );
}
