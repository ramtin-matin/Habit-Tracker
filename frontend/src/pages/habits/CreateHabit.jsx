import { React, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import { useHabits } from "../../pages/HabitContext";

const CreateHabit = () => {
  const { habits, addHabit, clusters } = useHabits();

  const [clusterMenu, setClusterMenu] = useState(false);
  const [activeCluster, setActiveCluster] = useState({
    id: clusters[0]?.id,
    name: clusters[0]?.name,
    color: clusters[0]?.color,
  });

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
      clusterId: activeCluster.id,
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
            className="flex flex-col justify-evenly gap-2 
                  w-[70%] sm:w-[55%] md:w-[40%] lg:w-[30%] h-70
                  p-4 border border-gray-200 bg-white shadow-md rounded-md"
          >
            <h1 className="font-bold text-2xl text-emerald-600/75">
              Create Habit
            </h1>

            <div
              className="w-full h-0.5 rounded-md"
              style={{ backgroundColor: activeCluster.color }}
            ></div>
            <div className="flex gap-3 flex-row m-auto">
              <label className="ml-2 text-gray-500 font-bold">Habit</label>
              <input
                type="text"
                className="border-1 h-6 rounded-md border-gray-300 p-1"
                value={newHabit || ""}
                onChange={(e) => setNewHabit(e.target.value)}
              />
              <div className="relative">
                <div>
                  <button
                    className="p-1 text-sm text-emerald-600/75 cursor-pointer border rounded-lg border-emerald-600/75 transition duration-100 ease-in hover:bg-gray-100/75 active:bg-gray-200/75"
                    onClick={() => setClusterMenu(!clusterMenu)}
                  >
                    {activeCluster.name}
                  </button>
                </div>
                {clusterMenu && (
                  <div className="p-3 z-10 w-60 absolute mt-2 bg-white border border-emerald-600/75 rounded-md shadow-lg">
                    <h1 className="text-emerald-600/75 font-bold ">Clusters</h1>
                    <div className="grid grid-cols-2 gap-4 mt-5">
                      {clusters.map((cluster) => (
                        <button
                          key={cluster.id}
                          className="cursor-pointer transition duration-100 ease-in hover:text-emerald-600/75 font-bold rounded-md text-center text-gray-600/75 "
                          onClick={() => {
                            setActiveCluster({
                              id: cluster.id,
                              name: cluster.name,
                              color: cluster.color,
                            });
                            setClusterMenu(false);
                          }}
                        >
                          {cluster.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              className="w-full h-0.5 mb-10 rounded-md"
              style={{ backgroundColor: activeCluster.color }}
            ></div>
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
