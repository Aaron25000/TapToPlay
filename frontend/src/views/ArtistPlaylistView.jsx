import { ArtistSidebar } from '../components/ui/ArtistSidebar';
import { SongRow } from '../components/ui/SongRow';
import styles from './ArtistPlaylistView.module.css';

const ArtistPlaylistView = () => {
  const artistData = {
    name: "Shawn Mendes",
    image: "https://placehold.co/300x300/222222/ffffff?text=Artist",
    songs: [
      { title: "Stitches", difficulty: "Easy", levelColorClass: "easy" },
      { title: "Treat You Better", difficulty: "Easy", levelColorClass: "easy" },
      { title: "There's Nothing Holdin' Me Back", difficulty: "Medium", levelColorClass: "medium" },
      { title: "Mercy", difficulty: "Medium", levelColorClass: "medium" },
      { title: "In My Blood", difficulty: "Hard", levelColorClass: "hard" },
      { title: "Wonder", difficulty: "Hard", levelColorClass: "hard" }
    ]
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.mainLayout}>
        <ArtistSidebar name={artistData.name} image={artistData.image} />
        
        <main className={styles.playlistContainer}>
          <h2 className={styles.header}>Playlist</h2>
          <div className={styles.songList}>
            {artistData.songs.map((song, index) => (
              <SongRow key={index} song={song} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ArtistPlaylistView;