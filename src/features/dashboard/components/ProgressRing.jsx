import { RING_CIRCUMFERENCE, RING_RADIUS } from "../dashboard.constants";


function ProgressRing({ percent }) {
  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={RING_RADIUS} fill="none" strokeWidth="12" className="stroke-slate-100" />
        <circle
          cx="60"
          cy="60"
          r={RING_RADIUS}
          fill="none"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={RING_CIRCUMFERENCE * (1 - percent / 100)}
          className="stroke-emerald-500 transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">{percent}%</span>
        <span className="text-xs text-slate-500">completed</span>
      </div>
    </div>
  );
}

export default ProgressRing;
