import React, { useEffect, useRef, useState } from "react";
import styles from "./DeleteModal.module.css";
import { deleteFolder } from "../../../api/folder";
import { deleteForm } from "../../../api/form";
import { toast } from "react-toastify";

const DeleteModal = ({ modalSetter, isOpen, type, id, onDelete }) => {
  const ref = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      if (type === "folder") {
        await deleteOldFolder();
      } else if (type === "Form") {
        await deleteOldForm();
      }
    } finally {
      setIsLoading(false);
      onDelete();
    }
  };

  const deleteOldFolder = async () => {
    try {
      const response = await deleteFolder(id);
      if (response.success || response.status === 200) {
        toast.success(response?.data?.message);
        modalSetter(false);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error("Couldn't delete folder. Please try again later.");
    }
  };

  const deleteOldForm = async () => {
    try {
      const response = await deleteForm(id);
      if (response.success || response.status === 200) {
        toast.success(response?.data?.message);
        modalSetter(false);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      toast.error("Couldn't delete folder. Please try again later.");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        modalSetter(false);
      }
    };

    if (isOpen) {
      window.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, modalSetter]);

  return (
    <>
      {isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer} ref={ref}>
            <div className={styles.text}>
              <p>Are you sure you want to delete this {type} ?</p>
            </div>
            {isLoading && <div className={styles.loadingRing}></div>}
            <div className={styles.options}>
              <button
                className={styles.confirm}
                onClick={() => handleDelete()}
                disabled={isLoading}
              >
                Confirm
              </button>
              <button
                className={styles.cancel}
                onClick={() => modalSetter(false)}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteModal;
