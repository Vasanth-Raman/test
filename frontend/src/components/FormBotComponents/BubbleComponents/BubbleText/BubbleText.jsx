import React from "react";
import styles from "./BubbleText.module.css";

const BubbleText = ({ text }) => {
  return (
    <div className={styles.textContainer}>
      <p>{text}</p>
    </div>
  );
};

export default BubbleText;
