import { Link, useLocation, useNavigate } from "react-router-dom";
import { LuArrowRight, LuLock, LuMail } from "react-icons/lu";
import Alert from "../../../components/Alert";
import Button from "../../../components/Button";
import useZodForm from "../../../shared/hooks/useZodForm";
import { loginSchema } from "../auth.schemas";
import AuthField from "../components/AuthField";
import AuthHeading from "../components/AuthHeading";
import useAuth from "../useAuth";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { values: form, errors, formError, submitting, setField, submitWith } = useZodForm({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = submitWith({
    schema: loginSchema,
    fallback: "Unable to log in",
    action: async (data) => {
      await login(data);
      navigate(location.state?.from?.pathname || "/", { replace: true });
    },
  });

  return (
    <>
      <AuthHeading
        title="Welcome back 👋"
        subtitle="Log in to your Taskora account and continue where you left off."
      />

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <Alert>{formError}</Alert>
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
          autoFocus
        />
        <AuthField
          id="password"
          label="Password"
          icon={LuLock}
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={form.password}
          onChange={setField("password")}
          error={errors.password}
        />

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={form.rememberMe}
              onChange={setField("rememberMe")}
              className="h-4.5 w-4.5 cursor-pointer rounded accent-brand-500"
            />
            Remember me
          </label>
          <Link to="/forgot-password" className="text-sm font-medium text-brand-600 hover:underline">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" loading={submitting} className="w-full text-base">
          Log in {!submitting && <LuArrowRight size={18} />}
        </Button>
      </form>
    </>
  );
}

export default Login;
