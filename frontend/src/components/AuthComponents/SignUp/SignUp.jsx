import React, { useState } from "react";
import styles from "./SignUp.module.css";
import DoubleTriange from "../../../assets/icons/double-triangle.svg";
import SandalEllipse from "../../../assets/icons/ellipse-sandal.svg";
import PinkEllipse from "../../../assets/icons/ellipse-pink.svg";
import BackArrow from "../../../assets/icons/arrow-back.svg";
import { useNavigate } from "react-router-dom";
import useValidateRegister from "../../../hooks/useValidateRegister";
import { registerUser } from "../../../api/auth/";
import { toast } from "react-toastify";

const SignUp = () => {
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [credentials, setCredentials] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = useValidateRegister(credentials);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      try {
        await register();
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please ensure valid info is given");
    }
  };

  const register = async () => {
    try {
      const response = await registerUser(
        credentials.userName,
        credentials.email,
        credentials.password
      );

      if (response.success || response.status === 201) {
        toast.success(response?.data?.message);
        setCredentials(initialValues);
        navigate("/auth/login");
      } else {
        toast.error(response?.data?.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred during Sign Up. Please try again later.");
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
      <form className={styles.credContainer} noValidate>
        <div className={styles.fieldsContainer}>
          <div className={styles.fields}>
            <label
              htmlFor="username"
              className={`${
                formErrors.userName ? styles.errorText : styles.label
              }`}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="userName"
              value={credentials.userName}
              onChange={handleChange}
              placeholder="Enter a username"
              className={`${
                formErrors.userName ? styles.errorBorder : styles.input
              }`}
            />
            <small>{formErrors.userName}</small>
          </div>
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
              autoComplete="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter your email"
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
              value={credentials.password}
              onChange={handleChange}
              placeholder="**********"
              className={`${
                formErrors.password ? styles.errorBorder : styles.input
              }`}
            />
            <small>{formErrors.password}</small>
          </div>
          <div className={styles.fields}>
            <label
              htmlFor="confirmPassword"
              className={`${
                formErrors.confirmPassword ? styles.errorText : styles.label
              }`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={credentials.confirmPassword}
              onChange={handleChange}
              placeholder="**********"
              className={`${
                formErrors.confirmPassword ? styles.errorBorder : styles.input
              }`}
            />
            <small>{formErrors.confirmPassword}</small>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign Up"}
          </button>
          <p>
            Already have an account ?{" "}
            <span onClick={() => navigate("/auth/login")}>Login</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
