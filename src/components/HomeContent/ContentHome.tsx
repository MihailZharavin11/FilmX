import React, { useRef } from "react";
import { AboutMe } from "./AboutMe/AboutMe";
import { AboutSite } from "./AboutSite/AboutSite";
import { ContactMe } from "./ContactMe/ContactMe";
import styles from "./contentHome.module.scss";
import { MySkills } from "./MySkills/MySkills";

const ContentHome: React.FC = () => {
  const skillRef = useRef<HTMLDivElement>(null);

  const handlerClickButtonSkill = () => {
    if (skillRef.current) {
      skillRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.homeWrapper}>
      <AboutSite />
      <AboutMe handlerClickButtonSkill={handlerClickButtonSkill} />
      <MySkills skillRef={skillRef} />
      <ContactMe />
    </div>
  );
};

export default ContentHome;
