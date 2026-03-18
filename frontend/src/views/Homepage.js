import React, { useState } from 'react';
import SearchSection from '../components/ui/SearchSection';
import MusicSection from '../components/ui/MusicSection';

function Homepage({ user, isLoggedIn, onLoginClick, onLogout, onSearch, searchQuery, onSongClick, onUserProfile, }) {
  const [songs] = useState([
    { id: 1, title: 'Abba', artist: 'ABBA', image: '/assets/image/Abba.webp' },
    { id: 2, title: 'Shawn Mendes', artist: 'Shawn Mendes', image: '/assets/image/Shawn-Mendes.jpg' },
    { id: 3, title: 'Beatles', artist: 'The Beatles', image: '/assets/image/beatles.jpg' },
    { id: 4, title: 'Queen', artist: 'Queen', image: '/assets/image/Queen.jpg' },
    { id: 5, title: 'Ed Sheeran', artist: 'Ed Sheeran', image: '/assets/image/Ed_Sheeran.webp' },
    { id: 6, title: 'The Chainsmokers', artist: 'The Chainsmokers', image: '/assets/image/The-Chainsmokers.webp' },
    { id: 7, title: 'Daniel Powter', artist: 'Daniel Powter', image: '/assets/image/david-powter-bad-day.webp' },
    { id: 8, title: 'Coldplay', artist: 'Coldplay', image: '/assets/image/coldplay-band-facts.jpg' },
    { id: 9, title: 'Avicii', artist: 'Avicii', image: '/assets/image/Avicii.webp' },
    { id: 10, title: 'John Williams', artist: 'John Williams', image: '/assets/image/john-williams.jpeg' }
  ]);

  return (
    <div className="App">
      <SearchSection 
        onSearch={onSearch}
        searchQuery={searchQuery}
        user={user}
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
        onUserProfile={onUserProfile}
      />
      <MusicSection 
        songs={songs}
        onSongClick={onSongClick}
        searchQuery={searchQuery}
      />
    </div>
  );
}

export default Homepage;