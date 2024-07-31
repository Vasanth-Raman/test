import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import DoubleTriange from "../../../assets/icons/double-triangle.svg";
import SandalEllipse from "../../../assets/icons/ellipse-sandal.svg";
import PinkEllipse from "../../../assets/icons/ellipse-pink.svg";
import BackArrow from "../../../assets/icons/arrow-back.svg";
import { useNavigate } from "react-router-dom";
import useValidateLogin from "../../../hooks/useValidateLogin";
import { loginUser } from "../../../api/auth";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

const LogIn = () => {
  const initialValues = { email: "", password: "" };
  const [credentials, setCredentials] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { loginContext } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = useValidateLogin(credentials);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        await login();
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please ensure valid info is given");
    }
  };

  const login = async () => {
    try {
      const response = await loginUser(credentials.email, credentials.password);
      if (response.success || response.status === 202) {
        toast.success(response?.data?.message);
        localStorage.setItem("token", response?.data?.token);
        loginContext(response?.data?.userData);
        setCredentials(initialValues);
      } else {
        toast.error(response?.data?.message || "Login failed");
      }
    } catch (error) {
      toast.error("An error occurred during login. Please try again later.");
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <img
        className={styles.backArrow}
        src={BackArrow}
        alt="BackArrow"
        onClick={() => navigate("/")}
      />
      <img
        className={styles.doubleTriangle}
        src={DoubleTriange}
        alt="DoubleTriange"
      />
      <img
        className={styles.sandalEllipse}
        src={SandalEllipse}
        alt="SandalEllipse"
      />
      <img className={styles.pinkEllipse} src={PinkEllipse} alt="PinkEllipse" />

      <form className={styles.credContainer} onSubmit={handleSubmit} noValidate>
        <div className={styles.fieldsContainer}>
          <div className={styles.fields}>
            <label
              htmlFor="email"
              className={`${
                formErrors.email ? styles.errorText : styles.label
              }`}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="on"
              placeholder="Enter your email"
              value={credentials.email}
              onChange={handleChange}
              className={`${
                formErrors.email ? styles.errorBorder : styles.input
              }`}
            />
            <small>{formErrors.email}</small>
          </div>

          <div className={styles.fields}>
            <label
              htmlFor="password"
              className={`${
                formErrors.password ? styles.errorText : styles.label
              }`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="**********"
              value={credentials.password}
              onChange={handleChange}
              className={`${
                formErrors.password ? styles.errorBorder : styles.input
              }`}
            />
            <small>{formErrors.password}</small>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging In" : "Log In"}
          </button>
          <p>
            Don't have an account ?{" "}
            <span onClick={() => navigate("/auth/register")}>Register now</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
