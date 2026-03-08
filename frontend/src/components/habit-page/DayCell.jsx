const DayCell = ({
  dayNumber,
  isCompleted,
  isToday,
  isDateKeyLaterThanToday,
  clusterColor,
  onClick,
}) => {
  const baseStyles =
    "aspect-square rounded-md text-[11px] flex items-center justify-center transition-all";
  const stateStyles = isCompleted
    ? "text-white"
    : "text-slate-400 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800";
  const todayStyles = isToday
    ? "ring-2 ring-offset-2 dark:ring-offset-slate-900"
    : "";
  const disabledStyling = isDateKeyLaterThanToday
    ? "cursor-default text-slate-400 bg-slate-200 dark:bg-slate-400 opacity-30 cursor-default"
    : "cursor-pointer text-white";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${stateStyles} ${todayStyles} ${disabledStyling}`}
      style={{
        backgroundColor: isCompleted ? clusterColor : "",
        "--tw-ring-color": isToday ? clusterColor : undefined,
      }}
      disabled={isDateKeyLaterThanToday}
    >
      {dayNumber}
    </button>
  );
};

export default DayCell;
