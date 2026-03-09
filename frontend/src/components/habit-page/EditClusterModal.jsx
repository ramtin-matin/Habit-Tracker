import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ColorPicker from "./ColorPicker.jsx";
import { clusterColors } from "./clusterColors.js";
import {
  THEME_GRADIENT_CSS,
  THEME_GRADIENT_CSS_DARK,
} from "./themeGradients.js";

function EditClusterModal({
  isOpen,
  onClose,
  cluster,
  clusters,
  onEditCluster,
  onDeleteCluster,
}) {
  const [clusterName, setClusterName] = useState("");
  const [selectedColor, setSelectedColor] = useState(null);

  useEffect(() => {
    if (!isOpen || !cluster) {
      return;
    }

    setClusterName(cluster.name ?? "");
    setSelectedColor(cluster.color ?? null);
  }, [isOpen, cluster]);

  if (!isOpen || !cluster) {
    return null;
  }

  // logic to see if user is able to edit cluster or not
  const hasName = clusterName.trim().length > 0;
  const isNameChanged = clusterName.trim() !== cluster.name.trim();
  const isColorChanged = selectedColor !== cluster.color;
  const hasDuplicateName = clusters.some(
    (c) =>
      c.name.toLowerCase().trim() === clusterName.toLowerCase().trim() &&
      c.id !== cluster.id,
  );

  const canSave =
    hasName &&
    Boolean(selectedColor) &&
    !hasDuplicateName &&
    (isNameChanged || isColorChanged);

  const handleEditCluster = async (newName, newColor) => {
    try {
      await onEditCluster(cluster.id, {
        name: newName.trim(),
        color: newColor,
      });
      onClose();
    } catch (err) {
      console.error("Failed to edit cluster:", err);
      throw err;
    }
  };

  const handleDeleteCluster = async () => {
    try {
      await onDeleteCluster(cluster.id);
      onClose();
    } catch (err) {
      console.error("Failed to delete cluster:", err);
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
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            Edit Cluster
          </p>
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
            htmlFor="edit-cluster-name"
            className="block text-sm font-medium text-slate-300"
          >
            Cluster Name
          </label>
          <div className="mt-2 rounded-xl border border-white/10 bg-slate-900/60 px-3 py-2.5">
            <input
              id="edit-cluster-name"
              value={clusterName}
              onChange={(event) => setClusterName(event.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-300">Pick a color</p>
            <span className="text-xs text-slate-400">
              {selectedColor ?? "No color selected"}
            </span>
          </div>
          <ColorPicker
            colors={clusterColors}
            value={selectedColor}
            onChange={setSelectedColor}
          />
        </div>

        <div className="mt-7 flex items-center justify-between gap-2.5">
          <button
            type="button"
            className="rounded-lg border border-rose-500/40 px-3.5 py-2 text-sm font-medium text-rose-300 hover:text-rose-200 hover:border-rose-400/60 transition-colors cursor-pointer"
            onClick={() => handleDeleteCluster()}
          >
            Delete Cluster
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
              onClick={() => handleEditCluster(clusterName, selectedColor)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditClusterModal;
