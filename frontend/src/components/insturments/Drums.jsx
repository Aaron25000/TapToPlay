import React from 'react';
import styles from './Drums.module.css';

export const Drums = ({ expectedNote, onNotePlayed }) => {
  const drumData = [
    { id: 'hi-hat2', label: 'HI-HAT' },
    { id: 'crash', label: 'CRASH' },
    { id: 'floortom1', label: 'TOM 1' },
    { id: 'snare', label: 'SNARE' },
    { id: 'kick', label: 'KICK' },
    { id: 'floortom2', label: 'TOM 2' }
  ];

  const playSound = (drumId) => {
    // 1. Play the audio feedback
    const audio = new Audio(`/sounds/${drumId}.wav`);
    audio.play().catch(err => console.log("Playback error:", err));

    // 2. Logic for the "Lesson" mode
    if (expectedNote) {
      const isCorrect = drumId === expectedNote;
      onNotePlayed(isCorrect);
    }
  };

  return (
    <div className={styles.drumBase}>
      <div className={styles.drumContainer}>
        {drumData.map((drum) => (
          <button 
            key={drum.id} 
            className={`${styles.drumPad} ${expectedNote === drum.id ? styles.highlight : ''}`}
            onClick={() => playSound(drum.id)}
          >
            {drum.label}
          </button>
        ))}
      </div>
    </div>
  );
};