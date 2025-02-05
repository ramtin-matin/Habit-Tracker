import { React, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";

const HabitCard = ({ habits, onDelete, habitCompleted }) => {
  const [threeDotMenuOpen, setThreeDotMenuOpen] = useState(false);

  const toggleThreeDotMenu = (habitId) => {
    setThreeDotMenuOpen((prev) => (prev === habitId ? false : habitId));
  };

  const handleEdit = (habit) => {
    console.log("Editing: ", habit);
    toggleThreeDotMenu();
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
              onClick={() => toggleThreeDotMenu(habit.id)}
              className="p-2 rounded-full transition duration-200 ease-in-out hover:bg-gray-100"
            >
              <FiMoreVertical size={18} />
            </button>

            {/* Dropdown Menu */}
            {threeDotMenuOpen === habit.id && (
              <div className="fixed p-2 ml-2 mt-2 w-24 bg-white border border-gray-200 shadow-md rounded-md z-10">
                <button
                  onClick={() => {
                    handleEdit(habit.text);
                  }}
                  className="text-sm block w-full px-4 py-2 text-left hover:bg-gray-100 hover:rounded-lg transition duration-150 ease-in"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(habit.id);
                    toggleThreeDotMenu();
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
