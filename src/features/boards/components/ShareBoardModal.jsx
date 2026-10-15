import { useEffect, useMemo, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { LuLock, LuSearch, LuSend, LuUsers } from "react-icons/lu";
import Alert from "../../../components/Alert";
import Button from "../../../components/Button";
import { getErrorMessage } from "../../../shared/lib/axios";
import { removeBoardMember, shareBoard } from "../board.api";
import useUserSearch from "../hooks/useUserSearch";
import MembersList from "./share/MembersList";
import PeopleResults from "./share/PeopleResults";
import SelectedUsers from "./share/SelectedUsers";
import ShareInfoPanel from "./share/ShareInfoPanel";

function ShareBoardModal({ board, onUpdated, onClose }) {
  const [tab, setTab] = useState("invite");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState([]);
  const [sharing, setSharing] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const searchRef = useRef(null);
  const search = useUserSearch(query, board._id);

  const members = board.members.filter((member) => member.user);
  const memberIds = useMemo(() => new Set(members.map(({ user }) => user._id)), [members]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setTab("invite");
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isSelected = (user) => selected.some((item) => item._id === user._id);
  const toggle = (user) =>
    setSelected((list) => (isSelected(user) ? list.filter((item) => item._id !== user._id) : [...list, user]));

  const handleShare = async () => {
    setError("");
    setNotice("");
    setSharing(true);
    const failed = [];
    let latest = null;

    for (const user of selected) {
      try {
        latest = await shareBoard(board._id, user.email);
      } catch (err) {
        failed.push({ user, message: getErrorMessage(err, "Unable to share") });
      }
    }

    if (latest) onUpdated(latest);
    setSharing(false);

    if (failed.length) {
      setSelected(failed.map((item) => item.user));
      setError(failed.map(({ user, message }) => `${user.userName}: ${message}`).join(" · "));
    } else {
      setSelected([]);
      setQuery("");
      setNotice(`Board shared with ${selected.length} ${selected.length === 1 ? "person" : "people"}.`);
      setTab("access");
    }
  };

  const handleRemove = async (memberId) => {
    setError("");
    setRemovingId(memberId);
    try {
      onUpdated(await removeBoardMember(board._id, memberId));
    } catch (err) {
      setError(getErrorMessage(err, "Unable to remove access"));
    } finally {
      setRemovingId(null);
    }
  };

  const tabs = [
    { id: "invite", label: "Invite People" },
    { id: "access", label: `People with access (${members.length})` },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-[2px]">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 cursor-pointer rounded-md p-1.5 text-slate-500 hover:bg-slate-100"
        >
          <FiX size={20} />
        </button>

        <div className="grid flex-1 gap-8 overflow-y-auto p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="min-w-0">
            <div className="flex gap-4 pr-8">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <LuUsers size={28} />
              </span>
              <div>
                <h2 className="text-2xl font-bold">Share Board</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Give people view-only access to <span className="font-medium text-ink">{board.name}</span> and
                  its tasks.
                </p>
              </div>
            </div>

            <div className="mt-6 flex border-b border-slate-200">
              {tabs.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`-mb-px cursor-pointer border-b-2 px-5 py-3 text-sm font-medium ${
                    tab === id ? "border-brand-500 text-ink" : "border-transparent text-slate-500 hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <Alert className="mt-4">{error || search.error}</Alert>
            <Alert tone="success" className="mt-4">
              {notice}
            </Alert>

            {tab === "invite" ? (
              <>
                <label className="relative mt-6 flex items-center">
                  <LuSearch className="pointer-events-none absolute left-4 text-slate-400" size={18} />
                  <input
                    ref={searchRef}
                    autoFocus
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by name or email..."
                    className="h-12 w-full rounded-xl border border-slate-200 pr-24 pl-11 text-sm outline-none focus:border-brand-500 focus:ring-3 focus:ring-brand-100"
                  />
                  <kbd className="pointer-events-none absolute right-3 hidden rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-sans text-xs text-slate-500 sm:block">
                    Ctrl K
                  </kbd>
                </label>
                <SelectedUsers users={selected} onRemove={toggle} onClear={() => setSelected([])} />
                <PeopleResults search={search} memberIds={memberIds} isSelected={isSelected} onToggle={toggle} />
              </>
            ) : (
              <MembersList members={members} removingId={removingId} onRemove={handleRemove} />
            )}

            <p className="mt-6 flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3 text-xs text-slate-500">
              <LuLock size={14} className="mt-0.5 shrink-0" />
              Only people with access can view this board. You can remove access at any time.
            </p>
          </div>

          <ShareInfoPanel />
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4 sm:px-8">
          <Button variant="secondary" onClick={onClose} size="lg">
            Cancel
          </Button>
          <Button onClick={handleShare} loading={sharing} disabled={!selected.length} size="lg">
            {!sharing && <LuSend size={16} />} Share Board{selected.length ? ` (${selected.length})` : ""}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ShareBoardModal;
