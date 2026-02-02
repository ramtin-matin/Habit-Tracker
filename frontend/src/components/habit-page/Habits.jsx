import { useState, useRef } from "react";
import { useHabits } from "../HabitContext.jsx";
import DayCell from "./DayCell.jsx";
import HabitCard from "./HabitCard.jsx";
import MonthNavigation from "./MonthNavigation.jsx";
import { Plus, FolderPlus } from "lucide-react";
import GroupHeader from "./GroupHeader.jsx";

const Habits = () => {
  const BG_GRADIENT =
    "bg-[linear-gradient(-12deg,rgb(83,188,226),rgb(79,149,144),rgb(50,200,123))]";
  const { habits, setHabits, clusters } = useHabits();

  const habitsInCluster = (cluster) => {
    if (!cluster || !habits) return [];
    return habits.filter((habit) => habit.cluster_id === cluster.id);
  };

  const [currentViewDate, setCurrentViewDate] = useState(new Date());

  const toggleHabitCompletion = (habitId, dateKey) => {
    setHabits((prevHabits) => {
      const habit = prevHabits[habitId];
      const updatedCompleted = { ...habit.completed };

      if (updatedCompleted[dateKey]) {
        delete updatedCompleted[dateKey];
      } else {
        updatedCompleted[dateKey] = 1;
      }

      return {
        ...prevHabits,
        [habitId]: { ...habit, completed: updatedCompleted },
      };
    });
  };

  // based on direction, update month
  const handleMonthNavigation = (direction) => {
    setCurrentViewDate(
      new Date(
        currentViewDate.getFullYear(),
        currentViewDate.getMonth() + direction,
        1,
      ),
    );
  };

  const currentYear = currentViewDate.getFullYear();
  const currentMonth = currentViewDate.getMonth();

  return (
    <div className="overflow-y-auto h-screen scrollbar overflow-x-hidden flex-1 dark:bg-slate-950 p-4 md:p-8 font-sans text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* App Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl text-emerald-300 font-bold tracking-tight">
              HabitSet
            </h1>
            <p className="text-slate-500 mt-1">
              Consistency is the key to progress.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <MonthNavigation
              viewDate={currentViewDate}
              onNavigate={handleMonthNavigation}
            />
            <button
              className={`${BG_GRADIENT} cursor-pointer text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all active:scale-95`}
            >
              <Plus size={20} /> <span>New Habit</span>
            </button>
          </div>
        </header>

        {/* Habit Groups List */}
        <div className="space-y-12">
          {clusters.map((cluster) => {
            const clusterHabits = habitsInCluster(cluster);
            console.log("habits: ", clusterHabits);

            return (
              <section key={cluster.id}>
                <GroupHeader
                  title={cluster.name}
                  count={clusterHabits.length}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {clusterHabits.map((habit) => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      year={currentYear}
                      month={currentMonth}
                      onToggleCompletion={toggleHabitCompletion}
                    />
                  ))}

                  {/* Add Habit Placeholder */}
                  <button className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-slate-400 hover:text-emerald-300 dark:hover:border-emerald-300 cursor-pointer transition-all hover:bg-white dark:hover:bg-slate-900/50 group">
                    <Plus
                      size={32}
                      className="mb-2 group-hover:scale-110 transition-transform"
                    />
                    <span className="font-medium">Add Habit</span>
                  </button>
                </div>
              </section>
            );
          })}

          {/* Create New Cluster Button */}
          <div className="flex justify-center pb-12">
            <button className="flex items-center gap-2 text-emerald-300 hover:text-emerald-400 cursor-pointer dark:hover:text-emerald-400 font-medium px-6 py-3 rounded-2xl border border-transparent hover:border-emerald-400 dark:hover:border-emerald-400 transition-colors">
              <FolderPlus size={20} /> <span>Create New Cluster</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Habits;
