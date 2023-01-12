import React from "react";
import { Link } from "react-router-dom";
import styles from "./aboutSite.module.scss";
import { ArrowRightOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
export const AboutSite = () => {
  return (
    <div className={styles.aboutSite}>
      <motion.div
        initial={{ y: -500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 1,
        }}
        className={styles.logo}
      >
        film
        <span className={styles.logoLetter}>X</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={styles.description}
      >
        <div className={styles.descriptionText}>
          If you, like me, live in Ukraine, this site only works with VPN .On
          this site you can view movie selections (top movies, popular movies),
          find a movie by genre, find a movie by search. You can also
          register/authorize with Firebase Authentication. Each user can mark
          watched or liked movies, the data is stored in the Firebase Realtime
          DataBase.
        </div>
        <Link className={styles.button} to={"/films"}>
          GET STARTED
          <span className={styles.arrow}>
            <ArrowRightOutlined />
          </span>
        </Link>
      </motion.div>
    </div>
  );
};
