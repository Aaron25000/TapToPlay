import { useEffect, useState } from "react";
import { Piano } from "../components/insturments/Piano";
import TextPill from "../components/ui/TextPill";
import Topbar from "../components/ui/Topbar";
import { getSongNotes } from "../services/musicService";
import styles from './PianoView.module.css';

const PianoView = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [songNotes, setSongNotes] = useState([]);


  console.log(songNotes)

  useEffect(() => {
    getSongNotes('seven-nation-army')
      .then(data => {
        setSongNotes(data.notes);
      })
      .catch(err => console.error("Could not load song", err));
  }, [])

  const handleNextNote = () => {
    if (songNotes.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % songNotes.length);
  };

  return (
    <div className={styles.viewContainer}>
      <Topbar>
        <TextPill text={'Song Name'} />
      </Topbar>
      <div
        className={styles.pianoContainer}
        onClick={handleNextNote}
        >
        <Piano expectedNote={songNotes[currentIndex]}/>
      </div>
    </div>
  );
};

export default PianoView;