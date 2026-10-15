import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import Sidebar from "./components/Sidebar";

function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 hidden w-60 border-r border-slate-100 bg-white lg:block">
        <Sidebar />
      </aside>

      <div className={`fixed inset-0 z-40 lg:hidden ${mobileOpen ? "" : "pointer-events-none"}`} aria-hidden={!mobileOpen}>
        <div
          className={`absolute inset-0 bg-slate-900/40 transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0"}`}
          onClick={closeMobile}
        />
        <aside
          inert={!mobileOpen}
          className={`relative h-full w-64 bg-white transition duration-300 ease-out ${
            mobileOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
          }`}
        >
          <button
            type="button"
            onClick={closeMobile}
            className="absolute top-4 right-3 cursor-pointer rounded-md p-1 text-slate-400 hover:bg-slate-100"
            aria-label="Close menu"
          >
            <FiX size={18} />
          </button>
          <Sidebar onNavigate={closeMobile} />
        </aside>
      </div>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-100 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="cursor-pointer rounded-md p-1.5 text-slate-600 hover:bg-slate-100"
            aria-label="Open menu"
          >
            <FiMenu size={20} />
          </button>
          <span className="font-bold">Taskora</span>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
