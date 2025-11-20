import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ToggleTheme from './components/ToggleTheme';
import ToggleUnit from './components/ToggleUnit';
import ErrorAlert from './components/ErrorAlert';
import LoadingSkeleton from './components/LoadingSkeleton';
import { getCurrentWeather } from './services/weatherApi';

export default function App() {
  // Theme: init from localStorage or system preference
  const getInitialTheme = () => {
    const saved = localStorage.getItem('wx:theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };
  const [theme, setTheme] = useState(getInitialTheme);
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('wx:theme', theme);
  }, [theme]);
  
  const getInitialUnit = () => localStorage.getItem('wx:unit') === 'metric' ? 'metric' : 'imperial';
  const [unit, setUnit] = useState(getInitialUnit);
  useEffect(() => {
    localStorage.setItem('wx:unit', unit);
  }, [unit]);
  
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
        setError({ message: e?.message || 'Something went wrong.', code: e?.code || 'UNKNOWN' });
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <div className="py-4" aria-busy={loading ? 'true' : 'false'}>
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