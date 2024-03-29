import React from "react";
import styles from "./cardInnerHeader.module.scss";

type FilmHeaderProps = {
  title: string;
  titleOriginal?: string;
  subTitle?: string | undefined;
  text?: string;
};

const CardInnerHeader: React.FC<FilmHeaderProps> = ({
  title,
  titleOriginal,
  subTitle,
  text,
}) => {
  return (
    <div className={styles.description__header}>
      <h1 className={styles.description__headerTitle}>
        {title}
        {titleOriginal}
      </h1>
      <p className={styles.description__headerYear}>{subTitle}</p>
      <p className={styles.description__headerSlogan}>{text}</p>
    </div>
  );
};

export default CardInnerHeader;
