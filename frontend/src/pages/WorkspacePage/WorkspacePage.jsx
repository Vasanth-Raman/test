import React, { useState } from "react";
import styles from "./WorkspacePage.module.css";
import NavBar from "../../components/WorkspaceComponents/NavBar/NavBar";
import Flow from "../../components/WorkspaceComponents/Flow/Flow";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Theme from "../../components/WorkspaceComponents/Theme/Theme";
import Response from "../../components/WorkspaceComponents/Response/Response";
import ErrorPage from "../ErrorPage/ErrorPage";

const WorkspacePage = () => {
  const [formId, setFormId] = useState(null);

  const handleIdChange = (id) => {
    setFormId(id);
  };
  return (
    <div className={styles.wspaceContainer}>
      <NavBar formId={formId} />
      <Routes>
        <Route path="/" element={<Navigate to="flow" replace />} />
        <Route path="flow" element={<Flow onIdChange={handleIdChange} />} />
        <Route path="flow/:id" element={<Flow onIdChange={handleIdChange} />} />
        <Route path="theme" element={<Theme onIdChange={handleIdChange} />} />
        <Route
          path="theme/:id"
          element={<Theme onIdChange={handleIdChange} />}
        />
        <Route
          path="response"
          element={<Response onIdChange={handleIdChange} />}
        />
        <Route
          path="response/:id"
          element={<Response onIdChange={handleIdChange} />}
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default WorkspacePage;
