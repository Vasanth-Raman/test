import React, { useEffect, useRef, useState } from "react";
import styles from "./FolderModal.module.css";
import { createFolder } from "../../../api/folder";
import { toast } from "react-toastify";

const FolderModal = ({ isOpen, modalSetter }) => {
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const ref = useRef(null);
  if (!isOpen) {
    return null;
  }

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    setError(null);
    if (folderName.trim() === "") {
      setError("Folder name is required");
      return;
    }
    if (error === null) {
      await createNewFolder();
    }
  };

  const createNewFolder = async () => {
    setIsLoading(true);
    try {
      const response = await createFolder(folderName);
      if (response.success || response.status === 201) {
        toast.success(response?.data?.message || "Folder created");
        setFolderName("");
        modalSetter(false);
        setIsLoading(false);
      } else {
        toast.error(response?.data?.message || "Folder not created");
      }
    } catch (error) {
      toast.error(
        "An error occurred during creating folder. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  //to close modal when clicked outside
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

  //error handler to enable the user experience for making double click to create folder
  useEffect(() => {
    if (folderName && error) {
      setError(null);
    }
  }, [folderName, error]);
  return (
    <div className={styles.modalOverlay}>
      <form onSubmit={handleCreateFolder}>
        <div className={styles.modalContainer} ref={ref}>
          <div className={styles.text}>
            <p>Create new folder</p>
          </div>
          <div className={styles.input}>
            <input
              type="text"
              name="folderName"
              id="folderName"
              autoComplete="on"
              placeholder="Enter folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              autoFocus
              disabled={isLoading}
            />
          </div>
          <small>{error}</small>
          <div className={styles.options}>
            <button
              className={styles.confirm}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Done"}
            </button>
            <button
              className={styles.cancel}
              onClick={() => modalSetter(false)}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
          {isLoading && <div className={styles.loadingRing}></div>}
        </div>
      </form>
    </div>
  );
};

export default FolderModal;
