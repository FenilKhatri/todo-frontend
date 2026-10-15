import { FieldLabel, shellInputClass } from "../../../../components/ModalShell";

function EmailFields({ currentEmail, value, onChange, error }) {
  return (
    <>
      <div>
        <FieldLabel>Current email</FieldLabel>
        <p className="flex h-12 items-center rounded-xl bg-slate-50 px-4 text-sm text-slate-500">{currentEmail}</p>
      </div>
      <div>
        <FieldLabel htmlFor="new-email">New email</FieldLabel>
        <input
          id="new-email"
          type="email"
          autoFocus
          autoComplete="email"
          placeholder="you@example.com"
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          className={`${shellInputClass} h-12 ${error ? "border-red-400" : ""}`}
        />
        {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
      </div>
    </>
  );
}

export default EmailFields;
