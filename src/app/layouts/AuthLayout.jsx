import { Link, Outlet, useLocation } from "react-router-dom";
import { LuShieldCheck } from "react-icons/lu";
import Logo from "../../components/Logo";
import AuthShowcase from "../../features/auth/components/AuthShowcase";
import { AUTH_SWITCH_LINKS } from "../app.constants";

function AuthLayout() {
  const { pathname } = useLocation();
  const switchLink = AUTH_SWITCH_LINKS[pathname];

  return (
    <div className="min-h-screen bg-white">
      <div className="grid min-h-screen w-full lg:grid-cols-[1.05fr_1fr]">
        <AuthShowcase />

        <div className="flex flex-col px-6 py-8 sm:px-12 lg:px-16 lg:py-12">
          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <div className="lg:hidden">
              <Logo />
            </div>
            {switchLink && (
              <p className="text-sm text-slate-500">
                <span className="hidden sm:inline">{switchLink.text} </span>
                <Link to={switchLink.to} className="ml-2 font-semibold text-brand-600 hover:underline">
                  {switchLink.label}
                </Link>
              </p>
            )}
          </div>

          <div className="flex flex-1 items-center py-10">
            <div className="mx-auto w-full max-w-md">
              <Outlet />
            </div>
          </div>

          <p className="mx-auto flex w-full max-w-md items-start gap-3 text-xs leading-relaxed text-slate-500">
            <LuShieldCheck size={20} className="shrink-0 text-brand-400" />
            Your data is safe with us. Passwords are hashed before they're stored and sessions use http-only cookies.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
