import React, { useState } from "react";
import CreateCluster from "./CreateCluster";
import HabitCard from "/Users/ramtinmatin/habittracker/frontend/src/pages/habits/HabitCard.jsx";

const HabitClusters = ({
  habits,
  setHabits,
  clusterColors,
  clusters,
  setClusters,
  defaultColor,
}) => {
  const [activeCluster, setActiveCluster] = useState(clusters[0].name);
  const [clusterMenu, setClusterMenu] = useState(false);

  const addCluster = (newCluster) => {
    setClusters((prevClusters) => [...prevClusters, newCluster]);
  };

  return (
    <div className="max-w-8xl h-full rounded-lg mx-auto p-2">
      <h1 className=" text-5xl max-sm:text-4xl m-1 mb-2 font-bold text-emerald-600/75">
        My Habit Clusters
      </h1>
      <p className="text-base max-sm:text-sm m-1 text-gray-500">
        Every habit belongs to a bigger system. Organize your habits, and you’ll
        organize your life.
      </p>
      <div className=" border-1 border-gray-200 bg-white flex items-center gap-4 h-[8vh] sm:h-[10vh] lg:h-[11vh] max-sm:px-2 px-4 mt-4 rounded-sm">
        <CreateCluster
          habits={habits}
          setHabits={setHabits}
          clusterColors={clusterColors}
          clusters={clusters}
          setClusters={setClusters}
          defaultColor={defaultColor}
          addCluster={addCluster}
        />
      </div>
      <div className="bg-white w-full overflow-x-hidden overflow-y-auto scrollbar border-1 border-gray-200 h-[70vh] p-5 mt-3 rounded-sm">
        <button
          className="p-3 text-emerald-600/75 hover:text-emerald-700 cursor-pointer border rounded-lg border-emerald-600/75 transition duration-100 ease-in active:bg-gray-50"
          onClick={() => setClusterMenu(!clusterMenu)}
        >
          {activeCluster}
        </button>
        {clusterMenu && (
          <div className="p-3 absolute mt-3 bg-white border border-emerald-600/75 rounded-md shadow-lg">
            <h1 className="text-emerald-600/75 font-bold ">Clusters</h1>
            <div className="grid grid-cols-2 gap-4 mt-5">
              {clusters.map((cluster) => (
                <button
                  key={cluster.id}
                  className="cursor-pointer transition duration-100 ease-in hover:text-emerald-600/75 font-bold rounded-md text-center text-gray-600/75 "
                  onClick={() => {
                    setActiveCluster(cluster.name);
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
  );
};

export default HabitClusters;
