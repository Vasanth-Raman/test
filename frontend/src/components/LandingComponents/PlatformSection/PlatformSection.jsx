import React from "react";
import styles from "./PlatformSection.module.css";
import { imageDataBottom, imageDataTop } from "../../../utils/constants";

const PlatformSection = () => {
  return (
    <div className={styles.platformContainer}>
      <div className={styles.imageSection}>
        <div className={styles.topImages}>
          {imageDataTop.map((item) => {
            return (
              <div key={item.id} className={styles.imageContainer}>
                <img src={item.icon} alt={item.alt} />
              </div>
            );
          })}
        </div>
        <div className={styles.bottomImages}>
          {imageDataBottom.map((item) => {
            return (
              <div key={item.id} className={styles.imageContainer}>
                <img src={item.icon} alt={item.alt} />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.textSection}>
        <h2>Integrate with any platform</h2>
        <p>
          Typebot offers several native integrations blocks as well as
          instructions on how to embed typebot on particular platforms
        </p>
      </div>
    </div>
  );
};

export default PlatformSection;
