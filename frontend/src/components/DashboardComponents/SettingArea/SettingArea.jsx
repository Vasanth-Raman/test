import React, { useEffect, useState } from "react";
import styles from "./SettingArea.module.css";
import UserIcon from "../../../assets/icons/setting-name-icon.svg";
import LockIcon from "../../../assets/icons/setting-lock-icon.svg";
import EyeIcon from "../../../assets/icons/setting-eye-icon.svg";
import LogoutIcon from "../../../assets/icons/setting-logout-icon.svg";
import BackArrow from "../../../assets/icons/arrow-back.svg";
import { useNavigate } from "react-router-dom";
import useValidateUserUpdate from "../../../hooks/useValidateUserUpdate";
import { useAuth } from "../../../context/AuthContext";
import { updateUser } from "../../../api/auth";
import { toast } from "react-toastify";

const SettingArea = () => {
  const initialValues = {
    userName: "",
    email: "",
    oldPassword: "",
    password: "",
  };
  const [credentials, setCredentials] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();
  const { logoutContext } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = useValidateUserUpdate(credentials);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        await newUserData();
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please ensure valid info is given");
    }
  };

  const newUserData = async () => {
    try {
      const response = await updateUser(
        credentials.userName,
        credentials.email,
        credentials.oldPassword,
        credentials.password
      );
      if (response.success || response.status === 202) {
        toast.success(response?.data?.message);
        setCredentials(initialValues);
        logoutContext();
      } else {
        toast.error(response?.data?.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className={styles.settingWrapper}>
      <img
        className={styles.backArrow}
        src={BackArrow}
        alt="BackArrow"
        onClick={() => navigate("/dashboard")}
      />
      <h3>Settings</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.inputs}>
          <div>
            <div className={styles.field}>
              <img src={UserIcon} alt="UserIcon" />
              <input
                type="text"
                placeholder="Name"
                name="userName"
                id="name"
                autoComplete="on"
                value={credentials.userName}
                onChange={handleChange}
              />
            </div>
            <small>{formErrors.userName}</small>
          </div>
          <div>
            <div className={styles.field}>
              <img src={LockIcon} alt="LockIcon" />
              <input
                type="email"
                placeholder="Update Email"
                name="email"
                id="email"
                autoComplete="on"
                value={credentials.email}
                onChange={handleChange}
              />
              <img src={EyeIcon} alt="EyeIcon" />
            </div>
            <small>{formErrors.email}</small>
          </div>

          <div>
            <div className={styles.field}>
              <img src={LockIcon} alt="LockIcon" />
              <input
                type={showOldPassword ? "text" : "password"}
                placeholder="Old Password"
                name="oldPassword"
                id="oldPassword"
                value={credentials.oldPassword}
                onChange={handleChange}
              />
              <img
                src={EyeIcon}
                alt="EyeIcon"
                onClick={() => setShowOldPassword(!showOldPassword)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <small>{formErrors.oldPassword}</small>
          </div>
          <div>
            <div className={styles.field}>
              <img src={LockIcon} alt="LockIcon" />
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                name="password"
                id="newPassword"
                value={credentials.password}
                onChange={handleChange}
              />
              <img
                src={EyeIcon}
                alt="EyeIcon"
                onClick={() => setShowNewPassword(!showNewPassword)}
                style={{ cursor: "pointer" }}
              />
            </div>
            <small>{formErrors.password}</small>
          </div>
        </div>
        <div className={styles.button}>
          <button type="submit">{isLoading ? "Updating..." : "Update"}</button>
        </div>
      </form>
      <div className={styles.logout} onClick={() => logoutContext()}>
        <img src={LogoutIcon} alt="LogoutIcon" />
        <p>Log out</p>
      </div>
    </div>
  );
};

export default SettingArea;
