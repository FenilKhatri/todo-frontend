import { FiCheck } from "react-icons/fi";
import { PASSWORD_RULES } from "../shared/constants/ui.constants";

function PasswordRules({ password }) {
  return (
    <ul className="grid gap-1.5 sm:grid-cols-2">
      {PASSWORD_RULES.map((rule) => {
        const ok = rule.test(password.trim());
        return (
          <li
            key={rule.label}
            className={`flex items-center gap-2 text-xs ${ok ? "text-emerald-600" : "text-slate-400"}`}
          >
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full ${
                ok ? "bg-emerald-500 text-white" : "border border-slate-300"
              }`}
            >
              {ok && <FiCheck size={10} strokeWidth={4} />}
            </span>
            {rule.label}
          </li>
        );
      })}
    </ul>
  );
}

export default PasswordRules;
