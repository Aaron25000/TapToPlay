import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Topbar from "../components/ui/Topbar";
import SearchBar from "../components/ui/SearchBar";
import MusicCard from "../components/ui/MusicCard";
import Login_page from "../components/dialog/login";
import UserProfileDialog from "../components/dialog/UserProfileDialog";
import AchievementsDialog from "../components/dialog/AchievementsDialog";
import SelectInstrumentDialog from "../components/dialog/SelectInstrumentDialog";

import { fetchSongs, fetchUsers, searchSongs } from "../api/songs";

import styles from "./SongSelectionView.module.css";

const SongSelectionView = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [songs, setSongs] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showSelectInstrument, setShowSelectInstrument] = useState(false);

  const [selectedSong, setSelectedSong] = useState(null);

  // Load data + search logic
  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await fetchUsers();
        setUser(userData?.[0]);

        if (searchQuery || difficulty) {
          const results = await searchSongs(searchQuery, difficulty);
          setSongs(results);
        } else {
          const songsData = await fetchSongs();
          setSongs(songsData);
        }
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    loadData();
  }, [searchQuery, difficulty]);

  const handleLoginSuccess = (loginData) => {
    console.log("Login User:", loginData.username);
    setShowLogin(false);
  };

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
        onLoginClick={() => setShowLogin(true)}
        onUserProfile={openProfile}
        onAchievements={() => setShowAchievements(true)}
      >
        <span className={styles.topbarTitle}>Songs...</span>
      </Topbar>

      <main className={styles.viewContainer}>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />

        <div className={styles.grid}>
          {songs.map((song) => (
            <MusicCard
              key={song._id}
              song={song}
              onPlay={() => handleSelectSong(song)}
            />
          ))}
        </div>
      </main>

      {showLogin && (
        <Login_page
          onLogin={handleLoginSuccess}
          onClose={() => setShowLogin(false)}
        />
      )}

      {showProfile && (
        <UserProfileDialog user={user} onClose={closeProfile} />
      )}

      {showAchievements && (
        <AchievementsDialog onClose={() => setShowAchievements(false)} />
      )}

      {showSelectInstrument && (
        <SelectInstrumentDialog
          onSelect={handleInstrumentSelect}
          onClose={() => setShowSelectInstrument(false)}
        />
      )}
    </div>
  );
};

export default SongSelectionView;