import React, { useEffect, useState } from "react";
import styles from "./RatingInput.module.css";
import SendArrow from "../../../../assets/icons/send-arrow.svg";

const RatingInput = ({ title, onUserInput }) => {
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState(0);
  const [error, setError] = useState(false);

  const handleRating = (value) => {
    if (!disabled) {
      setSelected(value);
      setError(false);
    }
  };

  const handleSubmit = () => {
    if (selected === 0) {
      setError(true);
      return;
    }

    setDisabled(true);
    onUserInput(selected);
  };

  return (
    <div className={styles.ratingWrapper}>
      <div className={disabled ? styles.disabled : styles.ratingContainer}>
        <span
          className={selected === 1 ? styles.selectedValue : styles.ratingValue}
          onClick={() => handleRating(1)}
        >
          1
        </span>
        <span
          className={selected === 2 ? styles.selectedValue : styles.ratingValue}
          onClick={() => handleRating(2)}
        >
          2
        </span>
        <span
          className={selected === 3 ? styles.selectedValue : styles.ratingValue}
          onClick={() => handleRating(3)}
        >
          3
        </span>
        <span
          className={selected === 4 ? styles.selectedValue : styles.ratingValue}
          onClick={() => handleRating(4)}
        >
          4
        </span>
        <span
          className={selected === 5 ? styles.selectedValue : styles.ratingValue}
          onClick={() => handleRating(5)}
        >
          5
        </span>
      </div>
      <div
        className={disabled ? styles.disabledArrow : styles.arrowImg}
        onClick={!disabled ? handleSubmit : undefined}
      >
        <img src={SendArrow} alt="send arrow" />
      </div>
    </div>
  );
};

export default RatingInput;
