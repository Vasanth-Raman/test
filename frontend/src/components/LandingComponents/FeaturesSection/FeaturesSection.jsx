import React from "react";
import styles from "./FeaturesSection.module.css";
import FeatureCard from "../FeatureCard/FeatureCard";
import { featureCardsData } from "../../../utils/constants";

const FeaturesSection = () => {
  return (
    <div className={styles.featureWrapper}>
      <div className={styles.featureConatiner}>
        <div className={styles.paragraph}>
          <h1>And many more features</h1>
          <p>
            Typebot makes form building easy and comes with powerful features
          </p>
        </div>
        <div className={styles.cards}>
          {featureCardsData.map((item) => {
            return <FeatureCard key={item.id} data={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
