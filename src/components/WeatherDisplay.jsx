import Current from "./Current";
import Details from "./Details";

export default function WeatherDisplay({ data, unit = "imperial" }) {
  const { name, main = {}, weather = [], wind = {}, sys = {} } = data;
  const w = weather[0] || {};
  const headingId = "wx-heading";

  return (
    <section
      className="card shadow-sm mt-3"
      role="region"
      aria-labelledby={headingId}
      aria-live="polite"
    >
      <div className="card-body">
        <Current
          city={name}
          country={sys.country}
          headingId={headingId}
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
    </section>
  );
}
