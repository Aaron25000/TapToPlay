import styles from './Piano.module.css';

const Piano = ({ onNotePressed }) => {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C2', 'D2', 'E2'];
  const hasSharp = (key) => !['E', 'B', 'E2'].includes(key);

  return (
    <div className={styles.pianoContainer}>
      <div className={styles.piano}>
        {whiteKeys.map((note, index) => (
          <div key={note} className={styles.keyWrapper}>
            <button
              className={styles.whiteKey}
            >
              <span>{note}</span>
            </button>
            {index < whiteKeys.length - 1 && hasSharp(note) && (
              <button
                className={styles.blackKey}
              ></button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export { Piano };