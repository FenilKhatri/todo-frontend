import TaskCard from "./TaskCard";
import TaskColumn from "./TaskColumn";
import { TaskDndContext } from "./TaskDnd";
import { GROUPS } from "../task.constants";

function TaskBoardView({ groups, readOnly, onAdd, onToggle, onEdit, onDelete, onMove, className = "" }) {
  return (
    <TaskDndContext groups={groups} onMove={onMove} overlay={TaskCard}>
      {(current) => (
        <div className={`grid grid-cols-1 gap-4 lg:grid-cols-3 ${className}`}>
          {GROUPS.map((group) => (
            <TaskColumn
              key={group}
              group={group}
              tasks={current[group]}
              readOnly={readOnly}
              draggable={!readOnly && !!onMove}
              onAdd={onAdd}
              onToggle={onToggle}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </TaskDndContext>
  );
}

export default TaskBoardView;
