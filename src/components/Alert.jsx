import { ALERT_TONES } from "../shared/constants/ui.constants";


function Alert({ children, tone = "error", onDismiss, className = "" }) {
  if (!children) return null;
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={`flex justify-between gap-4 rounded-xl px-4 py-2.5 text-sm ${ALERT_TONES[tone]} ${className}`}
    >
      <span>{children}</span>
      {onDismiss && (
        <button type="button" className="shrink-0 cursor-pointer font-medium" onClick={onDismiss}>
          Dismiss
        </button>
      )}
    </p>
  );
}

export default Alert;
