import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GROUPS } from "../task.constants";

const findGroup = (groups, id) => (GROUPS.includes(id) ? id : GROUPS.find((g) => groups[g].some((t) => t._id === id)));
const indexOf = (list, id) => list.findIndex((t) => t._id === id);
const noop = () => {};

export function TaskDndContext({ groups, onMove, overlay: Overlay, children }) {
  // Groups as they look mid-drag, so other tasks make room for the dragged one.
  const [dragGroups, setDragGroups] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const current = dragGroups ?? groups;

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
  );

  const reset = () => {
    setDragGroups(null);
    setActiveTask(null);
  };

  const handleDragStart = ({ active }) => {
    setDragGroups(groups);
    setActiveTask(groups[findGroup(groups, active.id)].find((t) => t._id === active.id));
  };

  const handleDragOver = ({ active, over }) => {
    if (!over) return;
    setDragGroups((prev) => {
      const from = findGroup(prev, active.id);
      const to = findGroup(prev, over.id);
      if (!from || !to || from === to) return prev;

      const target = prev[to].filter((t) => t._id !== active.id);
      const index = indexOf(target, over.id);
      target.splice(index === -1 ? target.length : index, 0, activeTask);
      return { ...prev, [from]: prev[from].filter((t) => t._id !== active.id), [to]: target };
    });
  };

  const handleDragEnd = ({ active, over }) => {
    const group = findGroup(current, active.id);
    let list = current[group];
    const from = indexOf(list, active.id);
    const to = indexOf(list, over?.id);
    if (to !== -1) list = arrayMove(list, from, to);

    const moved = group !== findGroup(groups, active.id) || indexOf(list, active.id) !== indexOf(groups[group], active.id);
    if (over && moved) onMove(activeTask, group, { ...current, [group]: list });
    reset();
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={reset}
    >
      {children(current)}
      <DragOverlay>
        {activeTask && Overlay && (
          <div className="cursor-grabbing rounded-lg bg-white shadow-xl ring-1 ring-slate-200">
            <Overlay
              task={activeTask}
              group={findGroup(current, activeTask._id)}
              readOnly
              onToggle={noop}
              onEdit={noop}
              onDelete={noop}
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

export function TaskDropZone({ group, tasks, className, children }) {
  const { setNodeRef } = useDroppable({ id: group });
  return (
    <SortableContext id={group} items={tasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
      <div ref={setNodeRef} className={className}>
        {children}
      </div>
    </SortableContext>
  );
}

export function SortableTask({ as: Component, task, disabled, ...props }) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task._id,
    disabled,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : undefined,
  };

  return <Component task={task} {...props} dragProps={{ ref: setNodeRef, style, ...attributes, ...listeners }} />;
}
