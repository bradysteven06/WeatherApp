import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import ToggleTheme from "./components/ToggleTheme";
import ToggleUnit from "./components/ToggleUnit";
import ErrorAlert from "./components/ErrorAlert";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { getCurrentWeather } from "./services/weatherApi";

// Map weather data -> background class
function deriveBgStyle(data) {
  if (!data) {
    return "linear-gradient(135deg, #e0f2ff, #f5f7ff)";
  }

  let icon = "";
  let main = "";
  let desc = "";

  if (Array.isArray(data.weather) && data.weather[0]) {
    const w = data.weather[0];
    if (w.main) main = String(w.main).toLowerCase();
    if (w.description) desc = String(w.description).toLowerCase();
    if (w.icon) icon = String(w.icon);
  }

  const isNight = icon.endsWith("n");
  const text = `${main} ${desc}`.trim();

  if (!text) {
    // Still have nothing meaningful - just fall back.
    return isNight
      ? "linear-gradient(135deg, #212121, #000000)"
      : "linear-gradient(135deg, #e0f2ff, #f5f7ff)";
  }

  if (text.includes("thunder"))
    return "radial-gradient(circle at top, #ffeb3b, #263238)";
  if (text.includes("drizzle") || text.includes("rain"))
    return "linear-gradient(135deg, #4a6572, #1a237e)";
  if (text.includes("snow")) return "linear-gradient(135deg, #e0f7fa, #eceff1)";
  if (
    text.includes("mist") ||
    text.includes("fog") ||
    text.includes("haze") ||
    text.includes("smoke") ||
    text.includes("dust")
  ) {
    return "linear-gradient(135deg, #cfd8dc, #90a4ae)";
  }
  if (text.includes("cloud")) {
    return isNight
      ? "linear-gradient(135deg, #37474f, #000000)"
      : "linear-gradient(135deg, #e0eafc, #cfdef3)";
  }
  if (text.includes("clear")) {
    return isNight
      ? "radial-gradient(circle at top, #1a237e, #000000)"
      : "radial-gradient(circle at top, #fff9c4, #90caf9)";
  }

  // Fallback if API returns something odd
  return isNight
    ? "linear-gradient(135deg, #212121, #000000)"
    : "linear-gradient(135deg, #e0f2ff, #f5f7ff)";
}

export default function App() {
  // Theme: init from localStorage or system preference
  const getInitialTheme = () => {
    const saved = localStorage.getItem("wx:theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
    localStorage.setItem("wx:theme", theme);
  }, [theme]);

  const getInitialUnit = () =>
    localStorage.getItem("wx:unit") === "metric" ? "metric" : "imperial";
  const [unit, setUnit] = useState(getInitialUnit);
  useEffect(() => {
    localStorage.setItem("wx:unit", unit);
  }, [unit]);

  // Holds the current city's weather (normalized object from weatherApi.js)
  const [data, setData] = useState(null);

  // UI states for smooth UX
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // { message, code }
  const [lastQuery, setLastQuery] = useState(null);

  // Compute background class from current weather
  const bgStyle = { "--wx-bg-gradient": deriveBgStyle(data) };

  // Called by SearchBar when user submits a city
  const onSearch = async (city) => {
    setError(null);
    setLoading(true);
    try {
      setLastQuery(city);
      const result = await getCurrentWeather(city, unit);
      setData(result);
    } catch (e) {
      setData(null);
      setError({
        message: e?.message || "Something went wrong.",
        code: e?.code || "UNKNOWN",
      });
    } finally {
      setLoading(false);
    }
  };

  // Toggle Bootstrap theme (light/dark)
  const onToggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
  };

  const onChangeUnit = async (nextUnit) => {
    if (nextUnit === unit) return;
    setUnit(nextUnit);
    // Re-fetch current city in new unit if already have a result or a last query
    if (lastQuery) {
      try {
        setLoading(true);
        const result = await getCurrentWeather(lastQuery, nextUnit);
        setData(result);
        setError(null);
      } catch (e) {
        setData(null);
        setError({
          message: e?.message || "Something went wrong.",
          code: e?.code || "UNKNOWN",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      className="wx-shell py-4"
      style={bgStyle}
      aria-busy={loading ? "true" : "false"}
    >
      <header className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
        <h1 className="h3 m-0">Weather App</h1>
        <div className="header-controls">
          <ToggleUnit unit={unit} onChange={onChangeUnit} />
          <ToggleTheme theme={theme} onToggle={onToggleTheme} />
        </div>
      </header>

      <SearchBar onSearch={onSearch} />

      {/* Loading: show a stable skeleton card (no layout shift) */}
      {loading && <LoadingSkeleton />}

      {/* Either show the data or empty state.*/}
      {!loading && data && <WeatherDisplay data={data} unit={unit} />}

      {/* Subtle, a11y-friendly empty helper under the search bar */}
      {!loading && !data && (
        <p className="mt-3 text-muted" role="status" aria-live="polite">
          Search a city to see weather.
        </p>
      )}

      <ErrorAlert
        message={error?.message}
        code={error?.code}
        onRetry={lastQuery ? () => onSearch(lastQuery) : undefined}
      />
    </div>
  );
}
