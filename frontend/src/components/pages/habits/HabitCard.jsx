import { React, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { useHabits } from "../HabitContext";

const HabitCard = ({ habit }) => {
  const { toggleHabitChecked, editHabit, deleteHabit, clusters } = useHabits();

  const cluster = clusters.find((cluster) => cluster.id === habit.clusterId);

  const [threeDotMenu, setThreeDotMenu] = useState(null);
  const [editMenu, setEditMenu] = useState(null);
  const [updatedHabit, setUpdatedHabit] = useState("");

  const handleEdit = (habitId) => {
    if (!updatedHabit.trim()) return;
    editHabit(habitId, updatedHabit);

    console.log("editted habit id: ", habitId);
    console.log("new name: ", updatedHabit);

    setUpdatedHabit("");
  };

  return (
    <div>
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
          onChange={() => toggleHabitChecked(habit.id)}
        />

        {/* Habit Name */}
        <p className="max-sm:text-xs font-bold text-gray-500 absolute ml-10">
          {habit.name}
        </p>

        {/* Habit Cluster */}
        <p
          className={`font-bold max-sm:scale-70 max-sm:right-8 cursor-default text-xs absolute max-w-20 text-center w-full right-13 text-white p-2 rounded-lg ${habit.color}`}
          style={{ backgroundColor: cluster?.color }}
        >
          {cluster?.name}
        </p>

        {/* Three-Dot Menu */}
        <div className="relative">
          <button
            onClick={() =>
              setThreeDotMenu((prev) => (prev === habit.id ? null : habit.id))
            }
            className="p-2 rounded-full transition duration-200 ease-in-out hover:bg-gray-100"
          >
            <FiMoreVertical size={18} />
          </button>

          {/* Dropdown Menu */}
          {threeDotMenu === habit.id && (
            <div className="absolute bottom-10 right-0 p-1 w-22 bg-white border-1 border-gray-200 shadow-md rounded-md z-10">
              <button
                onClick={() => {
                  setEditMenu(habit.id);
                  setThreeDotMenu(null);
                }}
                className="text-sm block w-full px-4 py-2 text-left hover:bg-gray-100 hover:rounded-lg transition duration-150 ease-in"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  deleteHabit(habit.id);
                  console.log("Habit that got deleted: ", habit.name);
                  setThreeDotMenu(null);
                }}
                className="text-sm block w-full px-4 py-2 text-left text-red-500  hover:rounded-lg hover:bg-gray-100 transition duration-150 ease-in"
              >
                Delete
              </button>
            </div>
          )}
          {editMenu === habit.id && (
            <div className="fixed inset-1 flex items-center justify-center bg-gray-100/55 z-20">
              <div
                className="flex flex-col justify-between gap-2 
                  w-[80%] sm:w-[55%] md:w-[40%] h-80
                  p-4 border border-gray-200 bg-white shadow-md rounded-md"
              >
                <h1 className="font-bold text-2xl text-emerald-600/75">
                  Edit Habit
                </h1>
                <div className="flex flex-col">
                  <label className="ml-2 text-gray-500 font-bold">Name</label>
                  <input
                    className="border-1 mb-30 mt-1 rounded-md border-gray-300 p-1"
                    type="text"
                    value={updatedHabit || ""}
                    onChange={(e) => setUpdatedHabit(e.target.value)}
                  />
                </div>
                <div className="justify-end flex gap-2">
                  <button
                    onClick={() => {
                      setUpdatedHabit("");
                      setEditMenu(null);
                      setThreeDotMenu(null);
                    }}
                    className="font-bold w-[25%] text-xs sm:text-sm p-2 border rounded-lg shadow-sm border-gray-200 text-gray-500 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      console.log("old habit name: ", habit.name),
                        handleEdit(habit.id);
                      setThreeDotMenu(null);
                      setEditMenu(null);
                    }}
                    className="font-bold w-[25%] text-xs sm:text-sm p-2 border rounded-lg shadow-sm border-gray-200 text-white bg-emerald-600/75 hover:bg-emerald-600/80 active:bg-emerald-600/85 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
