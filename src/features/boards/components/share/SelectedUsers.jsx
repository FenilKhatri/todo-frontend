import { FiX } from "react-icons/fi";
import PersonInfo from "./PersonInfo";
import RolePill from "./RolePill";

function SelectedUsers({ users, onRemove, onClear }) {
  if (!users.length) return null;
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Selected Users ({users.length})</p>
        <button
          type="button"
          onClick={onClear}
          className="cursor-pointer text-sm font-medium text-brand-600 hover:underline"
        >
          Clear all
        </button>
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {users.map((user) => (
          <div
            key={user._id}
            className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-slate-50/60 px-4 py-3"
          >
            <PersonInfo user={user} avatarSize="sm" />
            <RolePill tone="brand" />
            <button
              type="button"
              onClick={() => onRemove(user)}
              aria-label={`Remove ${user.userName}`}
              className="cursor-pointer text-slate-400 hover:text-slate-600"
            >
              <FiX size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectedUsers;
