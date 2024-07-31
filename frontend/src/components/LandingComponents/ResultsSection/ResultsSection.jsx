import React from "react";
import styles from "./ResultsSection.module.css";
import UserIcon from "../../../assets/images/user-logo.png";

const ResultsSection = () => {
  return (
    <div className={styles.resultWrapper}>
      <div className={styles.resultContainer}>
        <div className={styles.topPart}>
          <h2>Collect results in real-time</h2>
          <p>
            One of the main advantage of a chat application is that you collect
            the user's responses on each question. <br />
            <span>You won't lose any valuable data.</span>
          </p>
        </div>
        <div className={styles.bottomPart}>
          <div className={styles.bottomInner}>
            <div className={styles.top}>
              <div className={styles.topLeft}>
                <img src={UserIcon} alt="user logo" />
              </div>
              <div className={styles.topRight}>
                <span className={styles.textBg}>
                  <p>
                    As you answer this chat, you'll see your result in the real
                    Airtable spreadsheet
                  </p>
                </span>

                <span className={styles.textBg}>
                  <p>You can think of it as a guestbook 😂</p>
                </span>
                <span className={styles.textBg}>
                  <p>Ready?</p>
                </span>
              </div>
            </div>
            <div className={styles.down}>
              <div className={styles.dot}></div>
              <button>Yeah!</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;
