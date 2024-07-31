import React, { useEffect } from "react";
import styles from "./Theme.module.css";
import LightTheme from "../../../assets/images/light-theme.png";
import DarkTheme from "../../../assets/images/dark-theme.png";
import BlueTheme from "../../../assets/images/blue-theme.png";
import BotPic from "../../../assets/icons/bot-pic.svg";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../../redux/slices/formFieldSlice";
import { useParams } from "react-router-dom";

const Theme = ({ onIdChange }) => {
  const { id } = useParams();
  const theme = useSelector((store) => store.fields.theme);
  const dispatch = useDispatch();

  //to get id to navBar
  useEffect(() => {
    if (onIdChange) {
      onIdChange(id);
    }
  }, [id, onIdChange]);
  return (
    <div className={styles.themeWrapper}>
      <div className={styles.sideTheme}>
        <div className={styles.text}>
          <h4>Customize the theme</h4>
        </div>
        <div className={styles.themeContainer}>
          <div
            className={
              theme === "#FFFFFF"
                ? `${styles.selected} ${styles.themes}`
                : styles.themes
            }
            onClick={() => dispatch(setTheme("#FFFFFF"))}
          >
            <img src={LightTheme} alt="light theme" />
            <div>
              <h5>Light</h5>
            </div>
          </div>
          <div
            className={
              theme === "#171923"
                ? `${styles.selected} ${styles.themes}`
                : styles.themes
            }
            onClick={() => dispatch(setTheme("#171923"))}
          >
            <img src={DarkTheme} alt="dark theme" />
            <div>
              <h5>Dark</h5>
            </div>
          </div>
          <div
            className={
              theme === "#508C9B"
                ? `${styles.selected} ${styles.themes}`
                : styles.themes
            }
            onClick={() => dispatch(setTheme("#508C9B"))}
          >
            <img src={BlueTheme} alt="blue theme" />
            <div>
              <h5>Tail Blue</h5>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.body} style={{ background: theme }}>
        <div className={styles.botLogo}>
          <img src={BotPic} alt="chat bot pic" />
          <span>Hello</span>
        </div>
        <div className={styles.btnDiv}>
          <button className={styles.btn}>Hi</button>
          <div className={styles.dot}></div>
        </div>
      </div>
    </div>
  );
};

export default Theme;
