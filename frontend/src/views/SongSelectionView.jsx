import React, { useState } from 'react';
import Topbar from "../components/ui/Topbar";
import MusicCard from "../components/ui/MusicCard";
import InstrumentSelectionView from "./InstrumentSelectionView";
import PianoView from "./PianoView"
import styles from './SongSelectionView.module.css';

const SongSelectionView = () => {
  const [selectedSong, setSelectedSong] = useState(null);
  const [instrument, setInstrument] = useState(null);

  const songs = [
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
  ];

  if (selectedSong && instrument === 'piano') {
    return (
      <PianoView 
        song={selectedSong} 
        onBack={() => setInstrument(null)} 
      />
    );
  }
  
  if (selectedSong) {
    return (
      <InstrumentSelectionView 
        song={selectedSong} 
        onBack={() => setSelectedSong(null)}
        onSelectInstrument={(type) => setInstrument(type)}
      />
    );
  }

  return (
    <div className={styles.mainWrapper}>
      <Topbar>
        <span className={styles.topbarTitle}>Song Selection</span>
      </Topbar>

      <main className={styles.viewContainer}>
        <div className={styles.grid}>
          {songs.map((song) => (
            <MusicCard
              key={song.id}
              song={song}
              // Clicking the card sets the state and triggers the view change
              onClick={() => setSelectedSong(song)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default SongSelectionView;