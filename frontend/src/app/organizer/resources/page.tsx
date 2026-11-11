
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getResourceRequests,
  saveResourceRequest,
  type ResourceRequest,
} from "../../lib/campusStore";

export default function ResourceRequestsPage() {
  const [organizer, setOrganizer] = useState("");
  const [requests, setRequests] = useState<ResourceRequest[]>([]);

  const [form, setForm] = useState({
    resource: "",
    quantity: "1",
    purpose: "",
  });

  useEffect(() => {
    const name = localStorage.getItem("organizerName") || "";
    setOrganizer(name);

    setRequests(
      getResourceRequests().filter(
        (request) => request.requestedBy === name
      )
    );
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!organizer) {
      alert("Please log in as an organizer first.");
      return;
    }

    const newRequest: ResourceRequest = {
      id: crypto.randomUUID(),
      resource: form.resource,
      quantity: Number(form.quantity),
      purpose: form.purpose,
      requestedBy: organizer,
      status: "Pending",
    };

    saveResourceRequest(newRequest);
    setRequests((previous) => [...previous, newRequest]);

    setForm({
      resource: "",
      quantity: "1",
      purpose: "",
    });

    alert("Resource request submitted for Admin approval!");
  }

  return (
    <main className="min-h-screen bg-[#faf7ff] p-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/organizer" className="text-purple-700 font-medium">
          ← Back to Dashboard
        </Link>

        <h1 className="text-3xl font-bold text-purple-900 mt-6">
          Resource Requests 💻
        </h1>

        <p className="text-gray-500 mt-2 mb-7">
          Request equipment and track Admin approval.
        </p>

        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-purple-900 mb-5">
            Submit Resource Request
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium mb-2">
                Resource Name
              </label>
              <select
                required
                value={form.resource}
                onChange={(e) =>
                  setForm({ ...form, resource: e.target.value })
                }
                className="w-full border rounded-xl p-3 bg-white"
              >
                <option value="">Select a resource</option>
                <option value="Projector">Projector</option>
                <option value="Laptop">Laptop</option>
                <option value="Microphone">Microphone</option>
                <option value="Speaker">Speaker</option>
                <option value="Whiteboard">Whiteboard</option>
                <option value="Extension Board">Extension Board</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block font-medium mb-2">
                Quantity Required
              </label>
              <input
                type="number"
                min="1"
                required
                value={form.quantity}
                onChange={(e) =>
                  setForm({ ...form, quantity: e.target.value })
                }
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Purpose
              </label>
              <textarea
                required
                rows={3}
                value={form.purpose}
                onChange={(e) =>
                  setForm({ ...form, purpose: e.target.value })
                }
                placeholder="Explain why you need these resources"
                className="w-full border rounded-xl p-3"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-700 text-white rounded-xl p-3 font-semibold hover:bg-purple-800"
            >
              Submit Resource Request
            </button>
          </form>
        </div>

        <h2 className="text-2xl font-bold text-purple-900 mb-4">
          My Resource Requests
        </h2>

        {requests.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow">
            No resource requests submitted yet.
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
                    {request.resource}
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

                <p className="mt-3 text-gray-600">
                  Quantity: {request.quantity}
                </p>
                <p className="text-gray-600">
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
