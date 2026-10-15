import { FiCheck } from "react-icons/fi";

function TaskCheckbox({ checked, disabled, onChange, round = false }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={checked ? "Mark as not completed" : "Mark as completed"}
      disabled={disabled}
      onClick={(event) => {
        // Parent rows/cards also toggle on click; don't toggle twice.
        event.stopPropagation();
        onChange();
      }}
      className={`flex h-4.5 w-4.5 shrink-0 items-center justify-center border transition-colors enabled:cursor-pointer disabled:opacity-60 ${
        round ? "rounded-full" : "rounded"
      } ${
        checked
          ? "border-emerald-500 bg-emerald-500 text-white"
          : "border-slate-300 bg-white hover:border-brand-500"
      }`}
    >
      {checked && <FiCheck size={12} strokeWidth={3} />}
    </button>
  );
}

export default TaskCheckbox;
