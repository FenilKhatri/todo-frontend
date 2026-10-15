import { useState } from "react";
import useZodForm from "../../../shared/hooks/useZodForm";
import useOtpChallenge from "../../otp/hooks/useOtpChallenge";
import { requestPasswordReset, resendPasswordResetOtp, resetPassword, verifyPasswordResetOtp } from "../auth.api";
import { forgotPasswordSchema, resetPasswordSchema } from "../auth.schemas";

// Forgot-password flow: email -> OTP -> new password -> done.
export default function useForgotPassword() {
  const emailForm = useZodForm({ email: "" });
  const passwordForm = useZodForm({ password: "", confirmPassword: "" });
  const [resetToken, setResetToken] = useState(null);
  const [done, setDone] = useState(false);

  const otp = useOtpChallenge({
    resend: async (challenge) => ({ ...(await resendPasswordResetOtp(challenge.requestId)), email: challenge.email }),
    verify: (challenge, code) => verifyPasswordResetOtp(challenge.requestId, code),
    onVerified: (response) => setResetToken(response.resetToken),
  });

  const sendOtp = emailForm.submitWith({
    schema: forgotPasswordSchema,
    fallback: "Unable to send verification code",
    action: async ({ email }) => otp.start(await requestPasswordReset(email)),
  });

  const savePassword = passwordForm.submitWith({
    schema: resetPasswordSchema,
    fallback: "Unable to reset your password",
    action: async (data) => {
      await resetPassword(otp.challenge.requestId, { resetToken, ...data });
      setDone(true);
    },
  });

  const startOver = () => {
    otp.clear();
    setResetToken(null);
  };

  const step = done ? "done" : resetToken ? "reset" : otp.challenge ? "verify" : "email";

  return { step, emailForm, passwordForm, otp, sendOtp, savePassword, startOver };
}
