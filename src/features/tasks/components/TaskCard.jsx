import { FiCalendar, FiEdit2, FiFolder, FiTrash2 } from "react-icons/fi";
import Menu from "../../../components/Menu";
import { boardLabel, cardAccent, formatDate } from "../task.utils";
import { PriorityBadge } from "./Badges";
import TaskCheckbox from "./TaskCheckbox";

function TaskCard({ task, group, readOnly, onToggle, onEdit, onDelete }) {
  const completed = group === "completed";

  return (
    <article
      onClick={readOnly ? undefined : () => onToggle(task)}
      title={readOnly ? undefined : completed ? "Click to mark as pending" : "Click to mark as completed"}
      className={`rounded-lg border border-l-3 border-slate-100 bg-white p-4 shadow-xs transition ${cardAccent(task, group)} ${
        readOnly ? "" : "cursor-pointer hover:shadow-md"
      }`}
    >
      <div className="flex gap-3">
        <div className="pt-0.5">
          <TaskCheckbox
            checked={completed}
            round={completed}
            disabled={readOnly}
            onChange={() => onToggle(task)}
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold wrap-break-word">{task.title}</h3>
          {task.description && (
            <p className="mt-1 text-xs leading-relaxed text-slate-500 wrap-break-word">{task.description}</p>
          )}
          <div className="mt-2.5">
            <PriorityBadge priority={task.priority} />
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <span className="flex min-w-0 items-center gap-1.5">
              <FiFolder className="shrink-0" size={12} />
              <span className="truncate">{boardLabel(task)}</span>
            </span>
            <span className="text-slate-300">·</span>
            <span className="flex shrink-0 items-center gap-1.5">
              <FiCalendar size={12} />
              {formatDate(task.dueDate)}
            </span>
            {!readOnly && (
              <div className="ml-auto" onClick={(event) => event.stopPropagation()}>
                <Menu
                  items={[
                    { label: "Edit", icon: FiEdit2, onClick: () => onEdit(task) },
                    { label: "Delete", icon: FiTrash2, danger: true, onClick: () => onDelete(task) },
                  ]}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
