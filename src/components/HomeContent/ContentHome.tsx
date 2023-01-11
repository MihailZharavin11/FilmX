import React from "react";
import { AboutMe } from "./AboutMe/AboutMe";
import { AboutSite } from "./AboutSite/AboutSite";
import { ContactMe } from "./ContactMe/ContactMe";
import styles from "./contentHome.module.scss";
import { MySkills } from "./MySkills/MySkills";

const ContentHome: React.FC = () => {
  return (
    <div className={styles.homeWrapper}>
      <AboutSite />
      <AboutMe />
      <MySkills />
      <ContactMe />
    </div>
  );
};

export default ContentHome;
