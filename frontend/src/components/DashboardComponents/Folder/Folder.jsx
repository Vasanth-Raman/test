import React from "react";
import styles from "./Folder.module.css";
import Delete from "../../../assets/icons/delete-icon.svg";
import { toast } from "react-toastify";

const Folder = ({
  name,
  setType,
  modalSetter,
  id,
  setId,
  setFolderId,
  folderId,
}) => {
  const handleDeleteModal = () => {
    setId(id);
    setType("folder");
    modalSetter(true);
    setFolderId(null);
  };

  const handleClick = () => {
    if (setFolderId) {
      setFolderId(id);
    } else {
      toast.error("setFolderId is not a function");
    }
  };
  return (
    <div
      className={`${folderId === id ? styles.active : styles.folder}`}
      onClick={handleClick}
    >
      <p>{name}</p>
      <div onClick={handleDeleteModal} className={styles.deleteImgContainer}>
        <img src={Delete} alt="delete" />
      </div>
    </div>
  );
};

export default Folder;
