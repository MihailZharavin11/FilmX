import React from "react";
import { HomeTitle } from "../HomeTitle/HomeTitle";
import { DownCircleFilled } from "@ant-design/icons";
import styles from "./aboutMe.module.scss";
import MyPhoto from "../../../img/Home/Me.png";
import { Avatar } from "antd";

export const AboutMe: React.FC = () => {
  return (
    <div className={styles.aboutMeWrapper}>
      <div className="title">
        <HomeTitle title="about me" />
      </div>
      <div className={styles.content}>
        <div className={styles.boxDescription}>
          <div className={styles.boxDescriptionTitle}>
            <Avatar
              className={styles.boxDescriptionPhoto}
              size={{ md: 100, sm: 80, xs: 60 }}
              src={MyPhoto}
            />
            <h1 className={styles.title}>
              Hello, I’m Mikhail, Junior Front-end Developer.
            </h1>
          </div>
          <button className={styles.descriptionButton}>
            skills I have{" "}
            <span className={styles.arrow}>
              <DownCircleFilled />
            </span>
          </button>
        </div>
        <img className={styles.descriptionPhoto} src={MyPhoto} alt="MyPhoto" />
      </div>
    </div>
  );
};
