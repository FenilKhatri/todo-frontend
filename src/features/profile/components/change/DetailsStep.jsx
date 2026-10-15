import { useNavigate } from "react-router-dom";
import { LuSend } from "react-icons/lu";
import Alert from "../../../../components/Alert";
import Button from "../../../../components/Button";
import EmailFields from "./EmailFields";
import PasswordFields from "./PasswordFields";

function DetailsStep({ type, flow }) {
  const navigate = useNavigate();
  const { user, form, sendOtp } = flow;
  const { values, errors, formError, submitting, setField } = form;

  return (
    <form onSubmit={sendOtp} noValidate className="mt-8 max-w-lg space-y-5">
      <Alert>{formError}</Alert>

      {type === "email" ? (
        <EmailFields
          currentEmail={user?.email}
          value={values.email}
          onChange={setField("email")}
          error={errors.email}
        />
      ) : (
        <PasswordFields form={values} errors={errors} setField={setField} />
      )}

      <div className="flex gap-3 pt-2">
        <Button variant="secondary" onClick={() => navigate("/profile")} size="lg">
          Cancel
        </Button>
        <Button type="submit" loading={submitting} size="lg">
          {!submitting && <LuSend size={16} />} Send OTP
        </Button>
      </div>
    </form>
  );
}

export default DetailsStep;
