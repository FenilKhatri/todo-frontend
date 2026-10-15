function SegmentedControl({ options, value, onChange }) {
  return (
    <div className="grid grid-flow-col gap-2">
      {options.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            aria-pressed={active}
            className={`flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 text-sm font-medium transition ${
              active
                ? option.active || "border-brand-500 bg-brand-50 text-brand-700"
                : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {option.dot && <span className={`h-2 w-2 rounded-full ${option.dot}`} />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
