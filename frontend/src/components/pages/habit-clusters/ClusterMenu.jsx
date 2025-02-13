import React, { useState, useEffect, useRef } from "react";
import { useHabits } from "../HabitContext";

const ClusterMenu = () => {
  const { clusters, activeCluster, setActiveCluster } = useHabits();
  const [clusterMenu, setClusterMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setClusterMenu(false);
      }
    };

    if (clusterMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clusterMenu]);

  return (
    <div ref={menuRef}>
      <button
        className="p-2 h-full max-sm:scale-90 text-xs text-emerald-600/75 hover:text-emerald-600 hover:shadow-xs cursor-pointer border rounded-lg border-gray-300 transition duration-100 ease-in active:bg-gray-50"
        onClick={() => setClusterMenu(!clusterMenu)}
      >
        {activeCluster.name} Habits
      </button>

      {clusterMenu && (
        <div className="p-3 z-10 absolute mt-2 bg-white border border-emerald-600/75 rounded-md shadow-lg">
          <h1 className="text-emerald-600/75 font-bold">Clusters</h1>
          <div className="grid grid-cols-2 gap-4 mt-5">
            <button
              className="cursor-pointer transition duration-100 ease-in hover:text-emerald-600/75 rounded-md text-center text-gray-600/75"
              onClick={() => {
                if (activeCluster.id !== null) {
                  setActiveCluster({ id: null, name: "All" });
                }
                setClusterMenu(false);
              }}
            >
              All Habits
            </button>
            {clusters.map((cluster) => (
              <button
                key={cluster.id}
                className="cursor-pointer transition duration-100 ease-in hover:text-emerald-600/75 rounded-md text-center text-gray-600/75"
                onClick={() => {
                  if (activeCluster.id !== cluster.id) {
                    setActiveCluster({ id: cluster.id, name: cluster.name });
                  }
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
