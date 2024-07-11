import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Header from './components/Header';
import Search from './components/Search';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast';
import Favorites from './components/Favorites';

function App() {
    // State to manage the current weather data and forecast data
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState(null);

    // Function to fetch weather data from the API
    const fetchWeatherData = async (location) => {
        try {
            // Clear any previous errors
            setError(null);

            // Fetch current weather data
            const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`);
            const weather = {
                location: weatherResponse.data.name,
                temperature: weatherResponse.data.main.temp,
                condition: weatherResponse.data.weather[0].description,
                humidity: weatherResponse.data.main.humidity,
                windSpeed: weatherResponse.data.wind.speed,
            };
            setWeatherData(weather);

            // Fetch 5-day forecast data
            const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`);
            const forecast = forecastResponse.data.list.filter((_, index) => index % 8 === 0).map(item => ({
                date: item.dt_txt.split(' ')[0],
                temperature: item.main.temp,
                condition: item.weather[0].description,
            }));
            setForecastData(forecast);
        } catch (error) {
            // Handle errors by setting the error state
            setError('Unable to fetch weather data. Please try again.');
        }
    };

    return (
        <div className="container">
            <Header />
            <Search onSearch={fetchWeatherData} />
            {error && <p className="text-danger">{error}</p>}
            <WeatherDisplay weatherData={weatherData} />
            <Forecast forecastData={forecastData} />
            <Favorites />
        </div>
    );
}

export default App;
