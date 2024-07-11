import React, { useState } from 'react';

// Search component for inputting the location
function Search({ onSearch }) {
    const [location, setLocation] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(location);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <div className="input-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)} 
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </div>
        </form>
    );
}

export default Search;
