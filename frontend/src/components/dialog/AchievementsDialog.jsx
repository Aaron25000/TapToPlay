import Dialog from "./Dialog";
import styles from "./AchievementsDialog.module.css";

const AchievementsDialog = ({ onClose }) => {
  const achievements = [
    { id: 1, title: "First Note", desc: "Complete your first song tutorial.", icon: "/assets/FirstNote.svg" },
    { id: 2, title: "Piano Virtuoso", desc: "Achieve a 100% accuracy on any song.", icon: "/assets/PianoVirtuoso.svg" },
    { id: 3, title: "Double Time", desc: "Complete a song on Hard Mode.", icon: "/assets/DoubleTime.svg" },
    { id: 4, title: "Soul of Shawn", desc: "Successfully play all 3 tracks in the Shawn Mendes Playlist.", icon: "/assets/Guitar.svg" },
    { id: 5, title: "On Fire", desc: "Practice for 7 days in a row.", icon: "/assets/OnFire.svg" },
    { id: 6, title: "Ivory Master", desc: "Unlock all available instruments.", icon: "/assets/IvoryMaster.svg" }
  ];

  return (
    <Dialog
      title='Achievements'
      onClose={onClose}
    >
      <div className={styles.achievementsGrid}>
        {achievements.map((item) => (
          <div key={item.id} className={styles.achievementCard}>
            <div className={styles.iconCircle}>
              <img 
                src={item.icon} 
                alt={item.title} 
                className={styles.achievementIconImg} 
              />
            </div>
            <h2 className={styles.cardTitle}>{item.title}</h2> 
            <p className={styles.cardDescription}>{item.desc}</p>
          </div>
        ))}
      </div>
    </Dialog>
  );
};

export default AchievementsDialog;