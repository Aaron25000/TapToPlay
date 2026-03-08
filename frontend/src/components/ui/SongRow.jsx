import styles from './SongRow.module.css';

export const SongRow = ({ song }) => (
  <div className={styles.songRow}>
    <span className={styles.songTitle}>{song.title}</span>
    <div className={`${styles.difficultyTag} ${styles[song.levelColorClass + 'Bg']}`}>
      <div className={`${styles.circle} ${styles[song.levelColorClass]}`}></div>
      {song.difficulty}  
    </div>
  </div>
);

export default SongRow;