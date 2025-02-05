import { React, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaPlus } from "react-icons/fa";

const CreateHabit = ({ habits, addHabit }) => {
  const [createHabitMenu, setCreateHabitMenu] = useState(false);
  const [newHabit, setNewHabit] = useState("");

  const handleAddHabit = () => {
    if (!newHabit.trim()) return;
    const newItem = {
      id: habits.length + 1,
      text: newHabit,
      cluster: "Habit",
      color: "bg-gray-300",
      completed: false,
    };
    addHabit(newItem);
    console.log("new habit: ", newHabit);
    setNewHabit("");
    setCreateHabitMenu(false);
    console.log("Number of habits: ", habits.length + 1);
  };

  const toggleCreateHabitMenu = () => {
    setCreateHabitMenu((prev) => !prev);
  };

  return (
    <ul className="flex gap-2">
      <button
        onClick={toggleCreateHabitMenu}
        className="relative flex justify-center gap-4 text-sm p-2 font-bold cursor-pointer md:shrink-0 rounded-lg transition duration-150 ease-in active:scale-99 text-gray-500 hover:shadow-sm hover:bg-gray-50 border-1 border-gray-300"
      >
        <FaPlus className="m-auto text-xs" />
        <span className="hidden sm:inline">Create</span>
        <ChevronDown className="m-auto w-4 h-4" />
      </button>
      {createHabitMenu && (
        <div className="flex flex-col gap-2 absolute mt-12 p-4 sm:p-8 border border-gray-300 bg-white shadow-md rounded-md z-1">
          <label className="text-sm ml-5 text-gray-500">Habit</label>
          <input
            className="border-1 rounded-md border-gray-200 p-1 m-auto"
            type="text"
            value={newHabit || ""}
            onChange={(e) => setNewHabit(e.target.value)}
          />

          <button
            onClick={handleAddHabit}
            className="mt-2 w-1/2 text-xs sm:text-sm p-2 m-auto border rounded-lg shadow-sm border-gray-200 text-gray-500 hover:bg-gray-50 active:bg-gray-100 transition duration-150 ease-in cursor-pointer"
          >
            Add
          </button>
        </div>
      )}
    </ul>
  );
};

export default CreateHabit;
