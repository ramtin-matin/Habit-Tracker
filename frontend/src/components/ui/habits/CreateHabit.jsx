import { React, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaPlus } from "react-icons/fa";

const CreateHabit = ({ habits, addHabit }) => {
  const [createHabitModal, setCreateHabitModal] = useState(false);
  const [newHabit, setNewHabit] = useState("");

  const handleAddHabit = () => {
    if (!newHabit.trim()) return;
    const newItem = {
      id: habits.length + 1,
      name: newHabit,
      cluster: "Habit",
      color: "bg-gray-300",
      completed: false,
    };
    addHabit(newItem);
    console.log("new habit: ", newHabit);
    setNewHabit("");
    console.log("current time: ", Date.now());
    console.log("Number of habits: ", habits.length + 1);
  };

  return (
    <ul className="mt-2.5 flex gap-2">
      <button
        onClick={() => setCreateHabitModal(true)}
        className="relative flex justify-center gap-4 text-sm p-2 font-bold cursor-pointer md:shrink-0 rounded-lg active:scale-99 text-gray-500 hover:shadow-sm hover:bg-gray-50 border-1 border-gray-300"
      >
        <FaPlus className="m-auto text-xs" />
        <span className="hidden sm:inline">Create</span>
        <ChevronDown className="m-auto w-4 h-4" />
      </button>
      {createHabitModal && (
        <div className="fixed inset-1 flex items-center justify-center bg-gray-100/55 z-20">
          <div className="flex justify-between gap-2 w-120 h-80 flex-col absolute mt-12 p-4 sm:p-4 border border-gray-300 bg-white shadow-md rounded-md">
            <h1 className="font-bold text-2xl text-emerald-600/75">
              Create Habit
            </h1>
            <div className="flex flex-col">
              <label className="ml-2 text-gray-500 font-bold">Habit</label>
              <input
                className="border-1 mb-30 mt-1 rounded-md border-gray-300 p-1"
                type="text"
                value={newHabit || ""}
                onChange={(e) => setNewHabit(e.target.value)}
              />
            </div>
            <div className="justify-end flex gap-2">
              <button
                onClick={() => setCreateHabitModal(false)}
                className="font-bold w-1/5 text-xs sm:text-sm p-2 border rounded-lg shadow-sm border-gray-200 text-gray-500 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleAddHabit();
                  setCreateHabitModal(false);
                }}
                className="font-bold w-1/5 text-xs sm:text-sm p-2 border rounded-lg shadow-sm border-gray-200 text-white bg-emerald-600/75 hover:bg-emerald-600/80 active:bg-emerald-600/85 cursor-pointer"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </ul>
  );
};

export default CreateHabit;
