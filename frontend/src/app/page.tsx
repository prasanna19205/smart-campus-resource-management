
import Link from "next/link";

export default function HomePage() {
  const portals = [
    {
      title: "Student Portal",
      description:
        "Discover campus events, explore venues, access resources and share feedback.",
      icon: "🎓",
      href: "/student/login",
      color: "bg-[#e9defb]",
      iconColor: "bg-[#ded0f5]",
      accent: "text-[#765b9f]",
      role: "For Students",
    },
    {
      title: "Organizer Portal",
      description:
        "Create and manage campus events, view registrations and coordinate activities.",
      icon: "📋",
      href: "/organizer/login",
      color: "bg-[#f8e8f0]",
      iconColor: "bg-[#f3d9e6]",
      accent: "text-[#a56b85]",
      role: "For Organizers",
    },
    {
      title: "Admin Portal",
      description:
        "Manage campus activities, review event requests and oversee campus operations.",
      icon: "⚙️",
      href: "/admin/login",
      color: "bg-[#e8f5ed]",
      iconColor: "bg-[#d7eddf]",
      accent: "text-[#548367]",
      role: "For Administrators",
    },
  ];

  const features = [
    {
      icon: "🎉",
      title: "Event Management",
      description: "Discover, organize and manage campus events.",
    },
    {
      icon: "🏛️",
      title: "Venue Booking",
      description: "Explore campus venues and their availability.",
    },
    {
      icon: "💻",
      title: "Resource Management",
      description: "Access and manage campus equipment and resources.",
    },
    {
      icon: "💬",
      title: "Student Feedback",
      description: "Share suggestions to improve campus facilities.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf7ff] text-[#302b46]">

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-[#eee6f5] bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <Link href="/" className="flex items-center gap-3">
            <span className="text-3xl">🎓</span>
            <span className="text-xl font-extrabold text-[#51417f]">
              Smart Campus
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-semibold text-[#625d70] md:flex">
            <a href="#home" className="hover:text-[#8068bd]">Home</a>
            <a href="#portals" className="hover:text-[#8068bd]">Portals</a>
            <a href="#features" className="hover:text-[#8068bd]">Features</a>
          </div>

          <Link
            href="/student/login"
            className="rounded-full bg-[#9a82d4] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#8068bd]"
          >
            Get Started →
          </Link>

        </nav>
      </header>

      {/* Hero */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-[#e9defb] via-[#f8e8f0] to-[#e4f1fc] px-6 py-24 md:py-32"
      >
        <div className="relative z-10 mx-auto max-w-5xl text-center">

          <span className="inline-block rounded-full border border-white bg-white/60 px-5 py-2 text-sm font-semibold text-[#8068a7]">
            ✨ One Platform. Every Campus Need.
          </span>

          <h1 className="mt-8 text-4xl font-extrabold leading-tight tracking-tight text-[#39304f] md:text-6xl">
            Welcome to{" "}
            <span className="text-[#8e75c4]">
              Smart Campus
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#70677f] md:text-lg">
            A smarter way to connect students, organizers and administrators.
            Discover events, manage resources and make campus life simpler,
            all in one place.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link
              href="/student/login"
              className="rounded-full bg-[#9a82d4] px-8 py-4 font-bold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-1 hover:bg-[#8068bd]"
            >
              Explore Student Portal →
            </Link>

            <a
              href="#portals"
              className="rounded-full border border-white bg-white/70 px-8 py-4 font-bold text-[#66558f] transition hover:bg-white"
            >
              Explore All Portals
            </a>

          </div>

          <div className="mt-14 flex flex-wrap justify-center gap-4 text-sm font-medium text-[#796d8a]">
            <span className="rounded-full bg-white/60 px-5 py-3">🎓 Student Friendly</span>
            <span className="rounded-full bg-white/60 px-5 py-3">📅 Easy Event Management</span>
            <span className="rounded-full bg-white/60 px-5 py-3">🏛️ Connected Campus</span>
          </div>

        </div>

        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-white/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-[#d9c8f4]/40 blur-3xl" />
      </section>

      {/* Portal Selection */}
      <section id="portals" className="px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-14 max-w-2xl text-center">

            <p className="text-sm font-extrabold uppercase tracking-[3px] text-[#9a82d4]">
              Choose Your Portal
            </p>

            <h2 className="mt-4 text-3xl font-extrabold text-[#39304f] md:text-4xl">
              One Campus, Three Experiences
            </h2>

            <p className="mt-5 leading-7 text-[#777387]">
              Access the portal designed for your role in the campus community.
            </p>

          </div>

          <div className="grid gap-7 md:grid-cols-3">

            {portals.map((portal) => (
              <div
                key={portal.title}
                className="overflow-hidden rounded-3xl border border-[#eee6f5] bg-white shadow-[0_8px_30px_rgba(76,55,110,0.07)] transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className={`${portal.color} p-8`}>

                  <div className={`${portal.iconColor} flex h-16 w-16 items-center justify-center rounded-2xl text-4xl`}>
                    {portal.icon}
                  </div>

                  <p className={`mt-7 text-xs font-extrabold uppercase tracking-widest ${portal.accent}`}>
                    {portal.role}
                  </p>

                  <h3 className={`mt-2 text-2xl font-extrabold ${portal.accent}`}>
                    {portal.title}
                  </h3>

                </div>

                <div className="p-8">

                  <p className="min-h-20 text-sm leading-7 text-[#777387]">
                    {portal.description}
                  </p>

                  <Link
                    href={portal.href}
                    className={`mt-6 inline-flex items-center gap-2 font-bold ${portal.accent} transition hover:gap-4`}
                  >
                    Enter Portal <span>→</span>
                  </Link>

                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-[#f5f1fa] px-6 py-24">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto mb-14 max-w-2xl text-center">

            <p className="text-sm font-extrabold uppercase tracking-[3px] text-[#9a82d4]">
              What We Offer
            </p>

            <h2 className="mt-4 text-3xl font-extrabold text-[#39304f] md:text-4xl">
              Everything Your Campus Needs
            </h2>

            <p className="mt-5 leading-7 text-[#777387]">
              Manage everyday campus activities through one connected platform.
            </p>

          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-[#eee6f5] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl ${
                  ["bg-[#e9defb]", "bg-[#e4f1fc]", "bg-[#e8f5ed]", "bg-[#f8e8f0]"][index]
                }`}>
                  {feature.icon}
                </div>

                <h3 className="mt-6 text-lg font-bold text-[#493b60]">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#777387]">
                  {feature.description}
                </p>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="bg-gradient-to-r from-[#e9defb] via-[#f8e8f0] to-[#e4f1fc] px-6 py-20 text-center">

        <div className="mx-auto max-w-3xl">

          <span className="text-5xl">🌸</span>

          <h2 className="mt-6 text-3xl font-extrabold text-[#39304f] md:text-4xl">
            Make Every Campus Day Smarter
          </h2>

          <p className="mt-5 leading-7 text-[#70677f]">
            Everything connected. Everyone empowered. One Smart Campus.
          </p>

          <Link
            href="/student/login"
            className="mt-8 inline-block rounded-full bg-[#9a82d4] px-9 py-4 font-bold text-white shadow-lg transition hover:bg-[#8068bd]"
          >
            Get Started Today →
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#39304f] px-6 py-12 text-center text-white">

        <div className="text-2xl font-extrabold">
          🎓 Smart Campus
        </div>

        <p className="mt-4 text-sm text-[#d2cde0]">
          Making campus life simpler, smarter and more connected.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-6 text-sm text-[#d2cde0]">
          <Link href="/student/login" className="hover:text-white">Student</Link>
          <Link href="/organizer/login" className="hover:text-white">Organizer</Link>
          <Link href="/admin/login" className="hover:text-white">Admin</Link>
        </div>

        <p className="mt-8 text-xs text-[#aaa4ba]">
          © 2026 Smart Campus Management System. All rights reserved.
        </p>

      </footer>

    </main>
  );
}
