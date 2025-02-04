import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState(
    localStorage.getItem("activeMenu") || "Home"
  );

  const menuItem = [
    { name: "Home", path: "/Home" },
    { name: "Habits", path: "/Habits" },
    { name: "Habit Clusters", path: "/Habit-Clusters" },
    { name: "Habit Stats", path: "/Habit-Stats" },
    { name: "Account", path: "/Account" },
  ];

  // Update localStorage whenever active changes (whenever a user refreshes their browser)
  useEffect(() => {
    localStorage.setItem("activeMenu", active);
  }, [active]);

  // Sync active state with the browser's URL (whenever a user navigates browser with back/forward button)
  useEffect(() => {
    const currentMenu = menuItem.find(
      (item) => item.path === location.pathname
    );
    if (currentMenu) {
      setActive(currentMenu.name);
    }
  }, [location.pathname]); // Runs when the URL changes

  return (
    <div className="flex h-screen flex-col justify-between bg-[linear-gradient(-12deg,rgb(83,188,226),rgb(79,149,144),rgb(50,200,123))]">
      <div className="px-4 py-6">
        <Link to="/Home">
          <h1
            className="max-sm:text-2xl text-4xl transition duration-300 ease-in-out cursor-pointer block px-8 py-8 font-bold text-white hover:scale-103 active:scale-99"
            onClick={() => setActive("Home")}
          >
            HabitSet
          </h1>
        </Link>

        <ul className="space-y-4">
          {menuItem.map((item) => (
            <li key={item.name}>
              <Link to={item.path}>
                <button
                  className={`max-sm:text-xs uppercase transition duration-150 ease-in-out text-base cursor-pointer w-full max-sm:max-w-40 max-w-80 
                  block hover:scale-101 active:scale-99 rounded-2xl px-4 py-4 font-bold 
                  ${active === item.name ? "bg-white text-emerald-600" : "text-white"}`}
                  onClick={() => setActive(item.name)}
                >
                  {item.name}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
