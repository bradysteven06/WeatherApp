import { useState } from 'react'
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ToggleTheme from './components/ToggleTheme';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [unit] = useState('imperial'); // add toggle in Phase 2
  const [data, setData] = useState(null);

  const onSearch = async (city) => {
    // Phase 2, call weatherApi and setData
    setData(null);
  };

  const onToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-bs-theme', next); // Bootstrap 5.3 theme
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
      <WeatherDisplay data={data} unit={unit} />
    </div>
  );
}