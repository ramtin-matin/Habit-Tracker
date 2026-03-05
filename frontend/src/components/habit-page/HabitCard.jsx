import { MoreVertical } from "lucide-react";
import DayCell from "./DayCell";

const ACCENT_COLOR = "#34d399";
const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];

const ProgressBar = ({ progressPercentage, clusterColor }) => (
  <div className="h-1.5 w-24 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
    <div
      className="h-full transition-all duration-500"
      style={{ width: `${progressPercentage}%`, backgroundColor: clusterColor }}
    />
  </div>
);

// format local date to a string
function formatDateKey(year, month, dayNumber) {
  const monthValue = String(month + 1).padStart(2, "0");
  const dayValue = String(dayNumber).padStart(2, "0");
  return `${year}-${monthValue}-${dayValue}`;
}

// get current streak from a set of all completed dates
function getCurrentStreak(habitAllDateKeys) {
  const currentDate = new Date();
  let streak = 0;

  while (
    habitAllDateKeys.has(
      formatDateKey(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
      ),
    )
  ) {
    streak += 1;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
}

function HabitCard({
  habit,
  habitLogs,
  year,
  month,
  onToggleCompletion,
  onDeleteHabit,
  onEditHabit,
  clusterColor,
}) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startPadding = new Date(year, month, 1).getDay();
  const todayDateString = new Date().toDateString();

  // get date keys for habit in current month
  const visibleMonthCompletedDateKeys = [];
  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = formatDateKey(year, month, day);
    const isCompleted = habitLogs.some(
      (log) => log.habit_id === habit.id && log.log_date === dateKey,
    );

    if (isCompleted) {
      visibleMonthCompletedDateKeys.push(dateKey);
    }
  }

  // progress bar percentage based on current month's completed date keys
  const progressPercentage = daysInMonth
    ? (visibleMonthCompletedDateKeys.length / daysInMonth) * 100
    : 0;

  // get all habit logs for habit and store their dates
  const habitAllDateKeys = new Set();
  for (const habitLog of habitLogs.filter(
    (habitLog) => habitLog.habit_id === habit.id,
  )) {
    habitAllDateKeys.add(habitLog.log_date);
  }

  const streak = getCurrentStreak(habitAllDateKeys);

  const handleEditClick = async () => {
    const nextName = window.prompt("Edit habit name", habit.name)?.trim();

    if (!nextName || nextName === habit.name) {
      return;
    }

    try {
      await onEditHabit(habit.id, { name: nextName });
    } catch (err) {
      console.error("Failed to edit habit:", err);
    }
  };

  const handleDeleteClick = async () => {
    const confirmed = window.confirm(`Delete "${habit.name}"?`);

    if (!confirmed) {
      return;
    }

    try {
      await onDeleteHabit(habit.id);
    } catch (err) {
      console.error("Failed to delete habit:", err);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: clusterColor }}
          />
          <h3 className="font-semibold truncate max-w-[140px]">{habit.name}</h3>
        </div>
        <details className="relative">
          <summary className="list-none text-slate-400 hover:text-slate-600 cursor-pointer">
            <MoreVertical size={18} />
          </summary>

          <div className="absolute right-0 top-8 z-10 w-28 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg overflow-hidden">
            <button
              className="block w-full px-3 py-2 text-left text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="block w-full px-3 py-2 text-left text-sm text-red-500 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </div>
        </details>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center">
        {DAYS_OF_WEEK.map((label, index) => (
          <span
            key={`${label}-${index}`}
            className="text-[10px] font-bold text-slate-400 mb-1"
          >
            {label}
          </span>
        ))}

        {Array.from({ length: startPadding }).map((_, index) => (
          <div key={`padding-${index}`} className="aspect-square" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const dayNumber = index + 1;
          const dateKey = formatDateKey(year, month, dayNumber);
          const isToday =
            todayDateString === new Date(year, month, dayNumber).toDateString(); // used for highlighting current day in grid
          const isCompleted = visibleMonthCompletedDateKeys.includes(dateKey);

          return (
            <DayCell
              key={dateKey}
              dayNumber={dayNumber}
              isCompleted={isCompleted}
              clusterColor={clusterColor}
              isToday={isToday}
              onClick={() => onToggleCompletion(habit.id, dateKey)}
            />
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
        <span>
          Streak:{" "}
          <b className="text-slate-800 dark:text-slate-200">{streak} days</b>
        </span>
        <ProgressBar
          progressPercentage={progressPercentage}
          clusterColor={clusterColor}
        />
      </div>
    </div>
  );
}

export default HabitCard;
