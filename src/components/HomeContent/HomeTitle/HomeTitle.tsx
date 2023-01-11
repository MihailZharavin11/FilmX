import React from "react";
import styles from "./homeTitle.module.scss";

type HomeTitleProps = {
  title: string;
};

export const HomeTitle: React.FC<HomeTitleProps> = ({ title }) => {
  return (
    <div className={styles.titleBox}>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
};
