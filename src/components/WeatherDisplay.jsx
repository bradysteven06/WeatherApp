// Uses the normalized weather object from weatherApi.js

export default function WeatherDisplay({ data, unit = 'imperial' }) {
    if (!data) return <p className="text-muted mt-3">Search a city to see weather.</p>

    const { name, main, weather = [], wind, sys } = data;
    const w = weather[0];
    const showUnit = unit === 'metric' ? '°C' : '°F';
    const windUnit = unit === 'metric' ? 'm/s' : 'mph';

    // OpenWeatherMap icon format. https://openweathermap.org/weather-conditions
    const iconUrl = w?.icon ? `https://openweathermap.org/img/wn/${w.icon}@2x.png` : null;

    return (
        <div className="card shadow-sm mt-3">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h2 className="h4 mb-0">{name}{sys?.country ? `, ${sys.country}` : ''}</h2>
                    {iconUrl && (
                        <img 
                            src={iconUrl}
                            width="64"
                            height="64"
                            alt={w?.description || w?.main || 'Weather icon'}
                        />
                    )}
                </div>
                <div className="d-flex align-items-center gap-3">
                    <div className="display-6">
                        {Math.round(main.temp)}{showUnit}
                    </div>
                    <div>
                        <div className="fw-semibold">{w?.main || '-'}</div>
                        <small className="text-muted">
                            Feels like {Math.round(main.feel_like)}{showUnit}
                            {' · '}Humidity {main.humidity}% 
                            {' · '}Wind {Math.round(wind?.speed ?? 0)} {windUnit}
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}