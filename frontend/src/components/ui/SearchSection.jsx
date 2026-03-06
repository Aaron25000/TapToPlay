import React from 'react';
import Topbar from './Topbar';
import SearchBar from './SearchBar';

function SearchSection({ onSearch, searchQuery, user, isLoggedIn, onLoginClick, onLogout }) {
  return (
    <div className="search-section">
      {/*<TopBar 
        user={user} 
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
        onLogout={onLogout} 
      >*/}
      <Topbar>

      </Topbar>
      <SearchBar 
        onSearch={onSearch}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default SearchSection;