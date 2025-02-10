import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Habits from "./pages/habits/Habits";
import HabitClusters from "./pages/habit-clusters/HabitClusters";
import HabitStats from "./pages/habit-stats/HabitStats";
import Account from "./pages/account/Account";
import "./index.css";
import { React, useState } from "react";

const App = () => {
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

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 mx-3">
        <Routes>
          <Route
            path="/Habits"
            element={
              <Habits
                habits={habits}
                setHabits={setHabits}
                clusterColors={clusterColors}
              />
            }
          />
          <Route
            path="/Habit-Clusters"
            element={
              <HabitClusters
                habits={habits}
                setHabits={setHabits}
                clusterColors={clusterColors}
                clusters={clusters}
                setClusters={setClusters}
                defaultColor={defaultColor}
              />
            }
          />
          <Route path="/Habit-Stats" element={<HabitStats />} />
          <Route path="/Account" element={<Account />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
