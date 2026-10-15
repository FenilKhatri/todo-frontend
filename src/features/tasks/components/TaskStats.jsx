import StatCard from "../../../components/StatCard";
import { TASK_STATS } from "../task.constants";

function StatIcon({ icon: Icon, iconSize, badge }) {
  if (!badge) return <Icon size={iconSize} />;
  return (
    <span className={`flex h-7 w-7 items-center justify-center rounded-full ${badge}`}>
      <Icon size={iconSize} strokeWidth={3} />
    </span>
  );
}

function TaskStats({ groups, showTotal = false }) {
  const counts = {
    total: groups.pending.length + groups.overdue.length + groups.completed.length,
    pending: groups.pending.length,
    overdue: groups.overdue.length,
    completed: groups.completed.length,
  };
  const stats = showTotal ? TASK_STATS : TASK_STATS.filter((stat) => stat.key !== "total");

  return (
    <div className={`grid grid-cols-1 gap-4 ${showTotal ? "sm:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3"}`}>
      {stats.map(({ key, label, hint, iconClass, ...icon }) => (
        <StatCard
          key={key}
          label={label}
          hint={hint}
          iconClass={iconClass}
          icon={<StatIcon {...icon} />}
          value={counts[key]}
        />
      ))}
    </div>
  );
}

export default TaskStats;
