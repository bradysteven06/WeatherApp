export default function ToggleUnit({ unit, onChange }) {
    const isMetric = unit === 'metric';
    return (
        <div className="btn-group" role="group" aria-label="Temperature unit">
            <button
                type="button"
                className={`btn btn-outline-secondary btn-unit ${!isMetric ? 'active' : ''}`}
                aria-pressed={!isMetric}
                onClick={() => onChange('imperial')}
                title="Show Fahrenheit (°F)"
            >
                °F
            </button>
            <button
                type="button"
                className={`btn btn-outline-secondary btn-unit ${isMetric ? 'active' : ''}`}
                aria-pressed={isMetric}
                onClick={() => onChange('metric')}
                title="Show Celsius (°C)"
            >
                °C
            </button>
        </div>
    )
}