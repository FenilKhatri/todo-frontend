import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck } from "react-icons/fi";
import { LuTimer, LuTimerOff } from "react-icons/lu";
import Button from "../../../components/Button";
import { REDIRECT_SECONDS } from "../otp.constants";

function SuccessPanel({ title, message, redirectTo, redirectLabel, redirectIcon: RedirectIcon }) {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(REDIRECT_SECONDS);
  const [autoRedirect, setAutoRedirect] = useState(true);

  useEffect(() => {
    if (!autoRedirect) return;
    if (seconds === 0) {
      navigate(redirectTo, { replace: true });
      return;
    }
    const timer = setTimeout(() => setSeconds((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [autoRedirect, seconds, navigate, redirectTo]);

  const progress = ((REDIRECT_SECONDS - seconds) / REDIRECT_SECONDS) * 100;

  return (
    <div className="relative text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
          <FiCheck size={30} strokeWidth={3} />
        </span>
      </div>

      <p className="mt-6 text-sm font-semibold tracking-wide text-emerald-600 uppercase">Congratulations!</p>
      <h2 id="success-title" className="mt-1 text-2xl font-bold">
        {title}
      </h2>
      <p className="mt-2 text-sm text-slate-500">{message}</p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => setAutoRedirect((value) => !value)}
          title={autoRedirect ? "Click to stay on this page" : "Click to resume auto-redirect"}
          className="relative flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          {autoRedirect && (
            <span
              className="absolute inset-y-0 left-0 bg-brand-50 transition-[width] duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          )}
          <span className="relative flex items-center gap-2">
            {autoRedirect ? (
              <>
                <LuTimer size={16} /> Redirecting in {seconds}s
              </>
            ) : (
              <>
                <LuTimerOff size={16} /> Auto-redirect paused
              </>
            )}
          </span>
        </button>
        <Button onClick={() => navigate(redirectTo, { replace: true })} size="lg" className="flex-1">
          {RedirectIcon && <RedirectIcon size={16} />} {redirectLabel}
        </Button>
      </div>
    </div>
  );
}

export default SuccessPanel;
