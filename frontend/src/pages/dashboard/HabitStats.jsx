import { FaPlus } from "react-icons/fa"; // imports a plus icon
import React from "react";

const HabitStats = () => {
  return (
    <div className="max-w-8xl h-full rounded-lg mx-auto p-2">
      <h1 className="md:shrink-0 text-5xl max-sm:text-4xl m-1 mb-2 font-bold text-emerald-500/75">
        My Habit Stats.
      </h1>
      <p className="md:shrink-0 text-base max-sm:text-sm m-1 text-gray-500">
        Good habits don’t happen overnight.{" "}
        <b className="text-emerald-600/75">Small steps</b>, taken{" "}
        <b className="text-emerald-600/75">consistently</b>, lead to{" "}
        <b className="text-emerald-600/75">big changes.</b> <br></br>Stay{" "}
        <b className="text-emerald-600/75">patient</b>, stay{" "}
        <b className="text-emerald-600/75">consistent.</b>
      </p>
      <div className=" border-1 border-gray-200 flex items-center h-1/9 max-md:h-1/8 max-sm:px-2 px-4 mt-4 rounded-sm">
        <ul className="flex gap-2">
          <button className="max-sm:scale-75 flex justify-center gap-2 text-xs font-bold cursor-pointer md:shrink-0 max-sm:p-1 max-lg:p-2 p-3 rounded-lg transition duration-150 ease-in active:scale-99 text-gray-500 hover:shadow-sm hover:bg-gray-50 border-1">
            <FaPlus className="m-auto text-xs" />
            Create Habit
          </button>
        </ul>
      </div>
      <div className="w-1/2 *:flex border-1 border-gray-200 items-center justify-start h-7/10 p-4 mt-2 rounded-sm">
        <div className="h-1/10 mx-auto transition duration-150 ease-in border-1 cursor-pointer hover:bg-gray-50 active:bg-gray-100 border-gray-200"></div>
      </div>
    </div>
  );
};

export default HabitStats;
