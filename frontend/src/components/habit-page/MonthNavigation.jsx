import {
  ChevronRight,
  ChevronLeft,
  Calendar as CalendarIcon,
} from "lucide-react";

const MonthNavigation = ({ viewDate, onNavigate }) => {
  const formattedDate = viewDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex items-center bg-white dark:bg-slate-900 rounded-xl p-1 border border-slate-200 dark:border-slate-800 shadow-sm">
      <button
        onClick={() => onNavigate(-1)}
        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
      >
        <ChevronLeft size={20} />
      </button>
      <div className="px-4 font-semibold min-w-[150px] text-center flex items-center justify-center gap-2 cursor-default">
        <CalendarIcon size={16} className="text-emerald-300" />
        {formattedDate}
      </div>
      <button
        onClick={() => onNavigate(1)}
        className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default MonthNavigation;
