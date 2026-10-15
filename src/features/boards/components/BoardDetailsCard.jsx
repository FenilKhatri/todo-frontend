import { FiColumns, FiEdit2, FiEye, FiLogOut, FiShare2, FiTrash2, FiUser } from "react-icons/fi";
import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";

const plural = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;

function BoardDetailsCard({ board, onShare, onEdit, onDelete, onLeave }) {
  const viewers = board.members.filter((member) => member.user).length;

  return (
    <section className="mt-6 flex flex-col gap-4 rounded-xl border border-slate-100 bg-white p-6 sm:flex-row sm:items-start">
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
        <FiColumns size={22} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold">{board.name}</h2>
          {!board.canEdit && (
            <span className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
              <FiEye size={12} /> View only
            </span>
          )}
        </div>
        {board.description && <p className="mt-0.5 text-sm text-slate-500">{board.description}</p>}
        <p className="mt-1 text-xs text-slate-400">
          {plural(board.tasks.length, "task")} · {plural(viewers, "viewer")}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {board.canEdit ? (
            <>
              <Button variant="secondary" size="sm" onClick={onShare}>
                <FiShare2 /> Share
              </Button>
              <Button variant="secondary" size="sm" onClick={onEdit}>
                <FiEdit2 /> Edit
              </Button>
              <Button variant="secondary" size="sm" onClick={onDelete}>
                <FiTrash2 /> Delete
              </Button>
            </>
          ) : (
            <Button variant="secondary" size="sm" onClick={onLeave}>
              <FiLogOut /> Leave board
            </Button>
          )}
        </div>
      </div>
      <div className="text-left text-xs text-slate-400 sm:text-right">
        <p className="flex items-center gap-1 sm:justify-end">
          <FiUser size={12} /> Owner
        </p>
        <div className="mt-1 flex items-center gap-2 sm:justify-end">
          {!board.canEdit && board.owner && <Avatar user={board.owner} size="xs" />}
          <p className="text-sm font-medium text-slate-700">{board.canEdit ? "You" : board.owner?.userName}</p>
        </div>
      </div>
    </section>
  );
}

export default BoardDetailsCard;
