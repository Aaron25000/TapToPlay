import { useState, useEffect } from 'react';
import SongSelectionView from './views/SongSelectionView';
import PianoView from './views/PianoView';
import InstrumentSelectionView from './views/InstrumentSelectionView';

function App() {
  const [selectedSong, setSelectedSong] = useState(null);
  const [instrument, setInstrument] = useState(null);

  // Load session from storage on startup
  useEffect(() => {
    const savedSong = localStorage.getItem('active_song');
    const savedInstrument = localStorage.getItem('active_instrument');
    
    if (savedSong) setSelectedSong(JSON.parse(savedSong));
    if (savedInstrument) setInstrument(savedInstrument);
  }, []);

  // Save session whenever it changes
  useEffect(() => {
    if (selectedSong) localStorage.setItem('active_song', JSON.stringify(selectedSong));
    else localStorage.removeItem('active_song');

    if (instrument) localStorage.setItem('active_instrument', instrument);
    else localStorage.removeItem('active_instrument');
  }, [selectedSong, instrument]);

  const handleHome = () => {
    setSelectedSong(null);
    setInstrument(null);
    localStorage.clear(); // Clears saved session
  };

  // Navigation Logic
  if (selectedSong && instrument === 'piano') {
    return (
      <PianoView 
        song={selectedSong} 
        onHome={handleHome} 
      />
    );
  }
  
  if (selectedSong) {
    return (
      <InstrumentSelectionView 
        song={selectedSong} 
        onHome={handleHome}
        onSelectInstrument={setInstrument}
      />
    );
  }

  return (
    <SongSelectionView 
      onSelectSong={setSelectedSong} 
    />
  );
}

export default App;