import { useNavigate } from "react-router-dom";
import { LuArrowRight, LuLock, LuMail, LuUser } from "react-icons/lu";
import Alert from "../../../components/Alert";
import Button from "../../../components/Button";
import PasswordRules from "../../../components/PasswordRules";
import useZodForm from "../../../shared/hooks/useZodForm";
import { signupSchema } from "../auth.schemas";
import AuthField from "../components/AuthField";
import AuthHeading from "../components/AuthHeading";
import useAuth from "../useAuth";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { values: form, errors, formError, submitting, setField, submitWith } = useZodForm({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = submitWith({
    schema: signupSchema,
    fallback: "Unable to create account",
    action: async ({ userName, email, password }) => {
      await signup({ userName, email, password });
      navigate("/", { replace: true });
    },
  });

  return (
    <>
      <AuthHeading title="Create your account ✨" subtitle="Start organising your work in minutes. It's free." />

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <Alert>{formError}</Alert>
        <AuthField
          id="userName"
          label="Name"
          icon={LuUser}
          autoComplete="name"
          placeholder="John Doe"
          maxLength={12}
          value={form.userName}
          onChange={setField("userName")}
          error={errors.userName}
          autoFocus
        />
        <AuthField
          id="email"
          label="Email address"
          icon={LuMail}
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={setField("email")}
          error={errors.email}
        />
        <div className="space-y-3">
          <AuthField
            id="password"
            label="Password"
            icon={LuLock}
            type="password"
            autoComplete="new-password"
            placeholder="Create a password"
            maxLength={25}
            value={form.password}
            onChange={setField("password")}
            error={errors.password}
          />
          <PasswordRules password={form.password} />
        </div>
        <AuthField
          id="confirmPassword"
          label="Confirm password"
          icon={LuLock}
          type="password"
          autoComplete="new-password"
          placeholder="Repeat your password"
          value={form.confirmPassword}
          onChange={setField("confirmPassword")}
          error={errors.confirmPassword}
        />

        <Button type="submit" size="lg" loading={submitting} className="w-full text-base">
          Create account {!submitting && <LuArrowRight size={18} />}
        </Button>
      </form>
    </>
  );
}

export default Signup;
