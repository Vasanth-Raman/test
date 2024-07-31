import React from "react";
import styles from "./HeroBottom.module.css";
import Banner from "../../../assets/images/hero-banner.png";

const HeroBottom = () => {
  return (
    <div className={styles.heroBottom}>
      <div className={styles.orangeGradient}></div>
      <div className={styles.blueGradient}></div>

      <div className={styles.bannerContainer}>
        <img src={Banner} alt="hero section banner" />
      </div>
    </div>
  );
};

export default HeroBottom;
