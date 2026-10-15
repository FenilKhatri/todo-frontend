function StatCard({ icon, iconClass, label, value, hint }) {
  return (
    <div className="flex items-start gap-5 rounded-xl border border-slate-200/70 bg-white p-5 shadow-xs">
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconClass}`}>
        {icon}
      </span>
      <div>
        <p className="text-sm font-medium text-slate-700">{label}</p>
        <p className="mt-1 text-2xl leading-none font-bold">{value}</p>
        {hint && <p className="mt-2 text-xs text-slate-500">{hint}</p>}
      </div>
    </div>
  );
}

export default StatCard;
