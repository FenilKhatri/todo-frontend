import { LuCalendarDays, LuShieldCheck } from "react-icons/lu";
import AvatarUploader from "./AvatarUploader";

function ProfileSummaryCard({ profile, onUpdated }) {
  const memberSince = new Date(profile.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className="h-fit overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-xs">
      <div className="h-24 bg-linear-to-br from-brand-500 to-brand-700" />
      <div className="-mt-12 px-6 pb-6 text-center">
        <AvatarUploader profile={profile} onUpdated={onUpdated} />
        <h2 className="mt-4 text-xl font-bold">{profile.userName}</h2>
        <p className="truncate text-sm text-slate-500">{profile.email}</p>
        <div className="mt-5 space-y-2 border-t border-slate-100 pt-5 text-left text-sm">
          <p className="flex items-center gap-3 text-slate-600">
            <LuCalendarDays size={16} className="text-slate-400" /> Member since {memberSince}
          </p>
          <p className="flex items-center gap-3 text-slate-600">
            <LuShieldCheck size={16} className="text-emerald-500" /> Changes verified by OTP
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProfileSummaryCard;
