import React, { useState } from "react";
import CreateHabit from "../../components/ui/habits/CreateHabit";
import HabitCard from "../../components/ui/habits/HabitCard";

const Habits = () => {
  const [habits, setHabits] = useState([
    {
      id: crypto.randomUUID(),
      name: "work out",
      cluster: "Health",
      color: "bg-blue-500/50",
      completed: false,
      completedOn: null,
    },
    {
      id: crypto.randomUUID(),
      name: "read",
      cluster: "Exercise",
      color: "bg-red-500/50",
      completed: false,
      completedOn: null,
    },
    {
      id: crypto.randomUUID(),
      name: "drink water",
      cluster: "After work",
      color: "bg-pink-500/50",
      completed: false,
      completedOn: null,
    },
    {
      id: crypto.randomUUID(),
      name: "homework",
      cluster: "Morning",
      color: "bg-purple-500/50",
      completed: false,
      completedOn: null,
    },
    {
      id: crypto.randomUUID(),
      name: "walk",
      cluster: "Evening",
      color: "bg-emerald-500/50",
      completed: false,
      completedOn: null,
    },
    {
      id: crypto.randomUUID(),
      name: "journal",
      cluster: "Night",
      color: "bg-yellow-500/50",
      completed: false,
      completedOn: null,
    },
  ]);

  // checks off habit and gets date when habit got completed
  const toggleHabitChecked = (habitId) => {
    console.log("habit id: ", habitId);
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              completed: !habit.completed,
              completedOn: !habit.completed
                ? new Date().toISOString().slice(0, 10) // to get date in (0000-00-00) format
                : null,
            }
          : habit
      )
    );
  };

  // edit the habit name
  const editHabit = (habitId, updatedHabit) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId ? { ...habit, name: updatedHabit } : habit
      )
    );
  };

  // add habit as first
  const addHabit = (newHabit) => {
    setHabits((prev) => [newHabit, ...prev]);
  };

  const deleteHabit = (habitId) => {
    setHabits((prevHabits) =>
      prevHabits.filter((habit) => habit.id !== habitId)
    );
    console.log("deleting: ", habitId);
  };

  return (
    <div className="max-w-8xl h-full rounded-lg mx-auto p-2">
      <h1 className="md:shrink-0 text-5xl max-sm:text-4xl m-1 mb-2 font-bold text-emerald-500/75">
        My Habits
      </h1>
      <p className="md:shrink-0 text-base max-sm:text-sm m-1 text-gray-500">
        Good habits don’t happen overnight. Small steps taken consistently, lead
        to big changes.
      </p>
      <div className=" border-1 border-gray-200 bg-white flex items-center h-[8vh] max-sm:px-2 px-4 mt-4 rounded-sm"></div>
      <div className="max-w-95 md:max-w-110 bg-white w-full overflow-x-hidden overflow-y-auto scrollbar border-1 border-gray-200 h-[70vh] p-5 mt-3 rounded-sm">
        <CreateHabit habits={habits} addHabit={addHabit} />
        <HabitCard
          habits={habits}
          onDelete={deleteHabit}
          habitCompleted={toggleHabitChecked}
          onEdit={editHabit}
        />
      </div>
    </div>
  );
};

export default Habits;
