import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topbar from "../components/ui/Topbar";
import SearchBar from "../components/ui/SearchBar";
import MusicCard from "../components/ui/MusicCard";
import UserProfileDialog from "../components/dialog/UserProfileDialog";
import AchievementsDialog from '../components/dialog/AchievementsDialog';
import { fetchSongs, fetchUsers } from "../api/songs"
import styles from './SongSelectionView.module.css';
import SelectInstrumentDialog from "../components/dialog/SelectInstrumentDialog";

const SongSelectionView = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState();
  const [songs, setSongs] = useState([]);

  const [showProfile, setShowProfile] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSelectInstrument, setShowSelectInstrument] = useState(false);

  const [selectedSong, setSelectedSong] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const userData = await fetchUsers()
      const songsData = await fetchSongs()
      setUser(userData[0])
      setSongs(songsData);
    };
    loadData();
  }, [])


  const openProfile = () => setShowProfile(true);
  const closeProfile = () => setShowProfile(false);

  const handleSelectSong = (song) => {
    setSelectedSong(song);
    setShowSelectInstrument(true);
  };

  const handleInstrumentSelect = (instrumentId) => {
    if (selectedSong && selectedSong._id) {
      navigate(`/play/${selectedSong._id}/${instrumentId}`);
    }
    setShowSelectInstrument(false);
  };

  return (
    <div className={styles.mainWrapper}>
      <Topbar
        onUserProfile={openProfile}
        onAchievements={() => setShowAchievements(true)}
      >
        <span className={styles.topbarTitle}>Songs...</span>
      </Topbar>

      <main className={styles.viewContainer}>
        <SearchBar />
        <div className={styles.grid}>
          {songs.map((song) => (
            <MusicCard
              key={song.id}
              song={song}
              onPlay={() => handleSelectSong(song)}
            />
          ))}
        </div>
      </main>

      {showProfile && (
        <UserProfileDialog user={user} onClose={closeProfile} />
      )}
      {showAchievements && (
        <AchievementsDialog onClose={() => setShowAchievements(false)} />
      )}
      {showSelectInstrument && (
        <SelectInstrumentDialog onSelect={handleInstrumentSelect} onClose={() => setShowSelectInstrument(false)} />
      )}
    </div>
  );
};

export default SongSelectionView;