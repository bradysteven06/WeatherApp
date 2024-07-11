import React from 'react';

// WeatherDisplay component for showing current weather information
function WeatherDisplay({ weatherData }) {
    // If no weather data is available, return null
    if (!weatherData) return null;

    return (
        <div className="weather-display mb-4">
            <h2>{weatherData.location}</h2>
            <p>{weatherData.temperature}°C</p>
            <p>{weatherData.condition}</p>
            <p>Humidity: {weatherData.humidity}%</p>
            <p>Wind Speed: {weatherData.windSpeed} km/h</p>
        </div>
    );
}

export default WeatherDisplay;
