import React from 'react';
import Topbar from "../components/ui/Topbar";
import TextPill from "../components/ui/TextPill";
import styles from './InstrumentSelectionView.module.css';

const InstrumentSelectionView = ({ song, onBack, onSelectInstrument }) => {
  const displayTitle = song ? song.title : "Song";

  return (
    <div className={styles.appContainer}>
      <Topbar>
        <div className={styles.topbarContent}>
          <button className={styles.backButton} onClick={onBack}>
            <span>← Back</span>
          </button>
          <TextPill text={`Playing: ${displayTitle}`} />
        </div>
      </Topbar>

      <main className={styles.instrumentSelectionPage}>
        <h1 className={styles.title}>Choose an Instrument</h1>

        <div className={styles.instrumentContainer}>
          {/* Piano - Using string paths instead of imports */}
          <button
            className={styles.instrumentButtonGroup}
            onClick={() => onSelectInstrument('piano')}
          >
            <div className={styles.iconCircle}>
              <img src="/assets/Piano Instrument.png" className={styles.instrumentIcon} alt="Piano" />
            </div>
            <img src="/assets/PianoButton.png" className={styles.labelImage} alt="Piano Text" />
          </button>

          {/* Drums */}
          <button className={styles.instrumentButtonGroup}>
            <div className={styles.iconCircle}>
              <img src="/assets/Drums Instrument.png" className={styles.instrumentIcon} alt="Drums" />
            </div>
            <img src="/assets/DrumsButton.png" className={styles.labelImage} alt="Drums Text" />
          </button>

          {/* Guitar */}
          <button className={styles.instrumentButtonGroup}>
            <div className={styles.iconCircle}>
              <img src="/assets/Guitar Instrument.png" className={styles.instrumentIcon} alt="Guitar" />
            </div>
            <img src="/assets/GuitarButton.png" className={styles.labelImage} alt="Guitar Text" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default InstrumentSelectionView;