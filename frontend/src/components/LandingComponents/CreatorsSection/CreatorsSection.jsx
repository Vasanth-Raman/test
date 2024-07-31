import React from "react";
import styles from "./CreatorsSection.module.css";
import { partnerCompanies } from "../../../utils/constants";

const CreatorsSection = () => {
  return (
    <div className={styles.sectionWrapper}>
      <div className={styles.mainContainer}>
        <h2>Loved by teams and creators from all around the world</h2>
        <div className={styles.imagesContainer}>
          {partnerCompanies.map((company) => {
            return <img key={company.id} src={company.src} alt={company.alt} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CreatorsSection;
