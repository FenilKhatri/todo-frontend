import { AVATAR_COLORS, AVATAR_SIZES } from "../shared/constants/ui.constants";


const initials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "?";

const colorFor = (id = "") =>
  AVATAR_COLORS[[...String(id)].reduce((sum, char) => sum + char.charCodeAt(0), 0) % AVATAR_COLORS.length];

function Avatar({ user, src, size = "md", className = "" }) {
  const image = src ?? user?.profilePicture;
  const base = `shrink-0 rounded-full ${AVATAR_SIZES[size] || size} ${className}`;

  if (image) {
    return <img src={image} alt={user?.userName || "Profile"} className={`${base} object-cover`} />;
  }

  return (
    <span
      className={`${base} flex items-center justify-center font-semibold ${colorFor(user?._id || user?.id)}`}
      aria-hidden="true"
    >
      {initials(user?.userName)}
    </span>
  );
}

export default Avatar;
