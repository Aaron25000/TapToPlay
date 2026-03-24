import styles from './Dialog.module.css'

const Dialog = ({ title, onClose, children }) => {
  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContainer}>
        <div className={styles.dialogHeader}>
          <h1>{title}</h1>
          <button
            className={styles.dialogCloseBtn}
            onClick={onClose}
          >✕</button>
        </div>
        <div className={styles.dialogContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dialog;