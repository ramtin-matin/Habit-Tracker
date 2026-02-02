import { MoreVertical } from "lucide-react";
import DayCell from "./DayCell";

const ProgressBar = ({ progressPercentage, color }) => (
  <div className="h-1.5 w-24 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
    <div
      className="h-full transition-all duration-500"
      style={{ width: `${progressPercentage}%`, backgroundColor: color }}
    />
  </div>
);

const HabitCard = ({ habit, year, month, onToggleCompletion }) => {
  const DAYS_OF_WEEK = ["S", "M", "T", "W", "T", "F", "S"];

  const getDaysInMonth = (year, month) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const startPadding = getFirstDayOfMonth(year, month);
  // const completedCount = Object.keys(habit.completed).length;
  const todayDateString = new Date().toDateString();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-3 h-3 rounded-full"
            // style={{ backgroundColor: habit.color }}
          />
          <h3 className="font-semibold truncate max-w-[140px]">{habit.name}</h3>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreVertical size={18} />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {DAYS_OF_WEEK.map((label) => (
          <span
            key={label}
            className="text-[10px] font-bold text-slate-400 mb-1"
          >
            {label}
          </span>
        ))}

        {/* Empty cells for month offset */}
        {Array.from({ length: startPadding }).map((_, index) => (
          <div key={`padding-${index}`} className="aspect-square" />
        ))}

        {/* Actual day cells */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const dayNumber = index + 1;
          const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNumber).padStart(2, "0")}`;
          const isToday =
            todayDateString === new Date(year, month, dayNumber).toDateString();

          return (
            <DayCell
              key={dateKey}
              dayNumber={dayNumber}
              // isCompleted={habit.completed[dateKey]}
              // habitColor={habit.color}
              isToday={isToday}
              onClick={() => onToggleCompletion(habit.id, dateKey)}
            />
          );
        })}
      </div>

      {/* Card Footer */}
      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
        <span>
          Streak: <b className="text-slate-800 dark:text-slate-200">12 days</b>
        </span>
        <ProgressBar
        // progressPercentage={(completedCount / daysInMonth) * 100}
        // color={habit.color}
        />
      </div>
    </div>
  );
};

export default HabitCard;
