import { useState } from "react";
import { MoreVertical } from "lucide-react";
import DayCell from "./DayCell";
import EditHabitModal from "./EditHabitModal.jsx";

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
  clusterColor,
  clusters,
  onDeleteHabit,
  onEditHabit,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: clusterColor }}
            />
            <h3 className="font-semibold truncate max-w-[140px]">
              {habit.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            aria-label={`Edit ${habit.name}`}
          >
            <MoreVertical size={18} />
          </button>
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
              todayDateString ===
              new Date(year, month, dayNumber).toDateString(); // used for highlighting current day in grid
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

      <EditHabitModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        habit={habit}
        clusters={clusters ?? []}
        onDeleteHabit={onDeleteHabit}
        onEditHabit={onEditHabit}
      />
    </>
  );
}

export default HabitCard;
