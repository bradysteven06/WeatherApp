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

    // Avoid -0 and ensure finite checks
    const fixNegZero = (n) => (Object.is(n, -0) ? 0 : n);
    const round = (n, dp = 0) => {
        if (!Number.isFinite(n)) return null;
        const p = 10 ** dp;
        return fixNegZero(Math.round(n * p) / p);
    };
    const fmtTemp = (n) => {
        const v = round(n, 0);
        return v == null ? '—' : v;
    }

    // OWM returns wind in m/s (metric) or mph (imperial). Show 1 dp for m/s, 0 dp for mph.
    const fmtWind = (n) => {
        const v = round(n, unit === 'metric' ? 1 : 0);
        return v == null ? '—' : v;
    }


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
            <div className="display-6" aria-label={`Current temperature ${fmtTemp(temp)} ${showUnit}`}>
                {fmtTemp(temp)}{showUnit}
            </div>
            <div>
                <div className="fw-semibold">{conditionMain || '-'}</div>
                <small className="text-body-secondary">
                    Feels like {fmtTemp(feelsLike)}{showUnit}
                    {' · '}Humidity {fmtTemp(humidity)}%
                    {' · '}Wind {fmtWind(windSpeed)} {windUnit}
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