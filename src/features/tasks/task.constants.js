import { FiAlertCircle, FiCheck, FiCheckCircle, FiList } from "react-icons/fi";
import { LuCircleAlert, LuColumns2, LuList, LuListTodo, LuSquarePen } from "react-icons/lu";

export const GROUPS = ["pending", "overdue", "completed"];

export const GROUP_META = {
  pending: {
    label: "Pending",
    icon: FiList,
    dot: "bg-brand-500",
    iconWrap: "bg-brand-100 text-brand-600",
    count: "bg-brand-50 text-brand-600",
    title: "text-ink",
    statusBadge: "bg-brand-50 text-brand-600",
  },
  overdue: {
    label: "Overdue",
    icon: FiAlertCircle,
    dot: "bg-red-500",
    iconWrap: "bg-red-500 text-white",
    count: "bg-red-50 text-red-600",
    title: "text-ink",
    statusBadge: "bg-red-50 text-red-600",
  },
  completed: {
    label: "Completed",
    icon: FiCheckCircle,
    dot: "bg-emerald-500",
    iconWrap: "bg-emerald-500 text-white",
    count: "bg-emerald-50 text-emerald-600",
    title: "text-emerald-700",
    statusBadge: "bg-emerald-50 text-emerald-600",
  },
};

export const PRIORITY_META = {
  high: { label: "High", badge: "bg-red-50 text-red-600", rank: 0 },
  medium: { label: "Medium", badge: "bg-amber-50 text-amber-600", rank: 1 },
  low: { label: "Low", badge: "bg-emerald-50 text-emerald-600", rank: 2 },
};

export const BOARD_COLORS = [
  "bg-teal-500",
  "bg-violet-500",
  "bg-brand-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-cyan-500",
  "bg-indigo-500",
];

export const DEFAULT_FILTERS = {
  search: "",
  board: "all",
  priority: "all",
  due: "all",
  sortBy: "dueDate",
};

export const DAY_MS = 86400000;

export const TASK_VIEWS = [
  { id: "list", label: "List", icon: LuList },
  { id: "board", label: "Board", icon: LuColumns2 },
];

export const PRIORITY_OPTIONS = [
  { id: "low", label: "Low", dot: "bg-emerald-500", active: "border-emerald-300 bg-emerald-50 text-emerald-700" },
  { id: "medium", label: "Medium", dot: "bg-amber-500", active: "border-amber-300 bg-amber-50 text-amber-700" },
  { id: "high", label: "High", dot: "bg-red-500", active: "border-red-300 bg-red-50 text-red-700" },
];

export const STATUS_OPTIONS = [
  { id: "todo", label: "To do" },
  { id: "in-progress", label: "In progress" },
  { id: "completed", label: "Completed" },
];

// Quick picks under the due-date input; `days` is an offset from today, null clears the date.
export const DATE_SHORTCUTS = [
  { label: "Today", days: 0 },
  { label: "Tomorrow", days: 1 },
  { label: "Next week", days: 7 },
  { label: "No date", days: null },
];

// Summary cards; `badge` renders the icon inside a filled circle of that colour.
export const TASK_STATS = [
  {
    key: "total",
    label: "Total tasks",
    hint: "Across all your boards",
    icon: LuListTodo,
    iconSize: 20,
    iconClass: "bg-slate-100 text-slate-600",
  },
  {
    key: "pending",
    label: "Pending",
    hint: "Tasks not yet completed",
    icon: LuSquarePen,
    iconSize: 20,
    iconClass: "bg-brand-50 text-brand-600",
  },
  {
    key: "overdue",
    label: "Overdue",
    hint: "Past their due date",
    icon: LuCircleAlert,
    iconSize: 22,
    iconClass: "bg-red-50 text-red-500",
  },
  {
    key: "completed",
    label: "Completed",
    hint: "Marked as done",
    icon: FiCheck,
    iconSize: 16,
    iconClass: "bg-emerald-50",
    badge: "bg-emerald-500 text-white",
  },
];
