import { createContext, useContext, useState } from "react";

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
  ];

  const defaultColor = clusterColors[0].hex;

  const [clusters, setClusters] = useState([
    {
      id: crypto.randomUUID(),
      name: "General",
      color: defaultColor,
    },
    {
      id: crypto.randomUUID(),
      name: "Health",
      color: clusterColors[1].hex,
    },
    {
      id: crypto.randomUUID(),
      name: "Exercise",
      color: clusterColors[2].hex,
    },
    {
      id: crypto.randomUUID(),
      name: "Morning",
      color: clusterColors[3].hex,
    },
    {
      id: crypto.randomUUID(),
      name: "Afternoon",
      color: clusterColors[4].hex,
    },
    {
      id: crypto.randomUUID(),
      name: "Evening",
      color: clusterColors[5].hex,
    },
    {
      id: crypto.randomUUID(),
      name: "Night",
      color: clusterColors[6].hex,
    },
    {
      id: crypto.randomUUID(),
      name: "After Work",
      color: clusterColors[7].hex,
    },
  ]);

  const [habits, setHabits] = useState([
    {
      id: crypto.randomUUID(),
      name: "work out",
      clusterId: clusters[0].id,
      completed: false,
      completedOn: null,
    },
    {
      id: crypto.randomUUID(),
      name: "read",
      clusterId: clusters[1].id,
      completed: false,
      completedOn: null,
    },
    {
      id: crypto.randomUUID(),
      name: "drink water",
      clusterId: clusters[2].id,
      completed: false,
      completedOn: null,
    },
    {
      id: crypto.randomUUID(),
      name: "homework",
      clusterId: clusters[3].id,
      completed: false,
      completedOn: null,
    },
    {
      id: crypto.randomUUID(),
      name: "walk",
      clusterId: clusters[4].id,
      completed: false,
      completedOn: null,
    },
    {
      id: crypto.randomUUID(),
      name: "journal",
      clusterId: clusters[5].id,
      completed: false,
      completedOn: null,
    },
  ]);

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

  // edit the habit name
  const editHabit = (habitId, updatedHabit) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId ? { ...habit, name: updatedHabit } : habit
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
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => useContext(HabitContext);
