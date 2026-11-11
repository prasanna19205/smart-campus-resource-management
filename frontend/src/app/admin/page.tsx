
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("adminName");

    if (!name) {
      router.replace("/admin/login");
      return;
    }

    setAdminName(name);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("adminName");
    router.replace("/admin/login");
  }

  const sections = [
    {
      title: "Event Approvals",
      description: "Review and approve organizer-created events.",
      icon: "🎉",
      link: "/admin/events",
      background: "#E9D5FF",
      color: "#6B21A8",
    },
    {
      title: "Venue Approvals",
      description: "Review venue booking requests.",
      icon: "🏛️",
      link: "/admin/venues",
      background: "#FBCFE8",
      color: "#9D174D",
    },
    {
      title: "Resource Approvals",
      description: "Review campus resource requests.",
      icon: "💻",
      link: "/admin/resources",
      background: "#BFDBFE",
      color: "#1E40AF",
    },
  ];

  if (!adminName) {
    return <p style={{ padding: 30 }}>Loading dashboard...</p>;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F3E8FF, #FCE7F3, #DBEAFE)",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          background: "#FFFFFF",
          padding: "22px 30px",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 4px 15px rgba(100, 60, 120, 0.10)",
          marginBottom: "35px",
        }}
      >
        <div>
          <h1 style={{ color: "#6B21A8", fontSize: "26px", margin: 0 }}>
            🎓 Smart Campus
          </h1>
          <p style={{ color: "#888", margin: "6px 0 0" }}>
            Admin Portal
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            background: "#FBCFE8",
            color: "#9D174D",
            border: "none",
            borderRadius: "25px",
            padding: "12px 24px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </header>

      <section
        style={{
          background: "linear-gradient(110deg, #DDD6FE, #FBCFE8, #BFDBFE)",
          padding: "40px",
          borderRadius: "25px",
          marginBottom: "40px",
        }}
      >
        <p style={{ color: "#6B21A8", fontWeight: "bold" }}>
          Welcome back 👋
        </p>

        <h2 style={{ fontSize: "36px", color: "#4C1D95", margin: "10px 0" }}>
          Hello, {adminName}!
        </h2>

        <p style={{ color: "#555", fontSize: "17px" }}>
          Manage campus events, venues and resources from one place.
        </p>
      </section>

      <h2 style={{ color: "#4C1D95", fontSize: "26px" }}>
        Management Sections
      </h2>

      <p style={{ color: "#777", marginBottom: "25px" }}>
        Review requests and manage campus activities.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "25px",
        }}
      >
        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.link}
            style={{
              display: "block",
              textDecoration: "none",
              background: "#FFFFFF",
              borderRadius: "22px",
              overflow: "hidden",
              boxShadow: "0 5px 18px rgba(100, 60, 120, 0.12)",
              transition: "transform 0.2s",
            }}
          >
            <div
              style={{
                background: section.background,
                padding: "28px",
              }}
            >
              <span style={{ fontSize: "45px" }}>{section.icon}</span>

              <h3
                style={{
                  color: section.color,
                  fontSize: "22px",
                  marginBottom: 0,
                }}
              >
                {section.title}
              </h3>
            </div>

            <div style={{ padding: "25px" }}>
              <p style={{ color: "#666", lineHeight: 1.6 }}>
                {section.description}
              </p>

              <span
                style={{
                  display: "inline-block",
                  background: section.background,
                  color: section.color,
                  padding: "11px 20px",
                  borderRadius: "12px",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                Manage →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <footer
        style={{
          textAlign: "center",
          color: "#888",
          marginTop: "50px",
        }}
      >
        © 2026 Smart Campus Management System
      </footer>
    </main>
  );
}
