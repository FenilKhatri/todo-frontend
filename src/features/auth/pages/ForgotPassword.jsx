import { LuLogIn } from "react-icons/lu";
import OtpVerification from "../../otp/components/OtpVerification";
import StepIndicator from "../../otp/components/StepIndicator";
import SuccessPanel from "../../otp/components/SuccessPanel";
import { FORGOT_COPY, FORGOT_PASSWORD_STEPS, FORGOT_STEP } from "../auth.constants";
import AuthHeading from "../components/AuthHeading";
import ForgotEmailStep from "../components/forgot/ForgotEmailStep";
import ResetPasswordStep from "../components/forgot/ResetPasswordStep";
import useForgotPassword from "../hooks/useForgotPassword";

function ForgotPassword() {
  const flow = useForgotPassword();
  const { step, otp } = flow;
  const copy = FORGOT_COPY[step];

  return (
    <>
      <StepIndicator steps={FORGOT_PASSWORD_STEPS} current={FORGOT_STEP[step]} className="mb-10" />

      {copy && (
        <div className="mb-8">
          <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
            <copy.icon size={26} />
          </span>
          <AuthHeading title={copy.title} subtitle={copy.subtitle} />
        </div>
      )}

      {step === "email" && <ForgotEmailStep form={flow.emailForm} onSubmit={flow.sendOtp} />}

      {step === "verify" && (
        <OtpVerification
          otp={otp}
          intro={
            <>
              A reset code for <span className="font-semibold text-ink">{otp.challenge.email}</span> is ready.
            </>
          }
          onBack={flow.startOver}
          backLabel="Use a different email"
        />
      )}

      {step === "reset" && (
        <ResetPasswordStep form={flow.passwordForm} onSubmit={flow.savePassword} onStartOver={flow.startOver} />
      )}

      {step === "done" && (
        <SuccessPanel
          title="Password reset"
          message="Your password has been changed. Log in with your new password."
          redirectTo="/login"
          redirectLabel="Go to login"
          redirectIcon={LuLogIn}
        />
      )}
    </>
  );
}

export default ForgotPassword;
