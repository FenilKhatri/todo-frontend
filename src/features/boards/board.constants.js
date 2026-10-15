import { LuLock, LuShieldCheck, LuUsers } from "react-icons/lu";

export const USER_SEARCH_MIN_LENGTH = 2;

export const USER_SEARCH_DEBOUNCE_MS = 250;

export const SHARE_FEATURES = [
  { icon: LuUsers, title: "Multiple Users", text: "Add one or more people and share the board in one go." },
  {
    icon: LuShieldCheck,
    title: "View-only Access",
    text: "Viewers can see the board and its tasks but can't change them.",
  },
  {
    icon: LuLock,
    title: "Secure & Private",
    text: "Only people you invite can open this board. Remove access anytime.",
  },
];
