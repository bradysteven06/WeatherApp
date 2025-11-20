export default function ToggleTheme({ theme, onToggle }) {
    return (
        <button className="btn btn-outline-secondary btn-theme" onClick={onToggle} aria-pressed={theme === 'dark'}>
            {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
        </button>
    )
}