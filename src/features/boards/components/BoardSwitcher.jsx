import { useEffect, useMemo, useRef, useState } from "react";
import { LuCheck, LuChevronDown, LuChevronLeft, LuChevronRight, LuEye, LuSearch } from "react-icons/lu";
import { boardColor } from "../../tasks/task.utils";

const plural = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;

function BoardOption({ board, selected, highlighted, onSelect, onHover }) {
  return (
    <li role="option" aria-selected={selected}>
      <button
        type="button"
        onClick={() => onSelect(board._id)}
        onMouseEnter={onHover}
        className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-left ${
          highlighted ? "bg-slate-100" : ""
        }`}
      >
        <span className={`h-2.5 w-2.5 shrink-0 rounded-[3px] ${boardColor(board._id)}`} />
        <span className="min-w-0 flex-1">
          <span className={`block truncate text-sm ${selected ? "font-semibold text-brand-600" : "text-ink"}`}>
            {board.name}
          </span>
          <span className="block text-xs text-slate-400">
            {plural(board.taskCount, "task")}
            {!board.canEdit && board.owner?.userName ? ` · by ${board.owner.userName}` : ""}
          </span>
        </span>
        {selected && <LuCheck size={16} className="shrink-0 text-brand-600" />}
      </button>
    </li>
  );
}

// Compact board picker: current board + searchable dropdown grouped into owned / shared,
// with previous/next buttons for stepping through boards.
function BoardSwitcher({ boards, selectedId, onSelect }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const ref = useRef(null);

  const index = boards.findIndex((board) => board._id === selectedId);
  const current = boards[index];

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return term ? boards.filter((board) => board.name.toLowerCase().includes(term)) : boards;
  }, [boards, query]);

  // Owned boards first, then shared ones; `ordered` is the keyboard navigation order.
  const groups = [
    { label: "My boards", items: filtered.filter((board) => board.canEdit) },
    { label: "Shared with me", items: filtered.filter((board) => !board.canEdit) },
  ].filter((group) => group.items.length);
  const ordered = groups.flatMap((group) => group.items);

  useEffect(() => {
    if (!open) return;
    const onClick = (event) => !ref.current?.contains(event.target) && setOpen(false);
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const toggle = () => {
    setQuery("");
    setHighlight(0);
    setOpen((value) => !value);
  };

  const select = (boardId) => {
    onSelect(boardId);
    setOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") setOpen(false);
    else if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlight((value) => Math.min(value + 1, ordered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlight((value) => Math.max(value - 1, 0));
    } else if (event.key === "Enter" && ordered[highlight]) {
      event.preventDefault();
      select(ordered[highlight]._id);
    }
  };

  if (boards.length < 2 || !current) return null;

  const step = (delta) => onSelect(boards[(index + delta + boards.length) % boards.length]._id);
  const stepButton =
    "flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-ink";

  return (
    <div className="mt-6 flex flex-wrap items-center gap-3">
      <div ref={ref} className="relative w-full sm:w-96">
        <button
          type="button"
          onClick={toggle}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="flex h-11 w-full cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-left shadow-xs hover:border-slate-300"
        >
          <span className={`h-3 w-3 shrink-0 rounded-[3px] ${boardColor(current._id)}`} />
          <span className="min-w-0 flex-1 truncate text-sm font-semibold">{current.name}</span>
          {!current.canEdit && <LuEye size={15} className="shrink-0 text-slate-400" title="Shared with you" />}
          <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
            {current.taskCount}
          </span>
          <LuChevronDown
            size={18}
            className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute top-full left-0 z-30 mt-2 w-full overflow-hidden rounded-xl border border-slate-100 bg-white shadow-xl">
            <label className="relative flex items-center border-b border-slate-100">
              <LuSearch size={16} className="pointer-events-none absolute left-4 text-slate-400" />
              <input
                autoFocus
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setHighlight(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder={`Search ${plural(boards.length, "board")}...`}
                className="h-11 w-full pr-4 pl-10 text-sm outline-none"
              />
            </label>

            <div className="max-h-80 overflow-y-auto p-2" role="listbox">
              {groups.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-slate-400">No boards match "{query.trim()}".</p>
              )}
              {groups.map((group) => (
                <div key={group.label} className="mb-1 last:mb-0">
                  <p className="px-3 pt-2 pb-1 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                    {group.label} · {group.items.length}
                  </p>
                  <ul>
                    {group.items.map((board) => {
                      const position = ordered.indexOf(board);
                      return (
                        <BoardOption
                          key={board._id}
                          board={board}
                          selected={board._id === selectedId}
                          highlighted={position === highlight}
                          onSelect={select}
                          onHover={() => setHighlight(position)}
                        />
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <button type="button" onClick={() => step(-1)} className={stepButton} aria-label="Previous board">
          <LuChevronLeft size={18} />
        </button>
        <button type="button" onClick={() => step(1)} className={stepButton} aria-label="Next board">
          <LuChevronRight size={18} />
        </button>
        <span className="ml-1 text-sm text-slate-500 tabular-nums">
          {index + 1} of {boards.length}
        </span>
      </div>
    </div>
  );
}

export default BoardSwitcher;
