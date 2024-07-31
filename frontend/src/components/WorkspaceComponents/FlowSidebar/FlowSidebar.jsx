import React from "react";
import styles from "./FlowSidebar.module.css";
import { bubbleData, inputData } from "../../../utils/constants";
import { useDispatch } from "react-redux";
import { addFlowItem } from "../../../redux/slices/formFlowSlice";

const FlowSidebar = () => {
  const dispatch = useDispatch();

  const handleClick = (bubbleOrInput, type) => {
    dispatch(addFlowItem({ bubbleOrInput, type, data: "" }));
  };

  return (
    <div className={styles.sidebarWrapper}>
      <div className={styles.bubbleContainer}>
        <h1>Bubbles</h1>
        <div className={styles.buttonsGrid}>
          {bubbleData.map(({ id, icon, alt, name, bubbleOrInput, type }) => {
            return (
              <div
                key={id}
                className={styles.singleButton}
                onClick={() => handleClick(bubbleOrInput, type)}
              >
                <img src={icon} alt={alt} />
                <p>{name}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.inputContainer}>
        <h1>Inputs</h1>
        <div className={styles.buttonsGrid}>
          {inputData.map(({ id, icon, alt, name, bubbleOrInput, type }) => {
            return (
              <div
                key={id}
                className={styles.singleButton}
                onClick={() => handleClick(bubbleOrInput, type)}
              >
                <img src={icon} alt={alt} />
                <p>{name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FlowSidebar;
