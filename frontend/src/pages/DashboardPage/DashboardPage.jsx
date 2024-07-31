import React, { useEffect } from "react";
import styles from "./DashboardPage.module.css";
import { Routes, Route, useLocation } from "react-router-dom";
import SettingArea from "../../components/DashboardComponents/SettingArea/SettingArea";
import FormsArea from "../../components/DashboardComponents/FormsArea/FormsArea";
import ErrorPage from "../ErrorPage/ErrorPage";
import { useDispatch } from "react-redux";
import { resetFormData } from "../../redux/slices/formFieldSlice";
import { resetFlow } from "../../redux/slices/formFlowSlice";
import { resetError } from "../../redux/slices/formErrorSlice";

const DashboardPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  //just to check route and reset forms in workspace area
  useEffect(() => {
    if (!location.pathname.startsWith("/workspace")) {
      dispatch(resetFormData());
      dispatch(resetFlow());
      dispatch(resetError());
    }
  }, [location, dispatch]);
  return (
    <div className={styles.dboardWrapper}>
      <Routes>
        <Route path="/" element={<FormsArea />} />
        <Route path="/settings" element={<SettingArea />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default DashboardPage;
