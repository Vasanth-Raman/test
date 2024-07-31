import React from "react";
import styles from "./HeroTop.module.css";
import YellowTriangle from "../../../assets/icons/yellow-triangle.svg";
import BlueCurve from "../../../assets/icons/blue-curve.svg";
import { Link } from "react-router-dom";

const HeroTop = () => {
  return (
    <div className={styles.heroTop}>
      <div className={styles.leftShape}>
        <img src={YellowTriangle} alt="Yellow triangle shape" />
      </div>
      <div className={styles.rightShape}>
        <img src={BlueCurve} alt="blue curve shape" />
      </div>
      <h1>Build advanced chatbots visually</h1>
      <p>
        Typebot gives you powerful blocks to create unique chat experiences.
        Embed them anywhere on your web/mobile apps and start collecting results
        like magic.
      </p>
      <div className={styles.heroBtn}>
        <Link to={"/auth/register"}>Create a FormBot for free</Link>
      </div>
    </div>
  );
};

export default HeroTop;
