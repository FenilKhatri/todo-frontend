import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { LuCalendar, LuEllipsisVertical } from "react-icons/lu";
import Menu from "../../../components/Menu";
import { boardColor, boardLabel, formatDate } from "../task.utils";
import { PriorityBadge, StatusBadge } from "./Badges";

function TaskRow({ task, group, onToggle, onEdit, onDelete }) {
  const completed = group === "completed";
  const overdue = group === "overdue";

  return (
    <div
      onClick={() => onToggle(task)}
      title={completed ? "Click to mark as pending" : "Click to mark as completed"}
      className="flex cursor-pointer items-start gap-4 border-b border-slate-100 px-4 py-3 transition-colors last:border-b-0 hover:bg-slate-50/80 md:items-center"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2 md:flex-row md:items-center md:gap-4">
        <div className="min-w-0 md:flex-1">
          <p
            className={`truncate text-sm font-medium ${completed ? "text-slate-400 line-through" : "text-ink"}`}
          >
            {task.title}
          </p>
          {task.description && (
            <p className={`truncate text-xs text-slate-500 ${completed ? "text-slate-400 line-through" : ""}`}>
              {task.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:flex-nowrap">
          <div className="md:w-28 lg:w-32">
            <PriorityBadge priority={task.priority} dot />
          </div>
          <div className="flex min-w-0 items-center gap-2 text-xs text-slate-600 md:w-32 lg:w-44">
            <span className={`h-3 w-3 shrink-0 rounded-[3px] ${boardColor(task.board?._id)}`} />
            <span className="truncate">{boardLabel(task)}</span>
          </div>
          <div
            className={`flex items-center gap-2 text-xs md:w-32 lg:w-40 ${overdue ? "text-red-500" : "text-slate-500"}`}
          >
            <LuCalendar size={15} className="shrink-0" />
            {formatDate(task.dueDate)}
          </div>
          <div className="md:w-24">
            <StatusBadge group={group} />
          </div>
        </div>
      </div>

      <div onClick={(event) => event.stopPropagation()}>
        <Menu
          icon={LuEllipsisVertical}
          items={[
            { label: "Edit", icon: FiEdit2, onClick: () => onEdit(task) },
            { label: "Delete", icon: FiTrash2, danger: true, onClick: () => onDelete(task) },
          ]}
        />
      </div>
    </div>
  );
}

export default TaskRow;
