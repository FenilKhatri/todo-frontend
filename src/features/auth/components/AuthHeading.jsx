function AuthHeading({ title, subtitle }) {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-3 leading-relaxed text-slate-500">{subtitle}</p>}
    </div>
  );
}

export default AuthHeading;
