import React from "react";
import styles from "./InputFlowCard.module.css";
import DeleteIcon from "../../../../assets/icons/delete-icon.svg";
import { useDispatch } from "react-redux";
import {
  removeFlowItem,
  updateFlowItemOrder,
} from "../../../../redux/slices/formFlowSlice";

const InputFlowCard = ({ title, placeholder, index }) => {
  const dispatch = useDispatch();
  const handleRemove = (index) => {
    dispatch(removeFlowItem({ index }));
    dispatch(updateFlowItemOrder());
  };
  return (
    <div className={styles.cardContainer}>
      <p>{title}</p>
      <small>{placeholder}</small>
      <div className={styles.deleteIcon} onClick={() => handleRemove(index)}>
        <img src={DeleteIcon} alt="delete icon" />
      </div>
    </div>
  );
};

export default InputFlowCard;
