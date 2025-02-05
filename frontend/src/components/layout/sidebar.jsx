import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // ✅ Icons for mobile menu

const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState(
    localStorage.getItem("activeMenu") || "Home"
  );
  const [isMobileOpen, setIsMobileOpen] = useState(false); // ✅ Mobile menu toggle

  const menuItem = [
    { name: "Habits", path: "/Habits" },
    { name: "Habit Clusters", path: "/Habit-Clusters" },
    { name: "Habit Stats", path: "/Habit-Stats" },
    { name: "Account", path: "/Account" },
  ];

  // Update localStorage whenever active changes
  useEffect(() => {
    localStorage.setItem("activeMenu", active);
  }, [active]);

  // Sync active state with browser's URL
  useEffect(() => {
    const currentMenu = menuItem.find(
      (item) => item.path === location.pathname
    );
    if (currentMenu) {
      setActive(currentMenu.name);
    }
  }, [location.pathname]);

  return (
    <>
      {/* ✅ Mobile Navbar (Shows Only on Small Screens) */}
      <div className="bg-emerald-500 md:hidden flex-col h-screen px-3 py-4 shadow">
        <h1 className="text-sm font-bold text-white">HabitSet</h1>
        <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
          {isMobileOpen ? (
            <FiX className="text-white" size={20} />
          ) : (
            <FiMenu className="text-white" size={20} />
          )}{" "}
          {/* Toggle Icon */}
        </button>
      </div>

      {/* ✅ Sidebar (Hidden on Mobile, Flex on Desktop) */}
      <div className="hidden md:flex h-screen flex-col justify-between bg-[linear-gradient(-12deg,rgb(83,188,226),rgb(79,149,144),rgb(50,200,123))]">
        <div className="px-4 py-6">
          <Link to="/Habits">
            <h1
              className="max-sm:text-2xl text-4xl transition duration-300 ease-in-out cursor-pointer block px-8 py-8 font-bold text-white hover:scale-103 active:scale-99"
              onClick={() => setActive("Habits")}
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

      {/* ✅ Mobile Dropdown Menu (Opens When Clicking ☰) */}
      <div
        className={`fixed top-0 left-0 w-[30vh] h-screen rounded-lg bg-emerald-500 shadow-sm md:hidden z-20 
          transform transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
      >
        <div className="absolute flex-col top-0 left-0 w-[30vh] h-screen rounded-lg bg-emerald-500 shadow-sm md:hidden z-20">
          <h1 className="text-sm font-bold p-3 text-white">HabitSet</h1>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-3 right-3 text-white"
          >
            <FiX size={20} /> {/* Close button */}
          </button>

          <ul className="py-8 px-12 space-y-4">
            {menuItem.map((item) => (
              <li key={item.name}>
                <Link to={item.path}>
                  <button
                    className={`w-full block py-3 text-lg font-semibold rounded-lg
                      ${active === item.name ? "bg-white text-emerald-600 shadow-md" : "text-white"}`}
                    onClick={() => {
                      setActive(item.name);
                      setIsMobileOpen(false); // ✅ Close menu when clicking
                    }}
                  >
                    {item.name}
                  </button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
