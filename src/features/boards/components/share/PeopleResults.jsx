import { LuUserCheck } from "react-icons/lu";
import PersonInfo from "./PersonInfo";
import RolePill from "./RolePill";

const Placeholder = ({ children }) => (
  <p className="rounded-xl border border-dashed border-slate-200 py-8 text-center text-sm text-slate-400">
    {children}
  </p>
);

function PersonRow({ user, hasAccess, selected, onToggle }) {
  return (
    <label
      className={`flex items-center gap-4 rounded-xl border px-4 py-3 ${
        hasAccess ? "border-slate-100 opacity-60" : "cursor-pointer border-slate-200/70 hover:bg-slate-50"
      }`}
    >
      <input
        type="checkbox"
        checked={selected || hasAccess}
        disabled={hasAccess}
        onChange={() => onToggle(user)}
        className="h-4.5 w-4.5 cursor-pointer accent-brand-500"
      />
      <PersonInfo user={user} />
      {hasAccess ? (
        <span className="flex items-center gap-1 text-xs text-emerald-600">
          <LuUserCheck size={14} /> Has access
        </span>
      ) : (
        <RolePill />
      )}
    </label>
  );
}

// Suggested people (empty search) or search results, each with a checkbox; existing members are locked.
function PeopleResults({ search, memberIds, isSelected, onToggle }) {
  const { mode, term, results, loading, minLength } = search;

  let content;
  if (mode === "typing") content = <Placeholder>Type at least {minLength} characters to search.</Placeholder>;
  else if (loading) content = <p className="py-8 text-center text-sm text-slate-400">Loading people...</p>;
  else if (!results.length)
    content = (
      <Placeholder>
        {mode === "search" ? `No registered users match "${term}".` : "No one else to suggest yet. Search by email."}
      </Placeholder>
    );
  else
    content = results.map((user) => (
      <PersonRow
        key={user._id}
        user={user}
        hasAccess={memberIds.has(user._id)}
        selected={isSelected(user)}
        onToggle={onToggle}
      />
    ));

  return (
    <>
      <div className="mt-6 flex items-baseline justify-between">
        <p className="text-sm font-semibold">{mode === "search" ? "Search results" : "Suggested people"}</p>
        {mode !== "search" && <p className="text-xs text-slate-400">Type a name or email to find others</p>}
      </div>
      <div className="mt-3 space-y-2">{content}</div>
    </>
  );
}

export default PeopleResults;
