import React, { useRef, useState } from "react";
import styles from "./ButtonInput.module.css";

const ButtonInput = ({ data, onUserInput }) => {
  const [disabled, setDisabled] = useState(false);

  const buttonRef = useRef();
  const handleClick = () => {
    const buttonValue = buttonRef.current.textContent;
    onUserInput(buttonValue);
    setDisabled(true);
    onUserInput();
  };
  return (
    <div className={styles.btnWrapper}>
      <button
        ref={buttonRef}
        className={disabled ? styles.disabled : styles.btn}
        disabled={disabled ? true : false}
        onClick={handleClick}
      >
        {data}
      </button>
    </div>
  );
};

export default ButtonInput;
