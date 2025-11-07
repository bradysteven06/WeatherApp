import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ToggleTheme from './components/ToggleTheme';
import ErrorAlert from './components/ErrorAlert';
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
  const [error, setError] = useState('');

  // Called by SearchBar when user submits a city
  const onSearch = async (city) => {
    setError('');
    setLoading(true);
    try {
      const result = await getCurrentWeather(city, unit);
      setData(result);
    } catch (e) {
      setData(null);
      setError(e?.message || 'Something went wrong.');
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

      {/* Loading feedback to help user understand what's happening */}
      {loading && <p className="mt-3 text-muted">Loading weather...</p>}

      {/* Either show the data or and actionable error */}
      {!loading && <WeatherDisplay data={data} unit={unit} />}
      <ErrorAlert message={error} />
    </div>
  );
}