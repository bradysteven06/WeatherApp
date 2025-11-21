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
  headingId, // id to apply on the heading for aria-labelledby
}) {
  return (
    <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
      <h2
        id={headingId}
        className="h4 mb-0 text-truncate"
        style={{ maxWidth: "80%" }}
      >
        {city}
        {country ? `, ${country}` : ""}
      </h2>
      <IconBadge
        code={iconCode}
        alt={description || conditionMain || "Weather icon"}
      />
    </div>
  );
}
