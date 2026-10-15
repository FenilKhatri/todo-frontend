import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FieldLabel, shellInputClass } from "./ModalShell";

function PasswordField({ id, label, value, onChange, error, autoComplete, autoFocus }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative flex items-center">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          aria-invalid={Boolean(error)}
          className={`${shellInputClass} h-12 pr-12 ${error ? "border-red-400" : ""}`}
        />
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 cursor-pointer rounded-md p-1.5 text-slate-400 hover:text-slate-600"
        >
          {visible ? <LuEyeOff size={18} /> : <LuEye size={18} />}
        </button>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default PasswordField;
