const GroupHeader = ({ title, count, clusterColor }) => (
  <div className="flex items-center gap-2 mb-6">
    <div
      className="w-1.5 h-6 rounded-full"
      style={{ backgroundColor: clusterColor }}
    />
    <h2 className="text-xl font-bold">{title}</h2>
    <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md text-xs font-bold">
      {count}
    </span>
  </div>
);

export default GroupHeader;
