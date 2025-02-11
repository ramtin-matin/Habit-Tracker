import { React, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaPlus } from "react-icons/fa";
import { useHabits } from "../../pages/HabitContext";

const CreateCluster = () => {
  const {
    clusterColors,
    clusters,
    defaultColor,
    addCluster,
    colorMenu,
    setColorMenu,
    pickedColor,
    setPickedColor,
  } = useHabits();

  const [createClusterModal, setCreateClustertModal] = useState(false);
  const [newCluster, setNewCluster] = useState("");

  const handleAddCluster = () => {
    if (!newCluster.trim()) return;

    const clusterExists = clusters.some(
      (cluster) => cluster.name === newCluster
    );
    if (clusterExists) {
      alert("Cluster name already exists");
      return;
    }
    const newItem = {
      id: crypto.randomUUID(),
      name: newCluster,
      color: pickedColor,
      habits: [],
    };
    addCluster(newItem);

    console.log("new cluster: ", newCluster);
    console.log("Number of clusters: ", clusters.length + 1);
    console.log(clusters);

    setNewCluster("");
    setCreateClustertModal(false);
  };

  return (
    <ul className="flex gap-2">
      <button
        onClick={() => setCreateClustertModal(true)}
        className="relative flex justify-center gap-4 text-sm p-2 font-bold cursor-pointer rounded-lg active:scale-99 text-white hover:shadow-sm hover:bg-emerald-600/80 bg-emerald-600/75 border-1 border-gray-300"
      >
        <FaPlus className="m-auto text-xs" />
        <span className="hidden sm:inline">New Cluster</span>
        <ChevronDown className="m-auto w-4 h-4" />
      </button>
      {createClusterModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100/55 z-20">
          <div
            className="flex flex-col justify-between gap-2 
                  w-[70%] sm:w-[55%] md:w-[30%] h-50
                  p-4 border border-gray-200 bg-white shadow-md rounded-md"
          >
            <h1 className="font-bold text-2xl text-emerald-600/75">
              Create Cluster
            </h1>
            <div
              className="w-full h-0.5 rounded-md"
              style={{ backgroundColor: pickedColor }}
            ></div>
            <div className="flex flex-row gap-3 m-auto">
              <label className="ml-2 text-gray-500 font-bold">Name</label>
              <input
                className="border-1 mb- w-1/2 h-8 rounded-md border-gray-300 p-1"
                type="text"
                value={newCluster || ""}
                onChange={(e) => setNewCluster(e.target.value)}
              />
              <div
                className="p-1 w-8 h-8 border border-gray-300 rounded-md cursor-pointer relative"
                onClick={() => setColorMenu(!colorMenu)}
              >
                <div
                  className="w-full h-full border border-gray-300 rounded-md"
                  style={{ backgroundColor: pickedColor }}
                ></div>
                {colorMenu && (
                  <div className="cursor-default p-2 grid grid-cols-3 gap-4 absolute mt-3 w-46 bg-white border border-gray-300 rounded-md shadow-lg">
                    {clusterColors.map((color) => (
                      <div
                        key={color.name}
                        className="w-10 h-10 border flex justify-center cursor-pointer items-center border-gray-200 rounded-lg active:scale-95 hover:scale-103 hover:bg-gray-100/75"
                        onClick={() => {
                          setPickedColor(color.hex),
                            console.log("picked color: ", color);
                          setColorMenu(false);
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-md"
                          style={{ backgroundColor: color.hex }}
                        ></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div
              className="w-full h-0.5 rounded-md"
              style={{ backgroundColor: pickedColor }}
            ></div>

            <div className="justify-end flex gap-2">
              <button
                onClick={() => {
                  setCreateClustertModal(false);
                  setColorMenu(false);
                  setPickedColor(defaultColor);
                  setNewCluster("");
                }}
                className="font-bold w-[25%] text-xs sm:text-sm p-2 border rounded-lg shadow-sm border-gray-200 text-gray-500 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setColorMenu(false);
                  setPickedColor(defaultColor);
                  handleAddCluster();
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

export default CreateCluster;
