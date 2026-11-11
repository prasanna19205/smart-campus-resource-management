
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim() || !password.trim()) {
      alert("Please enter Admin Name and Password");
      return;
    }

    localStorage.setItem("adminName", name);
    router.push("/admin");
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">

      <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-3xl p-9 shadow-xl border border-white">

        <div className="text-center mb-8">

          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center text-4xl mb-5">
            🛡️
          </div>

          <h1 className="text-3xl font-bold text-purple-900">
            Admin Login
          </h1>

          <p className="text-gray-500 mt-2">
            Smart Campus Management System
          </p>

          <div className="w-16 h-1 bg-gradient-to-r from-purple-300 to-pink-300 mx-auto mt-5 rounded-full"></div>

        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Admin Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter admin name"
              className="w-full p-3.5 rounded-xl border border-purple-100 bg-purple-50/50 text-gray-800 outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3.5 rounded-xl border border-pink-100 bg-pink-50/50 text-gray-800 outline-none focus:ring-2 focus:ring-pink-300 focus:border-pink-300 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 text-white font-bold shadow-md hover:from-purple-500 hover:to-pink-500 hover:shadow-lg transition-all"
          >
            Login →
          </button>

        </form>

        <div className="text-center mt-7">
          <Link
            href="/"
            className="text-purple-600 hover:text-pink-600 font-medium transition"
          >
            ← Back to Home
          </Link>
        </div>

        <p className="text-center text-xs text-gray-400 mt-7">
          © 2026 Smart Campus Management System
        </p>

      </div>
    </main>
  );
}
