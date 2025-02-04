import { FaPlus } from "react-icons/fa"; // imports a plus icon
import React, { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { ChevronDown } from "lucide-react";

const Habits = () => {
  const habits = [
    { id: 1, text: "work out" },
    { id: 2, text: "read" },
    { id: 3, text: "drink water" },
    { id: 4, text: "homework" },
    { id: 5, text: "walk" },
    { id: 6, text: "journal" },
  ];

  const [threeDotMenuOpen, setThreeDotMenuOpen] = useState(false);
  const [createHabitMenu, setCreateHabitMenu] = useState(false);
  const [handleClickValue, setHandleClickValue] = useState(null);

  const handleClick = (habit) => {
    setHandleClickValue((prev) => (prev === habit.id ? null : habit.id));
    console.log("threeDotMenuOpen:", threeDotMenuOpen);
  };

  const toggleCreateHabitMenu = () => {
    setCreateHabitMenu((prev) => !prev);
  };

  const toggleThreeDotMenu = (habitId) => {
    setThreeDotMenuOpen((prev) => (prev === habitId ? null : habitId));
  };

  const handleEdit = (habit) => {
    console.log("Editing: ", habit);
    toggleThreeDotMenu();
    setHandleClickValue(null);
  };

  const handleDelete = (habit) => {
    console.log("Deleting: ", habit);
    toggleThreeDotMenu();
    setHandleClickValue(null);
  };

  return (
    <div className="max-w-8xl h-full rounded-lg mx-auto p-2">
      <h1 className="md:shrink-0 text-5xl max-sm:text-4xl m-1 mb-2 font-bold text-emerald-600/75">
        My Habits.
      </h1>
      <p className="md:shrink-0 text-base max-sm:text-sm m-1 text-gray-500">
        Good habits don’t happen overnight.{" "}
        <b className="text-emerald-600/75">Small steps</b>, taken{" "}
        <b className="text-emerald-600/75">consistently</b>, lead to{" "}
        <b className="text-emerald-600/75">big changes.</b> <br></br>Stay{" "}
        <b className="text-emerald-600/75">patient</b>, stay{" "}
        <b className="text-emerald-600/75">consistent.</b>
      </p>
      <div className=" border-1 border-gray-200 flex items-center h-1/9 max-md:h-1/8 max-sm:px-2 px-4 mt-4 rounded-sm">
        <ul className="flex gap-2">
          <button
            onClick={toggleCreateHabitMenu}
            className="relative max-sm:scale-75 flex justify-center gap-4 text-xs font-bold cursor-pointer md:shrink-0 max-sm:p-1 max-lg:p-2 p-3 rounded-lg transition duration-150 ease-in active:scale-99 text-gray-500 hover:shadow-sm hover:bg-gray-50 border-1"
          >
            <FaPlus className="m-auto text-xs" />
            Create Habit
            <ChevronDown className="m-auto w-4 h-4" />
          </button>
          {createHabitMenu && (
            <div className="flex flex-col gap-2 absolute mt-14 p-8 border border-gray-300 bg-white shadow-md rounded-md z-1">
              <label className="text-gray-500">Habit</label>
              <input
                className="border-1 border-gray-200 p-1 m-auto"
                id="Habit-input"
                type="Habit"
              />
              <button
                onClick={toggleCreateHabitMenu}
                className="mt-2 w-1/2 m-auto border rounded-lg border-gray-500 text-gray-500 hover:bg-gray-50 active:bg-gray-100 transition duration-150 ease-in cursor-pointer"
              >
                Add
              </button>
            </div>
          )}
        </ul>
      </div>
      <div className="w-4/7 border-1 border-gray-200 h-7/10 p-4 mt-2 rounded-sm">
        <div>
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="h-1/12 relative flex items-center justify-between p-3 border-1 border-gray-200 rounded-md bg-white shadow-sm mb-2"
            >
              {/* Checkbox */}
              <input
                type="checkbox"
                className="accent-emerald-600/75 w-5 h-5 cursor-pointer"
              />

              {/* Habit Name */}
              <span className="max-sm:text-xs text-gray-700 absolute ml-10">
                {habit.text}
              </span>

              {/* Three-Dot Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    handleClick(habit);
                    toggleThreeDotMenu(habit.id);
                  }}
                  className="p-2 rounded-full transition duration-200 ease-in-out hover:bg-gray-100"
                >
                  <FiMoreVertical size={18} />
                </button>

                {/* Dropdown Menu */}
                {handleClickValue === habit.id &&
                  threeDotMenuOpen === habit.id && (
                    <div className="absolute right-0 mt-2 w-24 bg-white border border-gray-200 shadow-md rounded-md z-10">
                      <button
                        onClick={() => {
                          handleEdit(habit.text);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(habit.text);
                        }}
                        className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Habits;
