import Dialog from "./Dialog";
import styles from "./SelectInstrumentDialog.module.css";

const SelectInstrumentDialog = ({ onSelect, onClose }) => {

  const instruments = [
    { id: "piano", name: "Piano", icon: "🎹" },
    { id: "drums", name: "Drums", icon: "🥁" },
    { id: "guitar", name: "Guitar", icon: "🎸" },
  ];

  return (
    <Dialog title="Choose an Instrument" onClose={onClose}>
      <ul className={styles.instrumentList}>
        {instruments.map((inst) => (
          <li key={inst.id} className={styles.instrumentItem} onClick={() => onSelect(inst.id)}>
            <div className={styles.glassIcon}>
              <span>{inst.icon}</span>
            </div>
            <span className={styles.instrumentName}>{inst.name}</span>
          </li>
        ))}
      </ul>
    </Dialog>
  );
};

export default SelectInstrumentDialog;