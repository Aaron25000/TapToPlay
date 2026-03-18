import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextPill from "../components/ui/TextPill";
import Topbar from "../components/ui/Topbar";
import ProgressBar from "../components/ui/ProgressBar";
import StarRating from "../components/ui/StarRating";
import { getSongNotes } from "../services/musicService";
import styles from './PlayView.module.css';

const PlayView = ({ song, InstrumentComponent }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [songNotes, setSongNotes] = useState([]);
  const [attemptHistory, setAttemptHistory] = useState([]);

  useEffect(() => {
    // Dynamically load notes based on the song passed via props
    if (song?.id) {
      getSongNotes(song.id)
        .then(data => {
          const notes = data.notes || [];
          setSongNotes(notes);
          setAttemptHistory(new Array(notes.length).fill('default'));
          setCurrentIndex(0); // Reset if song changes
        })
        .catch(err => console.error("Could not load song", err));
    }
  }, [song]);

  const handleNoteResult = (isCorrect) => {
    if (songNotes.length === 0 || currentIndex >= songNotes.length) return;

    setAttemptHistory((prev) => {
      const newHistory = [...prev];
      newHistory[currentIndex] = isCorrect ? 'green' : 'yellow';
      return newHistory;
    });

    setCurrentIndex((prev) => prev + 1);
  };

  const progressSegments = attemptHistory.map((status) => ({ status }));
  const isFinished = songNotes.length > 0 && currentIndex >= songNotes.length;
  const correctNotes = attemptHistory.filter(status => status === 'green').length;

  return (
    <div className={styles.viewContainer}>
      <Topbar onHome={() => navigate('/')}>
        <TextPill text={song?.title || 'Loading...'} />
      </Topbar>

      <div className={styles.progressWrapper}>
        <ProgressBar segments={progressSegments} />
      </div>

      <div className={styles.instrumentContainer}>
        {/* We render the passed component here */}
        <InstrumentComponent 
          expectedNote={songNotes[currentIndex]} 
          onNotePlayed={handleNoteResult} 
        />
      </div>

      {isFinished &&
        <StarRating
          value={correctNotes}
          max={songNotes.length}
          onClose={() => navigate('/')}
        />
      }
    </div>
  );
};

export default PlayView;