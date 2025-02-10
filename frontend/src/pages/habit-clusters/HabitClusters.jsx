import React, { useState } from "react";
import CreateCluster from "./CreateCluster";

const HabitClusters = ({
  habits,
  setHabits,
  clusterColors,
  clusters,
  setClusters,
  defaultColor,
}) => {
  const [activeCluster, setActiveCluster] = useState(clusters[0].name);

  const addCluster = (newCluster) => {
    setClusters((prevClusters) => [newCluster, ...prevClusters]);
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
        <button className="p-2 border rounded-lg border-gray-300/75">
          {activeCluster}
        </button>
      </div>
    </div>
  );
};

export default HabitClusters;
