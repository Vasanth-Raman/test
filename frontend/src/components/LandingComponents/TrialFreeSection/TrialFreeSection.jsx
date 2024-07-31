import React from "react";
import styles from "./TrialFreeSection.module.css";
import YellowTriangle from "../../../assets/icons/yellow-triangle.svg";
import BlueCurve from "../../../assets/icons/blue-curve.svg";
import { Link } from "react-router-dom";

const TrialFreeSection = () => {
  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.textContent}>
        <div className={styles.leftShape}>
          <img src={YellowTriangle} alt="Yellow triangle shape" />
        </div>
        <div className={styles.rightShape}>
          <img src={BlueCurve} alt="blue curve shape" />
        </div>
        <h2>Improve conversion and user engagement with FormBots </h2>
        <div className={styles.btnWrapper}>
          <Link to={"/auth/register"}>Create a FormBot </Link>
        </div>

        <p>
          No trial. Generous <span>free</span> plan.
        </p>
      </div>
    </div>
  );
};

export default TrialFreeSection;
