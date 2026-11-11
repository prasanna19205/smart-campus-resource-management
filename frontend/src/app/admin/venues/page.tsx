
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getVenueRequests,
  updateVenueStatus,
  VenueRequest,
} from "../../lib/campusStore";

export default function AdminVenuesPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<VenueRequest[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("adminName")) {
      router.push("/admin/login");
      return;
    }

    setRequests(getVenueRequests());
  }, [router]);

  function handleStatusChange(
    id: string,
    status: VenueRequest["status"]
  ) {
    updateVenueStatus(id, status);
    setRequests(getVenueRequests());
    alert(`Venue request ${status.toLowerCase()} successfully!`);
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
          Venue Approvals
        </h1>

        <p className="text-gray-600 mb-8">
          Review venue booking requests submitted by organizers.
        </p>

        {requests.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center">
            No venue requests found.
          </div>
        ) : (
          <div className="space-y-5">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <div className="flex justify-between items-start gap-4 flex-wrap">
                  <h2 className="text-xl font-bold">
                    {request.venue}
                  </h2>

                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                    {request.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 text-sm text-gray-700">
                  <p><strong>Organizer:</strong> {request.organizer}</p>
                  <p><strong>Date:</strong> {request.date}</p>
                  <p>
                    <strong>Time:</strong>{" "}
                    {request.startTime} - {request.endTime}
                  </p>
                  <p><strong>Purpose:</strong> {request.purpose}</p>
                </div>

                {request.status === "Pending" && (
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() =>
                        handleStatusChange(request.id, "Approved")
                      }
                      className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        handleStatusChange(request.id, "Rejected")
                      }
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
