import React from "react";
import styles from "./DemoModels.module.css";
import DemoModelTop from "../DemoModelTop/DemoModelTop";
import DemoModelBottom from "../DemoModelBottom/DemoModelBottom";

const DemoModels = () => {
  return (
    <div>
      <DemoModelTop />
      <DemoModelBottom />
    </div>
  );
};

export default DemoModels;
