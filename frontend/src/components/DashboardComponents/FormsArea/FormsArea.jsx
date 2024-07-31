import React, { useCallback, useEffect, useState } from "react";
import styles from "./FormsArea.module.css";
import DashNav from "../DashNav/DashNav";
import CreateFolder from "../../../assets/icons/create-folder.svg";
import PlusIcon from "../../../assets/icons/plus-icon.svg";
import BackArrow from "../../../assets/icons/arrow-back.svg";
import Folder from "../Folder/Folder";
import Form from "../SingleForm/SingleForm";
import DeleteModal from "../DeleteModal/DeleteModal";
import FolderModal from "../FolderModal/FolderModal";
import { getFolders } from "../../../api/folder";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getDashboardForms, getFolderForms } from "../../../api/form";
import ShimmerFolder from "../../LoadingComponents/ShimmerFolder/ShimmerFolder";
import ShimmerForm from "../../LoadingComponents/ShimmerForm/ShimmerForm";

const FormsArea = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteModalType, setDeleteModalType] = useState(null);
  const [isfolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const [forms, setForms] = useState([]);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);
  const [folderId, setFolderId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //to fetch forms
  useEffect(() => {
    readFolders();
    if (!folderId) {
      readDashboardForms();
    }
  }, [isfolderModalOpen, isDeleteModalOpen, folderId]);

  //to fetch forms inside folders only if folderId is present
  useEffect(() => {
    if (folderId !== null) {
      readFolderForms(folderId);
    }
  }, [folderId, isDeleteModalOpen]);

  //outside folders
  const readFolders = async () => {
    try {
      const response = await getFolders();
      if (response.success || response.status === 200) {
        setFolders(response.data.data);
      } else {
        toast.error("Please try again");
      }
    } catch (error) {
      toast.error(
        "An error occurred during fetching folders. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  //outside forms
  const readDashboardForms = async () => {
    try {
      const response = await getDashboardForms();
      if (response.success || response.status === 200) {
        setForms(response.data.data);
      } else {
        toast.error("Please try again");
      }
    } catch (error) {
      toast.error(
        "An error occurred during fetching forms. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // fetch forms outside folders after any folder gets deleted need to pass to delete modal
  const handleFolderDeletion = useCallback(async () => {
    try {
      await readDashboardForms();
      setFolderId(null);
    } catch (error) {
      toast.error("Failed to refresh forms after deletion.");
    } finally {
      setFolderId(null);
    }
  });

  //forms inside folders
  const readFolderForms = async (folderId) => {
    try {
      const response = await getFolderForms(folderId);
      if (response.success || response.status === 200) {
        setForms(response.data.data);
      } else {
        toast.error("Please try again");
      }
    } catch (error) {
      toast.error(
        "An error occurred during fetching forms. Please try again later."
      );
    }
  };

  const handleCreateForm = () => {
    if (folderId) {
      navigate(`/workspace/flow?folderId=${folderId}`);
    } else {
      navigate("/workspace/flow");
    }
  };

  const handleSelectForm = (formId) => {
    navigate(`/workspace/flow/${formId}`);
  };

  return (
    <>
      {isDeleteModalOpen && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          modalSetter={setIsDeleteModalOpen}
          type={deleteModalType}
          id={selectedDeleteId}
          onDelete={handleFolderDeletion}
        />
      )}
      {isfolderModalOpen && (
        <FolderModal
          isOpen={isfolderModalOpen}
          modalSetter={setIsFolderModalOpen}
        />
      )}
      <div className={styles.mainWrapper}>
        <div
          className={styles.arrowContainer}
          onClick={() => setFolderId(null)}
        >
          <img src={BackArrow} alt="go back to dashboard forms" />
        </div>
        <DashNav />
        <div className={styles.folderForms}>
          <div className={styles.mainContainer}>
            <div className={styles.folders}>
              <div
                className={styles.createFolder}
                onClick={() => setIsFolderModalOpen(true)}
              >
                <img src={CreateFolder} alt="create folder" />
                <p>Create a folder</p>
              </div>

              {isLoading ? (
                <>
                  {Array.from({ length: 15 }, (_, index) => (
                    <ShimmerFolder key={index} />
                  ))}
                </>
              ) : (
                folders.map((folder) => {
                  return (
                    <Folder
                      key={folder._id}
                      id={folder._id}
                      folderId={folderId}
                      setFolderId={setFolderId}
                      setId={setSelectedDeleteId}
                      name={folder.folderName}
                      modalSetter={setIsDeleteModalOpen}
                      setType={setDeleteModalType}
                    />
                  );
                })
              )}
            </div>
            <div className={styles.forms}>
              <div className={styles.createForm} onClick={handleCreateForm}>
                <img src={PlusIcon} alt="plus icon" />
                <p>Create a typbot</p>
              </div>

              {isLoading ? (
                <>
                  {Array.from({ length: 15 }, (_, index) => (
                    <ShimmerForm key={index} />
                  ))}
                </>
              ) : (
                forms.map((form) => {
                  return (
                    <Form
                      key={form._id}
                      id={form._id}
                      title={form.formName}
                      modalSetter={setIsDeleteModalOpen}
                      setType={setDeleteModalType}
                      handleSelectForm={handleSelectForm}
                      setId={setSelectedDeleteId}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormsArea;
