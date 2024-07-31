import React from "react";
import styles from "./Header.module.css";
import Logo from "../../../assets/icons/app-logo.svg";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.headerContainer}>
      <header>
        <div className={styles.leftHeader} onClick={() => navigate("/")}>
          <img src={Logo} alt="app logo" />
          <p>FormBot</p>
        </div>
        <div className={styles.rightHeader}>
          <Link to={"/auth/login"} className={styles.signInLink}>
            Sign In
          </Link>
          <Link to={"/auth/register"} className={styles.signUpLink}>
            Create a FormBot
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Header;
