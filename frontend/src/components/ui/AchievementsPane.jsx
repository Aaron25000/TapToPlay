import styles from './AchievementsPane.module.css';

const AchievementsPane = ({ isOpen, onClose }) => {
  const trophies = [
    { id: 1, title: 'First Steps', earned: true },
    { id: 2, title: 'Piano Pro', earned: false },
    { id: 3, title: 'Maestro', earned: false },
  ];

  return (
    <>
      {/* Clicking the dark area toggles it closed */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.active : ''}`} 
        onClick={onClose} 
      />
      
      <div className={`${styles.pane} ${isOpen ? styles.open : ''}`}>
        <h2 className={styles.title}>Achievements</h2>
        
        <div className={styles.list}>
          {trophies.map(t => (
            <div key={t.id} className={`${styles.item} ${!t.earned ? styles.locked : ''}`}>
              <span className={styles.icon}>{t.earned ? '🏆' : '🔒'}</span>
              <span className={styles.label}>{t.title}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AchievementsPane;