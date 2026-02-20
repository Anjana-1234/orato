import React, { useEffect, useState } from "react";

interface Props {
  onClose: () => void;
}

const AddGoalModal: React.FC<Props> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => onClose(), 200);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-200 ${
        show ? "bg-black/40 opacity-100" : "bg-black/0 opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white rounded-2xl shadow-xl w-full max-w-md p-6 transition-all duration-200 ${
          show ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Add Learning Goal</h2>
          <button onClick={handleClose}>✕</button>
        </div>

        {/* FORM */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Goal</label>
            <select
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            >
              <option value="">Select a goal</option>
              <option>Expand Vocabulary Usage</option>
              <option>Master Grammar Accuracy</option>
              <option>Improve Speaking Fluency</option>
              <option>Improve Writing Clarity</option>
              <option>Achieve Balanced Skill Growth</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-600">Target Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full mt-1 border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleClose}
            className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            disabled={!title || !date}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
          >
            Save Goal
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddGoalModal;