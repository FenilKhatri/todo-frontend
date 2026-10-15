import { useState } from "react";
import { LuCalendar, LuChevronDown, LuCircleCheck, LuFlag, LuListPlus, LuMousePointerClick, LuSquarePen } from "react-icons/lu";
import Button from "../../../components/Button";
import SegmentedControl from "../../../components/SegmentedControl";
import ModalShell, { AsideFeature, FieldLabel, shellInputClass } from "../../../components/ModalShell";
import { getErrorMessage } from "../../../shared/lib/axios";
import { addDays, getTaskGroup, toDateInput } from "../task.utils";
import TaskCard from "./TaskCard";
import { DATE_SHORTCUTS, PRIORITY_OPTIONS, STATUS_OPTIONS } from "../task.constants";

const buildInitial = (task, defaults) => ({
  title: task?.title || "",
  description: task?.description || "",
  priority: task?.priority || "medium",
  dueDate: toDateInput(task?.dueDate),
  boardId: task ? task.board?._id || "" : defaults?.boardId || "",
  status: task?.status || defaults?.status || "todo",
});

// Mount with a `key` that changes per open so the form resets.
function TaskFormModal({ task, defaults, boards = [], onSubmit, onClose }) {
  const [form, setForm] = useState(() => buildInitial(task, defaults));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const set = (field) => (value) => setForm((current) => ({ ...current, [field]: value }));
  const bind = (field) => (event) => set(field)(event.target.value);

  // A task can point at a board we can no longer pick (e.g. not owned); keep it selectable.
  const boardOptions =
    task?.board && !boards.some((board) => board._id === task.board._id) ? [task.board, ...boards] : boards;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      await onSubmit({
        title: form.title,
        description: form.description,
        priority: form.priority,
        dueDate: form.dueDate || null,
        boardId: form.boardId || null,
        status: form.status,
      });
      onClose();
    } catch (err) {
      setError(getErrorMessage(err, "Unable to save task"));
    } finally {
      setSaving(false);
    }
  };

  const preview = {
    _id: "preview",
    title: form.title.trim() || "Untitled task",
    description: form.description.trim(),
    priority: form.priority,
    status: form.status,
    dueDate: form.dueDate ? new Date(`${form.dueDate}T23:59:59`) : null,
    board: boardOptions.find((board) => board._id === form.boardId) || null,
  };

  const aside = (
    <>
      <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Live preview</p>
      <div className="mt-3">
        <TaskCard task={preview} group={getTaskGroup(preview)} readOnly />
      </div>

      <ul className="mt-8 space-y-5">
        <AsideFeature
          icon={LuFlag}
          title="Set a priority"
          text="High-priority tasks stand out in red so the urgent work gets done first."
        />
        <AsideFeature
          icon={LuCalendar}
          title="Add a due date"
          text="Tasks past their due date move to Overdue automatically."
        />
        <AsideFeature
          icon={LuMousePointerClick}
          title="One click to finish"
          text="Click any task in a list or board to mark it completed."
        />
      </ul>
    </>
  );

  return (
    <ModalShell
      icon={task ? LuSquarePen : LuListPlus}
      title={task ? "Edit Task" : "Add Task"}
      subtitle={task ? "Update the details of this task." : "Capture what needs to be done and when."}
      aside={aside}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} size="lg">
            Cancel
          </Button>
          <Button type="submit" form="task-form" loading={saving} size="lg">
            {!saving && <LuCircleCheck size={17} />}
            {task ? "Save Changes" : "Create Task"}
          </Button>
        </>
      }
    >
      <form id="task-form" onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}

        <div>
          <FieldLabel htmlFor="task-title" hint={`${form.title.length}/100`}>
            Title
          </FieldLabel>
          <input
            id="task-title"
            className={`${shellInputClass} h-12`}
            placeholder="What needs to be done?"
            minLength={3}
            maxLength={100}
            value={form.title}
            onChange={bind("title")}
            required
            autoFocus
          />
        </div>

        <div>
          <FieldLabel htmlFor="task-description" hint={`${form.description.length}/500`}>
            Description
          </FieldLabel>
          <textarea
            id="task-description"
            className={`${shellInputClass} resize-none py-3`}
            rows={3}
            maxLength={500}
            placeholder="Add more details (optional)"
            value={form.description}
            onChange={bind("description")}
          />
        </div>

        <div>
          <FieldLabel>Priority</FieldLabel>
          <SegmentedControl options={PRIORITY_OPTIONS} value={form.priority} onChange={set("priority")} />
        </div>

        <div>
          <FieldLabel>Status</FieldLabel>
          <SegmentedControl options={STATUS_OPTIONS} value={form.status} onChange={set("status")} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="task-due">Due date</FieldLabel>
            <input
              id="task-due"
              type="date"
              className={`${shellInputClass} h-12`}
              value={form.dueDate}
              onChange={bind("dueDate")}
            />
            <div className="mt-2 flex flex-wrap gap-1.5">
              {DATE_SHORTCUTS.map((shortcut) => {
                const value = shortcut.days === null ? "" : addDays(shortcut.days);
                return (
                  <button
                    key={shortcut.label}
                    type="button"
                    onClick={() => set("dueDate")(value)}
                    className={`cursor-pointer rounded-full border px-2.5 py-1 text-xs font-medium ${
                      form.dueDate === value
                        ? "border-brand-500 bg-brand-50 text-brand-600"
                        : "border-slate-200 text-slate-500 hover:bg-slate-50"
                    }`}
                  >
                    {shortcut.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="task-board">Board</FieldLabel>
            <div className="relative flex items-center">
              <select
                id="task-board"
                className={`${shellInputClass} h-12 cursor-pointer appearance-none pr-10`}
                value={form.boardId}
                onChange={bind("boardId")}
              >
                <option value="">General (no board)</option>
                {boardOptions.map((board) => (
                  <option key={board._id} value={board._id}>
                    {board.name}
                  </option>
                ))}
              </select>
              <LuChevronDown className="pointer-events-none absolute right-4 text-slate-400" size={16} />
            </div>
          </div>
        </div>
      </form>
    </ModalShell>
  );
}

export default TaskFormModal;
