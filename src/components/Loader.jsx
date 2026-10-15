function Loader({ fullScreen = false, label = "Loading..." }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-sm text-slate-500 ${
        fullScreen ? "min-h-screen" : "py-16"
      }`}
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-100 border-t-brand-500" />
      {label}
    </div>
  );
}

export default Loader;
