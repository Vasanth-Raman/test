import React from "react";
import styles from "./LazyLoader.module.css"; // Import CSS module

const LazyLoader = () => {
  return (
    <div className={styles.loadingPage}>
      <div className={styles.wave}>
        <div className={styles.waveBar}></div>
        <div className={styles.waveBar}></div>
        <div className={styles.waveBar}></div>
        <div className={styles.waveBar}></div>
        <div className={styles.waveBar}></div>
      </div>
      <h2 className={styles.loadingText}>Loading...</h2>
    </div>
  );
};

export default LazyLoader;
