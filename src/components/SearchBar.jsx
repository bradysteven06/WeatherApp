import { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [city, setCity] = useState("");
    const inputId = "city-search";

    const submit = (e) => {
        e.preventDefault();
        const q = city.trim();
        if (q) onSearch(q);
    };
    return (
        <form className="d-flex gap-2 flex-column flex-sm-row" onSubmit={submit} role="search" aria-label="City search">
            <label htmlFor={inputId} className="visually-hidden">City</label>
            <input
                className="form-control"
                type="search"
                placeholder="Search city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                id={inputId}
                aria-describedby="search-help"
            />
            <button className="btn btn-primary" type="submit">Search</button>
            <p id="search-help" className="visually-hidden">Type a city name, or City, Country Code (e.g., Paris, FR)</p>
        </form>
    );
}