function RolePill({ tone = "neutral" }) {
  const classes = tone === "brand" ? "bg-brand-50 text-brand-600" : "bg-slate-100 text-slate-600";
  return <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${classes}`}>Viewer</span>;
}

export default RolePill;
