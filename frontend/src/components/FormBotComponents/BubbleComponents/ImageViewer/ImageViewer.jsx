import React from "react";
import styles from "./ImageViewer.module.css";

const ImageViewer = ({ src }) => {
  return (
    <div className={styles.imageContainer}>
      <img src={src} alt="Picture in bot chat" />
    </div>
  );
};

export default ImageViewer;
