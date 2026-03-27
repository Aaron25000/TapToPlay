import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextPill from "../components/ui/TextPill";
import Topbar from "../components/ui/Topbar";
import ProgressBar from "../components/ui/ProgressBar";
import StarRating from "../components/ui/StarRating";

import { Piano } from '../components/insturments/Piano';
import { Drums } from "../components/insturments/Drums";

import { fetchSongById } from "../api/songs";
import styles from './PlayView.module.css';

const INSTRUMENT_COMPONENTS = {
  piano: Piano,
  drums: Drums
};

const PlayView = () => {
  const { songId, instrumentId } = useParams();
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [song, setSong] = useState(null);
  const [attemptHistory, setAttemptHistory] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const songData = await fetchSongById(songId);
      if (songData) {
        setSong(songData);
        // Correctly initialize based on the notes array inside the song object
        setAttemptHistory(new Array(songData.notes?.length || 0).fill('default'));
      }
    };
    loadData();
  }, [songId]);

  const handleNoteResult = (isCorrect) => {
    // Guard against null song or out of bounds
    if (!song?.notes || currentIndex >= song.notes.length) return;

    setAttemptHistory((prev) => {
      const newHistory = [...prev];
      newHistory[currentIndex] = isCorrect ? 'green' : 'yellow';
      return newHistory;
    });

    setCurrentIndex((prev) => prev + 1);
  };

  // Guard against invalid instrument in URL
  const SelectedInstrument = INSTRUMENT_COMPONENTS[instrumentId?.toLowerCase()] || Piano;

  // Fixed typo: .length
  const totalNotes = song?.notes?.length || 0; 
  const isFinished = totalNotes > 0 && currentIndex >= totalNotes;
  const correctNotes = attemptHistory.filter(status => status === 'green').length;

  return (
    <div className={styles.viewContainer}>
      <Topbar onHome={() => navigate('/')}>
        <TextPill text={song?.title || 'Loading...'} />
      </Topbar>

      <div className={styles.progressWrapper}>
        <ProgressBar segments={attemptHistory.map(status => ({ status }))} />
      </div>

      <div className={styles.instrumentContainer}>
        {song ? (
          <SelectedInstrument
            expectedNote={song?.notes?.[currentIndex]?.note || ""}
            onNotePlayed={(isCorrect) => handleNoteResult(isCorrect)}
          />
        ) : (
          <div className={styles.loader}>Loading Music...</div>
        )}
      </div>

      {isFinished &&
        <StarRating
          value={correctNotes}
          max={totalNotes} // Changed from song.length to totalNotes
          onClose={() => navigate('/')}
        />
      }
    </div>
  );
};

export default PlayView;