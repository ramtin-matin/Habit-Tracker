const DayCell = ({ dayNumber, isCompleted, isToday, habitColor, onClick }) => {
  const baseStyles =
    "cursor-pointer aspect-square rounded-md text-[11px] flex items-center justify-center transition-all";
  const stateStyles = isCompleted
    ? "text-white"
    : "text-slate-400 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800";
  const todayStyles =
    isToday && !isCompleted
      ? "ring-2 ring-emerald-300 ring-offset-2 dark:ring-offset-slate-900"
      : "";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${stateStyles} ${todayStyles}`}
      style={{ backgroundColor: isCompleted ? habitColor : "" }}
    >
      {dayNumber}
    </button>
  );
};

export default DayCell;
