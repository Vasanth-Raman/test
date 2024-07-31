import React from "react";
import Styles from "./OldvsNew.module.css";
import Cross from "../../../assets/icons/cross-icon.svg";
import Tick from "../../../assets/icons/tick-icon.svg";
import UserLogo from "../../../assets/images/user-logo.png";
import ChatImage from "../../../assets/images/welcome.gif";
import CurveArrow from "../../../assets/icons/curve-arrow.svg";

const OldvsNew = () => {
  return (
    <div className={Styles.oldNew}>
      <div className={Styles.oldNewContainer}>
        <div className={Styles.topPart}>
          <h2>
            Replace your old school forms <br /> with <br />
            chatbots
          </h2>
          <p>
            Typebot is a better way to ask for information. It leads to an
            increase in customer satisfaction and retention and multiply by your
            conversion rate compared to classical forms.
          </p>
        </div>
        <div className={Styles.bottomPart}>
          <div className={Styles.leftOld}>
            <img src={Cross} alt="cross icon" />
            <div className={Styles.leftContainer}>
              <div className={Styles.inputFields}>
                <label htmlFor="name" className={Styles.label}>
                  Full name <span>*</span>
                </label>
                <input type="text" id="name" placeholder="Full name" required />
              </div>
              <div className={Styles.inputFields}>
                <label htmlFor="email" className={Styles.label}>
                  Email <span>*</span>
                </label>
                <input type="text" id="email" placeholder="Email" required />
              </div>
              <div className={Styles.services}>
                <label htmlFor="services" className={Styles.label}>
                  What services are you interested in?<span>*</span>
                </label>
                <div className={Styles.labelsContainer} id="services">
                  <label htmlFor="website" className={Styles.label}>
                    <input
                      type="checkbox"
                      name=""
                      id="website"
                      className={Styles.checkBox}
                    />
                    <p>Website Dev</p>
                  </label>
                  <label htmlFor="marketing" className={Styles.label}>
                    <input
                      type="checkbox"
                      name=""
                      id="marketing"
                      className={Styles.checkBox}
                    />
                    <p>Content Marketing</p>
                  </label>
                  <label htmlFor="socialmedia" className={Styles.label}>
                    <input
                      type="checkbox"
                      name=""
                      id="socialmedia"
                      className={Styles.checkBox}
                    />
                    <p>Social Media</p>
                  </label>
                  <label htmlFor="design" className={Styles.label}>
                    <input
                      type="checkbox"
                      name=""
                      id="design"
                      className={Styles.checkBox}
                    />
                    <p>UI/UX Design</p>
                  </label>
                </div>
              </div>
              <div className={Styles.inputFields}>
                <label htmlFor="info" className={Styles.label}>
                  Additional Information <span>*</span>
                </label>
                <textarea
                  type="text"
                  id="info"
                  placeholder="Additional Information"
                  required
                />
              </div>
              <div className={Styles.btn}>
                <button>Submit</button>
              </div>
            </div>
          </div>
          <div className={Styles.rightNew}>
            <div className={Styles.arrowText}>
              <p>Try it out!</p>
              <img src={CurveArrow} alt="Curve Arrow" />
            </div>
            <img src={Tick} alt="tick icon" />
            <div className={Styles.rigthContainer}>
              <div className={Styles.innerRightContainer}>
                <div className={Styles.rightContent}>
                  <div className={Styles.topRight}>
                    <div className={Styles.topAreaLeft}>
                      <img src={UserLogo} alt="user logo" />
                    </div>
                    <div className={Styles.topAreaRight}>
                      <span className={Styles.textTopRight}>
                        <p>
                          Welcome to <span>AA</span> (Awesome Agency)
                        </p>
                      </span>
                      <div className={Styles.imageTopRight}>
                        <img src={ChatImage} alt="chat-image" />
                      </div>
                    </div>
                  </div>
                  <div className={Styles.bottomRight}>
                    <div className={Styles.dot}></div>
                    <button>Hi</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OldvsNew;
