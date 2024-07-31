import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styles from "./App.module.css";
import LandingPage from "./pages/LandingPage/LandingPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import FormBotPage from "./pages/FormBotPage/FormBotPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import LazyLoader from "./components/LoadingComponents/LazyLoader/LazyLoader";
const DashboardPage = React.lazy(() =>
  import("./pages/DashboardPage/DashboardPage")
);
const WorkspacePage = React.lazy(() =>
  import("./pages/WorkspacePage/WorkspacePage")
);

const App = () => {
  const user = window.localStorage.getItem("user");
  return (
    <div className={styles.app}>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to={"/dashboard"} /> : <LandingPage />}
        />
        <Route path="/form-bot/:formId" element={<FormBotPage />} />
        <Route
          path="/auth/*"
          element={user ? <Navigate to={"/dashboard"} /> : <AuthPage />}
        />

        <Route element={<ProtectedRoute />}>
          <Route
            path="/dashboard/*"
            element={
              <Suspense fallback={<LazyLoader />}>
                <DashboardPage />
              </Suspense>
            }
          />
          <Route
            path="/workspace/*"
            element={
              <Suspense fallback={<LazyLoader />}>
                <WorkspacePage />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
