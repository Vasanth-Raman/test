import React from "react";
import styles from "./DemoModelBottom.module.css";
import OrangeImage from "../../../assets/images/orange-demo-image.png";

const DemoModelBottom = () => {
  return (
    <div className={styles.topContainer}>
      <div className={styles.contentConatiner}>
        <div className={styles.imageConatiner}>
          <img src={OrangeImage} alt="blue border image" />
        </div>
        <div className={styles.textContainer}>
          <h1>Embed it in a click</h1>
          <p>
            Embedding your typebot in your applications is a walk in the park.
            Typebot gives you several step-by-step platform- specific
            instructions. Your typebot will always feel "native".
          </p>
        </div>
      </div>
    </div>
  );
};

export default DemoModelBottom;
