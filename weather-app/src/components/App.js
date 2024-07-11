import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast';
import Favorites from './components/Favorites';

// The main App component that renders other components
function App() {
    // State to manage the current weather data and forecast data
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    
    // Function to handle the search and update weather and forecast data
    const handleSearch = (location) => {
        // Fetch weather data and update state
        // Fetch forecast data and update state
    };

    return (
        <div className="container">
            <Header />
            <Search onSearch={handleSearch} />
            <WeatherDisplay weatherData={weatherData} />
            <Forecast forecastData={forecastData} />
            <Favorites />
        </div>
    );
}

export default App;
