import React from "react";
import styles from "./MusicCard.module.css";

const getDifficultyInfo = (difficulty) => {
  switch(difficulty) {
    case 'easy':
      return { color: '#4CAF50', text: 'easy', emoji: '🟢' };
    case 'medium':
      return { color: '#FF9800', text: 'medium', emoji: '🟡' };
    case 'hard':
      return { color: '#000000', text: 'hard', emoji: '⚫' };
    default:
      return { color: '#4CAF50', text: 'easy', emoji: '🟢' };
  }
};

const MusicCard = ({ song, onClick, onPlay }) => {
  const difficulty = getDifficultyInfo(song.difficulty);

  const handlePlayClick = (e) => {
    e.stopPropagation();
    if (onPlay) {
      onPlay(song);
    }
  };

  return (
    <div className={styles.card} onClick={() => onClick(song)}>
      <div className={styles.imageWrapper}>
        <img
          src={song.image}
          alt={song.title}
          className={styles.image}
          loading="lazy"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.text}>
          <h3 className={styles.title}>{song.title}</h3>
          <p className={styles.artist}>{song.artist}</p>
        </div>

        <div className={styles.controls}>
          <button className={styles.playButton} onClick={handlePlayClick}>
            ▶
          </button>
          <div
            className={styles.difficulty}
            style={{ backgroundColor: difficulty.color }}
          >
            {difficulty.emoji} {difficulty.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicCard;
