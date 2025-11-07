// Bootstrap styled alert for consistent error messages across the app.

export default function ErrorAlert({ message }) {
    if (!message) return null;
    return (
        <div className="alert alert-danger mt-3" role="alert" aria-live="polite">
            {message}
        </div>
    );
}