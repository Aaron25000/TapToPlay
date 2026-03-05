import Topbar from "../components/ui/Topbar";
import TextPill from "../components/ui/TextPill";
import pianoImg from '../assets/Piano Instrument.png';
import drumsImg from '../assets/Drums Instrument.png';
import guitarImg from '../assets/Guitar Instrument.png';
import pianoButton from '../assets/PianoButton.png';
import drumsButton from '../assets/DrumsButton.png';
import guitarButton from '../assets/GuitarButton.png';

import styles from './InstrumentSelectionView.module.css';

const InstrumentSelectionView = () => {
  return (
    <div className={styles.appContainer}>
      <Topbar>
        <TextPill text={'Select Mode'} />
      </Topbar>

      <main className={styles.instrumentSelectionPage}>
        <h1 className={styles.title}>Choose an Instrument</h1>

        <div className={styles.instrumentContainer}>
          {/* Piano */}
          <button className={styles.instrumentButtonGroup} onClick={() => console.log("Piano clicked")}>
            <img src={pianoImg} className={styles.instrumentIcon} alt="Piano Icon" />
            <img src={pianoButton} className={styles.labelImage} alt="Piano Text" />
          </button>

          {/* Drums */}
          <button className={styles.instrumentButtonGroup} onClick={() => console.log("Drums clicked")}>
            <img src={drumsImg} className={styles.instrumentIcon} alt="Drums Icon" />
            <img src={drumsButton} className={styles.labelImage} alt="Drums Text" />
          </button>

          {/* Guitar */}
          <button className={styles.instrumentButtonGroup} onClick={() => console.log("Guitar clicked")}>
            <img src={guitarImg} className={styles.instrumentIcon} alt="Guitar Icon" />
            <img src={guitarButton} className={styles.labelImage} alt="Guitar Text" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default InstrumentSelectionView;