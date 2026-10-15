import { FiCheck } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { AsideFeature } from "../../../../components/ModalShell";
import { SHARE_FEATURES } from "../../board.constants";

function Illustration() {
  return (
    <div className="relative mx-auto h-36 w-56">
      <svg className="absolute inset-0 h-full w-full text-brand-100" viewBox="0 0 224 144" fill="none">
        <path
          d="M112 30 L40 92 M112 30 L184 92 M40 92 L112 100 L184 92"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </svg>
      <span className="absolute top-2 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-sky-100 text-lg font-semibold text-sky-700 ring-4 ring-white">
        A
      </span>
      <span className="absolute top-16 left-2 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-lg font-semibold text-pink-700 ring-4 ring-white">
        S
      </span>
      <span className="absolute top-16 right-2 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-semibold text-emerald-700 ring-4 ring-white">
        R
      </span>
      <span className="absolute top-18 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-lg ring-4 ring-brand-50">
        <FiCheck size={26} strokeWidth={3} />
      </span>
    </div>
  );
}

function ShareInfoPanel() {
  return (
    <aside className="hidden rounded-2xl bg-slate-50 p-6 lg:block">
      <Illustration />

      <h3 className="mt-8 text-lg font-semibold">Collaborate Better</h3>
      <p className="mt-1 text-sm text-slate-500">
        Share your board with team members and keep everyone on the same page.
      </p>

      <ul className="mt-6 space-y-5">
        {SHARE_FEATURES.map((feature) => (
          <AsideFeature key={feature.title} {...feature} />
        ))}
      </ul>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <p className="text-sm font-medium text-slate-700">Default Access</p>
        <div className="mt-3 flex items-center gap-3">
          <LuEye size={17} className="text-slate-600" />
          <div className="flex-1">
            <p className="text-sm">Viewers</p>
            <p className="text-xs text-slate-500">Can view the board and its tasks</p>
          </div>
          <span className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-600">Default</span>
        </div>
      </div>
    </aside>
  );
}

export default ShareInfoPanel;
