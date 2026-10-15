import Button from "../../../../components/Button";
import PersonInfo from "./PersonInfo";
import RolePill from "./RolePill";

function MembersList({ members, removingId, onRemove }) {
  return (
    <div className="mt-6 space-y-2">
      {members.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-200 py-10 text-center text-sm text-slate-400">
          This board isn't shared with anyone yet.
        </p>
      ) : (
        members.map(({ user }) => (
          <div key={user._id} className="flex items-center gap-4 rounded-xl border border-slate-200/70 px-4 py-3">
            <PersonInfo user={user} />
            <RolePill />
            <Button
              variant="ghost"
              size="sm"
              loading={removingId === user._id}
              onClick={() => onRemove(user._id)}
            >
              Remove
            </Button>
          </div>
        ))
      )}
    </div>
  );
}

export default MembersList;
