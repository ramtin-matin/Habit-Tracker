import { React, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import { useHabits } from "../../pages/HabitContext";

const CreateHabit = () => {
  const { habits, addHabit } = useHabits();

  const [createHabitModal, setCreateHabitModal] = useState(false);
  const [newHabit, setNewHabit] = useState("");

  const handleAddHabit = () => {
    if (!newHabit.trim()) return;

    const habitExists = habits.some((habit) => habit.name === newHabit);
    if (habitExists) {
      alert("Habit name already exists");
      return;
    }
    const newItem = {
      id: crypto.randomUUID(),
      name: newHabit,
      cluster: "Habit",
      color: "bg-gray-300",
      completed: false,
      completedOn: null,
    };
    addHabit(newItem);
    console.log("new habit: ", newHabit);
    setNewHabit("");
    console.log("Number of habits: ", habits.length + 1);
    setCreateHabitModal(false);
  };

  return (
    <ul className="flex gap-2">
      <button
        onClick={() => setCreateHabitModal(true)}
        className="relative flex justify-center gap-4 text-sm p-2 font-bold cursor-pointer rounded-lg active:scale-99 text-white hover:shadow-sm hover:bg-emerald-600/80 bg-emerald-600/75 border-1 border-gray-300"
      >
        <FaPlus className="m-auto text-xs" />
        <span className="hidden sm:inline">Create</span>
        <ChevronDown className="m-auto w-4 h-4" />
      </button>
      {createHabitModal && (
        <div className="fixed inset-1 flex items-center justify-center bg-gray-100/55 z-20">
          <div
            className="flex flex-col justify-between gap-2 
                  w-[80%] sm:w-[55%] md:w-[40%] h-80
                  p-4 border border-gray-200 bg-white shadow-md rounded-md"
          >
            <h1 className="font-bold text-2xl text-emerald-600/75">
              Create Habit
            </h1>

            <div className="flex place-items-start flex-col">
              <label className="ml-2 text-gray-500 font-bold">Habit</label>
              <input
                className="border-1 mb- h-10 mt-1 rounded-md border-gray-300 p-1"
                type="text"
                value={newHabit || ""}
                onChange={(e) => setNewHabit(e.target.value)}
              />
            </div>
            <div className="justify-end flex gap-2">
              <button
                onClick={() => {
                  setCreateHabitModal(false);
                  setNewHabit("");
                }}
                className="font-bold w-[25%] text-xs sm:text-sm p-2 border rounded-lg shadow-sm border-gray-200 text-gray-500 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleAddHabit();
                  setNewHabit("");
                }}
                className="font-bold w-[25%] text-xs sm:text-sm p-2 border rounded-lg shadow-sm border-gray-200 text-white bg-emerald-600/75 hover:bg-emerald-600/80 active:bg-emerald-600/85 cursor-pointer"
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
