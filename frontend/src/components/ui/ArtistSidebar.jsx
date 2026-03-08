import styles from './ArtistSidebar.module.css';

export const ArtistSidebar = ({ name, image }) => (
  <aside className={styles.artistSidebar}>
    <div className={styles.imageContainer}>
      <img src={image} className={styles.artistPhoto} alt={name} />
    </div>
    <h3 className={styles.artistName}>{name}</h3>
  </aside>
);

export default ArtistSidebar;