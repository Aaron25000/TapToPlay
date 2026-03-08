import styles from './ProgressBar.module.css';

const ProgressBar = ({ segments = [] }) => {
  return (
    <div className={styles.progressContainer}>
      {segments.map((segment, index) => {
        // Determine class based on the status/color
        let statusClass = styles.default;
        if (segment.status === 'green') statusClass = styles.green;
        if (segment.status === 'yellow') statusClass = styles.yellow;

        return (
          <div
            key={index}
            className={`${styles.segment} ${statusClass}`}
          />
        );
      })}
    </div>
  );
};

export default ProgressBar;