import React, { useState } from 'react';

function SearchBar({ onSearch, searchQuery }) {
  const [query, setQuery] = useState(searchQuery || '');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(query);
      alert('Searching for: ' + query);
    }
  };

  const handleMicClick = () => {
    alert('🎤 Voice search activated');
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-container">
      <span className="search-icon">🔍</span>
      <input 
        type="text"
        placeholder="Search songs..."
        className="search-input"
        value={query}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <span className="mic-icon" onClick={handleMicClick}>
        🎤
      </span>
    </div>
  );
}

export default SearchBar;