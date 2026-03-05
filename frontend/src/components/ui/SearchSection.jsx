import React from 'react';
import TopBar from './TopBar';
import SearchBar from './SearchBar';

function SearchSection({ onSearch, searchQuery, user, isLoggedIn, onLoginClick, onLogout }) {
  return (
    <div className="search-section">
      <TopBar 
        user={user} 
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
        onLogout={onLogout} 
      />
      <SearchBar 
        onSearch={onSearch}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default SearchSection;