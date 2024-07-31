import React, { useState } from "react";
import styles from "./TextInput.module.css";
import SendArrow from "../../../../assets/icons/send-arrow.svg";

const TextInput = ({ type, placeholder, onUserInput }) => {
  const [disabled, setDisabled] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (userInput.trim() === "") {
      setError(true);
    } else {
      setError(false);
      setDisabled(true);
      onUserInput(userInput);
    }
  };
  return (
    <div className={styles.inputWrapper}>
      <input
        type={type}
        disabled={disabled ? true : false}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={placeholder}
        autoFocus
        onBlur={() => {
          if (userInput.trim() === "") {
            setError(true);
          } else {
            setError(false);
          }
        }}
        className={disabled ? styles.disabled : styles.input}
      />
      <div
        className={disabled ? styles.disabledArrow : styles.arrowImg}
        onClick={handleSubmit}
      >
        <img src={SendArrow} alt="send arrow" />
      </div>
    </div>
  );
};

export default TextInput;
