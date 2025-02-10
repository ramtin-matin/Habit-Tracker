import { React, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaPlus } from "react-icons/fa";

const CreateCluster = ({
  habits,
  setHabits,
  clusterColors,
  clusters,
  setClusters,
  defaultColor,
}) => {
  const [createClusterModal, setCreateClustertModal] = useState(false);
  const [colorMenu, setColorMenu] = useState(false);
  const [newCluster, setNewCluster] = useState("");
  const [pickedColor, setPickedColor] = useState(defaultColor);

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
                  w-[80%] sm:w-[55%] md:w-[40%] h-80
                  p-4 border border-gray-200 bg-white shadow-md rounded-md"
          >
            <h1 className="font-bold text-2xl text-emerald-600/75">
              Create Cluster
            </h1>

            <div className="flex flex-row gap-2">
              <label className="ml-2 text-gray-500 text-sm">Name</label>
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
                  <div className="p-2 grid grid-cols-3 gap-1 absolute mt-3 w-32 bg-white border border-gray-300 rounded-md shadow-lg">
                    {clusterColors.map((color) => (
                      <div
                        key={color.name}
                        className="w-8 h-8 p-2 border border-gray-200 rounded-lg active:scale-95 hover:scale-103 hover:bg-gray-100/75"
                      >
                        <div
                          className="w-4 h-4 rounded-md"
                          style={{ backgroundColor: color.hex }}
                          onClick={() => {
                            setPickedColor(color.hex),
                              console.log("picked color: ", color);
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="justify-end flex gap-2">
              <button
                onClick={() => {
                  setCreateClustertModal(false);
                  setColorMenu(false);
                  setPickedColor(defaultColor);
                }}
                className="font-bold w-[25%] text-xs sm:text-sm p-2 border rounded-lg shadow-sm border-gray-200 text-gray-500 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setCreateClustertModal(false);
                  setColorMenu(false);
                  setPickedColor(defaultColor);
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
