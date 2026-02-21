// import React, { useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import EditProfileModal from "../components/EditProfileModal";
// import AddGoalModal from "../components/AddGoalModal";

// const Account: React.FC = () => {
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-green-100">
//       <Navbar isLoggedIn={true} />

//       <main className="max-w-6xl mx-auto px-4 py-10 space-y-8">

//         {/* HEADER */}
//         <div className="pb-3 border-b border-gray-200">
//           <h1 className="text-4xl font-bold tracking-tight text-gray-800">
//             Account
//           </h1>
//           <p className="text-gray-500 mt-1">
//             Manage your profile and learning preferences
//           </p>
//         </div>

//         {/* PROFILE CARD */}
//         <section className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-green-200 transition-all duration-300 p-6">

//           <div className="flex flex-wrap justify-between items-start gap-4 mb-6">

//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold shadow">
//                   JD
//                 </div>

//                 <div className="absolute -bottom-1 -right-1 bg-white border rounded-full w-7 h-7 flex items-center justify-center text-xs shadow">
//                   📷
//                 </div>
//               </div>

//               <div>
//                 <h2 className="text-3xl font-bold text-gray-800">John Doe</h2>
//                 <p className="text-gray-500">john.doe@example.com</p>
//               </div>
//             </div>

//             <button
//               onClick={() => setIsEditOpen(true)}
//               className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition font-medium"
//             >
//               Edit Profile
//             </button>
//           </div>

//           {/* STATS */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {[
//               ["📘", "Total Study Time", "47.5 hours"],
//               ["🎯", "Current Level", "Intermediate"],
//               ["🌍", "Languages Learning", "1"],
//               ["🏆", "Lessons Completed", "47"],
//             ].map(([icon, label, value]) => (
//               <div
//                 key={label}
//                 className="bg-gray-50 rounded-xl p-4 border border-gray-100 hover:bg-green-50 transition"
//               >
//                 <p className="text-lg">{icon}</p>
//                 <p className="text-sm text-gray-500">{label}</p>
//                 <p className="font-bold text-xl mt-1 text-gray-800">{value}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* MAIN GRID */}
//         <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//           {/* LEARNING GOALS */}
//           <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-green-200 transition-all duration-300 p-6">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-2xl font-bold text-gray-800">
//                 Learning Goals
//               </h3>

//               <button
//                 onClick={() => setIsAddGoalOpen(true)}
//                 className="text-sm font-medium text-green-600 hover:font-bold transition"
//               >
//                 + Add Goal
//               </button>
//             </div>

//             {/* EMPTY STATE */}
//             <p className="text-gray-500 text-sm">
//               Set your first goal to start tracking your progress
//             </p>
//           </div>

//           {/* LANGUAGES */}
//           <div className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-green-200 transition-all duration-300 p-6">
//             <h3 className="text-2xl font-bold mb-4 text-gray-800">
//               Languages
//             </h3>

//             <div className="border rounded-xl p-4 space-y-3 bg-white hover:bg-green-50 transition">
//               <div>
//                 <p className="font-semibold text-gray-800">English</p>
//                 <p className="text-sm text-gray-500">Intermediate (B1)</p>
//               </div>

//               <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//                 <div className="bg-blue-500 h-2 rounded-full w-[75%]" />
//               </div>

//               {/* Add Language Button */}
//               <div className="relative group w-full">
//                 <button
//                   disabled
//                   className="w-full border rounded-lg py-2 font-medium cursor-not-allowed"
//                 >
//                   + Add Language
//                 </button>

//                 <div className="absolute -top-8 left-1/2 -translate-x-1/2 
//                   bg-gray-800 text-white text-xs px-2 py-1 rounded 
//                   opacity-0 group-hover:opacity-100 transition pointer-events-none">
//                   Coming soon
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* BADGES */}
//         <section className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-lg transition duration-300">
//           <div className="flex justify-between items-center mb-6">
//             <h3 className="text-2xl font-bold text-gray-800">
//               Achievements & Badges
//             </h3>
//             <span className="text-sm text-gray-500">6 earned</span>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {[
//               ["🔥", "Fire Starter", "Earned"],
//               ["⚡", "Speed Demon", "Earned"],
//               ["🏆", "Champion", "Earned"],
//               ["🎯", "Perfectionist", "Earned"],
//               ["📚", "Bookworm", "Earned"],
//               ["⭐", "Rising Star", "Earned"],
//             ].map(([icon, title, status]) => (
//               <div
//                 key={title}
//                 className="
//           bg-white border border-gray-200 rounded-xl p-4
//           shadow-sm hover:shadow-lg hover:-translate-y-1
//           hover:border-green-300 hover:ring-2 hover:ring-green-100
//           transition-all duration-300 cursor-pointer
//         "
//               >
//                 <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-xl mb-3">
//                   {icon}
//                 </div>

