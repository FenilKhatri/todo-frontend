import { LuRotateCw, LuTimer } from "react-icons/lu";
import Button from "../../../components/Button";
import { otpMessage } from "../otp.utils";
import OtpInput from "./OtpInput";

const formatCountdown = (ms) => {
  const total = Math.max(0, Math.ceil(ms / 1000));
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
};

function OtpStatus({ otp }) {
  let message = null;
  if (otp.verifying) message = <span className="text-slate-500">Verifying code...</span>;
  else if (otp.error) message = <span className="text-red-500">{otp.error}</span>;
  else if (otp.wrong.length)
    message = <span className="text-red-500">{otpMessage(otp.wrong)} Check the code above and try again.</span>;
  else if (otp.expired) message = <span className="text-red-500">This code has expired. Send a new one.</span>;
  else if (otp.resendError) message = <span className="text-amber-600">{otp.resendError}</span>;

  return (
    <div className="mt-3 min-h-5 text-sm" aria-live="polite">
      {message}
    </div>
  );
}

function OtpVerification({ otp, intro, onBack, backLabel = "Change details", className = "" }) {
  const { challenge } = otp;

  return (
    <div className={className}>
      <div className="rounded-xl border border-brand-100 bg-brand-50/60 p-4">
        <p className="text-sm text-slate-600">
          {intro} Email delivery isn't set up yet, so here is your code:
        </p>
        <p className="mt-3 font-mono text-3xl font-bold tracking-[0.4em] text-brand-600">{challenge.otp}</p>
      </div>

      <p className="mt-6 text-sm font-semibold">Enter the OTP below</p>
      <div className="mt-3">
        <OtpInput
          key={challenge.requestId + challenge.expiresAt}
          digits={otp.digits}
          onChange={otp.changeDigits}
          wrong={otp.wrong}
          allInvalid={Boolean(otp.error)}
          disabled={otp.verifying || otp.verified || otp.expired}
          verified={otp.verified}
        />
      </div>

      <OtpStatus otp={otp} />

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
        <span className={`flex items-center gap-2 text-sm ${otp.expired ? "text-red-500" : "text-slate-500"}`}>
          <LuTimer size={16} />
          {otp.expired ? "Code expired" : `Code expires in ${formatCountdown(otp.remainingMs)}`}
        </span>
        <div className="flex gap-2">
          {onBack && (
            <Button variant="ghost" onClick={onBack} disabled={otp.verifying}>
              {backLabel}
            </Button>
          )}
          <Button
            variant="secondary"
            onClick={otp.resendOtp}
            loading={otp.resending}
            disabled={otp.verifying || otp.resendCooldown > 0}
            className="min-w-36 tabular-nums"
          >
            {!otp.resending && <LuRotateCw size={15} />}
            {otp.resendCooldown > 0 ? `Resend in ${otp.resendCooldown}s` : "Resend OTP"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
