import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import WeatherDisplay from './components/WeatherDisplay';
import Forecast from './components/Forecast';
import Favorites from './components/Favorites';

function App() {
    return (
        <div className="container">
            <Header />
            <Search />
            <WeatherDisplay />
            <Forecast />
            <Favorites />
        </div>
    );
}

export default App;
