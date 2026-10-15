import TaskColumn from "./TaskColumn";
import { GROUPS } from "../task.constants";

function TaskBoardView({ groups, readOnly, onAdd, onToggle, onEdit, onDelete, className = "" }) {
  return (
    <div className={`grid gap-4 lg:grid-cols-3 ${className}`}>
      {GROUPS.map((group) => (
        <TaskColumn
          key={group}
          group={group}
          tasks={groups[group]}
          readOnly={readOnly}
          onAdd={onAdd}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskBoardView;
