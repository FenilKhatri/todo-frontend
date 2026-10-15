import { useEffect } from "react";
import { FiX } from "react-icons/fi";

// Large two-column dialog: form on the left, optional info panel (`aside`) on the right.
function ModalShell({ icon: Icon, title, subtitle, aside, footer, onClose, children }) {
  useEffect(() => {
    const onKey = (event) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-[2px]">
      <div className="absolute inset-0" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`relative flex max-h-[92vh] w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ${
          aside ? "max-w-5xl" : "max-w-2xl"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 cursor-pointer rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
        >
          <FiX size={20} />
        </button>

        <div
          className={`grid flex-1 gap-8 overflow-y-auto p-6 sm:p-8 ${
            aside ? "lg:grid-cols-[minmax(0,1fr)_340px]" : ""
          }`}
        >
          <div className="min-w-0">
            <div className="flex gap-4 pr-8">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon size={28} />
              </span>
              <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
              </div>
            </div>
            <div className="mt-7">{children}</div>
          </div>
          {aside && <aside className="hidden rounded-2xl bg-slate-50 p-6 lg:block">{aside}</aside>}
        </div>

        {footer && (
          <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4 sm:px-8">{footer}</div>
        )}
      </div>
    </div>
  );
}

export function FieldLabel({ children, hint, htmlFor }) {
  return (
    <div className="mb-2 flex items-baseline justify-between">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-slate-800">
        {children}
      </label>
      {hint && <span className="text-xs text-slate-400">{hint}</span>}
    </div>
  );
}

export const shellInputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-ink placeholder:text-slate-400 outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-100";

export function AsideFeature({ icon: Icon, title, text }) {
  return (
    <li className="flex gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <Icon size={18} />
      </span>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{text}</p>
      </div>
    </li>
  );
}

export default ModalShell;
