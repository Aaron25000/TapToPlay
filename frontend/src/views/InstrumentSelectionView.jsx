import React from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from "../components/ui/Topbar";
import TextPill from "../components/ui/TextPill";
import styles from './InstrumentSelectionView.module.css';

const InstrumentSelectionView = ({ song, onHome, onSelectInstrument }) => {
  const navigate = useNavigate()
  const displayTitle = song ? song.title : "Song";

  return (
    <div className={styles.appContainer}>
      {/* Pass onHome to the Topbar to enable the Home icon/Logo functionality */}
      <Topbar onHome={onHome}>
        <TextPill text={`${displayTitle}`} />
      </Topbar>
      
      <div className={styles.viewContainer}>
        <h1 className={styles.title}>Choose an Instrument</h1>
        
        <div className={styles.instrumentContainer}>
          {/* Piano */}
          <button
            className={styles.instrumentButtonGroup}
            onClick={() => navigate('/Play')}
          >
            <div className={styles.iconCircle}>
              <img src="/assets/Piano Instrument.png" className={styles.instrumentIcon} alt="Piano" />
            </div>
            <img src="/assets/PianoButton.png" className={styles.labelImage} alt="Piano Text" />
          </button>

          {/* Drums */}
          <button 
            className={styles.instrumentButtonGroup} 
            onClick={() => onSelectInstrument('drums')}
          >
            <div className={styles.iconCircle}>
              <img src="/assets/Drums Instrument.png" className={styles.instrumentIcon} alt="Drums" />
            </div>
            <img src="/assets/DrumsButton.png" className={styles.labelImage} alt="Drums Text" />
          </button>

          {/* Guitar */}
          <button 
            className={styles.instrumentButtonGroup} 
            onClick={() => onSelectInstrument('guitar')}
          >
            <div className={styles.iconCircle}>
              <img src="/assets/Guitar Instrument.png" className={styles.instrumentIcon} alt="Guitar" />
            </div>
            <img src="/assets/GuitarButton.png" className={styles.labelImage} alt="Guitar Text" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstrumentSelectionView;