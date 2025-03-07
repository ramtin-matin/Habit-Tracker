import React, { useState, useRef } from "react";
import CreateHabit from "./CreateHabit";
import HabitCard from "./HabitCard";
import { useHabits } from "../HabitContext";
import ClusterMenu from "../habit-clusters/ClusterMenu";
import { ChevronDown } from "lucide-react";

const Habits = () => {
  const { habits, activeCluster, useOutsideClick } = useHabits();
  const [filterMenu, setFilterMenu] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHabits = habits.filter((habit) =>
    habit.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filterMenuRef = useRef(null);

  useOutsideClick(filterMenuRef, () => setFilterMenu(false), filterMenu);

  const sortedHabits = [...filteredHabits].sort((a, b) => {
    if (sortOrder === "asc") return a.name.localeCompare(b.name);
    if (sortOrder === "desc") return b.name.localeCompare(a.name);
    return 0;
  });

  return (
    <div className="max-w-8xl h-full rounded-lg mx-auto p-2">
      <h1 className="md:shrink-0 text-5xl max-sm:text-4xl m-1 mb-2 font-bold text-emerald-600/75">
        My Habits
      </h1>
      <p className="md:shrink-0 text-base max-sm:text-sm m-1 text-gray-500">
        Good habits don’t happen overnight. Small steps taken consistently, lead
        to big changes.
      </p>
      <div className=" border-1 border-gray-200 bg-white flex items-center h-[8vh] sm:h-[10vh] lg:h-[11vh] max-sm:px-2 px-4 mt-4 rounded-sm">
        <CreateHabit />
      </div>
      <div className="max-w-95 md:max-w-110 bg-white w-full overflow-x-hidden overflow-y-auto scrollbar border-1 border-gray-200 h-[70vh] p-5 mt-3 rounded-sm">
        <div className="mt-4">
          <div className="flex gap-2 ">
            <button
              className="relative flex justify-center gap-4 text-sm p-2 cursor-pointer rounded-lg active:scale-99 text-emerald-600/75 hover:shadow-xs bg-white border-1 border-gray-300"
              onClick={() => setFilterMenu(!filterMenu)}
            >
              <span className="hidden sm:inline">Filter</span>
              <ChevronDown className="m-auto w-4 h-4" />
            </button>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded-md p-2 w-40 font-bold text-xs border-gray-300 hover:shadow-xs text-gray-600"
            ></input>
            <ClusterMenu />
          </div>
          <div className="relative">
            {filterMenu && (
              <div
                ref={filterMenuRef}
                className="absolute mt-2 p-1 w-25 bg-white border-1 border-gray-200 shadow-md rounded-md z-10"
              >
                <button
                  className="text-xs block font-bold w-full text-gray-500 px-4 py-2 text-left hover:bg-gray-100 hover:rounded-lg transition duration-150 ease-in"
                  onClick={() => {
                    setSortOrder("asc"), setFilterMenu(false);
                  }}
                >
                  A-Z
                </button>
                <button
                  className="text-xs block font-bold w-full text-gray-500 px-4 py-2 text-left  hover:rounded-lg hover:bg-gray-100 transition duration-150 ease-in"
                  onClick={() => {
                    setSortOrder("desc");
                    setFilterMenu(false);
                  }}
                >
                  Z-A
                </button>
                <button
                  className="text-xs block font-bold w-full text-gray-500 px-4 py-2 text-left hover:bg-gray-100 hover:rounded-lg transition duration-150 ease-in"
                  onClick={() => {
                    setSortOrder("default");
                    setFilterMenu(false);
                  }}
                >
                  Default
                </button>
              </div>
            )}
          </div>
          {sortedHabits
            .filter((habit) =>
              activeCluster.id === null
                ? true
                : habit.clusterId === activeCluster.id
            )
            .map((habit) => (
              <HabitCard key={habit.id} habit={habit} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Habits;
