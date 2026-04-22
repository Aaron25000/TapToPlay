import styles from "./SearchBar.module.css";

const SearchBar = ({
  value,
  onChange,
  difficulty,
  onDifficultyChange
}) => {

  const categories = ["All", "easy", "medium", "hard"];

  return (
    <div className={styles.searchSection}>

      {/* SEARCH INPUT */}
      <div className={styles.searchContainer}>
        <input
          className={styles.searchInput}
          placeholder="Search songs, artists..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />

        <button className={styles.searchBtn}>
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#fff">
            <path d="M792-120.67 532.67-380q-30 25.33-69.67 39.67Q423.33-326 378.67-326q-108.34 0-183.5-75.17Q120-476.33 120-583.33t75.17-182.17q75.16-75.17 182.83-75.17 107 0 181.83 75.17 74.84 75.17 74.84 182.17 0 43.33-14 83-14 39.66-40.67 73l260 258.66-48 48Zm-414-272q79 0 134.5-55.83T568-583.33q0-79-55.5-134.84Q457-774 378-774q-79.67 0-135.5 55.83-55.83 55.84-55.83 134.84T242.5-448.5q55.83 55.83 135.5 55.83Z"/>
          </svg>
        </button>
      </div>

      {/* FILTERS */}
      <div className={styles.filterScroll}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterChip} ${difficulty === cat || (cat === "All" && !difficulty) ? styles.filterChipActive : ""}`}
            onClick={() => onDifficultyChange(cat === "All" ? "" : cat)}
          >
            {cat}
          </button>
        ))}
      </div>

    </div>
  );
};

export default SearchBar;