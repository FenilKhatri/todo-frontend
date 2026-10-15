import { useEffect, useRef, useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";

function Menu({ items, icon: Icon = FiMoreHorizontal, label = "More actions" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (event) => !ref.current?.contains(event.target) && setOpen(false);
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={label}
        onClick={() => setOpen((value) => !value)}
        className="cursor-pointer rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
      >
        <Icon size={16} />
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 min-w-36 rounded-lg border border-slate-100 bg-white py-1 shadow-lg">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                setOpen(false);
                item.onClick();
              }}
              className={`flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm hover:bg-slate-50 ${
                item.danger ? "text-red-500" : "text-slate-700"
              }`}
            >
              {item.icon && <item.icon size={14} />}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;
