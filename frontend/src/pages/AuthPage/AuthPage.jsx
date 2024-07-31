import React from "react";
import styles from "./AuthPage.module.css";
import SignUp from "../../components/AuthComponents/SignUp/SignUp";
import LogIn from "../../components/AuthComponents/LogIn/LogIn";
import { Routes, Route, Navigate } from "react-router-dom";
import ErrorPage from "../ErrorPage/ErrorPage";

const AuthPage = () => {
  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={<Navigate to={"login"} replace />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default AuthPage;
