import React from 'react';
import styles from './MusicCard.module.css';

const MusicCard = ({ song, onClick }) => {
  return (
    <div className={styles.card} onClick={() => onClick(song)}>
      <div className={styles.imageWrapper}>
        <img 
          src={song.image} 
          alt={song.title} 
          className={styles.image} 
          loading="lazy"
        />
        <div className={styles.playOverlay}>
          <button className={styles.playButton}>▶</button>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{song.title}</h3>
        <p className={styles.artist}>{song.artist}</p>
      </div>
    </div>
  );
};

export default MusicCard;