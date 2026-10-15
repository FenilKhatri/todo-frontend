import { LuColumns2, LuHouse, LuKeyRound, LuListChecks, LuLockKeyhole, LuShieldCheck, LuUser } from "react-icons/lu";

export const PREVIEW_NAV = [
  { label: "Home", icon: LuHouse, active: true },
  { label: "Tasks", icon: LuListChecks },
  { label: "Boards", icon: LuColumns2 },
  { label: "Profile", icon: LuUser },
];

export const PREVIEW_COLUMNS = [
  { title: "Pending", cards: [["bg-violet-300", "w-3/4"], ["bg-amber-300", "w-2/3"]] },
  { title: "Overdue", cards: [["bg-red-300", "w-2/3"], ["bg-sky-300", "w-1/2"]] },
  { title: "Completed", cards: [["bg-emerald-300", "w-3/4"], ["bg-brand-300", "w-1/2"], ["bg-amber-300", "w-2/3"]] },
];

export const FORGOT_PASSWORD_STEPS = ["Email", "Verify", "New password", "Done"];

// Index of each forgot-password step in FORGOT_PASSWORD_STEPS.
export const FORGOT_STEP = { email: 0, verify: 1, reset: 2, done: 3 };

// Heading shown above each forgot-password step (the done step shows the success panel instead).
export const FORGOT_COPY = {
  email: {
    icon: LuKeyRound,
    title: "Forgot password?",
    subtitle: "Enter the email linked to your account and we'll send you a one-time code.",
  },
  verify: {
    icon: LuShieldCheck,
    title: "Verify it's you",
    subtitle: "Enter the 6-digit code to confirm you own this account.",
  },
  reset: {
    icon: LuLockKeyhole,
    title: "Set a new password",
    subtitle: "Choose a strong password you haven't used for this account before.",
  },
};
