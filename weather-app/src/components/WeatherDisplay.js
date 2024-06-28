import React from 'react';

function WeatherDisplay({ weatherData }) {
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
