import React from 'react';
import UserSection from './UserSection';

function TopBar({ user, isLoggedIn, onLoginClick, onLogout }) {
  return (
    <div className="top-bar">
      <img 
        src="/assets/TapToPlay_team_logo_design.png" 
        alt="TapToPlay Logo" 
        className="logo-image"
        onError={(e) => {
          e.target.onerror = null;
          e.target.style.display = 'none';
        }}
      />
      <UserSection 
        user={user} 
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
        onLogout={onLogout} 
      />
    </div>
  );
}

export default TopBar;