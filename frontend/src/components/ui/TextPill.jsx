import styles from './TextPill.module.css'

const TextPill = ({ text }) => {
  return (
    <div className={styles.pill}>
      <span>{text}</span>
    </div>
  );
};

export default TextPill;