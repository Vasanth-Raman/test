import React from "react";
import styles from "./DemoModelTop.module.css";
import BlueImage from "../../../assets/images/blue-demo-image.png";

const DemoModelTop = () => {
  return (
    <div className={styles.topContainer}>
      <div className={styles.contentConatiner}>
        <div className={styles.imageConatiner}>
          <img src={BlueImage} alt="blue border image" />
        </div>
        <div className={styles.textContainer}>
          <h1>Easy building experience</h1>
          <p>
            All you have to do is drag and drop blocks to create your app. Even
            if you have custom needs, you can always add custom code.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoModelTop;
