import { FiPlus } from "react-icons/fi";
import TaskCard from "./TaskCard";
import { GROUP_META } from "../task.constants";

function TaskColumn({ group, tasks, readOnly, onAdd, onToggle, onEdit, onDelete }) {
  const meta = GROUP_META[group];
  const Icon = meta.icon;

  return (
    <section className="flex flex-col rounded-xl border border-slate-100 bg-slate-50/60 p-3">
      <header className="flex items-center gap-3 px-1 py-2">
        <span className={`flex h-8 w-8 items-center justify-center rounded-full ${meta.iconWrap}`}>
          <Icon size={16} />
        </span>
        <h2 className={`text-base font-semibold ${meta.title}`}>{meta.label}</h2>
        <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${meta.count}`}>
          {tasks.length}
        </span>
      </header>

      {!readOnly && onAdd && (
        <button
          type="button"
          onClick={() => onAdd(group)}
          className="mt-2 flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white py-2 text-xs font-medium text-slate-600 hover:border-brand-500 hover:text-brand-600"
        >
          <FiPlus size={14} /> Add task
        </button>
      )}

      <div className="mt-3 space-y-3">
        {tasks.length ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              group={group}
              readOnly={readOnly}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))
        ) : (
          <p className="rounded-lg border border-dashed border-slate-200 py-8 text-center text-xs text-slate-400">
            No {meta.label.toLowerCase()} tasks
          </p>
        )}
      </div>
    </section>
  );
}

export default TaskColumn;
