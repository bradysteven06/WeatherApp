export default function WeatherDisplay({ data, unit = 'imperial' }) {
    if (!data) return <p className="text-muted">Search a city to see weather.</p>
    const { name, main, weather, wind } = data;
    const temp = Math.round(main.temp);
    const units = unit === 'metric' ? '°C' : '°F';
    return (
        <div className="card shadow-sm mt-3">
            <div className="card-body">
                <h2 className="h4 mb-3">{name}</h2>
                <div className="d-flex align-items-center gap-3">
                    <div className="display-6">{temp}{units}</div>
                    <div>
                        <div className="fw-semibold">{weather?.[0]?.main}</div>
                        <small className="text-muted">Humidity: {main.humidity}% · Wind: {Math.round(wind.speed)} {unit === 'metric' ? 'm/s' : 'mph'}</small>
                    </div>
                </div>
            </div>
        </div>
    )
}