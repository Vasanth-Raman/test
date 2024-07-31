import React from "react";
import styles from "./ErrorPage.module.css";
import { Link } from "react-router-dom";
import SadCat from "../../assets/images/sad-cat.png";
import YellowTriangle from "../../assets/icons/yellow-triangle.svg";
import BlueCurve from "../../assets/icons/blue-curve.svg";

const ErrorPage = () => {
  return (
    <div className={styles.errorPage}>
      <img
        src={YellowTriangle}
        alt="yellow triangle"
        className={styles.yellow}
      />
      <img src={BlueCurve} alt="blue curve" className={styles.blue} />
      <div className={styles.content}>
        <div className={styles.catContainer}>
          <img src={SadCat} alt="sad cat" />
        </div>
        <h2>Undefined is, unfortunately, not a function</h2>
        <p>
          You just <span>404'd</span>. Maybe you should headback to the{" "}
          <Link to={"/dashboard"}>Dashboard</Link>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
