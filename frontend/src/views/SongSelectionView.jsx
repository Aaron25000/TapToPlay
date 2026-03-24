import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/ui/Topbar";
import MusicCard from "../components/ui/MusicCard";
import UserProfile from "../components/ui/UserProfile";
import AchievementsDialog from '../components/dialog/AchievementsDialog';
import styles from './SongSelectionView.module.css';

const SongSelectionView = ({ onSelectSong }) => {
  const navigate = useNavigate()
  const [showProfile, setShowProfile] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);

  const user = {
    username: 'MusicLover',
    email: 'musiclover@example.com'
  };

  const openProfile = () => setShowProfile(true);
  const closeProfile = () => setShowProfile(false);

  const handleSelectSong = (song) => {
    navigate(`/instrument/${song.id}`);
  };

  const songs = [
    { id: 1, title: 'Dancing Queen', artist: 'Abba', image: '/assets/image/Abba.webp', difficulty: 'easy' },
    { id: 2, title: 'Treat You Better', artist: 'Shawn Mendes', image: '/assets/image/Shawn-Mendes.jpg', difficulty: 'medium' },
    { id: 3, title: 'Hey Jude', artist: 'The Beatles', image: '/assets/image/beatles.jpg', difficulty: 'hard' },
    { id: 4, title: 'Bohemian Rhapsody', artist: 'Queen', image: '/assets/image/Queen.jpg', difficulty: 'medium' },
    { id: 5, title: 'Perfect', artist: 'Ed Sheeran', image: '/assets/image/Ed_Sheeran.webp', difficulty: 'easy' },
    { id: 6, title: 'Closer', artist: 'The Chainsmokers', image: '/assets/image/The-Chainsmokers.webp', difficulty: 'medium' },
    { id: 7, title: 'Bad Day', artist: 'Daniel Powter', image: '/assets/image/david-powter-bad-day.webp', difficulty: 'easy' },
    { id: 8, title: 'Cold', artist: 'Coldplay', image: '/assets/image/coldplay-band-facts.jpg', difficulty: 'medium' },
    { id: 9, title: 'Levels', artist: 'Avicii', image: '/assets/image/Avicii.webp', difficulty: 'hard' },
    { id: 10, title: 'Theme from Jurassic Park', artist: 'John Williams', image: '/assets/image/john-williams.jpeg', difficulty: 'easy' }
  ];

  return (
    <div className={styles.mainWrapper}>
      <Topbar
        onUserProfile={openProfile}
        onAchievements={() => setShowAchievements(true)}
      >
        <span className={styles.topbarTitle}>Song Selection</span>
      </Topbar>

      <main className={styles.viewContainer}>
        <div className={styles.grid}>
          {songs.map((song) => (
            <MusicCard
              key={song.id}
              song={song}
              onClick={() => handleSelectSong(song)}
            />
          ))}
        </div>
      </main>

      {showProfile && (
        <UserProfile user={user} onClose={closeProfile} />
      )}
      {showAchievements && (
        <AchievementsDialog onClose={() => setShowAchievements(false)} />
      )}
    </div>
  );
};

export default SongSelectionView;