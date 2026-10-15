import { useState } from "react";
import useZodForm from "../../../shared/hooks/useZodForm";
import useAuth from "../../auth/useAuth";
import useOtpChallenge from "../../otp/hooks/useOtpChallenge";
import { requestChange, resendChangeOtp, verifyChange } from "../profile.api";
import { EMPTY_CREDENTIAL_FORM } from "../profile.constants";
import { changeEmailSchema, changePasswordSchema } from "../profile.schemas";

const pickValues = (type) => (values) =>
  type === "email"
    ? { email: values.email }
    : {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      };

export default function useCredentialChange(type) {
  const { user, updateUser } = useAuth();
  const form = useZodForm(EMPTY_CREDENTIAL_FORM);
  const [result, setResult] = useState(null);

  const otp = useOtpChallenge({
    resend: (challenge) => resendChangeOtp(challenge.requestId),
    verify: (challenge, code) => verifyChange(challenge.requestId, code),
    onVerified: (response) => {
      updateUser((current) => ({ ...current, ...response.user }));
      setResult(response);
    },
  });

  const sendOtp = form.submitWith({
    schema: type === "email" ? changeEmailSchema(user?.email) : changePasswordSchema,
    pick: pickValues(type),
    fallback: "Unable to send verification code",
    action: async (data) => otp.start(await requestChange({ type, ...data })),
  });

  return {
    user,
    form,
    otp,
    sendOtp,
    result,
    step: result ? 2 : otp.challenge ? 1 : 0,
  };
}
