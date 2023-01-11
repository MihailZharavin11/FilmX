import React from "react";
import { HomeTitle } from "../HomeTitle/HomeTitle";
import { DownCircleFilled } from "@ant-design/icons";
import styles from "./aboutMe.module.scss";
import MyPhoto from "../../../img/Home/Me.png";
export const AboutMe: React.FC = () => {
  return (
    <div className={styles.aboutMe}>
      <div className="title">
        <HomeTitle title="about me" />
      </div>
      <div className={styles.content}>
        <div className={styles.boxDescription}>
          <h1 className={styles.descriptionTitle}>
            Hello, I’m Mikhail, Junior Front-end Developer.
          </h1>
          <button className={styles.descriptionButton}>
            skills I have{" "}
            <span className={styles.arrow}>
              <DownCircleFilled />
            </span>
          </button>
        </div>
        <div className={styles.boxPhoto}>
          <img src={MyPhoto} alt="MyPhoto" />
        </div>
      </div>
    </div>
  );
};
