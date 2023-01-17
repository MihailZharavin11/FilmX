import React, { LegacyRef } from "react";
import { HomeTitle } from "../HomeTitle/HomeTitle";
import styles from "./mySkills.module.scss";
import { SkillItem } from "./SkillItem";
// @ts-ignore
import { Shake } from "reshake";

type MySkillProps = {
  skillRef: LegacyRef<HTMLDivElement> | undefined;
};

export const MySkills: React.FC<MySkillProps> = ({ skillRef }) => {
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
    <div ref={skillRef} className={styles.mySkillsWrapper}>
      <HomeTitle title="skills" />
      <div className={styles.skillsBox}>
        {skills.map((skill, index) => (
          <Shake
            key={index}
            h={0}
            v={5}
            r={3}
            dur={830}
            int={15}
            max={100}
            fixed={false}
            fixedStop={true}
            freez={false}
          >
            <SkillItem skillName={skill} />
          </Shake>
        ))}
      </div>
    </div>
  );
};
