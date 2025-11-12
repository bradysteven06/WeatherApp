export default function Details({
    temp, feelsLike,
    humidity,
    windSpeed,
    unit,
    sunrise,
    sunset,
    conditionMain,
}) {
    const showUnit = unit === 'metric' ? '°C' : '°F';
    const windUnit = unit === 'metric' ? 'm/s' : 'mph';
    const fmt = (n) => (Number.isFinite(n) ? Math.round(n) : '—');

    const toLocalTime = (s) => {
        if (!Number.isFinite(s)) return null;
        try {
            return new Date(s * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        } catch {
            return null;
        }
    };

    const rise = toLocalTime(sunrise);
    const set = toLocalTime(sunset);

    return (
        <div className="d-flex align-items-center gap-3">
            <div className="display-6" aria-label={`Current temperature ${fmt(temp)} ${showUnit}`}>
                {fmt(temp)}{showUnit}
            </div>
            <div>
                <div className="fw-semibold">{conditionMain || '-'}</div>
                <small className="text-muted">
                    Feels like {fmt(feelsLike)}{showUnit}
                    {' · '}Humidity {fmt(humidity)}%
                    {' · '}Wind {fmt(windSpeed)} {windUnit}
                    {rise && set ? (
                        <>
                            {' · '}Sunrise {rise}
                            {' · '}Sunset {set}
                        </>
                    ) : null}
                </small>
            </div>
        </div>
    );
}