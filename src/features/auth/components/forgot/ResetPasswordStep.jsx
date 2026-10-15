import { LuLock, LuLockKeyhole } from "react-icons/lu";
import Alert from "../../../../components/Alert";
import Button from "../../../../components/Button";
import PasswordRules from "../../../../components/PasswordRules";
import AuthField from "../AuthField";

function ResetPasswordStep({ form, onSubmit, onStartOver }) {
  const { values, errors, formError, submitting, setField } = form;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {formError && (
        <Alert>
          {formError}{" "}
          <button type="button" onClick={onStartOver} className="cursor-pointer font-semibold underline">
            Start over
          </button>
        </Alert>
      )}
      <div className="space-y-3">
        <AuthField
          id="new-password"
          label="New password"
          icon={LuLock}
          type="password"
          autoComplete="new-password"
          placeholder="Create a new password"
          maxLength={25}
          value={values.password}
          onChange={setField("password")}
          error={errors.password}
          autoFocus
        />
        <PasswordRules password={values.password} />
      </div>
      <AuthField
        id="confirm-new-password"
        label="Confirm new password"
        icon={LuLock}
        type="password"
        autoComplete="new-password"
        placeholder="Repeat your new password"
        value={values.confirmPassword}
        onChange={setField("confirmPassword")}
        error={errors.confirmPassword}
      />
      <Button type="submit" size="lg" loading={submitting} className="w-full text-base">
        {!submitting && <LuLockKeyhole size={17} />} Reset password
      </Button>
    </form>
  );
}

export default ResetPasswordStep;
