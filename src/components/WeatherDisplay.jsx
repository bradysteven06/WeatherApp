import Current from './Current';
import Details from './Details';

export default function WeatherDisplay({ data, unit = 'imperial' }) {
    if (!data) return <p className="text-muted mt-3">Search a city to see weather.</p>;

    const { name, main = {}, weather = [], wind = {}, sys ={} } = data;
    const w = weather[0] || {};

    return (
        <div className="card shadow-sm mt-3">
            <div className="card-body">
                <Current
                    city={name}
                    country={sys.country}
                    conditionMain={w.main}
                    iconCode={w.icon}
                    description={w.description}
                />

                <Details
                    temp={main.temp}
                    feelsLike={main.feels_like}
                    humidity={main.humidity}
                    windSpeed={wind.speed}
                    unit={unit}
                    sunrise={sys.sunrise}
                    sunset={sys.sunset}
                    conditionMain={w.main}
                />
            </div>
        </div>
    );
}