//                 <p className="font-semibold text-sm text-gray-800">{title}</p>
//                 <p className="text-xs text-gray-400 mt-1">{status}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//       </main>

//       <Footer />

//       {/* MODALS */}
//       {isEditOpen && (
//         <EditProfileModal onClose={() => setIsEditOpen(false)} />
//       )}

//       {isAddGoalOpen && (
//         <AddGoalModal onClose={() => setIsAddGoalOpen(false)} />
//       )}
//     </div>
//   );
// };

// export default Account;

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EditProfileModal from "../components/EditProfileModal";
import AddGoalModal from "../components/AddGoalModal";
import API from "../services/api";
import toast from "react-hot-toast";

const Account: React.FC = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [uploading, setUploading] = useState(false); // ✅ loading state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // PROFILE PICTURE UPLOAD HANDLER
  const handleImageUpload = async (file: File) => {
    // 1️⃣ File size validation (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("image", file);

      const response = await API.post(
        "/users/upload-profile-picture",
        formData
      );

      const updatedUser = response.data.user;

      // Update state + localStorage
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile picture updated successfully!");

    } catch (error: any) {
      console.error("UPLOAD ERROR:", error?.response?.data || error);

      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Image must be under 5MB");
      }

    } finally {
      setUploading(false);
    }
  };


  if (!user) {
    return <div className="p-10 text-center">Loading account...</div>;
  }

  const initials = user.fullName
    ? user.fullName
      .split(" ")
      .map((name: string) => name[0])
      .join("")
      .toUpperCase()
    : "U";

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
        <section className="bg-white rounded-2xl shadow-md p-8">

          {/* TOP ROW */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">

            {/* LEFT SIDE */}
            <div className="flex items-start gap-6">

              {/* ✅ AVATAR WITH LOADING STATE */}
              <label className="relative cursor-pointer">

                {uploading ? (
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center animate-pulse shadow-md">
                    <span className="text-sm text-gray-500">Uploading...</span>
                  </div>
                ) : user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white text-4xl font-semibold shadow-md">
                    {initials}
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleImageUpload(e.target.files[0]);
                    }
                  }}
                />

                {!uploading && (
                  <div className="absolute bottom-0 right-0 bg-white border rounded-full w-8 h-8 flex items-center justify-center text-sm shadow hover:bg-gray-100 transition">
                    📷
                  </div>
                )}

              </label>

              {/* Name + Email + Joined */}
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold text-gray-900">
                  {user.fullName}
                </h2>

                <p className="text-gray-500 text-sm">
                  {user.email}
                </p>

                <p className="text-sm text-gray-400">
                  Joined: {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-LK", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* EDIT BUTTON */}
            <button
              onClick={() => setIsEditOpen(true)}
              className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-100 transition font-medium self-start"
            >
              Edit Profile
            </button>
          </div>

          {/* Personal Overview */}
          <div
            onDoubleClick={() => setIsEditOpen(true)}
            className="mt-10 bg-gray-50 rounded-xl p-6 border border-gray-100 hover:bg-gray-100 transition"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Personal Overview
              </h3>
              <span className="text-xs text-gray-400">
                Double click to edit
              </span>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
              <p className="text-gray-700 leading-relaxed">
                {user.bio || "Double click here to add a bio."}
              </p>
            </div>
          </div>

          {/* STATS */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

            <div className="bg-gray-50 rounded-xl p-4 border">
              <p className="text-lg">🎯</p>
              <p className="text-sm text-gray-500">Current Level</p>
              <p className="font-bold text-xl mt-1 text-gray-800">
                {user.skillLevel || "Beginner"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border">
              <p className="text-lg">🌍</p>
              <p className="text-sm text-gray-500">Target Language</p>
              <p className="font-bold text-xl mt-1 text-gray-800">
                {user.targetLanguage || "English"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border">
              <p className="text-lg">📘</p>
              <p className="text-sm text-gray-500">Daily Goal</p>
              <p className="font-bold text-xl mt-1 text-gray-800">
                {user.dailyGoalMinutes || 15} min/day
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border">
              <p className="text-lg">🏆</p>
              <p className="text-sm text-gray-500">Assessment Score</p>
              <p className="font-bold text-xl mt-1 text-gray-800">
                {user.assessmentScore || 0}
              </p>
            </div>

          </div>

        </section>

      </main>

      <Footer />

      {isEditOpen && (
        <EditProfileModal
          onClose={() => setIsEditOpen(false)}
          onProfileUpdate={(updatedUser: any) => {
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
          }} />
      )}

      {isAddGoalOpen && (
        <AddGoalModal onClose={() => setIsAddGoalOpen(false)} />
      )}

    </div>
  );
};

export default Account;