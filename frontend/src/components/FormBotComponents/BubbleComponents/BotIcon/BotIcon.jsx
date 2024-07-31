import React from "react";
import styles from "./BotIcon.module.css";
import BotPic from "../../../../assets/icons/bot-pic.svg";

const BotIcon = () => {
  return (
    <div className={styles.botLogo}>
      <img src={BotPic} alt="bot logo" />
    </div>
  );
};

export default BotIcon;
