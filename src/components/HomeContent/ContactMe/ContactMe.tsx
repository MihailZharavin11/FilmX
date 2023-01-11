import React from "react";
import { HomeTitle } from "../HomeTitle/HomeTitle";
import styles from "./contactMe.module.scss";
import { LinkBox } from "./LinkBox";

export const ContactMe = () => {
  const links = [
    { title: "gmail", link: "gmail" },
    { title: "linkedIn", link: "linkedIn" },
    { title: "telegram", link: "telegram" },
  ];
  return (
    <div className={styles.contactWrapper}>
      <HomeTitle title="I'm ready to work with you" />
      <div className={styles.contactLink}>
        {links.map((link) => (
          <LinkBox key={link.title} linkName={link.title} src={link.link} />
        ))}
      </div>
    </div>
  );
};
