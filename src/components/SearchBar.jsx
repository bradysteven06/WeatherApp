import { useState } from 'react';

export default function SearchBar({ onSearch }) {
    const [city, setCity] = useState("");
    const submit = (e) => {
        e.preventDefault();
        const q = city.trim();
        if (q) onSearch(q);
    };
    return (
        <form className="d-flex gap-2" onSubmit={submit} role="search" aria-label="City search">
            <input
                className="form-control"
                type="search"
                placeholder="Search city..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                aria-label="Search city"
            />
            <button className="btn btn-primary" type="submit">Search</button>
        </form>
    );
}