import { Link, Navigate, useParams } from "react-router-dom";
import { LuArrowLeft, LuLayoutDashboard } from "react-icons/lu";
import OtpVerification from "../../otp/components/OtpVerification";
import StepIndicator from "../../otp/components/StepIndicator";
import SuccessModal from "../../otp/components/SuccessModal";
import useCredentialChange from "../hooks/useCredentialChange";
import DetailsStep from "../components/change/DetailsStep";
import SecurityTipsPanel from "../components/change/SecurityTipsPanel";
import { CHANGE_STEPS, CREDENTIAL_CONFIG } from "../profile.constants";

function ChangeCredential() {
  const { type } = useParams();
  const flow = useCredentialChange(type);
  const config = CREDENTIAL_CONFIG[type];

  if (!config) return <Navigate to="/profile" replace />;

  const Icon = config.icon;
  const intro =
    type === "email" ? (
      <>
        A verification code for <span className="font-semibold text-ink">{flow.form.values.email}</span> is ready.
      </>
    ) : (
      "A verification code for your password change is ready."
    );

  return (
    <div>
      <Link to="/profile" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-ink">
        <LuArrowLeft size={16} /> Back to profile
      </Link>

      <div className="mt-4 grid gap-8 rounded-2xl border border-slate-200/70 bg-white p-6 shadow-xs sm:p-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <div className="flex gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
              <Icon size={28} />
            </span>
            <div>
              <h1 className="text-2xl font-bold">{config.title}</h1>
              <p className="mt-1 text-sm text-slate-500">{config.subtitle}</p>
            </div>
          </div>

          <StepIndicator steps={CHANGE_STEPS} current={flow.step} />

          {flow.otp.challenge ? (
            <OtpVerification otp={flow.otp} intro={intro} onBack={flow.otp.clear} className="mt-8 max-w-lg" />
          ) : (
            <DetailsStep type={type} flow={flow} />
          )}
        </div>

        <SecurityTipsPanel type={type} />
      </div>

      {flow.result && (
        <SuccessModal
          title={config.success}
          message={config.message(flow.result)}
          redirectTo="/"
          redirectLabel="Go to dashboard"
          redirectIcon={LuLayoutDashboard}
        />
      )}
    </div>
  );
}

export default ChangeCredential;
