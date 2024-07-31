import React, { useEffect, useState } from "react";
import styles from "./NavBar.module.css";
import CloseIcon from "../../../assets/icons/close-icon.svg";
import BlueTick from "../../../assets/icons/blue-tick.svg";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  resetFormData,
  setFormName,
} from "../../../redux/slices/formFieldSlice.js";
import { createForm, updateForm } from "../../../api/form.js";
import { toast } from "react-toastify";
import { resetError } from "../../../redux/slices/formErrorSlice.js";
import { resetFlow } from "../../../redux/slices/formFlowSlice.js";

const NavBar = ({ formId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLink, setShowLink] = useState(false);
  const formFields = useSelector((store) => store.fields);
  const flow = useSelector((store) => store.flows.flowitems);
  const error = useSelector((store) => store.errors);

  const dispatch = useDispatch();
  const handleFormName = (e) => {
    dispatch(setFormName(e.target.value));
  };

  useEffect(() => {
    if (!location.pathname.startsWith("/workspace")) {
      dispatch(resetFormData());
      dispatch(resetFlow());
      dispatch(resetError());
    }
  }, [location, dispatch]);

  const handleSubmit = async () => {
    if (error === "Required Field") {
      toast.error("Please fill all the required fields");
      return;
    }

    const isEmptyBubbleInput = flow.some(
      (item) => item.bubbleOrInput === "bubble" && !item.content.data
    );

    const isEmptyButton = flow.some(
      (item) =>
        item.bubbleOrInput === "input" &&
        item.content.type === "button" &&
        !item.content.data
    );

    if (isEmptyBubbleInput) {
      toast.error("All bubble items must have data");
      return;
    }

    if (isEmptyButton) {
      toast.error("Button inputs must have data");
      return;
    }

    try {
      if (formId) {
        await updateOldForm(formId);
      } else {
        await createNewForm();
      }
    } catch {
      toast.error("Please try again also check every fields are filled");
    }
  };

  const createNewForm = async () => {
    try {
      const response = await createForm(
        formFields.formName,
        formFields.theme,
        flow,
        formFields.folderId
      );
      if (response.success || response.status === 201) {
        toast.success(response?.data?.message);

        navigate(`/workspace/flow/${response.data.data._id}`);
      } else {
        toast.error(
          response?.data?.message ||
            "Form creation failed. Please try again later"
        );
      }
    } catch (error) {
      toast.error(
        "An error occurred during form creation. Please try again later."
      );
    }
  };

  const updateOldForm = async (formId) => {
    try {
      const response = await updateForm(
        formFields.formName,
        formFields.theme,
        flow,
        formId
      );
      if (response.success || response.status === 201) {
        toast.success(response?.data?.message);
      } else {
        toast.error(
          response?.data?.message ||
            "Form updation failed. Please try again later"
        );
      }
    } catch (error) {
      toast.error(
        "An error occurred during form creation. Please try again later."
      );
    }
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const flowLink = formId ? `/workspace/flow/${formId}` : "/workspace/flow";
  const themeLink = formId ? `/workspace/theme/${formId}` : "/workspace/theme";
  const responseLink = formId
    ? `/workspace/response/${formId}`
    : "/workspace/response";

  const handleClose = () => {
    dispatch(resetFormData());
    dispatch(resetFlow());
    dispatch(resetError());
    navigate("/dashboard");
  };

  const handleShare = () => {
    if (!formId) {
      return;
    }

    const link = `${window.location.origin}/form-bot/${formId}`;

    navigator.clipboard
      .writeText(link)
      .then(() => {
        setShowLink(true);
      })
      .catch(() => {
        toast.error("Failed to copy link. Please try again.");
      });
  };

  useEffect(() => {
    let timer;
    if (showLink) {
      timer = setTimeout(() => {
        setShowLink(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [showLink]);

  const showFormName =
    location.pathname.includes("/theme") ||
    location.pathname.includes("/response");

  return (
    <div className={styles.navContainer}>
      <div className={styles.navLeft}>
        {showFormName ? (
          <div className={styles.dummy}></div>
        ) : (
          <input
            type="text"
            placeholder="Enter Form Name"
            value={formFields.formName}
            onChange={handleFormName}
          />
        )}
      </div>
      <div className={styles.navMiddle}>
        <div>
          <Link
            to={flowLink}
            className={isActive("/workspace/flow") ? styles.activePage : ""}
          >
            Flow
          </Link>
        </div>
        <div>
          <Link
            to={themeLink}
            className={isActive("/workspace/theme") ? styles.activePage : ""}
          >
            Theme
          </Link>
        </div>
        <div>
          <Link
            to={responseLink}
            className={isActive("/workspace/response") ? styles.activePage : ""}
          >
            Response
          </Link>
        </div>
      </div>
      <div className={styles.navRight}>
        <button
          className={formId ? styles.shareActive : styles.shareBtn}
          onClick={handleShare}
          disabled={!formId}
        >
          Share
        </button>
        <button className={styles.saveBtn} onClick={handleSubmit}>
          Save
        </button>
        <div className={styles.imgDiv} onClick={handleClose}>
          <img src={CloseIcon} alt="close icon" />
        </div>
        {showLink && (
          <div className={styles.shareLink}>
            <img src={BlueTick} alt="blue tick" />
            <p>Link Copied</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
