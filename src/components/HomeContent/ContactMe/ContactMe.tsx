import React from "react";
import { HomeTitle } from "../HomeTitle/HomeTitle";
import styles from "./contactMe.module.scss";
import { LinkBox } from "./LinkBox";

export const ContactMe = () => {
  const links = [
    { title: "gmail", link: "mailto:mikhail.zharavin65@gmail.com" },
    {
      title: "linkedIn",
      link: "https://www.linkedin.com/in/mikhail-zharavin-75091123a/",
    },
    { title: "telegram", link: "https://t.me/MZharavin" },
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
