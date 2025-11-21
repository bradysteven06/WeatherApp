// Bootstrap styled alert for consistent error messages across the app.

import { useEffect, useRef } from "react";

export default function ErrorAlert({ message, code, onRetry }) {
  const ref = useRef(null);
  const hasError = !!message;

  // Move focus to the alert when it appears so SR/keyboard users aren't lost
  useEffect(() => {
    if (hasError && ref.current) {
      ref.current.focus();
    }
  }, [hasError, code, message]);

  if (!hasError) return null;

  // Contextual tip based on error code
  let tip = null;
  if (code === "CITY_NOT_FOUND") {
    tip = 'Tip: Try "City, CC" (e.g., Paris, FR).';
  } else if (code === "NETWORK") {
    tip = "Check your connection.";
  }

  return (
    <div
      ref={ref}
      className="alert alert-danger mt-3 d-flex justify-content-between align-items-start gap-2"
      role="alert"
      aria-live="assertive"
      tabIndex={-1}
    >
      <div>
        <div className="fw-semibold">{message}</div>
        {tip && <div className="small text-muted mt-1">{tip}</div>}
      </div>
      {code === "NETWORK" && typeof onRetry === "function" && (
        <button
          type="button"
          className="btn btn-sm btn-light ms-3"
          onClick={onRetry}
        >
          Retry
        </button>
      )}
    </div>
  );
}
