import { useMemo, useState } from "react";
import { FiPlus } from "react-icons/fi";
import Alert from "../../../components/Alert";
import Button from "../../../components/Button";
import Loader from "../../../components/Loader";
import PageHeader from "../../../components/PageHeader";
import SearchInput from "../../../components/SearchInput";
import useTaskList from "../hooks/useTaskList";
import { filterAndGroupTasks } from "../task.filters";
import { groupTasks } from "../task.utils";
import TaskBoardView from "../components/TaskBoardView";
import TaskDialogs from "../components/TaskDialogs";
import TaskFilters from "../components/TaskFilters";
import TaskListView from "../components/TaskListView";
import TaskStats from "../components/TaskStats";
import { DEFAULT_FILTERS } from "../task.constants";

function Tasks() {
  const { tasks, boards, ownedBoards, loading, error, setError, toggle, save, remove } = useTaskList();
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [view, setView] = useState("list");
  const [form, setForm] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const allGroups = useMemo(() => groupTasks(tasks), [tasks]);
  const visibleGroups = useMemo(() => filterAndGroupTasks(tasks, filters), [tasks, filters]);

  const openCreate = (group) =>
    setForm({
      key: Date.now(),
      task: null,
      defaults: { status: group === "completed" ? "completed" : "todo" },
    });
  const openEdit = (task) => setForm({ key: Date.now(), task });

  if (loading) return <Loader label="Loading tasks..." />;

  const viewProps = { groups: visibleGroups, onToggle: toggle, onEdit: openEdit, onDelete: setDeleting };

  return (
    <div>
      <PageHeader
        title="Tasks"
        subtitle="Stay on top of your work."
        actions={
          <>
            <SearchInput
              value={filters.search}
              onChange={(search) => setFilters({ ...filters, search })}
              className="flex-1 sm:w-72 sm:flex-none"
            />
            <Button onClick={() => openCreate("pending")}>
              <FiPlus /> <span className="hidden sm:inline">Add task</span>
            </Button>
          </>
        }
      />

      <Alert onDismiss={() => setError("")} className="mt-4">
        {error}
      </Alert>

      <div className="mt-6">
        <TaskStats groups={allGroups} />
      </div>

      <div className="mt-6 rounded-xl border border-slate-200/70 bg-white shadow-xs">
        <TaskFilters
          filters={filters}
          onChange={setFilters}
          boards={boards}
          view={view}
          onViewChange={setView}
        />
        {view === "list" ? (
          <TaskListView {...viewProps} />
        ) : (
          <TaskBoardView {...viewProps} onAdd={openCreate} className="p-4" />
        )}
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

export default Tasks;
