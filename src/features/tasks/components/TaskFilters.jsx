import SearchInput from "../../../components/SearchInput";
import SelectField from "../../../components/SelectField";
import { TASK_VIEWS } from "../task.constants";

function TaskFilters({ filters, onChange, boards, view, onViewChange }) {
  const set = (field) => (value) => onChange({ ...filters, [field]: value });

  return (
    <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-4">
      <SearchInput value={filters.search} onChange={set("search")} className="w-full sm:w-56" />
      <SelectField value={filters.board} onChange={set("board")} className="w-[calc(50%-6px)] sm:w-40">
        <option value="all">All boards</option>
        <option value="none">General</option>
        {boards.map((board) => (
          <option key={board._id} value={board._id}>
            {board.name}
          </option>
        ))}
      </SelectField>
      <SelectField value={filters.priority} onChange={set("priority")} className="w-[calc(50%-6px)] sm:w-40">
        <option value="all">All priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </SelectField>
      <SelectField value={filters.due} onChange={set("due")} className="w-[calc(50%-6px)] sm:w-40">
        <option value="all">All due dates</option>
        <option value="overdue">Overdue</option>
        <option value="today">Due today</option>
        <option value="week">Due this week</option>
        <option value="none">No due date</option>
      </SelectField>
      <SelectField value={filters.sortBy} onChange={set("sortBy")} className="w-[calc(50%-6px)] sm:w-40">
        <option value="manual">Custom order</option>
        <option value="dueDate">Due date</option>
        <option value="priority">Priority</option>
        <option value="newest">Newest</option>
        <option value="title">Title</option>
      </SelectField>

      <div className="ml-auto flex gap-1">
        {TASK_VIEWS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => onViewChange(id)}
            className={`flex h-10 cursor-pointer items-center gap-2 rounded-lg border px-3.5 text-sm font-medium ${view === id
                ? "border-brand-100 bg-brand-50 text-brand-600"
                : "border-slate-200 text-slate-600 hover:text-ink"
              }`}
          >
            <Icon size={16} /> {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskFilters;
