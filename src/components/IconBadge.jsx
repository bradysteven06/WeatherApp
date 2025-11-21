import React from "react";

/**
 * Small, focused icon renderer with graceful fallback.
 * OWM icon code like "04d". If provided, the PNG from OWM is tried.
 * alt text for screen readers (use weather.description || weather.main || 'Weather icon').
 *
 * If the network blocks the icon or code is missing, the alt text is mapped to an emoji so the UI never looks empty.
 */
export default function IconBadge({ code, alt = "Weather icon" }) {
  // Choose a simple emoji fallback by inspecting the alt text.
  function emojiFallback(text) {
    const t = (text || "").toLowerCase();
    if (t.includes("thunder")) return "⛈️";
    if (t.includes("drizzle")) return "🌦️";
    if (t.includes("rain")) return "🌧️";
    if (t.includes("snow")) return "❄️";
    if (
      t.includes("fog") ||
      t.includes("mist") ||
      t.includes("haze") ||
      t.includes("smoke") ||
      t.includes("dust")
    )
      return "🌫️";
    if (t.includes("cloud")) return "☁️";
    if (t.includes("clear")) return "☀️";
    return "🌡️"; // generic fallback
  }

  // If OWM code is valid, their raster icon is preferred.
  const src = code ? `https://openweathermap.org/img/wn/${code}@2x.png` : null;

  // Use a tiny state to know if the image failed so an emoji can be shown instead.
  const [broken, setBroken] = React.useState(false);

  if (!src || broken) {
    // Accessible emoji fallback with sr-only label.
    return (
      <span className="fs-1" role="img" aria-label={alt} title={alt}>
        {emojiFallback(alt)}
      </span>
    );
  }

  return (
    <img
      src={src}
      width="64"
      height="64"
      alt={alt}
      decoding="async"
      onError={() => setBroken(true)}
      loading="lazy"
    />
  );
}
