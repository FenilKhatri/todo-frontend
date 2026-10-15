import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";
import Avatar from "../../../components/Avatar";
import useAuth from "../../../features/auth/useAuth";

function UserMenu({ onNavigate }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (event) => !ref.current?.contains(event.target) && setOpen(false);
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const go = (path) => {
    setOpen(false);
    onNavigate?.();
    navigate(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <div ref={ref} className="relative">
      {open && (
        <div className="absolute right-0 bottom-full left-0 mb-2 rounded-lg border border-slate-100 bg-white py-1 shadow-lg">
          <button
            type="button"
            onClick={() => go("/profile")}
            className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            <FiUser size={14} /> My profile
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-slate-50"
          >
            <FiLogOut size={14} /> Log out
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 text-left hover:bg-slate-50"
      >
        <Avatar user={user} size="sm" />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold">{user?.userName}</span>
          <span className="block truncate text-xs text-slate-500">{user?.email}</span>
        </span>
        <FiChevronDown className="text-slate-400" />
      </button>
    </div>
  );
}

export default UserMenu;
