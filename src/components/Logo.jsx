const SIZES = {
  sm: "h-10",
  md: "h-12",
  lg: "h-14",
};

// Brand logo (icon, wordmark and tagline) from public/logo.png.
function Logo({ size = "md", className = "" }) {
  return (
    <img
      src="/logo.png"
      alt="Taskora — Plan clearly. Work smarter."
      width={2073}
      height={758}
      className={`w-auto shrink-0 self-start object-contain object-left select-none ${SIZES[size]} ${className}`}
      draggable={false}
    />
  );
}

export default Logo;
