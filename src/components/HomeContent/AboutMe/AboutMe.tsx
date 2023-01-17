import React from "react";
import { HomeTitle } from "../HomeTitle/HomeTitle";
import { DownCircleFilled } from "@ant-design/icons";
import styles from "./aboutMe.module.scss";
import MyPhoto from "../../../img/Home/Me.png";
import { Avatar } from "antd";
import { motion } from "framer-motion";

type AboutMeProps = {
  handlerClickButtonSkill: () => void;
};

export const AboutMe: React.FC<AboutMeProps> = ({
  handlerClickButtonSkill,
}) => {
  const fadeIn = (
    direction: string,
    type: string,
    delay: number,
    duration: number
  ) => ({
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  });

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.16 }}
      className={styles.aboutMeWrapper}
    >
      <div className="title">
        <HomeTitle title="about me" />
      </div>
      <div className={styles.content}>
        <motion.div
          variants={fadeIn("right", "tween", 0.5, 0.5)}
          className={styles.boxDescription}
        >
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
          <button
            onClick={handlerClickButtonSkill}
            className={styles.descriptionButton}
          >
            skills I have{" "}
            <span className={styles.arrow}>
              <DownCircleFilled />
            </span>
          </button>
        </motion.div>
        <motion.img
          variants={fadeIn("left", "tween", 0.5, 0.5)}
          className={styles.descriptionPhoto}
          src={MyPhoto}
          alt="MyPhoto"
        />
      </div>
    </motion.div>
  );
};
