
"use client";

import { useEffect, useState } from "react";

type Props = {
  eventId: number;
  eventName: string;
};

export default function EventRegistrationForm({
  eventId,
  eventName,
}: Props) {
  const [studentName, setStudentName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem("studentName");
    if (savedName) setStudentName(savedName);
  }, []);

  async function handleRegistration(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId,
          studentName: studentName.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration rejected.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Could not connect to the server. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-3xl border border-green-200 bg-green-50 p-8">
        <h2 className="text-2xl font-bold text-green-800">
          Registration Successful! 🎉
        </h2>
        <p className="mt-3 text-green-700">
          You have successfully registered for {eventName}.
        </p>
        <p className="mt-2 text-sm text-green-700">
          Your name, email and phone number have been saved.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleRegistration}
      className="rounded-3xl bg-white p-7 shadow-sm"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        Event Registration
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        Fill in your details to register for this event.
      </p>

      <div className="mt-6 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Student Name
          </label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter your full name"
            required
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-purple-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your 10-digit phone number"
            required
            pattern="[0-9]{10}"
            title="Enter a 10-digit phone number"
            className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          Registration Rejected: {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-7 w-full rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? "Checking..." : "Confirm Registration"}
      </button>
    </form>
  );
}
