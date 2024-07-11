import React from 'react';

// Forecast component for showing a 5-day weather forecast
function Forecast({ forecastData }) {
    // If no forecast data is available, return null
    if (!forecastData) return null;

    return (
        <div className="forecast">
            <h3>5-Day Forecast</h3>
            <div className="row">
                {forecastData.map((day, index) => (
                    <div key={index} className="col">
                        <p>{day.date}</p>
                        <p>{day.temperature}°C</p>
                        <p>{day.condition}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Forecast;
