import React, { useState } from "react";
import { useHabits } from "../../pages/HabitContext";

const ClusterMenu = () => {
  const { clusters, activeCluster, setActiveCluster } = useHabits();
  const [clusterMenu, setClusterMenu] = useState(false);

  return (
    <div>
      <button
        className="p-2 max-sm:scale-90 text-sm text-emerald-600/75 hover:text-emerald-600 cursor-pointer shadow-sm border rounded-lg border-emerald-600/75 transition duration-100 ease-in active:bg-gray-50"
        onClick={() => setClusterMenu(!clusterMenu)}
      >
        {activeCluster.name} Habits
      </button>

      {clusterMenu && (
        <div className="p-3 z-10 absolute mt-2 bg-white border border-emerald-600/75 rounded-md shadow-lg">
          <h1 className="text-emerald-600/75 font-bold ">Clusters</h1>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <button
              className="cursor-pointer transition duration-100 ease-in hover:text-emerald-600/75 rounded-md text-center text-gray-600/75 "
              onClick={() => {
                setActiveCluster({ id: null, name: "All" });
                setClusterMenu(false);
              }}
            >
              All Habits
            </button>
            {clusters.map((cluster) => (
              <button
                key={cluster.id}
                className="cursor-pointer transition duration-100 ease-in hover:text-emerald-600/75 rounded-md text-center text-gray-600/75 "
                onClick={() => {
                  setActiveCluster({ id: cluster.id, name: cluster.name });
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
  );
};

export default ClusterMenu;
