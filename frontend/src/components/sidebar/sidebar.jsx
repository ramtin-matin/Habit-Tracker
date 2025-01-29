import React, { useState } from 'react';

const Sidebar = ({ setView }) => {
  const [active, setActive] = useState("Home"); // Track active button
  const menuItem = ["Home", "Habits", "Habit Clusters", "Habit Stats", "Account"]

  return (
    <div className="flex h-screen flex-col justify-between bg-[linear-gradient(-12deg,rgb(83,188,226),rgb(79,149,144),rgb(50,200,123))]">
      <div className="px-4 py-6">
        <h1
          className="text-4xl transition duration-300 ease-in-out cursor-pointer block px-6 py-8 font-bold text-white hover:scale-103 active:scale-99"
          onClick={() => { setView("Home"); setActive("Home"); }}
        >
          HabitSet
        </h1>

        <ul className="space-y-4">
          {menuItem.map((item) => (
            <li key={item}>
              <button
                className={`uppercase transition duration-300 ease-in-out text-base cursor-pointer w-full max-w-80 block hover:scale-101 active:scale-99 rounded-2xl px-4 py-4 font-bold ${
                  active === item ? "bg-white text-emerald-800" : "text-white"
                }`}
                onClick={() => { setView(item); setActive(item); }} // Update active state
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
