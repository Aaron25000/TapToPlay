import React from 'react';
import styles from './StarRating.module.css';

const StarRating = ({ value = 0, max = 5, onClose }) => {
  // Ensure we don't divide by zero
  const safeMax = Number(max) > 0 ? Number(max) : 1;
  const ratio = Number(value) / safeMax;
  
  // Calculate stars (0 to 5)
  const starsFilled = Math.round(ratio * 5);

  const getMessage = (r) => {
    if (r >= 0.9) return "Excellent!";
    if (r >= 0.7) return "Well Done!";
    if (r >= 0.5) return "Good Job!";
    if (r >= 0.3) return "Keep Practicing";
    return "Try Again";
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* FIX 1: Pass 'ratio' to getMessage, not 'starsFilled' */}
        <h2 className={styles.message}>{getMessage(ratio)}</h2>
        
        <div className={styles.starContainer}>
          {[...Array(5)].map((_, index) => {
            const isFilled = index < starsFilled;
            return (
              <span
                key={index}
                className={`${styles.star} ${isFilled ? styles.on : ''}`}
              >
                &#9733;
              </span>
            );
          })}
        </div>
        
        {/* FIX 2: Dynamic text for the max value */}
        <p className={styles.scoreText}>You scored {value} out of {max}</p>
        
        <button className={styles.finishBtn} onClick={onClose}>
          Finish
        </button>
      </div>
    </div>
  );
};

export default StarRating;