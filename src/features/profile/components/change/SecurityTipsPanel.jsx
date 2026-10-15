import { FiCheck } from "react-icons/fi";
import { LuShieldCheck } from "react-icons/lu";
import { SECURITY_TIPS } from "../../profile.constants";

function SecurityTipsPanel({ type }) {
  return (
    <aside className="hidden rounded-2xl bg-slate-50 p-6 lg:block">
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/30">
        <LuShieldCheck size={24} />
      </span>
      <h2 className="mt-5 text-lg font-semibold">Keeping your account safe</h2>
      <p className="mt-1 text-sm text-slate-500">
        Changes to your {type} only apply after you confirm them with a one-time code.
      </p>
      <ul className="mt-6 space-y-4 text-sm text-slate-600">
        {SECURITY_TIPS.map((tip) => (
          <li key={tip} className="flex gap-3">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <FiCheck size={12} strokeWidth={3} />
            </span>
            {tip}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default SecurityTipsPanel;
