import { useCallback, useEffect, useMemo, useState } from "react";
import { getErrorMessage } from "../../../shared/lib/axios";
import { getBoards } from "../../boards/board.api";
import { deleteTask, getTasks, reorderTasks, saveTask, toggleTask, updateTask } from "../task.api";
import { endOfDay, getTaskGroup, moveUpdates } from "../task.utils";

export default function useTaskList() {
  const [tasks, setTasks] = useState([]);
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([getTasks(), getBoards()])
      .then(([taskList, boardList]) => {
        setTasks(taskList);
        setBoards(boardList);
      })
      .catch((err) => setError(getErrorMessage(err, "Unable to load tasks")))
      .finally(() => setLoading(false));
  }, []);

  const upsert = useCallback(
    (saved) =>
      setTasks((list) =>
        list.some((task) => task._id === saved._id)
          ? list.map((task) => (task._id === saved._id ? saved : task))
          : [saved, ...list],
      ),
    [],
  );

  const toggle = useCallback(
    async (task) => {
      upsert({ ...task, status: task.status === "completed" ? "todo" : "completed" });
      try {
        upsert(await toggleTask(task));
      } catch (err) {
        upsert(task);
        setError(getErrorMessage(err, "Unable to update task"));
      }
    },
    [upsert],
  );

  const save = useCallback(async (task, values) => upsert(await saveTask(task, values)), [upsert]);

  const move = useCallback(
    async (task, group, ids) => {
      const updates = getTaskGroup(task) === group ? null : moveUpdates(task, group);
      const local = updates?.dueDate ? { ...updates, dueDate: endOfDay(updates.dueDate) } : updates;
      const previous = tasks;
      setTasks((list) =>
        list.map((item) => ({
          ...item,
          order: ids.indexOf(item._id),
          ...(item._id === task._id && local),
        })),
      );
      try {
        const [, saved] = await Promise.all([reorderTasks(ids), updates && updateTask(task._id, updates)]);
        if (saved) upsert({ ...saved, order: ids.indexOf(saved._id) });
      } catch (err) {
        setTasks(previous);
        setError(getErrorMessage(err, "Unable to move task"));
      }
    },
    [tasks, upsert],
  );

  const remove = useCallback(async (task) => {
    try {
      await deleteTask(task._id);
      setTasks((list) => list.filter((item) => item._id !== task._id));
      return true;
    } catch (err) {
      setError(getErrorMessage(err, "Unable to delete task"));
      return false;
    }
  }, []);

  const ownedBoards = useMemo(() => boards.filter((board) => board.canEdit), [boards]);

  return { tasks, boards, ownedBoards, loading, error, setError, toggle, save, move, remove };
}
