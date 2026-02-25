import { PIANO_NOTES, playNote } from '../../util/sound';
import styles from './Piano.module.css';

const Piano = ({ onNotePressed }) => {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C2', 'D2', 'E2'];
  const hasSharp = (key) => !['E', 'B', 'E2'].includes(key);

  return (
    <div className={styles.pianoContainer}>
      <div className={styles.piano}>
        {whiteKeys.map((note, index) => {
          const sharpNote = `${note}#`
          return (
          <div key={note} className={styles.keyWrapper}>
            <button
              className={styles.whiteKey}
              onMouseDown={() => playNote(PIANO_NOTES[note])}
            >
              <span>{note}</span>
            </button>
            {index < whiteKeys.length - 1 && hasSharp(note) && (
              <button
                className={styles.blackKey}
                onMouseDown={() => playNote(PIANO_NOTES[sharpNote])}
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