import styles from './Topbar.module.css';

const Topbar = ({ children, onHome, onUserProfile }) => {
  return (
    <div className={styles.topbar}>
      <div className={styles.leftSection}>
        {/* Home Button */}
        <button className={styles.iconButton} onClick={onHome} aria-label="Home">
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

        <button className={styles.iconButton} aria-label="Settings">
          <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#FFFFFF">
            <path d="m382-80-18.67-126.67q-17-6.33-34.83-16.66-17.83-10.34-32.17-21.67L178-192.33 79.33-365l106.34-78.67q-1.67-8.33-2-18.16-.34-9.84-.34-18.17 0-8.33.34-18.17.33-9.83 2-18.16L79.33-595 178-767.67 296.33-715q14.34-11.33 32.34-21.67 18-10.33 34.66-16L382-880h196l18.67 126.67q17 6.33 35.16 16.33 18.17 10 31.84 22L782-767.67 880.67-595l-106.34 77.33q1.67 9 2 18.84.34 9.83.34 18.83 0 9-.34 18.5Q776-452 774-443l106.33 78-98.66 172.67-118-52.67q-14.34 11.33-32 22-17.67 10.67-35 16.33L578-80H382Zm98.67-266.67q55.33 0 94.33-39T614-480q0-55.33-39-94.33t-94.33-39q-55.67 0-94.5 39-38.84 39-38.84 94.33t38.84 94.33q38.83 39 94.5 39Z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Topbar;