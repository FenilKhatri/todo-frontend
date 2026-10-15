import { useState } from "react";
import { LuCircleCheck, LuColumns2, LuLayoutGrid, LuShare2, LuSquarePen, LuUser, LuUsers } from "react-icons/lu";
import Button from "../../../components/Button";
import ModalShell, { AsideFeature, FieldLabel, shellInputClass } from "../../../components/ModalShell";
import { getErrorMessage } from "../../../shared/lib/axios";

const plural = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;

// Mount with a `key` that changes per open so the form resets.
function BoardFormModal({ board, onSubmit, onClose }) {
  const [form, setForm] = useState({
    name: board?.name || "",
    description: board?.description || "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const bind = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      await onSubmit(form);
      onClose();
    } catch (err) {
      setError(getErrorMessage(err, "Unable to save board"));
    } finally {
      setSaving(false);
    }
  };

  const taskCount = board?.tasks?.length ?? board?.taskCount ?? 0;
  const viewerCount = board?.members?.filter((member) => member.user).length ?? 0;

  const aside = (
    <>
      <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">Live preview</p>
      <div className="mt-3 rounded-xl border border-slate-200/70 bg-white p-4 shadow-xs">
        <div className="flex gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
            <LuColumns2 size={18} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{form.name.trim() || "Untitled board"}</p>
            <p className="line-clamp-2 text-xs text-slate-500">
              {form.description.trim() || "No description"}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              {plural(taskCount, "task")} · {plural(viewerCount, "viewer")}
            </p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-xs text-slate-500">
          <LuUser size={13} /> Owner: <span className="font-medium text-slate-700">You</span>
        </div>
      </div>

      <ul className="mt-8 space-y-5">
        <AsideFeature
          icon={LuLayoutGrid}
          title="Organise by board"
          text="Group related tasks into Pending, Overdue and Completed columns."
        />
        <AsideFeature
          icon={LuShare2}
          title="Share view-only"
          text="Invite teammates to follow progress without changing anything."
        />
        <AsideFeature
          icon={LuUsers}
          title="Stay in sync"
          text="Everyone with access sees updates as soon as tasks change."
        />
      </ul>
    </>
  );

  return (
    <ModalShell
      icon={board ? LuSquarePen : LuLayoutGrid}
      title={board ? "Edit Board" : "Create Board"}
      subtitle={
        board ? "Rename the board or update its description." : "Give your board a name and a short description."
      }
      aside={aside}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} size="lg">
            Cancel
          </Button>
          <Button type="submit" form="board-form" loading={saving} size="lg">
            {!saving && <LuCircleCheck size={17} />}
            {board ? "Save Changes" : "Create Board"}
          </Button>
        </>
      }
    >
      <form id="board-form" onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600">{error}</p>}

        <div>
          <FieldLabel htmlFor="board-name" hint={`${form.name.length}/40`}>
            Board name
          </FieldLabel>
          <input
            id="board-name"
            className={`${shellInputClass} h-12`}
            placeholder="e.g. Marketing launch"
            minLength={3}
            maxLength={40}
            value={form.name}
            onChange={bind("name")}
            required
            autoFocus
          />
        </div>

        <div>
          <FieldLabel htmlFor="board-description" hint={`${form.description.length}/200`}>
            Description
          </FieldLabel>
          <textarea
            id="board-description"
            className={`${shellInputClass} resize-none py-3`}
            rows={4}
            maxLength={200}
            placeholder="What is this board for? (optional)"
            value={form.description}
            onChange={bind("description")}
          />
        </div>
      </form>
    </ModalShell>
  );
}

export default BoardFormModal;
