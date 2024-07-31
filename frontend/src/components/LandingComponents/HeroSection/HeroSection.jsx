import React from "react";
import styles from "./HeroSection.module.css";
import HeroTop from "../HeroTop/HeroTop";
import HeroBottom from "../HeroBottom/HeroBottom";

const HeroSection = () => {
  return (
    <div className={styles.heroSection}>
      <HeroTop />
      <HeroBottom />
    </div>
  );
};

export default HeroSection;
