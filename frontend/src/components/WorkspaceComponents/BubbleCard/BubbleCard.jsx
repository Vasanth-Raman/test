import React, { useState, useEffect } from "react";
import styles from "./BubbleCard.module.css";
import DeleteIcon from "../../../assets/icons/delete-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFlowItem,
  updateFlowItemOrder,
  updateFlowItemContent,
} from "../../../redux/slices/formFlowSlice";
import { addError, removeError } from "../../../redux/slices/formErrorSlice";

const BubbleCard = ({ logoType, title, index, placeholder }) => {
  const currentValue = useSelector(
    (store) => store.flows.flowitems[index]?.content?.data
  );
  const [error, setError] = useState("");
  const [value, setValue] = useState(currentValue || "");

  const dispatch = useDispatch();

  const validate = () => {
    if (value.trim() === "") {
      setError("Required Field");
      dispatch(addError("Required Field"));
    } else {
      setError("");
      dispatch(removeError());
    }
  };

  useEffect(() => {
    setValue(currentValue || "");
  }, [currentValue]);

  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    dispatch(updateFlowItemContent({ index, newData: value }));
  };

  const handleRemove = (index) => {
    dispatch(removeFlowItem({ index }));
    dispatch(updateFlowItemOrder());
  };
  return (
    <div className={styles.cardContainer}>
      <p>{title}</p>
      <div>
        <div className={styles.input}>
          <img src={logoType} alt="type logo" />
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onFocus={validate}
            onBlur={validate}
            autoFocus
          />
        </div>
        <small className={styles.errorMsg}>{error}</small>
      </div>
      <div className={styles.deleteIcon} onClick={() => handleRemove(index)}>
        <img src={DeleteIcon} alt="delete icon" />
      </div>
    </div>
  );
};

export default BubbleCard;
