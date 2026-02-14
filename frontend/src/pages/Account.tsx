import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Account: React.FC = () => {
  return (
    <div className="page-wrapper bg-gray-100 min-h-screen">
      <Navbar isLoggedIn={true} />

      <main className="page-container max-w-6xl mx-auto px-4 py-8">

        {/* PAGE TITLE */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Account</h1>
        <p className="text-gray-500 mb-8">
          Manage your profile and learning preferences
        </p>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-start mb-6">

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold">
                JD
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-800">John Doe</h2>
                <p className="text-gray-500">john.doe@example.com</p>
              </div>
            </div>

            <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100">
              Edit Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm">Total Study Time</p>
              <p className="font-bold text-xl">47.5 hours</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm">Current Level</p>
              <p className="font-bold text-xl">Intermediate</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm">Languages Learning</p>
              <p className="font-bold text-xl">1</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-500 text-sm">Lessons Completed</p>
              <p className="font-bold text-xl">47</p>
            </div>
          </div>
        </div>

        {/* TWO COLUMN SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEARNING GOALS */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-6">
            <div className="flex justify-between mb-4">
              <h2 className="text-2xl font-bold">Learning Goals</h2>
              <button className="text-green-600 font-medium">+ Add Goal</button>
            </div>

            <div className="space-y-4">

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold">Achieve fluency in English</h3>
                <p className="text-sm text-gray-500">Target: 2026-12-31</p>
                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div className="bg-green-600 h-2 rounded w-2/3"></div>
                </div>
                <p className="text-sm mt-1">65% complete</p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold">Master English pronunciation</h3>
                <p className="text-sm text-gray-500">Target: 2026-06-30</p>
                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div className="bg-green-600 h-2 rounded w-1/2"></div>
                </div>
                <p className="text-sm mt-1">40% complete</p>
              </div>

            </div>
          </div>

          {/* LANGUAGES PANEL */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Languages</h2>

            <div className="space-y-4">
              <div>
                <p className="font-medium">English</p>
                <p className="text-sm text-gray-500">Intermediate (B1)</p>
                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div className="bg-blue-500 h-2 rounded w-3/4"></div>
                </div>
              </div>

              <button className="w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100">
                + Add Language
              </button>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default Account;