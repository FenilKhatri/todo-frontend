import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import Alert from "../../../components/Alert";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import PageHeader from "../../../components/PageHeader";
import useAuth from "../../auth/useAuth";
import useTaskList from "../../tasks/hooks/useTaskList";
import { byDueDate } from "../../tasks/task.filters";
import { groupTasks } from "../../tasks/task.utils";
import TaskDialogs from "../../tasks/components/TaskDialogs";
import TaskStats from "../../tasks/components/TaskStats";
import BoardsOverviewCard from "../components/BoardsOverviewCard";
import ProgressCard from "../components/ProgressCard";
import UpNextCard from "../components/UpNextCard";
import { UP_NEXT_LIMIT } from "../dashboard.constants";

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
};

const summary = ({ pending, overdue }) => {
  if (overdue.length) return `You have ${overdue.length} overdue task${overdue.length === 1 ? "" : "s"} to catch up on.`;
  if (pending.length) return "You're on track. Here's what's coming up.";
  return "You're all caught up.";
};

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { tasks, boards, ownedBoards, loading, error, setError, toggle, save, remove } = useTaskList();
  const [form, setForm] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const groups = useMemo(() => groupTasks(tasks), [tasks]);
  const upNext = useMemo(
    () => [...groups.overdue, ...groups.pending].sort(byDueDate).slice(0, UP_NEXT_LIMIT),
    [groups],
  );

  if (loading) return <Loader label="Loading dashboard..." />;

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div>
      <PageHeader
        eyebrow={today}
        title={`${greeting()}, ${user?.userName}`}
        subtitle={summary(groups)}
        actions={
          <>
            <Button variant="secondary" onClick={() => navigate("/tasks")}>
              View tasks
            </Button>
            <Button onClick={() => setForm({ key: Date.now(), task: null })}>
              <FiPlus /> Add task
            </Button>
          </>
        }
      />

      <Alert onDismiss={() => setError("")} className="mt-4">
        {error}
      </Alert>

      <div className="mt-6">
        <TaskStats groups={groups} showTotal />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <UpNextCard
          tasks={upNext}
          onToggle={toggle}
          onEdit={(task) => setForm({ key: Date.now(), task })}
          onDelete={setDeleting}
        />
        <div className="space-y-6">
          <ProgressCard groups={groups} />
          <BoardsOverviewCard boards={boards} />
        </div>
      </div>

      <TaskDialogs
        form={form}
        deleting={deleting}
        boards={ownedBoards}
        onSave={save}
        onDelete={remove}
        onCloseForm={() => setForm(null)}
        onCloseDelete={() => setDeleting(null)}
      />
    </div>
  );
}

export default Home;
