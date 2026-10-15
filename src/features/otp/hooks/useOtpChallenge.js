import { useEffect, useRef, useState } from "react";
import { getErrorMessage } from "../../../shared/lib/axios";
import { OTP_LENGTH, RESEND_COOLDOWN_SECONDS } from "../otp.constants";
import { otpSchema } from "../otp.schemas";
import { wrongDigits } from "../otp.utils";

const emptyDigits = () => Array(OTP_LENGTH).fill("");


export default function useOtpChallenge({ resend, verify, onVerified }) {
  const [challenge, setChallenge] = useState(null);
  const [digits, setDigits] = useState(emptyDigits);
  const [error, setError] = useState("");
  const [resendError, setResendError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [verified, setVerified] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [resendAvailableAt, setResendAvailableAt] = useState(0);

  const callbacks = useRef({ resend, verify, onVerified });
  useEffect(() => {
    callbacks.current = { resend, verify, onVerified };
  });

  useEffect(() => {
    if (!challenge || verified) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [challenge, verified]);

  const start = (next) => {
    setChallenge(next);
    setDigits(emptyDigits());
    setError("");
    setResendError("");
    setVerified(false);
    setNow(Date.now());
    setResendAvailableAt(Date.now() + RESEND_COOLDOWN_SECONDS * 1000);
  };

  const submit = async (otp) => {
    if (!otpSchema.safeParse(otp).success) return;
    setVerifying(true);
    setError("");
    try {
      const result = await callbacks.current.verify(challenge, otp);
      setVerified(true);
      callbacks.current.onVerified?.(result);
    } catch (err) {
      setError(getErrorMessage(err, "Verification failed"));
    } finally {
      setVerifying(false);
    }
  };

  const changeDigits = (next) => {
    setDigits(next);
    setError("");
    setResendError("");
    if (next.every(Boolean) && wrongDigits(next, challenge.otp).length === 0) submit(next.join(""));
  };

  const resendCooldown = Math.max(0, Math.ceil((resendAvailableAt - now) / 1000));

  const resendOtp = async () => {
    if (resending || resendCooldown > 0) return;
    setResendError("");
    setResending(true);
    try {
      start(await callbacks.current.resend(challenge));
    } catch (err) {
      setResendError(getErrorMessage(err, "Unable to resend code"));
    } finally {
      setResending(false);
    }
  };

  const expiresAt = challenge ? new Date(challenge.expiresAt).getTime() : 0;

  return {
    challenge,
    digits,
    wrong: challenge ? wrongDigits(digits, challenge.otp) : [],
    expired: Boolean(challenge) && expiresAt <= now,
    remainingMs: challenge ? expiresAt - now : 0,
    error,
    resendError,
    verifying,
    resending,
    resendCooldown,
    verified,
    start,
    clear: () => setChallenge(null),
    changeDigits,
    resendOtp,
  };
}
