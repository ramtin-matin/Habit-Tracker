import React from 'react';
import App from '../App';
import './sidebar.css';

// setView is from src/App.js
// allows us to change the state on user clicks
const Sidebar = ({setView}) => {
  return (
  <div className="sidebar">
    <h2 className="sidebar-logo" onClick={() => setView("Home")}>HabitSet</h2>
    <ul className="sidebar-menu">
      <button className="sidebar-item" onClick={() => setView("Home")}>
        Home
      </button>
      <button className="sidebar-item" onClick={() => setView("Habit Clusters")}>
        Habit Clusters
      </button>
      <button className="sidebar-item" onClick={() => setView("Habit Stats")}>
          Habit Stats
      </button>
      <button className="sidebar-item" onClick={() => setView("Account")}>
        Account
      </button>
    </ul>
  </div>
  );
};

export default Sidebar;
