import Logo from "../../../components/Logo";
import AppPreview from "./AppPreview";

function HandwrittenNote() {
  return (
    <div className="pointer-events-none absolute top-0 right-8 flex flex-col items-center xl:right-16" aria-hidden="true">
      <p className="-rotate-6 font-hand text-2xl leading-6 text-brand-700">
        Make progress
        <br />
        <span className="pl-6">together</span>
      </p>
      <svg width="44" height="40" viewBox="0 0 44 40" fill="none" className="mt-1 -ml-10 text-brand-700">
        <path d="M38 2C40 18 30 32 6 34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 27L5 34L13 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function AuthShowcase() {
  return (
    <div className="relative hidden overflow-hidden bg-[url('/auth-bg.png')] bg-cover bg-bottom lg:flex lg:flex-col">
      <div className="absolute inset-0 bg-linear-to-b from-white/85 via-white/40 to-transparent" />

      <div className="relative mx-auto flex w-full max-w-2xl flex-1 flex-col p-12 xl:p-16">
        <Logo size="lg" />

        <div className="mt-16 max-w-lg">
          <p className="text-xs font-semibold tracking-[0.25em] text-slate-500 uppercase">
            Plan · Organize · Achieve
          </p>
          <h1 className="mt-4 text-4xl leading-tight font-bold tracking-tight xl:text-5xl">
            Your tasks,
            <br />
            <span className="text-brand-500">beautifully</span> organized.
          </h1>
          <p className="mt-6 leading-relaxed text-slate-600">
            Turn your ideas into action. Taskora helps you stay focused, share boards with your team, and get things
            done — all in one place.
          </p>
        </div>

        <div className="relative mt-auto pt-32 pr-6">
          {/* The note sits in the top padding so it never overlaps the copy above. */}
          <HandwrittenNote />
          <AppPreview />
        </div>
      </div>
    </div>
  );
}

export default AuthShowcase;
