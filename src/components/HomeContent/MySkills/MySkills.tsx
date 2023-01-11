import React from "react";
import { HomeTitle } from "../HomeTitle/HomeTitle";
import styles from "./mySkills.module.scss";
import { SkillItem } from "./SkillItem";

export const MySkills = () => {
  const skills = [
    "HTML",
    "CSS",
    "React hook form",
    "module CSS",
    "Ant Design",
    "React",
    "Redux",
    "Redux toolkit",
    "RTK Query",
    "React router dom",
    "Axios",
    "GIT",
    "Framer Motion",
    "FireBase",
    "SCSS",
  ];
  return (
    <div className={styles.mySkillsWrapper}>
      <HomeTitle title="skills" />
      <div className={styles.skillsBox}>
        {skills.map((skill) => (
          <SkillItem skillName={skill} />
        ))}
      </div>
    </div>
  );
};
