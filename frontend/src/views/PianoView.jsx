import { Piano } from "../components/insturments/Piano";
import TextPill from "../components/ui/TextPill";
import Topbar from "../components/ui/Topbar";
import styles from './PianoView.module.css';

const PianoView = () => {
  return (
    <div className={styles.viewContainer}>
      <Topbar>
        <TextPill text={'Song Name'} />
      </Topbar>
      <div className={styles.pianoContainer}>
        <Piano />
      </div>
    </div>
  );
};

export default PianoView;