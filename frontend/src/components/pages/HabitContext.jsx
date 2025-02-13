import { createContext, useContext, useState, useEffect } from "react";

const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const clusterColors = [
    { id: 0, name: "Gray", hex: "#6B7280BF" },
    { id: 1, name: "Blue", hex: "#3B82F6" },
    { id: 2, name: "Red", hex: "#EF4444" },
    { id: 3, name: "Pink", hex: "#EC4899" },
    { id: 4, name: "Purple", hex: "#8B5CF6" },
    { id: 5, name: "Emerald", hex: "#10B981" },
    { id: 6, name: "Yellow", hex: "#FACC15" },
    { id: 7, name: "Slate", hex: "#64748B" },
    { id: 8, name: "Cyan", hex: "#06B6D4" },
    { id: 9, name: "Rose", hex: "#F43F5E" },
    { id: 10, name: "Indigo", hex: "#6366F1" },
    { id: 11, name: "Teal", hex: "#14B8A6" },
    { id: 12, name: "Orange", hex: "#F97316" },
    { id: 13, name: "Lime", hex: "#84CC16" },
    { id: 14, name: "Amber", hex: "#F59E0B" },
  ];

  const defaultColor = clusterColors[0].hex;

  // set clusters to local storage
  const [clusters, setClusters] = useState(() => {
    const savedClusters = localStorage.getItem("clusters");
    return savedClusters
      ? JSON.parse(savedClusters)
      : [
          {
            id: crypto.randomUUID(),
            name: "General",
            color: defaultColor,
          },
        ];
  });

  const defaultCluster = clusters[0].id;

  useEffect(() => {
    localStorage.setItem("clusters", JSON.stringify(clusters));
  }, [clusters]);

  // set habits to local storage
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habits");
    return savedHabits ? JSON.parse(savedHabits) : [];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // checks off habit and gets date when habit got completed
  const toggleHabitChecked = (habitId) => {
    console.log("habit id: ", habitId);
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              completed: !habit.completed,
              completedOn: !habit.completed
                ? new Date().toISOString().slice(0, 10) // to get date in (0000-00-00) format
                : null,
            }
          : habit
      )
    );
  };

  // edit the habit name and cluster for the habit
  const editHabit = (habitId, updatedHabit, clusterId) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId
          ? { ...habit, name: updatedHabit, clusterId: clusterId }
          : habit
      )
    );
  };

  // add habit as first
  const addHabit = (newHabit) => {
    setHabits((prev) => [newHabit, ...prev]);
  };

  const deleteHabit = (habitId) => {
    setHabits((prevHabits) =>
      prevHabits.filter((habit) => habit.id !== habitId)
    );
    console.log("deleting ID: ", habitId);
  };

  const deleteCluster = (clusterId) => {
    // move old cluster habits to General Cluster
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.clusterId === clusterId
          ? { ...habit, clusterId: defaultCluster }
          : habit
      )
    );

    setClusters((prevClusters) => {
      const updatedClusters = prevClusters.filter(
        (cluster) => cluster.id !== clusterId
      );

      const nextCluster =
        updatedClusters.length > 0 ? updatedClusters[0] : null;

      if (nextCluster) {
        setActiveCluster({ id: nextCluster.id, name: nextCluster.name });
      } else {
        setActiveCluster(null);
      }

      console.log("deleting cluster ID: ", clusterId);
      return updatedClusters;
    });
  };

  const addCluster = (newCluster) => {
    setClusters((prevClusters) => [...prevClusters, newCluster]);
  };

  const editCluster = (clusterId, newColor, edittedCluster) => {
    setClusters((prevClusters) =>
      prevClusters.map((cluster) =>
        cluster.id === clusterId
          ? {
              ...cluster,
              color: newColor !== cluster.color ? newColor : cluster.color,
              name:
                edittedCluster !== cluster.name ? edittedCluster : cluster.name,
            }
          : cluster
      )
    );
  };

  const [colorMenu, setColorMenu] = useState(false);
  const [pickedColor, setPickedColor] = useState(defaultColor);

  const [activeCluster, setActiveCluster] = useState({
    id: clusters[0]?.id,
    name: clusters[0]?.name,
  });

  const useOutsideClick = (ref, callback, isActive) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };

      if (isActive) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isActive, ref, callback]);
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        setHabits,
        clusters,
        setClusters,
        defaultColor,
        clusterColors,
        toggleHabitChecked,
        editHabit,
        addHabit,
        deleteHabit,
        addCluster,
        colorMenu,
        setColorMenu,
        pickedColor,
        setPickedColor,
        editCluster,
        deleteCluster,
        activeCluster,
        setActiveCluster,
        defaultCluster,
        useOutsideClick,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => useContext(HabitContext);
