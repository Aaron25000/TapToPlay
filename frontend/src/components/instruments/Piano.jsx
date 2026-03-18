import { PIANO_NOTES, playNote } from '../../util/sound';
import styles from './Piano.module.css';

// Added onNotePlayed prop
const Piano = ({ expectedNote, onNotePlayed }) => {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C2', 'D2', 'E2'];
  const hasSharp = (key) => !['E', 'B', 'E2'].includes(key);

  const handlePress = (pressedNote) => {
    // 1. Play the sound of the key actually pressed
    if (PIANO_NOTES[pressedNote]) {
      playNote(PIANO_NOTES[pressedNote]);
    }

    // 2. Check if it's the right note and notify the parent View
    if (onNotePlayed) {
      const isCorrect = pressedNote === expectedNote;
      onNotePlayed(isCorrect);
    }
  };

  return (
    <div className={styles.pianoContainer}>
      <div className={styles.piano}>
        {whiteKeys.map((note, index) => {
          const sharpNote = `${note}#`;
          const isHighlighted = expectedNote === note;
          const isSharpHighlighted = expectedNote === sharpNote;

          return (
            <div key={note} className={styles.keyWrapper}>
              <button
                className={`${styles.whiteKey} ${isHighlighted ? styles.active : ''}`}
                onMouseDown={() => handlePress(note)}
              >
                <span>{note}</span>
              </button>
              
              {index < whiteKeys.length - 1 && hasSharp(note) && (
                <button
                  className={`${styles.blackKey} ${isSharpHighlighted ? styles.activeSharp : ''}`}
                  onMouseDown={() => handlePress(sharpNote)}
                ></button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Piano };