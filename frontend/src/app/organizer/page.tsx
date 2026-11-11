
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OrganizerDashboard() {
  const router = useRouter();
  const [organizerName, setOrganizerName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("organizerName");

    if (!name) {
      router.replace("/organizer/login");
      return;
    }

    setOrganizerName(name);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("organizerName");
    localStorage.removeItem("organizerEmail");
    router.replace("/organizer/login");
  }

  const sections = [
    {
      title: "Create Event",
      description: "Organize new campus events and submit them for approval.",
      icon: "🎉",
      link: "/organizer/events/create",
      background: "#E9D5FF",
      color: "#6B21A8",
    },
    {
      title: "Manage Events",
      description: "View and manage all the events you have created.",
      icon: "📅",
      link: "/organizer/events",
      background: "#FBCFE8",
      color: "#9D174D",
    },
    {
      title: "Venue Requests",
      description: "Request campus venues for your events.",
      icon: "🏛️",
      link: "/organizer/venues",
      background: "#BFDBFE",
      color: "#1E40AF",
    },
    {
      title: "Resource Requests",
      description: "Request equipment and campus resources.",
      icon: "💻",
      link: "/organizer/resources",
      background: "#BBF7D0",
      color: "#166534",
    },
    {
      title: "Registrations",
      description: "View students registered for your campus events.",
      icon: "👥",
      link: "/organizer/registrations",
      background: "#FED7AA",
      color: "#9A3412",
    },
  ];

  if (!organizerName) {
    return <p style={{ padding: "30px" }}>Loading Organizer Dashboard...</p>;
  }

  return (
    <main style={{
      minHeight: "100vh",
      padding: "25px",
      background: "linear-gradient(135deg, #F3E8FF, #FCE7F3, #DBEAFE)",
      fontFamily: "Arial, sans-serif"
    }}>

      <header style={{
        background: "#FFFFFF",
        padding: "20px 30px",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 15px rgba(100,60,120,0.10)",
        marginBottom: "35px"
      }}>

        <div>
          <h1 style={{ color: "#6B21A8", margin: 0, fontSize: "27px" }}>
            🎓 Smart Campus
          </h1>
          <p style={{ color: "#888", marginBottom: 0 }}>
            Organizer Portal
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={{
            background: "#FBCFE8",
            color: "#9D174D",
            padding: "12px 23px",
            border: "none",
            borderRadius: "25px",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Logout
        </button>

      </header>

      <section style={{
        background: "linear-gradient(110deg, #DDD6FE, #FBCFE8, #BFDBFE)",
        padding: "40px",
        borderRadius: "25px",
        marginBottom: "40px"
      }}>

        <p style={{ color: "#6B21A8", fontWeight: "bold" }}>
          Welcome back 👋
        </p>

        <h2 style={{
          color: "#4C1D95",
          fontSize: "36px",
          margin: "10px 0"
        }}>
          Hello, {organizerName}!
        </h2>

        <p style={{ color: "#555", fontSize: "17px" }}>
          Manage your campus events, venues and resources from one place.
        </p>

      </section>

      <h2 style={{ color: "#4C1D95", fontSize: "27px" }}>
        Organizer Dashboard
      </h2>

      <p style={{ color: "#777", marginBottom: "25px" }}>
        Choose a section to manage your campus activities.
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "25px"
      }}>

        {sections.map((section) => (
          <Link
            key={section.title}
            href={section.link}
            style={{
              display: "block",
              background: "#FFFFFF",
              borderRadius: "22px",
              overflow: "hidden",
              textDecoration: "none",
              boxShadow: "0 5px 18px rgba(100,60,120,0.12)",
              transition: "transform 0.2s"
            }}
          >

            <div style={{
              background: section.background,
              padding: "28px"
            }}>

              <span style={{ fontSize: "45px" }}>
                {section.icon}
              </span>

              <h3 style={{
                color: section.color,
                fontSize: "22px",
                marginBottom: 0
              }}>
                {section.title}
              </h3>

            </div>

            <div style={{ padding: "25px" }}>

              <p style={{ color: "#666", lineHeight: 1.6 }}>
                {section.description}
              </p>

              <span style={{
                display: "inline-block",
                background: section.background,
                color: section.color,
                padding: "11px 20px",
                borderRadius: "12px",
                fontWeight: "bold",
                marginTop: "10px"
              }}>
                Open Section →
              </span>

            </div>

          </Link>
        ))}

      </div>

      <footer style={{
        textAlign: "center",
        color: "#888",
        marginTop: "50px",
        paddingBottom: "20px"
      }}>
        © 2026 Smart Campus Management System
      </footer>

    </main>
  );
}
