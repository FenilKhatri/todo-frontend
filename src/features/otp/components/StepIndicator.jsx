import { FiCheck } from "react-icons/fi";

function StepIndicator({ steps, current, className = "mt-7" }) {
  return (
    <ol className={`flex items-center gap-2 ${className}`}>
      {steps.map((label, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <li key={label} className="flex flex-1 items-center gap-2 last:flex-none">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                done ? "bg-emerald-500 text-white" : active ? "bg-brand-500 text-white" : "bg-slate-100 text-slate-500"
              }`}
            >
              {done ? <FiCheck size={14} strokeWidth={3} /> : index + 1}
            </span>
            <span className={`hidden text-sm whitespace-nowrap sm:block ${active ? "font-semibold" : "text-slate-500"}`}>
              {label}
            </span>
            {index < steps.length - 1 && <span className="h-px min-w-3 flex-1 bg-slate-200" />}
          </li>
        );
      })}
    </ol>
  );
}

export default StepIndicator;
