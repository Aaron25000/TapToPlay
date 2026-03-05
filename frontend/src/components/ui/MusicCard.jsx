import React from 'react';

function MusicCard({ song, onClick }) {
  const handleClick = () => {
    onClick(song);
  };

  return (
    <div className="music-card" onClick={handleClick}>
      <div className="card-image"><img src={song.image} alt={song.title} /></div>
      <div className="card-content">
        <h4>{song.title}</h4>
        <p className="artist">{song.artist}</p>
      </div>
    </div>
  );
}



export default MusicCard;