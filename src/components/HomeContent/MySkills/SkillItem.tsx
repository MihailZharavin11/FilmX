import React from "react";
import styles from "./mySkills.module.scss";
type SkillItemProps = {
  skillName: string;
};

export const SkillItem: React.FC<SkillItemProps> = ({ skillName }) => {
  return <div className={styles.skillItem}>{skillName}</div>;
};
