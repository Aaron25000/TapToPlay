import React, { useEffect, useState } from "react";
import { PIANO_NOTES, playNote } from "../../util/sound";
import { fetchSongs } from "../api"; // import our service
import styles from "./Piano.module.css";

const Piano = ({ expectedNote }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const whiteKeys = ["C", "D", "E", "F", "G", "A", "B", "C2", "D2", "E2"];
  const hasSharp = (key) => !["E", "B", "E2"].includes(key);

  useEffect(() => {
    // Fetch songs from backend
    const loadSongs = async () => {
      const data = await fetchSongs();
      setSongs(data);
      if (data.length > 0) setCurrentSong(data[0]); // pick first song for demo
    };
    loadSongs();
  }, []);

  const handlePress = (physicalKey) => {
    const noteToPlay = expectedNote ? expectedNote : physicalKey;
    if (PIANO_NOTES[noteToPlay]) playNote(PIANO_NOTES[noteToPlay]);
  };

  return (
    <div className={styles.pianoContainer}>
      <div className={styles.piano}>
        {whiteKeys.map((note, index) => {
          const sharpNote = `${note}#`;
          const isHighlighted = expectedNote === note;
          const isSharpHighlighted = expectedNote === sharpNote;

          return (
            <div key={note} className={styles.keyWrapper}>
              <button
                className={`${styles.whiteKey} ${isHighlighted ? styles.active : ""}`}
                onMouseDown={() => handlePress(note)}
              >
                <span>{note}</span>
              </button>
              {index < whiteKeys.length - 1 && hasSharp(note) && (
                <button
                  className={`${styles.blackKey} ${isSharpHighlighted ? styles.active : ""}`}
                  onMouseDown={() => handlePress(sharpNote)}
                ></button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Piano };