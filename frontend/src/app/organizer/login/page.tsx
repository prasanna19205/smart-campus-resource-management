
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function OrganizerLoginPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Please fill in all fields");
      return;
    }

    localStorage.setItem("organizerName", name);
    localStorage.setItem("organizerEmail", email);

    router.push("/organizer");
  }

  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #EDE9FE, #FCE7F3, #DBEAFE)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "25px",
      fontFamily: "Arial, sans-serif"
    }}>

      <div style={{
        background: "#FFFFFF",
        width: "100%",
        maxWidth: "430px",
        padding: "40px",
        borderRadius: "25px",
        boxShadow: "0 10px 35px rgba(100, 60, 120, 0.15)"
      }}>

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{
            fontSize: "55px",
            background: "#F3E8FF",
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto 20px"
          }}>
            📋
          </div>

          <h1 style={{ color: "#6B21A8", fontSize: "30px", margin: 0 }}>
            Organizer Login
          </h1>

          <p style={{ color: "#888", marginTop: "10px" }}>
            Smart Campus Management System
          </p>
        </div>

        <form onSubmit={handleLogin}>

          <label style={{ display: "block", marginBottom: "8px", color: "#555", fontWeight: "bold" }}>
            Organizer Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            style={{
              width: "100%",
              padding: "14px",
              boxSizing: "border-box",
              border: "1px solid #DDD6FE",
              borderRadius: "12px",
              background: "#FAF5FF",
              marginBottom: "20px",
              fontSize: "15px",
              color: "#333"
            }}
          />

          <label style={{ display: "block", marginBottom: "8px", color: "#555", fontWeight: "bold" }}>
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{
              width: "100%",
              padding: "14px",
              boxSizing: "border-box",
              border: "1px solid #FBCFE8",
              borderRadius: "12px",
              background: "#FFF1F7",
              marginBottom: "20px",
              fontSize: "15px",
              color: "#333"
            }}
          />

          <label style={{ display: "block", marginBottom: "8px", color: "#555", fontWeight: "bold" }}>
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{
              width: "100%",
              padding: "14px",
              boxSizing: "border-box",
              border: "1px solid #BFDBFE",
              borderRadius: "12px",
              background: "#EFF6FF",
              marginBottom: "25px",
              fontSize: "15px",
              color: "#333"
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "12px",
              background: "linear-gradient(90deg, #A78BFA, #F0ABFC)",
              color: "#FFFFFF",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Login →
          </button>

        </form>

        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <Link href="/" style={{ color: "#8B5CF6", textDecoration: "none", fontWeight: "bold" }}>
            ← Back to Home
          </Link>
        </div>

        <p style={{ textAlign: "center", color: "#AAA", fontSize: "12px", marginTop: "25px" }}>
          © 2026 Smart Campus Management System
        </p>

      </div>
    </main>
  );
}
