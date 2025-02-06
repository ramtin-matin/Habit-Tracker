import { React, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";

const HabitCard = ({ habits, onDelete, habitCompleted, onEdit }) => {
  const [threeDotMenu, setThreeDotMenu] = useState(null);
  const [editMenu, setEditMenu] = useState(false);
  const [updatedHabit, setUpdatedHabit] = useState("");

  const handleEdit = (habitId) => {
    if (!updatedHabit.trim()) return;
    onEdit(habitId, updatedHabit);

    console.log("editted habit id: ", habitId);
    console.log("new name: ", updatedHabit);

    setUpdatedHabit("");
    setThreeDotMenu(null);
    setEditMenu(false);
  };

  return (
    <div>
      {habits.map((habit) => (
        <div
          key={habit.id}
          className="mt-3 transition duration-100 ease-in hover:bg-gray-50 h-1/12 relative flex items-center justify-between p-3 border-1 border-gray-200 rounded-md bg-white shadow-sm mb-2"
        >
          {/* Checkbox */}
          <input
            type="checkbox"
            className="accent-emerald-600/75 w-7 h-8 cursor-pointer"
            name="habit-checkbox"
            checked={habit.completed}
            onChange={() => habitCompleted(habit.id)}
          />

          {/* Habit Name */}
          <p className="max-sm:text-xs font-bold text-gray-500 absolute ml-10">
            {habit.text}
          </p>

          {/* Habit Cluster */}
          <p
            className={`font-bold max-sm:scale-70 max-sm:right-8 cursor-default text-xs absolute max-w-20 text-center w-full right-13 text-gray-700 p-2 rounded-lg ${habit.color}`}
          >
            {habit.cluster}
          </p>

          {/* Three-Dot Menu */}
          <div className="relative">
            <button
              onClick={() => setThreeDotMenu(habit.id)}
              className="p-2 rounded-full transition duration-200 ease-in-out hover:bg-gray-100"
            >
              <FiMoreVertical size={18} />
            </button>

            {/* Dropdown Menu */}
            {threeDotMenu === habit.id && (
              <div className="fixed p-2 ml-2 mt-2 w-24 bg-white border border-gray-200 shadow-md rounded-md z-10">
                <button
                  onClick={() => setEditMenu(true)}
                  className="text-sm block w-full px-4 py-2 text-left hover:bg-gray-100 hover:rounded-lg transition duration-150 ease-in"
                >
                  Edit
                </button>
                {editMenu && (
                  <div className="fixed inset-1 flex items-center justify-center bg-gray-100/55 z-10">
                    <div className="flex flex-col gap-2 absolute mt-12 p-4 sm:p-8 border border-gray-300 bg-white shadow-md rounded-md">
                      <label className="text-sm ml-5 text-gray-500">
                        Edit Habit
                      </label>
                      <input
                        className="border-1 rounded-md border-gray-200 p-1 m-auto"
                        type="text"
                        value={updatedHabit || ""}
                        onChange={(e) => setUpdatedHabit(e.target.value)}
                      />

                      <button
                        onClick={() => {
                          console.log("old habit name: ", habit.text),
                            handleEdit(habit.id);
                        }}
                        className="mt-2 w-1/2 text-xs sm:text-sm p-2 m-auto border rounded-lg shadow-sm border-gray-200 text-gray-500 hover:bg-gray-50 active:bg-gray-100 transition duration-150 ease-in cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setUpdatedHabit("");
                          setEditMenu(false);
                          setThreeDotMenu(null);
                        }}
                        className="mt-2 w-1/2 text-xs sm:text-sm p-2 m-auto border rounded-lg shadow-sm border-gray-200 text-gray-500 hover:bg-gray-50 active:bg-gray-100 transition duration-150 ease-in cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => {
                    onDelete(habit.id);
                    setThreeDotMenu(null);
                  }}
                  className="text-sm block w-full px-4 py-2 text-left text-red-500  hover:rounded-lg hover:bg-gray-100 transition duration-150 ease-in"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HabitCard;
