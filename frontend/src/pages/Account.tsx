import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Account: React.FC = () => {
  return (
    <div className="page-wrapper bg-gray-100 min-h-screen">
      <Navbar isLoggedIn={true} />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">

        {/* PAGE TITLE */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Account</h1>
          <p className="text-gray-500 mt-1">
            Manage your profile and learning preferences
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">

          <div className="flex justify-between items-start mb-6 flex-wrap gap-4">

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold">
                JD
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800">John Doe</h2>
                <p className="text-gray-500">john.doe@example.com</p>
              </div>
            </div>

            <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              ["Total Study Time", "47.5 hours"],
              ["Current Level", "Intermediate"],
              ["Languages Learning", "1"],
              ["Lessons Completed", "47"],
            ].map(([label, value]) => (
              <div key={label} className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-500 text-sm">{label}</p>
                <p className="font-bold text-xl mt-1">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* TWO COLUMN SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* LEARNING GOALS */}
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
            <h3 className="text-2xl font-bold mb-4">Learning Goals</h3>

            <div className="space-y-4">

              <div className="border rounded-xl p-4">
                <p className="font-semibold">Achieve fluency in English</p>
                <p className="text-sm text-gray-500">Target: 2026-12-31</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-green-600 h-2 rounded-full w-[65%]" />
                </div>
                <p className="text-sm mt-2">65% complete</p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="font-semibold">Master English pronunciation</p>
                <p className="text-sm text-gray-500">Target: 2026-06-30</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                  <div className="bg-green-600 h-2 rounded-full w-[50%]" />
                </div>
                <p className="text-sm mt-2">50% complete</p>
              </div>

            </div>
          </div>

          {/* LANGUAGES */}
          <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
            <h3 className="text-2xl font-bold mb-4">Languages</h3>

            <div className="border rounded-xl p-4">
              <p className="font-semibold">English</p>
              <p className="text-sm text-gray-500">Intermediate (B1)</p>

              <div className="w-full bg-gray-200 rounded-full h-2 mt-3">
                <div className="bg-blue-500 h-2 rounded-full w-[75%]" />
              </div>

              <button className="mt-4 w-full border rounded-lg py-2 hover:bg-gray-50 transition">
                + Add Language
              </button>
            </div>
          </div>
        </div>

        {/* ACHIEVEMENTS */}
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Achievements & Badges</h3>
            <span className="text-gray-500 text-sm">6 earned</span>
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
                className="border rounded-xl p-4 text-center hover:shadow transition"
              >
                <p className="font-semibold text-sm">{badge}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Account;