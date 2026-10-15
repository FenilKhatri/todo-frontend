function Card({ title, icon: Icon, description, action, children, className = "" }) {
  return (
    <section className={`rounded-2xl border border-slate-200/70 bg-white shadow-xs ${className}`}>
      {title && (
        <header className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon size={18} />
              </span>
            )}
            <div>
              <h2 className="font-semibold">{title}</h2>
              {description && <p className="text-xs text-slate-500">{description}</p>}
            </div>
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}

export default Card;
