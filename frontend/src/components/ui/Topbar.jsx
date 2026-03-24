import { useNavigate } from 'react-router-dom'
import styles from './Topbar.module.css';

const Topbar = ({ children, onUserProfile, onAchievements }) => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  }

  return (
    <div className={styles.topbar}>
      <div className={styles.leftSection}>
        {/* Home Button */}
        <button className={styles.iconButton} onClick={handleHome} aria-label="Home">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#FFFFFF">
            <path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"/>
          </svg>
        </button>
        
        <div className={styles.divider} />
        
        <img className={styles.logo} src='/assets/TapToPlay_team_logo_design.png' alt="Logo" />
      </div>

      <div className={styles.middleSection}>
        {children}
      </div>

      <div className={styles.rightSection}>
        {/* User Profile Button */}
        <button className={styles.iconButton} onClick={onUserProfile} aria-label="User Profile">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#FFFFFF">
            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-80q0-34 17.5-62.5T224-378q63-39 124-58.5T480-456q62 0 123 19.5t124 58.5q29 18 46.5 46.5T800-240v80H160Z"/>
          </svg>
        </button>

        {/* Achievements Button */}
        <button className={styles.iconButton} onClick={onAchievements} aria-label="Settings">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#FFFFFF">
            <path d="M292-120v-66.67h154.67v-140q-52.34-11-93.17-44.83T296-456q-74.33-8.33-125.17-61.83Q120-571.33 120-645.33V-688q0-27.67 19.5-47.17t47.17-19.5h96V-840h394.66v85.33h96q27.67 0 47.17 19.5T840-688v42.67q0 74-50.83 127.5Q738.33-464.33 664-456q-16.67 50.67-57.5 84.5t-93.17 44.83v140H668V-120H292Zm-9.33-406.67V-688h-96v42.67q0 42.66 27 75.16t69 43.5Zm394.66 0q42-11 69-43.5t27-75.16V-688h-96v161.33Z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Topbar;