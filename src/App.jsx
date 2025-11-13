import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ToggleTheme from './components/ToggleTheme';
import ErrorAlert from './components/ErrorAlert';
import LoadingSkeleton from './components/LoadingSkeleton';
import { getCurrentWeather } from './services/weatherApi';

export default function App() {
  // app wide theme (Bootstrap reads data-bs-theme on <html>)
  const [theme, setTheme] = useState('light');
  // ensure Bootstrap reads the initial theme
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);
  
  const [unit] = useState('imperial'); // TODO: add toggle for unit
  
  // Holds the current city's weather (normalized object from weatherApi.js)
  const [data, setData] = useState(null);

  // UI states for smooth UX
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);   // { message, code }
  const [lastQuery, setLastQuery] = useState(null);

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
        message: e?.message || 'Something went wrong.',
        code: e?.code || 'UNKNOWN'
      });
    } finally {
      setLoading(false);
    }
  };

  // Toggle Bootstrap theme (light/dark)
  const onToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  return (
    <div className="container py-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 m-0">Weather App</h1>
        <div className="d-flex gap-2">
          <ToggleTheme theme={theme} onToggle={onToggleTheme} />
        </div>
      </header>

      <SearchBar onSearch={onSearch} />

      {/* Loading: show a stable skeleton card (no layout shift) */}
      {loading && <LoadingSkeleton />}

      {/* Either show the data or empty state. WeatherDisplay also renders a default message */}
      {!loading && data && <WeatherDisplay data={data} unit={unit} />}

      {/* Subtle, ally-friendly empty helper under the search bar */}
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