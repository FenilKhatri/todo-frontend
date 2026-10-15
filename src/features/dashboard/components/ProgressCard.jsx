import Card from "../../../components/Card";
import ProgressRing from "./ProgressRing";
import { PRIORITY_META } from "../../tasks/task.constants";
import { PRIORITY_BAR } from "../dashboard.constants";

function ProgressCard({ groups }) {
  const total = groups.pending.length + groups.overdue.length + groups.completed.length;
  const percent = total ? Math.round((groups.completed.length / total) * 100) : 0;
  const open = [...groups.pending, ...groups.overdue];

  const legend = [
    { label: "Completed", value: groups.completed.length, dot: "bg-emerald-500" },
    { label: "Pending", value: groups.pending.length, dot: "bg-brand-500" },
    { label: "Overdue", value: groups.overdue.length, dot: "bg-red-500" },
  ];

  return (
    <Card title="Progress">
      <div className="flex items-center gap-6 p-5">
        <ProgressRing percent={percent} />
        <ul className="space-y-3 text-sm">
          {legend.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${item.dot}`} />
              <span className="text-slate-500">{item.label}</span>
              <span className="font-semibold">{item.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3 border-t border-slate-100 p-5">
        <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Open tasks by priority</p>
        {["high", "medium", "low"].map((priority) => {
          const count = open.filter((task) => task.priority === priority).length;
          return (
            <div key={priority} className="flex items-center gap-3 text-sm">
              <span className="w-16 text-slate-600">{PRIORITY_META[priority].label}</span>
              <div className="h-2 flex-1 rounded-full bg-slate-100">
                <div
                  className={`h-2 rounded-full ${PRIORITY_BAR[priority]}`}
                  style={{ width: `${open.length ? (count / open.length) * 100 : 0}%` }}
                />
              </div>
              <span className="w-6 text-right font-semibold">{count}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default ProgressCard;
