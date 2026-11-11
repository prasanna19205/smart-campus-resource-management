
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getResourceRequests,
  updateResourceStatus,
  ResourceRequest,
} from "../../lib/campusStore";

export default function AdminResourcesPage() {
  const router = useRouter();
  const [requests, setRequests] = useState<ResourceRequest[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("adminName")) {
      router.push("/admin/login");
      return;
    }

    setRequests(getResourceRequests());
  }, [router]);

  function handleStatusChange(
    id: string,
    status: ResourceRequest["status"]
  ) {
    updateResourceStatus(id, status);
    setRequests(getResourceRequests());
    alert(`Resource request ${status.toLowerCase()} successfully!`);
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
          Resource Approvals
        </h1>

        <p className="text-gray-600 mb-8">
          Review resource requests submitted by organizers.
        </p>

        {requests.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center">
            No resource requests found.
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
                    {request.resource}
                  </h2>

                  <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                    {request.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 text-sm text-gray-700">
                  <p><strong>Requested by:</strong> {request.requestedBy}</p>
                  <p><strong>Quantity:</strong> {request.quantity}</p>
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
