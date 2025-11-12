/**
 * Presentational component showing the city/country, big temp, condition, and icon.
 * Receives explicit props. no data fetching or side effects
 */

import IconBadge from "./IconBadge";

export default function Current({
    city,
    country,
    conditionMain,
    iconCode,
    description,
}) {

    return (
        <div className="d-flex justify-content-between align-items-start mb-2">
            <h2 className="h4 mb-0" aria-live="polite">
                {city}
                {country ? `, ${country}` : ''}
            </h2>
            <IconBadge code={iconCode} alt={description || conditionMain || 'Weather icon'} />
        </div>
    );
}