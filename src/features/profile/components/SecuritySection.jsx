import { useNavigate } from "react-router-dom";
import { LuChevronRight, LuKeyRound, LuMail, LuShieldCheck } from "react-icons/lu";
import Button from "../../../components/Button";
import Card from "../../../components/Card";

function SecurityRow({ icon: Icon, title, value, action, onClick }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-200/70 p-4 sm:flex-row sm:items-center">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
        <Icon size={20} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="truncate text-sm text-slate-500">{value}</p>
      </div>
      <Button variant="secondary" onClick={onClick}>
        {action} <LuChevronRight size={16} />
      </Button>
    </div>
  );
}

function SecuritySection({ email }) {
  const navigate = useNavigate();
  return (
    <Card
      title="Security"
      icon={LuShieldCheck}
      description="Email and password changes are confirmed with a one-time code."
    >
      <div className="space-y-3 p-6">
        <SecurityRow
          icon={LuMail}
          title="Email address"
          value={email}
          action="Change email"
          onClick={() => navigate("/profile/change/email")}
        />
        <SecurityRow
          icon={LuKeyRound}
          title="Password"
          value="••••••••••"
          action="Change password"
          onClick={() => navigate("/profile/change/password")}
        />
      </div>
    </Card>
  );
}

export default SecuritySection;
