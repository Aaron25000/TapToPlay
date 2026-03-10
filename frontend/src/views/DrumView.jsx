import styles from './DrumView.module.css'; 

const DrumsView = () => {
    // Data for the 6 Drum Pads
  const drumData = [
    { id: 'hi-hat2', label: 'HI-HAT' },
    { id: 'crash', label: 'CRASH' },
    { id: 'floortom1', label: 'TOM 1' },
    { id: 'snare', label: 'SNARE' },
    { id: 'kick', label: 'KICK' },
    { id: 'floortom2', label: 'TOM 2' }

  ];

  const playSound = (fileName) => {
    const audio = new Audio(`/sounds/${fileName}.wav`); // .wav files from the public/sounds folder
    audio.play().catch(err => console.log("Playback error:", err));
  };

  return (
    <div className={styles.pageContainer}>      
       <div className={styles.drumBase}>
        <div className={styles.drumContainer}>
          {drumData.map((drum) => (
            <button 
            key={drum.id} 
            className={styles.drumPad}
            onClick={() => playSound(drum.id)}
            >
              {drum.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrumsView;
