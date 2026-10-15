import { BOARD_COLORS } from "./task.constants";

export const getTaskGroup = (task, now = new Date()) => {
  if (task.status === "completed") return "completed";
  if (task.dueDate && new Date(task.dueDate) < now) return "overdue";
  return "pending";
};

export const groupTasks = (tasks) => {
  const groups = { pending: [], overdue: [], completed: [] };
  const now = new Date();
  tasks.forEach((task) => groups[getTaskGroup(task, now)].push(task));
  return groups;
};

export const cardAccent = (task, group) => {
  if (group === "overdue") return "border-l-red-400";
  if (group === "completed") return "border-l-emerald-500";
  return task.priority === "medium" ? "border-l-amber-400" : "border-l-brand-500";
};

export const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "No due date";

export const toDateInput = (value) => {
  if (!value) return "";
  const date = new Date(value);
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

// Date `days` from today as YYYY-MM-DD (the date input's format).
export const addDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return toDateInput(date);
};

export const boardLabel = (task) => task.board?.name || "General";

export const boardColor = (boardId) => {
  if (!boardId) return "bg-slate-400";
  const hash = [...String(boardId)].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return BOARD_COLORS[hash % BOARD_COLORS.length];
};
