import React, { useState, useEffect, useRef } from "react";
import CreateCluster from "./CreateCluster";
import { useHabits } from "../../pages/HabitContext";
import HabitCard from "../habits/HabitCard";
import ClusterMenu from "../habit-clusters/ClusterMenu";

const HabitClusters = () => {
  const {
    habits,
    clusters,
    colorMenu,
    setColorMenu,
    defaultColor,
    pickedColor,
    setPickedColor,
    clusterColors,
    editCluster,
    deleteCluster,
    activeCluster,
    setActiveCluster,
    defaultCluster,
    useOutsideClick,
  } = useHabits();

  const [editMenu, setEditMenu] = useState(false);
  const [edittedCluster, setEdittedCluster] = useState("");

  const colorMenuRef = useRef(null);

  useOutsideClick(colorMenuRef, () => setColorMenu(false), colorMenu);

  // handles cluster editting. if user edits the cluster name or cluster color, or both.
  const handleEditCluster = (clusterId, newColor) => {
    const updatedName = edittedCluster.trim()
      ? edittedCluster
      : activeCluster.name;

    if (
      clusters.some(
        (cluster) => cluster.name === updatedName && cluster.id !== clusterId
      )
    ) {
      alert("Cluster name already exists");
      return;
    }

    editCluster(clusterId, newColor, updatedName);

    if (activeCluster.id !== clusterId) {
      setActiveCluster({ id: clusterId, name: updatedName });
    }

    setEditMenu(false);
    setEdittedCluster("");
  };

  return (
    <div className="max-w-8xl h-full rounded-lg mx-auto p-2">
      <h1 className="text-5xl max-sm:text-4xl m-1 mb-2 font-bold text-emerald-600/75">
        My Habit Clusters
      </h1>
      <p className="text-base max-sm:text-sm m-1 text-gray-500">
        Every habit belongs to a bigger system. Organize your habits, and you’ll
        organize your life.
      </p>
      <div className="border-1 border-gray-200 bg-white flex items-center gap-4 h-[8vh] sm:h-[10vh] lg:h-[11vh] max-sm:px-2 px-4 mt-4 rounded-sm">
        <CreateCluster />
      </div>
      <div className="bg-white max-w-125 md:max-w-140 overflow-x-hidden overflow-y-auto scrollbar border-1 border-gray-200 h-[70vh] p-5 mt-3 rounded-sm">
        <div className="flex gap-2 relative justify-center mt-4">
          <ClusterMenu />
          <button
            className="p-1 w-15 max-sm:scale-90 max-sm:text-xs text-white bg-emerald-600/75 hover: cursor-pointer border rounded-lg border-gray-300 shadow-sm transition duration-100 ease-in active:bg-emerald-600/80"
            onClick={() => setEditMenu(!editMenu)}
          >
            Edit
          </button>

          {editMenu && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-100/55 z-20">
              <div className="flex flex-col justify-between gap-2 w-[70%] sm:w-[55%] md:w-[30%] h-50 p-4 border border-gray-200 bg-white shadow-md rounded-md">
                <h1 className="font-bold text-2xl text-emerald-600/75">
                  {activeCluster.name} Cluster
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
                    value={edittedCluster || ""}
                    onChange={(e) => setEdittedCluster(e.target.value)}
                  />
                  <div
                    ref={colorMenuRef}
                    className="p-1 w-8 h-8 border border-gray-300 rounded-md cursor-pointer relative"
                    onClick={() => setColorMenu(!colorMenu)}
                  >
                    <div
                      className="w-full h-full border border-gray-300 rounded-md"
                      style={{ backgroundColor: pickedColor }}
                    ></div>

                    {colorMenu && (
                      <div className="z-10 cursor-default p-2 grid grid-cols-3 gap-4 absolute mt-3 w-46 bg-white border border-gray-300 rounded-md shadow-lg">
                        {clusterColors.map((color) => (
                          <div
                            key={color.name}
                            className="w-10 h-10 border flex justify-center cursor-pointer items-center border-gray-200 rounded-lg active:scale-95 hover:scale-103 hover:bg-gray-100/75"
                            onClick={() => {
                              setPickedColor(color.hex);
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
                <div className="relative justify-end flex gap-2">
                  <button
                    onClick={() => {
                      if (
                        activeCluster.id === defaultCluster ||
                        activeCluster.id === null
                      ) {
                        alert("Cannot delete this cluster");
                        return;
                      }
                      setEditMenu(false);
                      setColorMenu(false);
                      setPickedColor(defaultColor);
                      deleteCluster(activeCluster.id);
                    }}
                    className="font-bold w-[20%] text-xs sm:text-sm p-2 border rounded-lg shadow-sm border-gray-200 text-white bg-red-500/90 hover:bg-red-500/95 active:bg-red-500 cursor-pointer absolute left-0"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setEditMenu(false);
                      setColorMenu(false);
                      setPickedColor(defaultColor);
                    }}
                    className="font-bold w-[25%] text-xs sm:text-sm p-2 border rounded-lg shadow-sm border-gray-200 text-gray-500 hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (
                        activeCluster.id === defaultCluster ||
                        activeCluster.id === null
                      ) {
                        alert("Cannot change this cluster");
                        return;
                      }

                      handleEditCluster(activeCluster.id, pickedColor);
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
        {habits
          .filter(
            (habit) =>
              activeCluster.id === null || habit.clusterId === activeCluster.id
          )
          .map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
      </div>
    </div>
  );
};

export default HabitClusters;
