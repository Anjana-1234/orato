import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Account: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isLoggedIn={true} />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">

        {/* HEADER */}
        <div className="pb-3 border-b border-gray-200">
          <h1 className="text-4xl font-bold tracking-tight text-gray-800">
            Account
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your profile and learning preferences
          </p>
        </div>

        {/* PROFILE CARD */}
        <section className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition duration-300">

          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">

            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold shadow">
                  JD
                </div>

                <div className="absolute -bottom-1 -right-1 bg-white border rounded-full w-7 h-7 flex items-center justify-center text-xs shadow">
                  📷
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800">John Doe</h2>
                <p className="text-gray-500">john.doe@example.com</p>
              </div>
            </div>

            <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium">
              Edit Profile
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["📘", "Total Study Time", "47.5 hours"],
              ["🎯", "Current Level", "Intermediate"],
              ["🌍", "Languages Learning", "1"],
              ["🏆", "Lessons Completed", "47"],
            ].map(([icon, label, value]) => (
              <div
                key={label}
                className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:bg-gray-100 transition"
              >
                <p className="text-lg">{icon}</p>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-bold text-xl mt-1 text-gray-800">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MAIN GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEARNING GOALS */}
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">
                Learning Goals
              </h3>
              <button className="text-sm font-medium text-green-600 hover:underline">
                + Add Goal
              </button>
            </div>

            <div className="space-y-4">
              {[
                ["Achieve fluency in English", "2026-12-31", "65%"],
                ["Master English pronunciation", "2026-06-30", "50%"],
              ].map(([title, date, progress]) => (
                <div
                  key={title}
                  className="border rounded-xl p-4 bg-white hover:shadow-sm transition"
                >
                  <p className="font-semibold text-gray-800">{title}</p>
                  <p className="text-sm text-gray-500">Target: {date}</p>

                  <div className="w-full bg-gray-200 rounded-full h-2 mt-3 overflow-hidden">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: progress }}
                    />
                  </div>

                  <p className="text-sm mt-2 text-gray-600">
                    {progress} complete
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* LANGUAGES */}
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition duration-300">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Languages</h3>

            <div className="border rounded-xl p-4 space-y-3 bg-white hover:shadow-sm transition">
              <div>
                <p className="font-semibold text-gray-800">English</p>
                <p className="text-sm text-gray-500">Intermediate (B1)</p>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-500 h-2 rounded-full w-[75%]" />
              </div>

              <button className="w-full border rounded-lg py-2 hover:bg-gray-50 transition font-medium">
                + Add Language
              </button>
            </div>
          </div>
        </section>

        {/* BADGES */}
        <section className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Achievements & Badges
            </h3>
            <span className="text-sm text-gray-500">6 earned</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "🔥 Fire Starter",
              "⚡ Speed Demon",
              "🏆 Champion",
              "🎯 Perfectionist",
              "📚 Bookworm",
              "⭐ Rising Star",
            ].map((badge) => (
              <div
                key={badge}
                className="border rounded-xl p-4 text-center bg-gray-50 hover:shadow-md hover:-translate-y-1 transition duration-300 cursor-pointer"
              >
                <p className="font-semibold text-sm text-gray-700">{badge}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Account;