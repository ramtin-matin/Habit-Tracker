import React from "react";
import CreateHabit from "./CreateHabit";
import HabitCard from "./HabitCard";
import { useHabits } from "../../pages/HabitContext";

const Habits = () => {
  const { habits } = useHabits();

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
        <div className="mt-15">
          {habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Habits;
