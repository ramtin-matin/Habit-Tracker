import React, { useState } from 'react';
import './sidebar.css';

const Sidebar = () => {
  return (
  <div className="sidebar">
    <h2 className="sidebar-logo">HabitSet</h2>
    <ul className="sidebar-menu">
      <li className="sidebar-item sidebar-item--active">Home</li>
      <li className="sidebar-item">Habit Clusters</li>
      <li className="sidebar-item">Habit Stats</li>
      <li className="sidebar-item">Account</li>
    </ul>
  </div>
  );
};

export default Sidebar;
