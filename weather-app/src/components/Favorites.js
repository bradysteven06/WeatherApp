import React, { useState } from 'react';

// Favorites component for displaying saved favorite locations
function Favorites() {
    // State to manage the list of favorite locations
    const [favorites, setFavorites] = useState([]);

    // Function to add a new favorite location
    const addFavorite = (location) => {
        setFavorites([...favorites, location]);
    };

    return (
        <div className="favorites">
            <h3>Favorites</h3>
            <ul>
                {favorites.map((location, index) => (
                    <li key={index}>{location}</li>
                ))}
            </ul>
        </div>
    );
}

export default Favorites;
