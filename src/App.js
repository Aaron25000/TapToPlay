import React, { useState } from 'react';
import HomePage from './views/Homepage';
import LoginPage from './views/Login_page';
import './App.css';

function App() {
  // State management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Search handler
  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
  };

  // Song click handler
  const handleSongClick = (song) => {
    alert(`You clicked on ${song.title} by ${song.artist}!`);
  };

  // Login handler
  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    setShowLogin(false);
    console.log('User logged in:', userData);
  };

  // Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  // Show login page
  const handleLoginClick = () => {
    setShowLogin(true);
  };

  // Close login page
  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  // If login page should be shown, render LoginPage
  if (showLogin) {
    return <LoginPage onLogin={handleLogin} onClose={handleCloseLogin} />;
  }

  // Otherwise render homepage
  return (
    <HomePage 
      user={user}
      isLoggedIn={isLoggedIn}
      onLoginClick={handleLoginClick}
      onLogout={handleLogout}
      onSearch={handleSearch}
      searchQuery={searchQuery}
      onSongClick={handleSongClick}
    />
  );
}

export default App;