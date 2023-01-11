import React from "react";
import { Link } from "react-router-dom";
import styles from "./aboutSite.module.scss";
import { ArrowRightOutlined } from "@ant-design/icons";
export const AboutSite = () => {
  return (
    <div className={styles.aboutSite}>
      <div className={styles.logo}>
        film<span className={styles.logoLetter}>X</span>
      </div>
      <div className={styles.description}>
        <div className={styles.descriptionText}>
          If you, like me, live in Ukraine, this site only works with VPN .On
          this site you can view movie selections (top movies, popular movies),
          find a movie by genre, find a movie by search. You can also
          register/authorize with Firebase Authentication. Each user can mark
          watched or liked movies, the data is stored in the Firebase Realtime
          DataBase.
        </div>
        <div className={styles.button}>
          <Link to={"/films"}>
            GET STARTED
            <span className={styles.arrow}>
              <ArrowRightOutlined />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
