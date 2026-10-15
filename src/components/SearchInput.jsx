import { LuSearch } from "react-icons/lu";

function SearchInput({ value, onChange, placeholder = "Search tasks...", className = "" }) {
  return (
    <label className={`relative flex items-center ${className}`}>
      <LuSearch className="pointer-events-none absolute left-3 text-slate-400" size={16} />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-slate-200 bg-white pr-3 pl-9 text-sm text-slate-700 outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-100"
      />
    </label>
  );
}

export default SearchInput;
