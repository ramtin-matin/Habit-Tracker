import { useEffect, useState } from "react";
import { useHabits } from "../HabitContext.jsx";
import HabitCard from "./HabitCard.jsx";
import MonthNavigation from "./MonthNavigation.jsx";
import { FolderPlus, Plus } from "lucide-react";
import GroupHeader from "./GroupHeader.jsx";
import CreateClusterModal from "./CreateClusterModal.jsx";
import EditClusterModal from "./EditClusterModal.jsx";
import { THEME_GRADIENT_BG_CLASS } from "./themeGradients.js";

const Habits = () => {
  const {
    clusters,
    habitLogs,
    habits,
    loadHabitLogs,
    handleEditHabit,
    toggleHabitCompletion,
    handleDeleteHabit,
    handleCreateCluster,
    handleEditCluster,
  } = useHabits();
  const [currentViewDate, setCurrentViewDate] = useState(new Date());
  const [isCreateClusterOpen, setIsCreateClusterOpen] = useState(false);
  const [editingCluster, setEditingCluster] = useState(null);

  useEffect(() => {
    async function loadAllHabitLogs() {
      try {
        await loadHabitLogs();
      } catch (err) {
        console.error("Failed to sync month logs:", err);
      }
    }

    loadAllHabitLogs();
  }, [loadHabitLogs]);

  const groupedHabits = clusters.map((cluster) => ({
    id: cluster.id,
    title: cluster.name,
    color: cluster.color ?? "#8E8E8E",
    habits: habits.filter((habit) => habit.cluster_id === cluster.id),
  }));

  const ungroupedHabits = habits.filter((habit) => habit.cluster_id == null);
  if (ungroupedHabits.length > 0) {
    groupedHabits.push({
      id: "ungrouped",
      title: "Ungrouped Habits",
      habits: ungroupedHabits,
    });
  }

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
              className={`${THEME_GRADIENT_BG_CLASS} cursor-pointer text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all active:scale-95`}
            >
              <Plus size={20} /> <span>New Habit</span>
            </button>
          </div>
        </header>

        <div className="space-y-12">
          {groupedHabits.map((group) => (
            <section key={group.id}>
              <GroupHeader
                title={group.title}
                count={group.habits.length}
                clusterColor={group.color}
                onClick={
                  group.id === "ungrouped"
                    ? undefined
                    : () =>
                        setEditingCluster(
                          clusters.find((cluster) => cluster.id === group.id) ??
                            null,
                        )
                }
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.habits.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    habitLogs={habitLogs}
                    clusterColor={group.color}
                    year={currentYear}
                    month={currentMonth}
                    onToggleCompletion={toggleHabitCompletion}
                    onDeleteHabit={handleDeleteHabit}
                    onEditHabit={handleEditHabit}
                  />
                ))}

                <button
                  className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 text-slate-400 cursor-pointer transition-all hover:bg-white dark:hover:bg-slate-900/50 hover:text-[var(--cluster-color)] hover:border-[var(--cluster-color)] group"
                  style={{ "--cluster-color": group.color }}
                >
                  <Plus
                    size={32}
                    className="mb-2 group-hover:scale-110 transition-transform"
                  />
                  <span className="font-medium">Add Habit</span>
                </button>
              </div>
            </section>
          ))}

          <div className="flex justify-center pb-12">
            <button
              className="flex items-center gap-2 text-emerald-300 hover:text-emerald-400 cursor-pointer dark:hover:text-emerald-400 font-medium px-6 py-3 rounded-2xl border border-transparent hover:border-emerald-400 dark:hover:border-emerald-400 transition-colors"
              onClick={() => setIsCreateClusterOpen(true)}
            >
              <FolderPlus size={20} /> <span>Create New Cluster</span>
            </button>
          </div>
        </div>
      </div>

      <CreateClusterModal
        isOpen={isCreateClusterOpen}
        onClose={() => setIsCreateClusterOpen(false)}
        clusters={clusters}
        onCreateCluster={handleCreateCluster}
      />

      <EditClusterModal
        isOpen={Boolean(editingCluster)}
        onClose={() => setEditingCluster(null)}
        cluster={editingCluster}
        clusters={clusters}
        onEditCluster={handleEditCluster}
      />
    </div>
  );
};

export default Habits;
