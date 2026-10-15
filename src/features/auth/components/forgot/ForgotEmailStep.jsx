import { LuMail, LuSend } from "react-icons/lu";
import Alert from "../../../../components/Alert";
import Button from "../../../../components/Button";
import AuthField from "../AuthField";

function ForgotEmailStep({ form, onSubmit }) {
  const { values, errors, formError, submitting, setField } = form;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <Alert>{formError}</Alert>
      <AuthField
        id="reset-email"
        label="Email address"
        icon={LuMail}
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={values.email}
        onChange={setField("email")}
        error={errors.email}
        autoFocus
      />
      <Button type="submit" size="lg" loading={submitting} className="w-full text-base">
        {!submitting && <LuSend size={17} />} Send OTP
      </Button>
    </form>
  );
}

export default ForgotEmailStep;
