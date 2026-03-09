import { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import {
  THEME_GRADIENT_CSS,
  THEME_GRADIENT_CSS_DARK,
} from "./themeGradients.js";

function EditHabitModal({
  isOpen,
  onClose,
  habit,
  clusters,
  onDeleteHabit,
  onEditHabit,
}) {
  const [habitName, setHabitName] = useState("");
  const [selectedClusterId, setSelectedClusterId] = useState("");

  useEffect(() => {
    if (!isOpen || !habit) {
      return;
    }

    setHabitName(habit.name ?? "");
    setSelectedClusterId(habit.cluster_id ?? "");
  }, [isOpen, habit]);

  if (!isOpen || !habit) {
    return null;
  }

  // logic to see if user is able to edit habit or not
  const hasName = habitName.trim().length > 0;
  const isNameChanged = habitName.trim() !== habit.name.trim();
  const targetClusterId = selectedClusterId || null;
  const isClusterChanged = targetClusterId != (habit.cluster_id ?? null);

  const canSave = hasName && (isNameChanged || isClusterChanged);

  const handleEditHabit = async () => {
    try {
      await onEditHabit(habit.id, {
        name: habitName.trim(),
        cluster_id: targetClusterId,
      });
      onClose();
    } catch (err) {
      console.error("Failed to edit habit:", err);
      throw err;
    }
  };

  const handleDeleteHabit = async () => {
    try {
      await onDeleteHabit(habit.id);
      onClose();
    } catch (err) {
      console.error("Failed to delete habit:", err);
      throw err;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(15,23,42,0.95),rgba(2,6,23,0.95))] px-6 py-5 text-slate-100 shadow-[0_24px_60px_rgba(2,6,23,0.65)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Edit Habit
            </p>
            <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-50">
              {habit.name}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/10 text-slate-400 hover:bg-white/5 hover:text-slate-100 hover:border-white/20 active:scale-95 transition-all"
            aria-label="Close modal"
          >
            <X size={15} strokeWidth={2.5} />
          </button>
        </div>

        <div className="mt-6">
          <label
            htmlFor="edit-habit-name"
            className="block text-sm font-medium text-slate-300"
          >
            Habit Name
          </label>
          <div className="mt-2 rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2.5">
            <input
              id="edit-habit-name"
              value={habitName}
              onChange={(event) => setHabitName(event.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
              placeholder="Read for 20 minutes"
            />
          </div>
        </div>

        <div className="mt-6">
          <label
            htmlFor="edit-habit-cluster"
            className="block text-sm font-medium text-slate-300"
          >
            Cluster
          </label>
          <div className="mt-2 relative rounded-xl border border-white/10 bg-slate-900/60">
            <select
              id="edit-habit-cluster"
              value={selectedClusterId}
              onChange={(event) => setSelectedClusterId(event.target.value)}
              className="w-full appearance-none bg-transparent px-3 py-2.5 pr-10 text-sm text-slate-100 outline-none"
            >
              <option value="" className="bg-slate-900 text-slate-100">
                Ungrouped
              </option>
              {clusters.map((cluster) => (
                <option
                  key={cluster.id}
                  value={cluster.id}
                  className="bg-slate-900 text-slate-100"
                >
                  {cluster.name}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between gap-2.5">
          <button
            type="button"
            className="rounded-lg border border-rose-500/40 px-3.5 py-2 text-sm font-medium text-rose-300 hover:text-rose-200 hover:border-rose-400/60 transition-colors cursor-pointer"
            onClick={() => handleDeleteHabit()}
          >
            Delete Habit
          </button>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-slate-100 hover:border-white/20 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!canSave}
              className="rounded-lg px-3.5 py-2 text-sm font-semibold text-white cursor-pointer disabled:cursor-not-allowed disabled:text-slate-200"
              style={{
                backgroundImage: canSave
                  ? THEME_GRADIENT_CSS
                  : THEME_GRADIENT_CSS_DARK,
              }}
              onClick={() => handleEditHabit()}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditHabitModal;
