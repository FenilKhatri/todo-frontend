import { GROUP_META, PRIORITY_META } from "../task.constants";

export function PriorityBadge({ priority, dot = false }) {
  const meta = PRIORITY_META[priority] || PRIORITY_META.medium;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${meta.badge}`}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {meta.label}
    </span>
  );
}

export function StatusBadge({ group }) {
  const meta = GROUP_META[group];
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.statusBadge}`}>
      {meta.label}
    </span>
  );
}
