import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import Home from "./pages/Home";
import HabitClusters from "./pages/HabitClusters";
import HabitStats from "./pages/HabitStats";
import Account from "./pages/Account";

const App = () => {
  // for when user clicks on sidebar to navigate
  const [view, setView] = useState("Home");

  const renderPage = () => {
    switch (view) {
      case "Home":
        return <Home />;
      case "Habit Clusters":
        return <HabitClusters />;
      case "Habit Stats":
        return <HabitStats />;
      case "Account":
        return <Account />;
      default:
        return <Home />;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setView={setView} />
      <div style={{ flex: 1, padding: "20px" }}>
        {renderPage()}
      </div>
    </div>
  );
};

export default App