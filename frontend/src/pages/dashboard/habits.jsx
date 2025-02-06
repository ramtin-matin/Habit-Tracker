import React, { useState } from "react";
import CreateHabit from "../../components/ui/habits/CreateHabit";
import HabitCard from "../../components/ui/habits/HabitCard";

const Habits = () => {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: "work out",
      cluster: "Health",
      color: "bg-blue-500/50",
      completed: false,
    },
    {
      id: 2,
      name: "read",
      cluster: "Exercise",
      color: "bg-red-500/50",
      completed: false,
    },
    {
      id: 3,
      name: "drink water",
      cluster: "After work",
      color: "bg-pink-500/50",
      completed: false,
    },
    {
      id: 4,
      name: "homework",
      cluster: "Morning",
      color: "bg-purple-500/50",
      completed: false,
    },
    {
      id: 5,
      name: "walk",
      cluster: "Evening",
      color: "bg-emerald-500/50",
      completed: false,
    },
    {
      id: 6,
      name: "journal",
      cluster: "Night",
      color: "bg-yellow-500/50",
      completed: false,
    },
  ]);

  const toggleHabitChecked = (habitId) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  const editHabit = (habitId, updatedHabit) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === habitId ? { ...habit, name: updatedHabit } : habit
      )
    );
  };

  const addHabit = (newHabit) => {
    setHabits((prev) => [...prev, newHabit]);
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
