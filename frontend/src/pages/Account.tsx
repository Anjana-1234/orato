import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EditProfileModal from "../components/EditProfileModal";
import AddGoalModal from "../components/AddGoalModal";

const Account: React.FC = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-green-100">
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
        <section className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-green-200 transition-all duration-300 p-6">

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

            <button
              onClick={() => setIsEditOpen(true)}
              className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium"
            >
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
                className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:bg-green-50 transition"
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
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-green-200 transition-all duration-300 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800">
                Learning Goals
              </h3>

              <button
                onClick={() => setIsAddGoalOpen(true)}
                className="text-sm font-medium text-green-600 hover:font-bold transition"
              >
                + Add Goal
              </button>
            </div>

            {/* EMPTY STATE */}
            <p className="text-gray-500 text-sm">
              No goals yet. Click “+ Add Goal” to create one.
            </p>
          </div>

          {/* LANGUAGES */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-green-200 transition-all duration-300 p-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Languages
            </h3>

            <div className="border rounded-xl p-4 space-y-3 bg-white hover:bg-green-50 transition">
              <div>
                <p className="font-semibold text-gray-800">English</p>
                <p className="text-sm text-gray-500">Intermediate (B1)</p>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-blue-500 h-2 rounded-full w-[75%]" />
              </div>

              {/* Add Language Button */}
              <div className="relative group w-full">
                <button
                  disabled
                  className="w-full border rounded-lg py-2 font-medium cursor-not-allowed"
                >
                  + Add Language
                </button>

                <div className="absolute -top-8 left-1/2 -translate-x-1/2 
                  bg-gray-800 text-white text-xs px-2 py-1 rounded 
                  opacity-0 group-hover:opacity-100 transition pointer-events-none">
                  Coming soon
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BADGES */}
        <section className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-green-200 transition-all duration-300 p-6">
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
                className="border rounded-xl p-4 text-center bg-gray-50 hover:shadow-md hover:-translate-y-1 hover:bg-green-50 transition duration-300 cursor-pointer"
              >
                <p className="font-semibold text-sm text-gray-700">{badge}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      <Footer />

      {/* MODALS */}
      {isEditOpen && (
        <EditProfileModal onClose={() => setIsEditOpen(false)} />
      )}

      {isAddGoalOpen && (
        <AddGoalModal onClose={() => setIsAddGoalOpen(false)} />
      )}
    </div>
  );
};

export default Account;