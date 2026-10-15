import Avatar from "../../../../components/Avatar";

function PersonInfo({ user, avatarSize = "md" }) {
  return (
    <>
      <Avatar user={user} size={avatarSize} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{user.userName}</p>
        <p className="truncate text-xs text-slate-500">{user.email}</p>
      </div>
    </>
  );
}

export default PersonInfo;
