import React from 'react';

function UserSection({ user, isLoggedIn, onLoginClick, onLogout }) {
  return (
    <div className="user-section">
      {isLoggedIn ? (
        <>
          <div className="user-image" title={user?.username || 'User'}>
            {user?.username?.charAt(0).toUpperCase() || '👤'}
          </div>
          <span className="setting-icon" onClick={onLogout} title="logout">
            🚪
          </span>
          <button className="setting-icon" title="settings">
            ⚙️
          </button>
        </>
      ) : (
        <button className="login-button-header" onClick={onLoginClick}>
          login / signup
        </button>
      )}
    </div>
  );
}

export default UserSection;