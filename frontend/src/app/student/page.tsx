
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
  const router = useRouter();
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("studentName");

    if (!name) {
      router.replace("/student/login");
      return;
    }

    setStudentName(name);
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("studentName");
    localStorage.removeItem("studentEmail");
    router.replace("/student/login");
  }

  if (!studentName) {
    return <p className="p-8">Loading...</p>;
  }

  const sections = [
    {
      title: "Campus Events",
      description: "Discover events, workshops and activities happening on campus.",
      link: "/student/events",
      icon: "🎉",
      color: "from-purple-500 to-indigo-600",
    },
    {
      title: "Venue Availability",
      description: "Explore approved venues and campus spaces.",
      link: "/student/venues",
      icon: "🏛️",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Campus Resources",
      description: "Check available equipment and campus resources.",
      link: "/student/resources",
      icon: "💻",
      color: "from-emerald-500 to-teal-500",
    },
    {
      title: "Feedback",
      description: "Share suggestions and help improve campus facilities.",
      link: "/student/feedback",
      icon: "💬",
      color: "from-orange-500 to-pink-500",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100">

      <header className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              🎓 Smart Campus
            </h1>
            <p className="text-indigo-100 text-sm">
              Student Portal
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-white text-purple-700 px-5 py-2 rounded-full font-semibold hover:bg-purple-100 transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">

        <section className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-xl mb-10">
          <p className="text-indigo-100 mb-3">
            Welcome back 👋
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hello, {studentName}!
          </h2>

          <p className="text-indigo-100 text-lg">
            Everything you need for your campus life, all in one place.
          </p>
        </section>

        <div className="mb-7">
          <h2 className="text-2xl font-bold text-gray-800">
            Explore Your Campus
          </h2>
          <p className="text-gray-500 mt-2">
            Choose a section to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">

          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.link}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${section.color} p-6 text-white`}>
                <span className="text-5xl">
                  {section.icon}
                </span>

                <h3 className="text-2xl font-bold mt-4">
                  {section.title}
                </h3>
              </div>

              <div className="p-6">
                <p className="text-gray-600">
                  {section.description}
                </p>

                <p className="mt-5 font-semibold text-indigo-600 group-hover:text-purple-700">
                  Explore Section →
                </p>
              </div>
            </Link>
          ))}

        </div>

        <footer className="text-center text-gray-500 text-sm mt-14">
          © 2026 Smart Campus Management System
        </footer>

      </div>
    </main>
  );
}
