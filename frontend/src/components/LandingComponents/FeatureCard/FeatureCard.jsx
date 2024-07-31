import React from "react";
import styles from "./FeatureCard.module.css";

const FeatureCard = ({ data }) => {
  const { icon, title, subText } = data;
  return (
    <div className={styles.cardContainer}>
      <h4>{title}</h4>
      <p>{subText}</p>
      <div className={styles.logoContainer}>
        <img src={icon} alt={title} />
      </div>
    </div>
  );
};

export default FeatureCard;
