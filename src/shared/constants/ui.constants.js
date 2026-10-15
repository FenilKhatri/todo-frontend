export const AVATAR_COLORS = [
  "bg-brand-500 text-white",
  "bg-emerald-600 text-white",
  "bg-violet-200 text-violet-700",
  "bg-teal-100 text-teal-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
];

export const AVATAR_SIZES = {
  xs: "h-8 w-8 text-xs",
  sm: "h-9 w-9 text-sm",
  md: "h-10 w-10 text-base",
  lg: "h-14 w-14 text-xl",
  xl: "h-24 w-24 text-3xl",
};

export const ALERT_TONES = {
  error: "bg-red-50 text-red-600",
  success: "bg-emerald-50 text-emerald-700",
};

export const PASSWORD_RULES = [
  { label: "8–25 characters", test: (value) => value.length >= 8 && value.length <= 25 },
  { label: "Upper and lower case letters", test: (value) => /[a-z]/.test(value) && /[A-Z]/.test(value) },
  { label: "At least one number", test: (value) => /\d/.test(value) },
  { label: "A symbol (@$!%*?&)", test: (value) => /[@$!%*?&]/.test(value) },
];
