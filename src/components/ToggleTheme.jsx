export default function ToggleTheme({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      className="btn btn-outline-secondary btn-theme d-flex align-items-center justify-content-center"
      onClick={onToggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? "🌞" : "🌙"}
    </button>
  );
}
