import React from "react";
import styles from "./SingleForm.module.css";
import Delete from "../../../assets/icons/delete-icon.svg";

const SingleForm = ({
  modalSetter,
  setType,
  id,
  title,
  setId,
  handleSelectForm,
}) => {
  const handleDeleteModal = (e) => {
    e.stopPropagation();
    setId(id);
    setType("Form");
    modalSetter(true);
  };

  return (
    <div className={styles.form} onClick={() => handleSelectForm(id)}>
      <p>{title}</p>
      <div onClick={handleDeleteModal}>
        <img src={Delete} alt="delete icon" />
      </div>
    </div>
  );
};

export default SingleForm;
