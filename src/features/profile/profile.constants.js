import { LuKeyRound, LuMail } from "react-icons/lu";

export const MAX_AVATAR_SIZE = 5 * 1024 * 1024;

export const AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export const EMPTY_CREDENTIAL_FORM = { email: "", currentPassword: "", newPassword: "", confirmPassword: "" };

export const SECURITY_TIPS = [
  "Codes are 6 digits and expire after 10 minutes.",
  "You have 5 attempts before you need a new code.",
  "Each digit is checked as you type it, starting from the first box.",
  "Requesting a new code cancels the previous one.",
];

export const CHANGE_STEPS = ["Enter details", "Verify code", "Done"];

export const CREDENTIAL_CONFIG = {
  email: {
    icon: LuMail,
    title: "Change Email",
    subtitle: "Enter your new email address. We'll verify it with a one-time code.",
    success: "Email changed",
    message: (result) => `Your account email is now ${result.user.email}.`,
  },
  password: {
    icon: LuKeyRound,
    title: "Change Password",
    subtitle: "Confirm your current password and choose a new one.",
    success: "Password changed",
    message: () => "Your password has been updated. Use your new password the next time you log in.",
  },
};
