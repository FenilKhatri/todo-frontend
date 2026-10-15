import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

function AuthField({ id, label, icon: Icon, type = "text", error, hint, ...props }) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-slate-800">
        {label}
      </label>
      <div className="relative flex items-center">
        {Icon && <Icon size={18} className="pointer-events-none absolute left-4 text-slate-400" />}
        <input
          id={id}
          type={isPassword && visible ? "text" : type}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-12 w-full rounded-xl border bg-white text-sm text-ink placeholder:text-slate-400 outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-100 ${
            Icon ? "pl-11" : "pl-4"
          } ${isPassword ? "pr-12" : "pr-4"} ${error ? "border-red-400" : "border-slate-200"}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute right-3 cursor-pointer rounded-md p-1.5 text-slate-400 hover:text-slate-600"
          >
            {visible ? <LuEyeOff size={18} /> : <LuEye size={18} />}
          </button>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs text-slate-400">{hint}</p>
      )}
    </div>
  );
}

export default AuthField;
