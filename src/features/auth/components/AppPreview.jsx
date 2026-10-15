import { FiCheck } from "react-icons/fi";
import { PREVIEW_COLUMNS, PREVIEW_NAV } from "../auth.constants";

function MiniCard({ color, width }) {
  return (
    <div className="rounded-md bg-white p-2 shadow-sm">
      <div className={`h-1.5 rounded-full ${color} ${width}`} />
      <div className="mt-1.5 h-1 w-full rounded-full bg-slate-100" />
      <div className="mt-1 h-1 w-4/5 rounded-full bg-slate-100" />
      <div className="mt-2 flex items-center justify-between">
        <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
        <span className="flex gap-0.5">
          <span className="h-1.5 w-1.5 rounded-full bg-slate-200" />
          <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />
        </span>
      </div>
    </div>
  );
}

function AppPreview() {
  return (
    <div className="perspective-[1400px]" aria-hidden="true">
      <div className="flex h-64 overflow-hidden rounded-2xl bg-white/90 shadow-2xl shadow-brand-900/25 ring-1 ring-white/60 transform-[rotateX(10deg)_rotateY(-16deg)_rotateZ(3deg)] xl:h-72">
        <div className="w-1/4 bg-ink p-3">
          <div className="flex items-center gap-1.5">
            <span className="flex h-4 w-4 items-center justify-center rounded bg-brand-500 text-white">
              <FiCheck size={10} strokeWidth={4} />
            </span>
            <span className="text-[10px] font-semibold text-white">Taskora</span>
          </div>
          <ul className="mt-4 space-y-1.5">
            {PREVIEW_NAV.map(({ label, icon: Icon, active }) => (
              <li
                key={label}
                className={`flex items-center gap-1.5 rounded px-1.5 py-1 text-[8px] ${
                  active ? "bg-brand-500 text-white" : "text-slate-400"
                }`}
              >
                <Icon size={9} /> {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex-1 bg-slate-50 p-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-slate-300" />
            <span className="h-1.5 w-24 rounded-full bg-slate-200" />
            <span className="ml-auto h-2 w-2 rounded-full bg-brand-300" />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {PREVIEW_COLUMNS.map((column) => (
              <div key={column.title} className="space-y-2 rounded-lg bg-slate-100/80 p-1.5">
                <p className="px-0.5 text-[8px] font-semibold text-slate-600">{column.title}</p>
                {column.cards.map(([color, width], index) => (
                  <MiniCard key={index} color={color} width={width} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppPreview;
