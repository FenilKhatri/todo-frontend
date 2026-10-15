import TaskRow from "./TaskRow";
import { SortableTask, TaskDndContext, TaskDropZone } from "./TaskDnd";
import { GROUPS, GROUP_META } from "../task.constants";

function TaskGroupHeading({ group, count }) {
  const meta = GROUP_META[group];
  return (
    <h2 className="mb-3 flex items-center gap-3 text-base font-semibold">
      <span className={`h-3 w-3 rounded-full ${meta.dot}`} />
      {meta.label}
      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${meta.count}`}>{count}</span>
    </h2>
  );
}

function TaskListView({ groups, onToggle, onEdit, onDelete, onMove }) {
  return (
    <TaskDndContext groups={groups} onMove={onMove} overlay={TaskRow}>
      {(current) => (
        <div className="space-y-6 p-4">
          {GROUPS.map((group) => {
            const list = current[group];
            return (
              <section key={group}>
                <TaskGroupHeading group={group} count={list.length} />
                <TaskDropZone group={group} tasks={list}>
                  {list.length ? (
                    <div className="rounded-lg border border-slate-200/70">
                      {list.map((task) => (
                        <SortableTask
                          key={task._id}
                          as={TaskRow}
                          disabled={!onMove}
                          task={task}
                          group={group}
                          onToggle={onToggle}
                          onEdit={onEdit}
                          onDelete={onDelete}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-lg border border-dashed border-slate-200 py-6 text-center text-sm text-slate-400">
                      No {GROUP_META[group].label.toLowerCase()} tasks
                    </p>
                  )}
                </TaskDropZone>
              </section>
            );
          })}
        </div>
      )}
    </TaskDndContext>
  );
}

export default TaskListView;
