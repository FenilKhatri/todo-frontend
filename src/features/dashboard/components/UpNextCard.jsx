import { LuSparkles } from "react-icons/lu";
import Card from "../../../components/Card";
import EmptyState from "../../../components/EmptyState";
import { getTaskGroup } from "../../tasks/task.utils";
import TaskRow from "../../tasks/components/TaskRow";
import CardLink from "./CardLink";

function UpNextCard({ tasks, onToggle, onEdit, onDelete }) {
  return (
    <Card title="Up next" action={<CardLink to="/tasks">All tasks</CardLink>}>
      {tasks.length ? (
        tasks.map((task) => (
          <TaskRow
            key={task._id}
            task={task}
            group={getTaskGroup(task)}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      ) : (
        <EmptyState
          icon={LuSparkles}
          title="Nothing pending"
          description="Add a task to plan your next piece of work."
        />
      )}
    </Card>
  );
}

export default UpNextCard;
