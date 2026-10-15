import api from "../../shared/lib/axios";

export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data.tasks;
};

export const createTask = async (data) => {
  const response = await api.post("/tasks", data);
  return response.data.task;
};

export const updateTask = async (taskId, data) => {
  const response = await api.patch(`/tasks/${taskId}`, data);
  return response.data.task;
};

// The create endpoint ignores status, so apply a non-default status with a follow-up patch.
export const saveTask = async (task, { status, ...values }) => {
  if (task) return updateTask(task._id, { ...values, status });

  const created = await createTask(values);
  return status && status !== "todo" ? updateTask(created._id, { status }) : created;
};

export const toggleTask = (task) =>
  updateTask(task._id, { status: task.status === "completed" ? "todo" : "completed" });

export const reorderTasks = async (ids) => {
  const response = await api.patch("/tasks/reorder", { ids });
  return response.data;
};

export const deleteTask = async (taskId) => {
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};
