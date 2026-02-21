import React, { useEffect, useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

interface Props {
    onClose: () => void;
    onProfileUpdate: (user: any) => void;
}

const EditProfileModal: React.FC<Props> = ({
    onClose,
    onProfileUpdate,
}) => {
    const [show, setShow] = useState(false);
    const [saving, setSaving] = useState(false);

    const [currentUser, setCurrentUser] = useState<any>(null);
    const [fullName, setFullName] = useState("");
    const [bio, setBio] = useState("");
    const [targetLanguage, setTargetLanguage] = useState("English");

    useEffect(() => {
        setShow(true);

        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const user = JSON.parse(storedUser);

            setCurrentUser(user);
            setFullName(user.fullName || "");
            setBio(user.bio || "");
            setTargetLanguage(user.targetLanguage || "English");
        }

        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") handleClose();
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, []);

    const handleClose = () => {
        setShow(false);
        setTimeout(() => onClose(), 200);
    };

    const handleSave = async () => {
        if (!fullName.trim()) {
            toast.error("Full name cannot be empty");
            return;
        }

        try {
            setSaving(true);

            const response = await API.put("/users/profile", {
                fullName,
                bio,
                targetLanguage,
            });

            const updatedUser = response.data.user;

            localStorage.setItem("user", JSON.stringify(updatedUser));
            onProfileUpdate(updatedUser);

            toast.success("Profile updated successfully!");

            handleClose();

        } catch (error: any) {
            console.error("Profile update failed:", error?.response?.data || error);

            if (error?.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Profile update failed. Please try again.");
            }

        } finally {
            setSaving(false);
        }
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${show ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"
                }`}
            onClick={handleClose}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 transition-all duration-200 ${show ? "scale-100 opacity-100" : "scale-95 opacity-0"
                    }`}
            >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Edit Profile
                    </h2>
                    <button onClick={handleClose}>✕</button>
                </div>

                {/* FORM */}
                <div className="space-y-4">
                    <div>
                        <label className="text-sm text-gray-600">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full mt-1 border rounded-lg px-3 py-2"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            value={currentUser?.email || ""}
                            disabled
                            className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-100 text-gray-500"
                        />
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">
                            Learning Language
                        </label>
                        <select
                            value={targetLanguage}
                            onChange={(e) => setTargetLanguage(e.target.value)}
                            className="w-full mt-1 border rounded-lg px-3 py-2"
                        >
                            <option value="English">English</option>
                            <option disabled>සිංහල (Coming Soon)</option>
                            <option disabled>தமிழ் (Coming Soon)</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">
                            Current Level (Auto-calculated)
                        </label>
                        <div className="w-full mt-1 border rounded-lg px-3 py-2 bg-gray-100 text-gray-600">
                            {currentUser?.skillLevel || "Beginner"}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Level is generated automatically by the system.
                        </p>
                    </div>

                    <div>
                        <label className="text-sm text-gray-600">Bio</label>
                        <textarea
                            rows={3}
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full mt-1 border rounded-lg px-3 py-2 resize-none"
                        />
                    </div>
                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={handleClose}
                        disabled={saving}
                        className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className={`px-4 py-2 rounded-lg text-white transition ${saving
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfileModal;