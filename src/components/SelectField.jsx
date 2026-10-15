import { LuChevronDown } from "react-icons/lu";

// Native select styled with a chevron and an optional prefix label inside it.
function SelectField({ value, onChange, children, prefix, className = "" }) {
  return (
    <label className={`relative flex items-center ${className}`}>
      {prefix && (
        <span className="pointer-events-none absolute left-3 flex items-center gap-2 text-sm text-slate-500">
          {prefix}
        </span>
      )}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`h-10 w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white pr-9 text-sm text-slate-700 outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-100 ${
          prefix ? "pl-23 font-medium text-ink" : "pl-3"
        }`}
      >
        {children}
      </select>
      <LuChevronDown className="pointer-events-none absolute right-3 text-slate-400" size={16} />
    </label>
  );
}

export default SelectField;
