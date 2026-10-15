import { NavLink } from "react-router-dom";
import Logo from "../../../components/Logo";
import UserMenu from "./UserMenu";
import { NAV_ITEMS } from "../../app.constants";

function Sidebar({ onNavigate }) {
  return (
    <div className="flex h-full flex-col px-4 py-6">
      <div className="px-2">
        <Logo />
      </div>
      <nav className="mt-8 flex-1 space-y-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? "bg-brand-50 text-brand-600" : "text-slate-600 hover:bg-slate-50 hover:text-ink"
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-slate-100 pt-4">
        <UserMenu onNavigate={onNavigate} />
      </div>
    </div>
  );
}

export default Sidebar;
