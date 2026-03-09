import { useEffect, useState } from "react";
import { Piano } from "../components/insturments/Piano";
import TextPill from "../components/ui/TextPill";
import Topbar from "../components/ui/Topbar";
import ProgressBar from "../components/ui/ProgressBar";
import { getSongNotes } from "../services/musicService";
import styles from './PianoView.module.css';
import StarRating from "../components/ui/StarRating";

const PianoView = ({ song, onHome }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [songNotes, setSongNotes] = useState([]);
  const [attemptHistory, setAttemptHistory] = useState([]);

  useEffect(() => {
    getSongNotes('seven-nation-army')
      .then(data => {
        const notes = data.notes || [];
        setSongNotes(notes);
        setAttemptHistory(new Array(notes.length).fill('default'));
      })
      .catch(err => console.error("Could not load song", err));
  }, []);

  const handleNoteResult = (isCorrect) => {
    if (songNotes.length === 0 || currentIndex >= songNotes.length) return;

    // Update the history based on the piano's feedback
    setAttemptHistory((prev) => {
      const newHistory = [...prev];
      newHistory[currentIndex] = isCorrect ? 'green' : 'yellow';
      return newHistory;
    });

    // Move to the next note automatically after a short delay or instantly
    setCurrentIndex((prev) => prev + 1);
  };

  const progressSegments = attemptHistory.map((status) => ({
    status: status
  }));

  const isFinished = songNotes.length > 0 && currentIndex >= songNotes.length;
  const correctNotes = attemptHistory.filter(status => status === 'green').length;

  return (
    <div className={styles.viewContainer}>
      <Topbar onHome={onHome}>
        <TextPill text={song?.title || 'Song'} />
      </Topbar>

      <div className={styles.progressWrapper}>
        <ProgressBar segments={progressSegments} />
      </div>

      {/* This container now handles the centering logic */}
      <div className={styles.pianoContainer}>
        <Piano 
          expectedNote={songNotes[currentIndex]} 
          onNotePlayed={handleNoteResult} 
        />
      </div>
      {isFinished &&
        <StarRating
          value={correctNotes}
          max={songNotes.length}
          onClose={onHome}
        />
      }
    </div>
  );
};

export default PianoView;