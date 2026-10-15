import { FiCheckSquare, FiColumns, FiHome, FiUser } from "react-icons/fi";

export const AUTH_SWITCH_LINKS = {
  "/login": { text: "Don't have an account?", label: "Sign up", to: "/signup" },
  "/signup": { text: "Already have an account?", label: "Log in", to: "/login" },
  "/forgot-password": { text: "Remembered your password?", label: "Log in", to: "/login" },
};

export const NAV_ITEMS = [
  { to: "/", label: "Home", icon: FiHome, end: true },
  { to: "/tasks", label: "Tasks", icon: FiCheckSquare },
  { to: "/boards", label: "Boards", icon: FiColumns },
  { to: "/profile", label: "Profile", icon: FiUser },
];
