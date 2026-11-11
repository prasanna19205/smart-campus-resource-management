
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function StudentLogin() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    // Demo only: save the student's name in this browser.
    localStorage.setItem("studentName", name.trim());

    router.push("/student");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#eee9ff] via-[#fffaf7] to-[#e3f5ec] p-5">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl md:p-10">
        <Link href="/" className="text-sm font-semibold text-purple-600">
          ← Back to Home
        </Link>

        <div className="mt-8 text-center">
          <div className="text-5xl">🎓</div>
          <h1 className="mt-5 text-3xl font-extrabold text-[#302b46]">
            Student Login
          </h1>
          <p className="mt-3 text-sm text-gray-500">
            Welcome! Sign in to explore your campus.
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-9 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Student Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="w-full rounded-xl border border-purple-100 bg-[#fffdfd] p-4 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Student Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your student email"
              required
              className="w-full rounded-xl border border-purple-100 bg-[#fffdfd] p-4 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full rounded-xl border border-purple-100 bg-[#fffdfd] p-4 outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-[#8875d8] py-4 font-bold text-white transition hover:bg-[#705cc4]"
          >
            Login to Student Portal →
          </button>
        </form>

        <p className="mt-7 text-center text-xs leading-6 text-gray-400">
          Demo login only — real authentication will be connected later.
        </p>
      </div>
    </main>
  );
}
