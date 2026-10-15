import { getTaskGroup, groupTasks } from "./task.utils";
import { DAY_MS, PRIORITY_META } from "./task.constants";

const startOfDay = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const matchesDue = (task, due) => {
  if (due === "all") return true;
  if (due === "none") return !task.dueDate;
  if (!task.dueDate) return false;

  const date = new Date(task.dueDate);
  const today = startOfDay(new Date());

  if (due === "overdue") return getTaskGroup(task) === "overdue";
  if (due === "today") return date >= today && date < new Date(today.getTime() + DAY_MS);
  if (due === "week") return date >= today && date < new Date(today.getTime() + 7 * DAY_MS);
  return true;
};

export const byDueDate = (a, b) =>
  (a.dueDate ? new Date(a.dueDate) : Infinity) - (b.dueDate ? new Date(b.dueDate) : Infinity);

const SORTERS = {
  dueDate: byDueDate,
  priority: (a, b) => PRIORITY_META[a.priority].rank - PRIORITY_META[b.priority].rank,
  newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  title: (a, b) => a.title.localeCompare(b.title),
};

export const filterAndGroupTasks = (tasks, filters) => {
  const query = filters.search.trim().toLowerCase();
  const filtered = tasks
    .filter(
      (task) =>
        !query ||
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query),
    )
    .filter((task) => {
      if (filters.board === "all") return true;
      if (filters.board === "none") return !task.board;
      return task.board?._id === filters.board;
    })
    .filter((task) => filters.priority === "all" || task.priority === filters.priority)
    .filter((task) => matchesDue(task, filters.due))
    .sort(SORTERS[filters.sortBy]);
  return groupTasks(filtered);
};
