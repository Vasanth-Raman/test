import React from "react";
import styles from "./Footer.module.css";
import Redirect from "../../../assets/icons/link-redirect-icon.svg";

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.list}>
            <h6>
              Made with ❤️ by <br /> <span>@Cuvette</span>
            </h6>
          </div>
          <div className={styles.list}>
            <div>
              <p>Status</p>
              <img src={Redirect} alt="redirect" />
            </div>
            <div>
              <p>Documentation</p>
              <img src={Redirect} alt="redirect" />
            </div>
            <div>
              <p>Roadmap</p>
              <img src={Redirect} alt="redirect" />
            </div>
            <p>Pricing</p>
          </div>
          <div className={styles.list}>
            <div>
              <p>Discord</p>
              <img src={Redirect} alt="redirect" />
            </div>
            <div>
              <p>GitHub repository</p>
              <img src={Redirect} alt="redirect" />
            </div>
            <div>
              <p>Twitter</p>
              <img src={Redirect} alt="redirect" />
            </div>
            <div>
              <p>LinkedIn</p>
              <img src={Redirect} alt="redirect" />
            </div>
            <p>OSS Friends</p>
          </div>
          <div className={styles.list}>
            <p>About</p>
            <p>Contact</p>
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
