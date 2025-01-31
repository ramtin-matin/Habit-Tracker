import React from "react";

const Modal = ({ isOpen, onClose, onSave, habitName, setHabitName }) => {
  if (!isOpen) return null;  // Only render when open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-xl font-bold">Create a New Habit</h2>
          <button onClick={onClose} className="text-xl">&times;</button>
        </div>

        {/* Form */}
        <div className="mt-4">
          <label className="block mb-2 text-sm text-slate-600">Habit Name</label>
          <input 
            type="text" 
            placeholder="Enter habit name" 
            className="w-full p-2 border rounded mb-4"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button className="p-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
            <button className="p-2 bg-green-500 text-white rounded" onClick={onSave}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
