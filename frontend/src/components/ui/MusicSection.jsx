import React from 'react';
import MusicCard from './MusicCard';

function MusicSection({ songs, onSongClick, searchQuery }) {
  // Filter songs based on the search query
  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="music-section">
      <h2 className="section-title">🎵 Music Selection</h2>
      
      <div className="music-grid">
        {filteredSongs.map(song => (
          <MusicCard 
            key={song.id}
            song={song}
            onClick={onSongClick}
          />
        ))}
      </div>

      {filteredSongs.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '2rem', color: '#666' }}>
          No matching songs found
        </p>
      )}
    </div>
  );
}

export default MusicSection;