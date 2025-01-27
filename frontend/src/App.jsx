import React, { useState } from "react";
import Sidebar from "./components/sidebar/sidebar";
import Home from "./components/home/Home";
import HabitClusters from "./components/habitClusters/HabitClusters";
import HabitStats from "./components/habitStats/HabitStats";
import Account from "./components/account/Account";

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